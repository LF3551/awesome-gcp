import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { analyze, descriptionChecks, probeChecks } from './validate-pr.mjs';
import { parseEntries } from './readme.mjs';

const base = [
  '## Contents',
  '- [Tools](#tools)',
  '',
  '## Tools',
  '',
  '- [Gamma CLI](https://gamma.example/) - Command-line tool for managing projects.',
  '- [Alpha SDK](https://cloud.example/alpha) - Client library for the Alpha API.',
  '',
  '## Learning',
  '',
  '- [Course](https://learn.example/) - Hands-on labs for beginners.',
  '',
  '## Contributing',
  '',
].join('\n');

const line = (name, url, desc) => `- [${name}](${url}) - ${desc}`;
const withLine = (l, at = 7) => {
  const a = base.split('\n');
  a.splice(at, 0, l);
  return a.join('\n');
};
const run = (l, at) => analyze(base, withLine(l, at), `@@\n+${l}`);
const ok = (r) => r.checks.every((c) => c.ok);
const failed = (r) => r.checks.filter((c) => !c.ok).map((c) => c.label);
const good = line('Beta Tool', 'https://beta.example/', 'Inspects project settings and reports drift.');

test('valid addition at the bottom of a category passes', () => {
  const r = run(good);
  assert.ok(ok(r), failed(r).join('; '));
});

test('addition in the middle of a category fails', () => {
  assert.ok(failed(run(good, 6)).includes('Added at the bottom of the category'));
});

test('another page on an already listed host is allowed', () => {
  const r = run(line('Beta SDK', 'https://cloud.example/beta', 'Client library for the Beta API.'));
  assert.ok(ok(r), failed(r).join('; '));
});

test('same link is a duplicate, ignoring www and trailing slash', () => {
  const r = run(line('Gamma Again', 'https://www.gamma.example', 'Another link to the same tool.'));
  assert.ok(failed(r).includes('Link is not already in the list'));
});

test('tracking parameters and promotional wording fail', () => {
  const r = run(line('Beta', 'https://beta.example/?utm_source=x', 'The most powerful tool for every team.'));
  assert.ok(failed(r).includes('Link has no tracking or affiliate parameters'));
  assert.ok(failed(r).includes('Description has no promotional wording'));
});

test('http link and bad description fail', () => {
  const r = run(line('Beta', 'http://beta.example/', 'beta tool without period'));
  assert.ok(failed(r).includes('Line uses the format `- [Name](https://link) - Description.`'));
});

test('two added lines or removed lines fail', () => {
  assert.ok(!ok(analyze(base, base, `@@\n+${good}\n+${good}`)));
  assert.ok(!ok(analyze(base, base, '@@\n-- [Course](https://learn.example/) - Hands-on labs for beginners.')));
});

test('outside entry categories fails', () => {
  assert.ok(!ok(run(good, 2)));
  assert.ok(!ok(run(good, 13)));
});

test('branch behind main passes when judged by its own patch', () => {
  const newerBase = base.replace('## Learning', '- [Delta](https://delta.example/) - Fourth tool added on main.\n\n## Learning');
  const r = analyze(newerBase, withLine(good), `@@\n+${good}`);
  assert.ok(ok(r), failed(r).join('; '));
});

test('link probe rows', () => {
  assert.ok(probeChecks({ status: 200 }).every((c) => c.ok));
  assert.ok(probeChecks({ status: 403 }).every((c) => c.ok));
  assert.ok(!probeChecks({ status: 404 }).every((c) => c.ok));
  assert.ok(!probeChecks({ status: 0, error: 'timeout' }).every((c) => c.ok));
  assert.ok(!probeChecks(null).every((c) => c.ok));
});

test('every entry already in readme.md follows the description rules', () => {
  const entries = parseEntries(readFileSync(new URL('../../readme.md', import.meta.url), 'utf8'));
  assert.ok(entries.length > 50);
  const bad = entries.flatMap((e) =>
    descriptionChecks(e.name, e.desc)
      .filter((c) => !c.ok)
      .map((c) => `${e.name}: ${c.label}`),
  );
  assert.deepEqual(bad, []);
});
