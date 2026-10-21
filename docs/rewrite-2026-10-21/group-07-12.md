# Storage, indexes and operator algorithms: L7–12

**Completed:** all 24 English main sections and their 24 Vietnamese counterparts rewritten; six paired bank explanations and six English legacy mini-quiz explanations expanded. All 259 existing bank questions remain, with their IDs, option strings and keyed positions unchanged. No runtime, generated bundle or deployment edits made by this group.

The explanations now introduce a concrete operation before the structure name or formula. The six lessons keep their four public section IDs each, goals counts, routes, source metadata and laboratory associations. Existing accurate Key takeaway asides and exact source URLs remain; subsection anchors still resolve within their original section. No learning topic was intentionally removed.

## What changed for learners

| Lesson | New causal path and visible work | Scope retained beyond the opening example |
| --- | --- | --- |
| 7 | Follow Orders rows into column positions, gather amount, then calculate 100 MB vs 12 MB; encode and decode values rather than naming codecs first. | OLTP/OLAP/HTAP; row/column/PAX trade-offs; Parquet hierarchy, footer, pruning and parallel row groups; lossless/general codecs; RLE, delta/min-delta, zero/negative cases, bit packing, dictionary size/order and format limits. |
| 8 | Find a unique student across four pages, change to “every match”, then sort the same IDs and discover insertion movement; derive costs from reads/writes. | P/R/D assumptions; exact expected successful heap lookup versus approximation/miss; all operation costs; A/B/C entries; search/candidate/primary keys and course classification; clustering and data-fetch cost. |
| 9 | Build signpost pages; insert 15 with an overflow/split table; delete 4 then 9 with routing checks after each change. | ISAM overflow/static boundaries; d…2d convention and root exception; internal split, internal merge and rotation with named child ranges; same-parent siblings; propagation; height/caching; bytes/production deletion; prefix compression and suffix truncation; duplicates. |
| 10 | Hash 6,10,14 into bucket 2, compare keys, follow overflow; grow only crowded bucket with a before/after directory table; reverse the split under explicit conditions. | Chaining and linear probing; cost and record-fetch boundaries; distribution/skew/modulo; static rebuild/concurrency trade-off; global/local depths, shared pointers, d<g case; merge/shrink; identical full hashes and nontermination risk. |
| 11 | Merge the heads of [1,4,4] and [2,4,7] visibly; keep duplicates; count 90-page runs and each read/write pass before introducing logarithms. | Lexicographic order; operator semantics; two-way vs multiway variants; materialisation/pipelining/empty/fit cases; clustered/unclustered index order; DISTINCT; state-by-state AVG; partition hashing, overhead, skew, repeated-key limits and capacity bound; order-dependent choice. |
| 12 | Produce An’s two enrolment pairs; share an inner scan across tuples, pages, then blocks; trace both orientations; enumerate every pair of duplicate groups. | Tuple/page/block/index loop costs; all-match probes and clustering; merge duplicate handling; build/probe and Grace partitioning; fit/overhead/skew/recursive fallback; final-pass fusion’s combined run-buffer condition; order/inequality trade-offs and excluded output cost. |

## Source check and section mapping

Source entry point: [official schedule](https://opencourse.inf.ed.ac.uk/adbs/schedule). I read extracted official PDF text and existing page/audit records, checking the relevant algorithm rules and cost formulas against the fresh text. This is **not** a fresh visual audit of every diagram. Web PDF screenshot calls were unavailable. In particular, the single-slide L9 URL could not be opened by this reader; the official four-slides-per-page alternative was accessible and used for the fresh check.

| Lesson | Freshly accessible official PDF | Section source ranges in canonical single-slide PDF, physical pages | Numbering distinction |
| --- | --- | --- | --- |
| 7 | [28 pages](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture07-storage-models-compression.pdf) | l7-1: 2–18; l7-2: 7–20; l7-3: 21–28; l7-4: 18–28 | Printed slide 16 is absent; physical page 16 carries printed slide 17. Last physical page 28 carries printed slide 29. |
| 8 | [34 pages](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture08-file-organisations.pdf) | l8-1: 2–19; l8-2: 5–19; l8-3: 20–34; l8-4: 20–34 | Printed slide sequence has gaps; physical page 16 is printed 18, physical 26 is printed 29, physical 34 is printed 49. |
| 9 | [8 physical pages, 30 printed slides](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture09-tree-indexing-2x2.pdf) | l9-1: 2–16; l9-2: 17–20; l9-3: 20–25; l9-4: 6–30 | Fresh check used the 2x2 alternative: printed 1–4 on physical 1, 5–8 on physical 2, …, 29–30 on physical 8. The existing canonical single-slide mapping remains 30 physical pages; do not describe the alternative as 30 PDF pages. |
| 10 | [26 pages](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture10-hash-indexing.pdf) | l10-s1: 2–6; l10-s2: 7–12; l10-s3: 13–25; l10-s4: 15–26 | Citations explicitly use physical PDF pages. For example physical 15 is printed slide 16. |
| 11 | [32 pages](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture11-sorting-aggregation_0.pdf) | l11-s1: 2–11; l11-s2: 9–17; l11-s3: 18–32; l11-s4: 18–32 | Printed sequence has gaps: physical 15 is printed 17; physical 20 is printed 24; physical 22 is printed 27. |
| 12 | [43 pages](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture12-joins.pdf) | l12-s1: 2–11; l12-s2: 12–15; l12-s3: 16–41; l12-s4: 30–43 | Physical page 2 is printed slide 4; physical page 32 is printed slide 34. |

The section ranges identify the source scope, not a claim that each new example occurs on a slide. Numerical datasets, case narratives and exercises are explicitly identified as original teaching material. Existing more granular source links were retained inside source details. Parquet’s actual file specification remains linked; the toy encodings are not presented as a standards-conformant encoder.

## Representative before/after

**L9 opening before:** “ISAM (Indexed Sequential Access Method) keeps its internal-node structure fixed. When a leaf runs out of space, it adds an overflow page…” The old opening immediately compared two structures and introduced occupancy rules.

**L9 opening after:** “A sorted file lets us discard half the search region at a time, but a large file still requires many unpredictable page jumps. Could one page tell us which smaller region contains a key?” It constructs root [12] and leaves [4,9]/[12,15,18], searches for 15 and 10, then introduces routing, fanout and the occupancy rule. The later split and deletion reuse these entries. Vietnamese follows the same sequence and states.

**L11 merge before:** a single paragraph described merging [1,4,4] with [2,4,7].

**L11 merge after:** a six-row state table shows the two heads, the selected source and accumulated output at each step. Only after all three 4s are visible does it distinguish sorting, DISTINCT and aggregation. The separate page table counts pass 0, both merges and every 90-page read/write; it then derives the formula. Vietnamese has the same rows and arithmetic.

## Question and lab review

Reviewed all English bank prompts, keyed answers and explanations for L7–12 for coherence with the new teaching. The retained questions continue to cover the complete scope. Expanded bilingual rationales at `l07-column-encoding-q5`, `l08-heap-cost-q2`, `l09-redistribute-q3`, `l10-global-and-local-depth-q2`, `l11-external-merge-sort-q3`, and `l12-fusion-new-q1` make units, intermediate values or the wrong inference explicit. The six legacy English mini-quiz rationales were expanded without changing options or answers; paired body exercises explain the same concepts in Vietnamese. No question was removed merely to reduce volume.

Read shared index, sorting and join labs and their UI translations. No model contradiction found. Sent the coordinator concrete hints to add: reserve the output frame for B−1 sorting; reserve inner/output frames for B−2 loops; include build-table overhead in hash fit; a key/RID match is not necessarily a full-row fetch. Coordinator confirmed improving the bilingual introductions without changing the engines. The simplified two-level index lab is still labelled as an illustration rather than a dynamic B+ implementation.

## Verification performed

- Independently recomputed the nine-page heap expectation, delta/residual round trip, sorting run sequences 90/6, 90/10 and 91/6, duplicate join cardinality, both block-loop orientations, Grace cost and fused-run buffer fit. All matched the new text.
- Checked all 24 paired section IDs, all EN/VI literal data diagrams and source URL parity. Neutral data diagrams are byte-identical between languages; surrounding explanations are translated.
- Compared every bank question ID, option string and keyed index to Git HEAD; all 259 are unchanged in meaning/storage position. The six main quiz option arrays and answers are likewise unchanged.
- Ran `node --test tests/bilingual.test.mjs tests/core.test.mjs tests/clarity.test.mjs tests/content.test.mjs`: 21 passed, one failure outside this group (`l23-s3 executable snippet`); L7–12 snippet checks passed after fixing the initial translated-diagram mismatch. Shared integration/render tests and current generated bundles are coordinator-owned and were still in progress.

**Remaining limits:** independent cross-review, full rendered desktop/mobile QA, shared build/CI and deployment are outside this group’s completed check. No live-publication claim is made here.
