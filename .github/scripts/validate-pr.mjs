// Entry validation for pull requests. PR content is data only; no PR code is executed.
// Subcommands: `parse` (text checks, runs with a read-only token) and `finalize` (combines with the link probe).
import { appendFileSync, writeFileSync } from 'node:fs';
import { ENTRY, SKIP_SECTIONS, normalizeUrl, parseEntries } from './readme.mjs';

export const PROMO =
  /\b(best(?! practices?\b)|#1|number one|ultimate|revolutionary|leading|amazing|awesome|powerful|easy|easiest|fastest|cheapest|world-class|game-changing|coupon|discount|free trial)\b/i;
const TRACKING = /[?&](utm_[a-z]+|ref|ref_src|aff|affiliate|via|fbclid|gclid)=/i;
export const SAFE_URL = /^https:\/\/[A-Za-z0-9.-]+(?::\d+)?(?:\/[A-Za-z0-9._~!$&'()*+,;=:@%/-]*)?$/;

function patchLines(patch) {
  const added = [];
  const removed = [];
  for (const l of patch.split('\n')) {
    if (l.startsWith('+')) added.push(l.slice(1));
    else if (l.startsWith('-')) removed.push(l.slice(1));
  }
  return { added, removed };
}

// Rules for the description text; shared with the test that checks every existing entry.
export function descriptionChecks(name, desc) {
  return [
    { ok: /^[A-Z]/.test(desc) && desc.endsWith('.'), label: 'Description starts with a capital letter and ends with a period' },
    { ok: desc.length >= 20 && desc.length <= 220, label: 'Description is 20 to 220 characters' },
    { ok: !desc.toLowerCase().startsWith(name.toLowerCase()), label: 'Description does not start with the resource name' },
    { ok: !PROMO.test(desc), label: 'Description has no promotional wording' },
    { ok: desc === desc.trimEnd(), label: 'No trailing whitespace' },
  ];
}

// `patch` is the PR's own diff against its merge base, so a branch that is behind main is not penalised.
export function analyze(base, head, patch) {
  const checks = [];
  const add = (ok, label) => checks.push({ ok, label });
  const { added, removed } = patchLines(patch);
  add(removed.length === 0 && added.length === 1, 'Exactly one line added and nothing removed or changed');
  const m = added.length === 1 ? added[0].match(ENTRY) : null;
  add(Boolean(m), 'Line uses the format `- [Name](https://link) - Description.`');
  if (!m) return { checks, entry: null };

  const [, name, url, desc] = m;
  const baseEntries = parseEntries(base);
  const headEntries = parseEntries(head);

  add(SAFE_URL.test(url), 'Link is a plain https address');
  add(!TRACKING.test(url), 'Link has no tracking or affiliate parameters');
  add(!baseEntries.some((e) => normalizeUrl(e.url) === normalizeUrl(url)), 'Link is not already in the list');
  checks.push(...descriptionChecks(name, desc));

  const target = headEntries.find((e) => e.line === added[0]);
  const section = target?.section;
  const allowed = new Set(baseEntries.map((e) => e.section).filter((s) => !SKIP_SECTIONS.has(s)));
  add(Boolean(section) && allowed.has(section), `Placed in an existing category (${section || 'none'})`);
  if (section && allowed.has(section)) {
    const mates = headEntries.filter((e) => e.section === section);
    add(mates[mates.length - 1] === target, 'Added at the bottom of the category');
  }
  return { checks, entry: { name, url, desc } };
}

// Turns the link probe output into check rows. 403 and 429 mean the site is up but blocks automated clients.
export function probeChecks(p) {
  if (!p) return [{ ok: false, label: 'Link check did not run' }];
  const ok = (p.status >= 200 && p.status < 400) || p.status === 403 || p.status === 429;
  return [{ ok, label: `Link responds (${p.status ? `HTTP ${p.status}` : p.error || 'no response'})` }];
}

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'awesome-gcp-bot',
    },
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

async function fileAt(repo, ref, path) {
  const j = await gh(`/repos/${repo}/contents/${path}?ref=${ref}`);
  return Buffer.from(j.content, 'base64').toString('utf8');
}

const out = (k, v) => appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);

async function parse() {
  const { REPO, PR_NUMBER } = process.env;
  const pr = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}`);
  const files = await gh(`/repos/${REPO}/pulls/${PR_NUMBER}/files?per_page=100`);
  const checks = [
    { ok: files.length === 1 && files[0].filename === 'readme.md' && files[0].status === 'modified', label: 'Only readme.md is changed' },
  ];
  let url = '';
  if (checks[0].ok) {
    const base = await fileAt(REPO, pr.base.sha, 'readme.md');
    const head = await fileAt(pr.head.repo.full_name, pr.head.sha, 'readme.md');
    const res = analyze(base, head, files[0].patch || '');
    checks.push(...res.checks);
    if (res.entry && SAFE_URL.test(res.entry.url)) url = res.entry.url;
  }
  const user = await gh(`/users/${pr.user.login}`);
  const ageDays = (Date.now() - new Date(user.created_at)) / 86_400_000;
  checks.push({ ok: ageDays >= 30, label: 'Author account is older than 30 days' });
  out('url', checks.every((c) => c.ok) ? url : '');
  out('text', JSON.stringify(checks));
}

function finalize() {
  const text = JSON.parse(process.env.TEXT_RESULT || '[]');
  let probe = null;
  try {
    probe = JSON.parse(process.env.PROBE_RESULT || 'null');
  } catch {}
  const textOk = text.length > 0 && text.every((c) => c.ok);
  const checks = textOk ? [...text, ...probeChecks(probe)] : text;
  const ok = checks.length > 0 && checks.every((c) => c.ok);
  const rows = checks.map((c) => `| ${c.ok ? 'Pass' : 'Fail'} | ${c.label} |`).join('\n');
  const verdict = ok
    ? 'All checks passed. This pull request will be merged automatically once the required CI checks are green.'
    : 'Some checks need attention. Fix the failed rows and push again, or wait for the maintainer to review it manually.';
  writeFileSync('report.md', `Automated entry check\n\n| Result | Check |\n| --- | --- |\n${rows}\n\n${verdict}\n`);
  out('ok', ok);
}

if (process.argv[1] && process.argv[1].endsWith('validate-pr.mjs')) {
  const cmd = process.argv[2];
  const run = cmd === 'finalize' ? async () => finalize() : parse;
  run().catch((e) => {
    console.error(e);
    writeFileSync('report.md', 'Automated entry check could not run; the maintainer will review this pull request.\n');
    out('ok', false);
    if (cmd === 'parse') {
      out('url', '');
      out('text', '[]');
    }
  });
}
