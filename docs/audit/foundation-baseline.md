# Foundation audit baseline: Modules 1–4

Review recorded 2026-10-11. Baseline application commit: `b694ecf13394d3cf9f35bf78b880bb95acf46995`.

This is a condensed public record of baseline findings supplied by independent content reviewers. It preserves the pre-integration findings; it is not a review of the subsequently edited files, generated assets or deployed site. The complete raw reviewer Markdown and its per-topic classification table were not available to the documentation consolidator. No replacement 93-row classification table has been invented.

The target syllabus has **13 modules, 15 weeks and 30 sessions**. The 27 Edinburgh slide resources are source records, rather than a count of scheduled sessions. This report covers the first 12 source resources mapped to Modules 1–4. Their legacy `coverage.verified` values are historical metadata, not evidence of an independent post-integration audit.

## Baseline outcome

| Check | Recorded result | Interpretation |
| --- | --- | --- |
| Topic-bank answer keys | All 465 checked answers substantively correct | Preserve original answers and option meanings. |
| Embedded lesson checks | All 12 checked answers substantively correct | No replacement answer keys proposed. |
| Total answer checks | 477 | Bank and embedded checks are counted separately. |
| Topic-bank answer-position pattern | Fixed cyclic pattern reported across 93 topics | Assessment predictability is a defect even when the answers are correct. |
| Explanation depth | 20 proposed additions, F01–F20 | Baseline content was reported partial or missing in depth; this does not mean its existing statements were all incorrect. |
| Additional bank exercises | 10 proposed questions | Six across L1–L3 and four across L9/L12. These are original practice questions. |
| Incorrect SQL citation targets | Two questions in L2 linked physical page 9 instead of physical page 8 | Printed slide 9 is on physical PDF page 8. |
| L10–L12 citation refinement | 112 proposed question-page refinements | Navigation precision, not 112 incorrect answers. |

## Finding status and interpretation

`PARTIAL_OR_MISSING_DEPTH` below preserves the aggregate reviewer classification. The condensed handoff does not assign a reliable separate `PARTIAL` or `MISSING` status to every F item. `INCORRECT` is reserved for the two explicit assessment/citation findings. Proposed changes and example checks remain baseline recommendations; implementation and independent acceptance must be recorded separately.

| ID | Baseline status | Target | Proposed teaching addition and evidence to check | Public source physical pages |
| --- | --- | --- | --- | --- |
| F01 | PARTIAL_OR_MISSING_DEPTH | L1 `l1-1`, `l1-3` | Distinguish data model, schema and current instance; explain constraints, concurrency, transactions, access control and query interfaces as DBMS services. Compare library and shop schemas under the same relational model. | L1: 13–17, 19 |
| F02 | PARTIAL_OR_MISSING_DEPTH | L1 `l1-4` | Trace planning, execution, file/index, buffer and disk-space responsibilities. Follow an uncached indexed data-page request through the layers; distinguish a cache hit. | L4: 2–9 |
| F03 | PARTIAL_OR_MISSING_DEPTH | L1 `l1-4` | Separate OLTP/OLAP/HTAP workload labels from disk/in-memory architecture and row/column layout. A fully cached execution does not turn a disk-oriented DBMS into an in-memory architecture. | L4: 11–14; L7: 2–7, 11–12, 16 |
| F04 | PARTIAL_OR_MISSING_DEPTH | L2 `l2-1`, `l2-3`, `l2-4` | Add DDL/DML/DCL and outer-join examples, including an orphan row with no enforced foreign key. LEFT/RIGHT/FULL outputs contain 4/4/5 rows. Explain correlated NOT EXISTS, NULL-sensitive NOT IN, equality ANY and inequality ALL, including empty inputs. | L2: 6–8, 23–28; PostgreSQL subquery documentation for NULL/empty-set semantics |
| F05 | PARTIAL_OR_MISSING_DEPTH | L3 `l3-1`, `l3-2` | Explain typed closure, safe/domain-independent calculus and logical versus physical plans. Use renamed Employee roles with `E.manager_id = M.id`; rename changes names, not values or cardinality. | L3: 2–6, 12–13, 16–17 |
| F06 | PARTIAL_OR_MISSING_DEPTH | L3 `l3-2`, `l3-4` | Distinguish natural joins, extended algebra and division. An original SQL/RA-skills division example returns An. State the A-domain and set semantics. EXCEPT ALL multiplicity 3−1=2 differs from distinct EXCEPT. | L3: 10–11, 14–15, 18–19 |
| F07 | PARTIAL_OR_MISSING_DEPTH | L4 `l4-1`, `l4-4` | Explain volatile/persistent hierarchy, HDD seek/rotation/transfer and NAND program/erase granularity. Define write amplification as physical bytes written divided by logical host bytes written. Distinguish spatial/temporal control and page-ID mapping. | L4: 11–16, 19–22, 24–28 |
| F08 | PARTIAL_OR_MISSING_DEPTH | L5 `l5-1`, `l5-4` | Trace frame lookup, pin/unpin, dirty-victim persistence and cache replacement. With three clean frames and immediate unpinning, A B C D A B C D gives MRU 5 misses versus LRU 8; state these assumptions and avoid a universal MRU claim. | L5: 7–10, 12–15, 22, 27–34 |
| F09 | PARTIAL_OR_MISSING_DEPTH | L6 `l6-1`, `l6-3` | Explain logical-file operations and distinguish heap directories, free-slot structures, stable-slot directories and field offsets. A 60-byte record can use the 90-byte candidate only if overhead/contiguity allow it. Free-list 2→5→8 becomes 4→5→8 after occupying 2 and freeing occupied slot 4. | L6: 5–9, 12–19, 21–22 |
| F10 | PARTIAL_OR_MISSING_DEPTH | L6 `l6-4` | Explain shared schema, local NULL bitmap, variable offsets, headers/alignment and delimiter escaping. Offset 12 alone does not prove a field exists; empty value, deletion and NULL are distinct. | L6: 24–28 |
| F11 | PARTIAL_OR_MISSING_DEPTH | L7 `l7-1`, `l7-2` | Reconstruct columns by aligned row position; distinguish PAX within-page layout from whole-column I/O. An original city-A selection at positions 1 and 3 sums amounts 10+30=40. | L7: 7–18 |
| F12 | PARTIAL_OR_MISSING_DEPTH | L7 `l7-1`, `l7-4` | Explain Parquet row groups, column chunks, pages, footer metadata and nested representation. Min/max 10–20 prunes `x > 30`; min/max 10–50 does not prove that 30 occurs. | L7: 18–20; official Parquet file-format documentation |
| F13 | PARTIAL_OR_MISSING_DEPTH | L7 `l7-3`, `l7-4` | Separate block codecs from domain-aware encodings. An original 100-value dictionary example uses 40 dictionary bytes + 100 code bytes = 140 payload bytes versus 1,000 raw bytes, excluding headers. Explain RLE/delta/headers and adverse distributions. | L7: 21–28 |
| F14 | PARTIAL_OR_MISSING_DEPTH | L8 `l8-2`, `l8-3` | State heap, compact-sorted and indexed-file I/O assumptions; separate unique/absent/nonunique search and RID-known deletion. Explain index entry variants, clustering, overflow and reorganization without treating one product convention as universal. | L8: 5–6, 8–14, 16–19, 23–26, 30, 33 |
| F15 | PARTIAL_OR_MISSING_DEPTH | L9 `l9-3` | Contrast internal-node merge/rotation with leaf operations. With d=2, merging internal keys [10,20], separator 30 and [40] yields [10,20,30,40] with five children. Rotation moves both separator and the appropriate child pointer. | L9: 17–18, 20–25 |
| F16 | PARTIAL_OR_MISSING_DEPTH | L9 `l9-1`, `l9-4` | Distinguish textbook and practical deletion, root exceptions, byte occupancy, duplicate handling, ISAM overflow and safe internal prefix compression. Separator shortening must preserve a valid boundary. | L9: 6–7, 10–11, 13–14, 16, 26–29 |
| F17 | PARTIAL_OR_MISSING_DEPTH | L10 `l10-s2`, `l10-s3` | State bucket-only uncached costs separately from directory and table-page costs. Modulo 16 maps 0/16/32/48 together; splitting cannot spread keys with identical relevant bits. Maintain local-depth ≤ global-depth and distinguish split/doubling/shrinking. | L10: 7–12, 15, 25 |
| F18 | PARTIAL_OR_MISSING_DEPTH | L11 `l11-s1`, `l11-s3` | Merge sorted runs with duplicates intact, then distinguish DISTINCT and aggregation state. Explain memory/skew limits and materialized/pipelined cost boundaries. With N=90, B=10, f=1.2, a partition estimate of 12 state pages does not fit 10 frames. | L11: 4–5, 9–12, 18–23, 27, 29–32 |
| F19 | PARTIAL_OR_MISSING_DEPTH | L12 `l12-s3`, `l12-s4` | Explain the fused final sort/join pass. R=120, S=40, B=12 gives 10+4 runs, exceeding 11 input frames. B=16 gives 8+3 runs and permits the stated fusion: 480 I/Os versus 800, excluding join-output writes. | L12: 16–17, 30–33 |
| F20 | PARTIAL_OR_MISSING_DEPTH | L12 `l12-s3` | Preserve all duplicate join pairs: 2 matching R rows × 3 matching S rows = 6. State hash-build memory, recursive partition I/O and identical-key skew limits. Summing duplicate groups is not a general join replacement. | L12: 4, 17, 30, 34–41, 43; L11: 22, 27 |
| QP01 | INCORRECT · high priority | 93 audited topic banks | Fixed cyclic correct-option positions allow a learner to exploit answer location. Change presentation independently of correctness, while preserving canonical option meaning and saved choices. This finding concerns assessment quality, not wrong keys. | All 93 audited topic banks |
| QC01 | INCORRECT · medium priority | `l02-terminology-q4`, `l02-terminology-q5` | Change question physical-page citation from [9] to [8]. Preserve prompt, options, answer and explanation. Physical page 8 contains printed slide 9. | L2: physical 8, printed slide 9 |

## Proposed original bank additions

| Stable question ID | Target source resource | Purpose | Answer position in the supplied canonical options | Source physical pages |
| --- | --- | --- | --- | --- |
| `l01-architecture-new-q1` | L1 | Identify planning as the layer choosing an index scan versus table scan. | 1 (zero-based) | L4: 3–4, 8 |
| `l01-architecture-new-q2` | L1 | Distinguish cached execution from architecture. | 3 | L4: 11–12 |
| `l01-architecture-new-q3` | L1 | Separate workload labels from disk/in-memory design. | 0 | L4: 11–12; L7: 2–6 |
| `l01-architecture-new-q4` | L1 | Explain why ordinary RAM is not durable. | 2 | L4: 11–12 |
| `l02-negative-new-q1` | L2 | Evaluate correlated NOT EXISTS on a small Member/Borrow instance. | 1 | L2: 26–28 |
| `l03-rename-new-q1` | L3 | Choose the employee/manager role join predicate. | 3 | L3: 13, 16–17 |
| `l09-internal-merge-new-q1` | L9 | Pull the parent separator into an internal merge. | 0 | L9: 23–24 |
| `l09-internal-rotate-new-q2` | L9 | Replace the parent separator correctly during rotation. | 2 | L9: 25 |
| `l12-fusion-new-q1` | L12 | Check run/frame feasibility for a fused final pass. | 2 | L12: 32 |
| `l12-skew-new-q1` | L12 | Reject SUM as a replacement for the full duplicate join result. | 0 | L12: 34–36, 39; L11: 22, 29–30 |

The last four stable IDs are recorded in [foundation34-resolutions.json](foundation34-resolutions.json). Canonical answer positions describe the supplied options; they are not instructions to preserve predictable displayed positions.

## Citation and source-variant cautions

- The 112 L10–L12 question refinements narrow links to the pages that explain each concept. They do not establish 112 erroneous answer keys. Their exact per-question page lists belong in the separately maintained resolution record.
- Physical PDF page numbers and printed slide numbers are distinct. Do not mechanically substitute one for the other.
- The L4 physical-page-17 reference should not assert an unverified printed slide number.
- Cross-resource questions need per-question source provenance. A L1 architecture question supported by L4/L7 must not inherit an unrelated L1 page citation.
- Worked examples in the proposed additions are original explanations with stated assumptions. They are not quoted slide exercises, benchmark results or instructor-assigned questions.

## Public source index

The supplied source page references identify these public PDFs. This repository links them; it does not redistribute their bytes.

| Resource | Public source |
| --- | --- |
| L1 | [Introduction](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture01-intro.pdf) |
| L2 | [SQL](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture02-sql.pdf) |
| L3 | [Relational algebra](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture03-ra.pdf) |
| L4 | [Hardware and disk-space management](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture04-hardware-disk-space-management.pdf) |
| L5 | [Buffer management](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture05-buffer-management.pdf) |
| L6 | [Files, pages and records](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture06-file-pages-records.pdf) |
| L7 | [Storage models and compression](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture07-storage-models-compression.pdf) |
| L8 | [File organisations](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture08-file-organisations.pdf) |
| L9 | [Tree indexing](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture09-tree-indexing.pdf) |
| L10 | [Hash indexing](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture10-hash-indexing.pdf) |
| L11 | [Sorting and aggregation](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture11-sorting-aggregation_0.pdf) |
| L12 | [Join algorithms](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture12-joins.pdf) |
| SQL semantics | [PostgreSQL: subquery expressions](https://www.postgresql.org/docs/current/functions-subquery.html) (version-sensitive public reference) |
| Parquet | [Apache Parquet: file format](https://parquet.apache.org/docs/file-format/) |

## Evidence and remaining boundary

The reported answer checks are the reviewers' baseline conclusions. This document does not claim a fresh independent reread of all source bytes, a hash-verified PDF corpus, an exhaustive textbook audit or post-change acceptance. See [baseline-inventory.json](baseline-inventory.json) for the recorded application inventory, [syllabus-target.json](syllabus-target.json) for the target syllabus, and [coverage-matrix.json](coverage-matrix.json) for traceability status.

Canvas/LEARN-only readings, private course materials and instructor-specific rubrics, deadlines and submission rules were unavailable. No private course URL, restricted PDF, secret or fabricated instructor policy is included. Supplemental research sessions must remain distinct from official Edinburgh slide resources.

After integration, a separate review must check the actual explanations, arithmetic, citation targets, quiz grading, persisted answer semantics, English rendering and deployed behavior. Passing structural tests alone cannot resolve these baseline findings.
