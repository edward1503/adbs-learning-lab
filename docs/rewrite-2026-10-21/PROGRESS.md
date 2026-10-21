# ADBS teaching rewrite — 21 October 2026

Content and independent review are complete. Final local build, automated checks and EN/VI desktop/mobile browser QA passed. Publication through the existing CI/CD pipeline is the next step; no live-update claim is made by this pre-publication record.

## What learners now see

- L1–6: library availability before DBMS vocabulary; SELECT/WHERE before aggregation; explicit row transformations; pin/dirty, LRU/CLOCK and slot state tables. The unshown due-date field was removed from the running schema example.
- L7–12: row/column positions, encoding/decoding, B+ split/repair, hash directory changes, sort passes and complete duplicate-join pairs before cost formulas. The cashier now changes the shown city field, not an absent address.
- L13–18: iterator state, matched plan-cost ledgers, the approved four-page Students story, full composite/index-only/bitmap coverage, histogram calculations and complete-plan search costs.
- L19–22: interleaved warehouse transfers, lock/wait graphs, RAM/disk/log ledgers, WAL timing and the two remote histories behind an in-doubt 2PC participant.
- L23–27: CQ witnesses and reversed containment maps, semijoin support states, data placement/shuffle and a stale-read history before CAP terminology.
- Supplements 28–37: concrete prediction, ANN, semantic-filter and remote-storage decisions lead into research questions, fair measurement, interactions, reproducible artifacts and presentation/queueing examples. Hypothetical costs remain distinct from measurements.

Both languages retain the same worked examples, intermediate steps, assumptions and transfer answers. Every group received an independent complete EN/VI reading review and fresh changed-input checks. Reports describe their source and execution limits; no word-count or green-test claim substitutes for comprehension.

## Completed groups and review evidence

| Group | Author report | Independent review |
|---|---|---|
| 01–06 | [Complete](group-01-06.md) | [Accepted; schema wording fixed](cross-review-01-06.md) |
| 07–12 | [Complete](group-07-12.md) | [Accepted; city wording fixed](cross-review-07-12.md) |
| 13–18 | [Complete](group-13-18.md) | [Accepted](cross-review-13-18.md) |
| 19–22 | [Complete](group-19-22.md) | [Accepted](cross-review-19-22.md) |
| 23–27 | [Complete](group-23-27.md) | [Accepted](cross-review-23-27.md) |
| 28–37 | [Complete](group-28-37.md) | [28–31 accepted](cross-review-28-31.md); [32–37 accepted](cross-review-32-37.md) |

[All-resource source/review map](source-map.md) · [Section-level review mapping](review-map.json) · [Actual before/after excerpts](before-after.md) · [Final validation](validation.md)

## Verified baseline and preservation

The public live baseline and source main were v3.2.0, commit `751115b15eede16c8f7408a1d9bdb96ae31cc681`: 37 resources, 181 sections and 1,167 bank questions. D:\VSCODE\adbs-learning-web held older snapshots without Git metadata, so it remains untouched. Implementation uses the current public repository cloned into the authorized task workspace.

All IDs/routes, existing keyed option meanings, progress keys, original source URLs, engine/assets and deployment workflows remain. All 181 section pairs were rewritten; 72 bank items received explanation or prompt improvements. Lab instructions now explain B−1/B−2 frame budgets and the key/RID-versus-row distinction in EN/VI, without changing algorithms or controls.

## Remaining publication step and limits

Publish the completed v3.3.0 source via normal main push, then verify Windows/Linux CI, checked deploy artifact, rollback snapshot, Botkeep import and the actual live version/content/hashes. If an action is blocked, report its precise state without claiming publication.

Optional PostgreSQL and GPU/model/distributed research exercises were not run; restricted Learn/Canvas materials remain unavailable. This is editorial and technical review, not a human learner study. The source reports distinguish fresh PDF text/page checks from selected visual slide checks.
