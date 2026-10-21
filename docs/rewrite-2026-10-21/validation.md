# v3.3.0 candidate acceptance record

All 37 resources have a completed author pass and independent EN/VI content review. [Source/review map](source-map.md), [section inventory and review mapping](review-map.json), [actual before/after excerpts](before-after.md), and the linked group reports provide the content evidence. Every one of the 181 existing section pairs was rewritten; 72 bank items received prompt or explanation changes. Counts establish scope, not comprehension.

Reviewers solved new-input problems covering SQL and NULL, LRU/slot capacity, B+ split/repair, extendible hashing, sort thresholds, duplicate joins, composite residuals, histogram estimates, complete-plan costs, conflict/view/locking/WAL/2PC, CQ containment/semijoins, parallel placement/CAP, ANN quality, semantic-filter recall, remote access, experiment fairness, interactions and queueing. Two example-continuity issues were fixed in both languages: L1's unshown due-date field and L7's unshown address field. The approved Students example remains complete before the later L16 topics.

## Final local execution checks

- `npm run build`: passed using Node 24.19.0 on Edward, from canonical course JSON.
- `npm test`: 122 passed, zero failed/skipped. Includes actual SQLite/WASM exercises and worker lifecycle, numerical examples, source/answer identities, language-state persistence, and the production HTTP server.
- `node scripts/rewrite-browser.cjs`: passed against the final local candidate. All 37 resources × EN/VI × 1440/390 widths rendered expected source paragraphs/section IDs, with expanded solutions and no document-level horizontal overflow. JavaScript page errors: none.
- Browser flows passed: canonical quiz answer state across languages, completion and locale across reload, real SQLite `COUNT(*)=6`, SQL editor/result retained on language change, mobile contents drawer open/Escape close.
- Screenshots were made by Chromium. Integration owner visually inspected representative SQL, buffer, access-method and recovery screenshots in EN/VI at desktop/mobile sizes. Selected examples are saved beside this record. Browser result summary: [browser-validation.json](browser-validation.json). Full text/screenshot captures remain locally under `output/playwright/rewrite/`.
- `git diff --check`: passed. Existing engine, styles, font/WASM assets, app/quiz runtime, progress keys and deployment workflows unchanged. The only shared teaching runtime edits improve index/sort/join lab descriptions and corresponding VI dictionary entries. Release cache markers/version updated to 3.3.0.

The 14 October exact-prose fixtures remain historical; [integration notes](integration-notes.md) explain the explicit 21 October editorial contract. Original keyed option strings/order and answer slots remain protected, including all 1,167 bank questions and embedded checks.

## Limits and publication evidence

This is an editorial and technical assessment, not a human learner usability study. Optional PostgreSQL EXPLAIN exercises and external GPU/model/distributed research experiments were not executed. Their outputs/costs remain illustrative or proposed, not measurements. Source checks include fresh official PDF text/count verification and selected numbering/diagram checks; they are not an exhaustive visual audit of every slide image. Restricted Learn/Canvas data and instructor-specific assessment rules remain unavailable and labeled accordingly.

Publication uses the existing main → Windows/Linux CI → checked deploy artifact → rollback snapshot → Botkeep import/hash verification. This record is written before publication; exact deployment outcome is identified by the CI run and the site's `release.json` source commit. A locally passing build alone is not a live-publication claim.
