# Contributing

Your contributions are always welcome! Thanks for helping keep this list awesome.

A pull request that adds one entry and passes the automated check is merged without waiting for a person.

## Guidelines

- **One resource per pull request.** This makes review and discussion easier.
- **Add your entry to the bottom of the relevant category.**
- Use the format: `- [Name](https://link) - Description.`
  - The description starts with a capital letter and ends with a period.
  - Keep it short, neutral, and factual — no marketing language (avoid "the best", "powerful", "easy").
- The resource should be **genuinely useful** and, if it's a tool or project, **actively maintained**.
- Prefer **canonical URLs** (official documentation or the project's own repository).
- **No trailing whitespace.**
- Check your spelling and grammar.
- Search existing entries first to avoid duplicates.
- If you add a new section, also add it to the Table of Contents.

## What belongs here

- Official Google Cloud tools, SDKs, and services.
- High-quality community tools and libraries for Google Cloud.
- Learning material, reference guides, and reputable community resources.

## What does not belong here

- Abandoned or archived projects (unless of clear historical value, clearly flagged).
- Purely promotional links with no practical value.
- Paid resources presented as free.

## How the automated check works

Every pull request gets a comment with a table of checks. It passes when:

1. Only `readme.md` is changed, with exactly one line added and nothing removed.
2. The line matches `- [Name](https://link) - Description.` and sits at the bottom of an existing category.
3. The link is a plain `https://` address without tracking parameters and is not already listed.
4. The description is 20 to 220 characters, starts with a capital letter, ends with a period, does not repeat the name and has no promotional wording.
5. The link responds when requested.
6. The author's GitHub account is at least 30 days old.

When everything passes, the pull request gets the `automerge-ready` label and is squash-merged once the lint and link checks are green. Otherwise it gets `needs-review` and waits for the maintainer. Pushing a new commit runs the check again.

New categories, edits to existing entries and other changes are welcome too; they are reviewed manually.

All links are re-checked every week. Broken links are reported in an issue labeled `maintenance`.

## Local checks

```bash
npx awesome-lint
node --test .github/scripts/validate-pr.test.mjs
node .github/scripts/probe.mjs https://your-link.example/
```

Thank you for contributing!
