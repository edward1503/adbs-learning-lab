> Current v3.4.0 validation: [23 October slide-based reader](docs/slide-textbook-2026-10-23/README.md). The record below describes historical releases.

> Historical validation of the earlier release. Current 21 October rewrite evidence: [progress and acceptance record](docs/rewrite-2026-10-21/PROGRESS.md).

# Validation scope — English v3.1.0

The integrated release has 13 modules, 15 weeks, 30 timetabled sessions and 37 learning resources: 27 slide-based resources plus ten original supplements. It contains 227 quiz topics, 1,167 bank questions, 76 Key takeaways, ten interactive labs and 15 SQL exercises. Styles, original lab behavior, vendored SQLite/WASM and font bytes are preserved.

## Content and compatibility

The independent source audits found all original 1,100 bank keys and 27 embedded keys correct. Integrated independent reviewers accepted all 60 core additions and 50 supplemental answers. The release adds 17 targeted core questions; it preserves every original option string/order, answer index and explanation. Two L16 prompts make existing I/O assumptions explicit. Exactly 120 approved citation changes are enumerated: two L2 physical-page errors and 118 precision refinements. The historical golden baselines are retained; semantic hashes and explicit approved-difference fixtures detect unintended changes.

The [audit record](docs/audit/README.md) and [40-row coverage matrix](docs/audit/coverage-matrix.json) retain source boundaries, stable targets and independent review reports. Core integration used supplied independent source-audit evidence. This executor performed scoped L2/L5 PDF visual checks, not an exhaustive new reread of every source PDF or textbook. Supplements retain `kind: supplemental`, null lecture numbers and false official-course verification. Canvas assignments and instructor rules remain unavailable.

## Automated checks

`npm ci`, `npm run build` and the **111-test suite** pass on Windows with Node.js 24, with no failures or skips. Tests cover canonical/generated content, stable route IDs and markup, all original question meanings, approved citation differences, complete supplemental-packet hashes, timetable/resource classification, displayed-choice permutation, retries/resets, independent completion stores, SQLite grading and worker lifecycle, algorithms, numerical audit examples and HTTP asset serving. Local HTTP tests require loopback access; the initial executor sandbox blocked that connection, and the authorized check passed outside that restriction.

The portable runner expands filenames without shell globbing. Git attributes preserve LF text and binary font/WASM bytes. GitHub Actions verifies installation, build and tests on both Linux and Windows for PRs and `main` pushes. [Workflow runs](https://github.com/edward1503/adbs-learning-lab/actions/workflows/ci.yml) identify the exact checked commit. A successful `main` check publishes the checked artifact to `deploy`; PR checks do not deploy.

## Browser acceptance

An isolated local Chromium session rendered all **37 resource routes, 181 lesson sections and 936 paragraphs**. Each rendered section contains the full canonical prose; no missing section, undefined value, escaped paragraph markup or horizontal page overflow was found. Desktop and 390-pixel mobile views were inspected. Actual controls exercised wrong feedback, retry, correct feedback and topic reset; all 50 supplemental questions were answered and graded through the browser. Primary-reference feedback links, full-prose search, previous/next navigation and the mobile contents drawer were checked.

The browser retained an original source-option answer under the shuffled display, preserved legacy `adbs-learning-v1` data and core completion, persisted supplemental completion separately across reload, and did not convert supplemental completions into core completions. SQLite/WASM initialized, ran a real count query and correctly graded the SELECT exercise through its Web Worker. The only observed console error was the optional `/favicon.ico` 404; no application script error was observed.

These checks are scoped acceptance evidence, not exhaustive browser/version accessibility certification or proof of every research claim. Optional older browser suites require separately installed Playwright and are outside `npm test`.

## Delivery verification

The established `main` workflow saves verified live assets as rollback output, imports the exact checked `deploy` commit, waits for Botkeep operation completion and verifies release metadata plus SHA256 of all 19 public assets. Consult the workflow for the terminal result of the promoted commit. This file describes the verification contract, not an advance claim that a pending deployment succeeded. The live host remains [adbs-learning-lab.bot-keep.xyz](https://adbs-learning-lab.bot-keep.xyz/); hosting resources were not changed.
