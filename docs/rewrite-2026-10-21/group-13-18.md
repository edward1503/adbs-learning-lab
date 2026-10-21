# Query execution and optimization, lectures 13–18

Status: all 24 teaching sections rewritten in English and Vietnamese; ready for integration and independent review. This report is not a claim of deployment or visual website QA.

## Delivered

- Replaced the teaching body in every section of `course/lecture13.json` through `lecture18.json` and the six corresponding Vietnamese locales. Section IDs, routes, source metadata, self-check answer positions, and exact existing takeaway asides are retained. Existing source-tail links and the L14→L18 link are retained.
- L13 now lets the reader observe each root request, rejected row, returned row, resume cursor, repeated inner match, sort preparation, batch boundary and cleanup. The transfer exercise traces a changed input containing a late 6, explaining why LIMIT cannot skip that row below a sort.
- L14 walks one shop query through actual intermediate rows before naming rewrite rules. Column-liveness table, duplicate preservation, query blocks/EXISTS, same-row primary-key elimination, nonunique counterexample, transitive predicates, Cartesian candidate and outer-join boundary remain covered.
- L15 uses the same original Orders/Customers fixture throughout. Each change has acquisition/temporary-write/repeated-read accounting. Retains page loops, both orientations, both materialized arrangements, block loops, projection width, fully materialized sort-merge at B=8 and B=7, and matched clustered-access comparisons.
- L16 begins with the approved four-page Students example in full, in both languages. It first shows P1→P2→P3→P4, then names sequential scan; RID and table fetch; tree descent cost; all-row index overhead; range entries P3/P2/P4/P2; optimizer versus access method. It then builds full composite-prefix/range/residual, hash bucket termination, covering/index-only aggregation, clustered/unclustered estimates, grouped RIDs, AND/OR bitmap, and optional PostgreSQL coverage.
- L17 derives selectivity from counts and joins from same-key pair counts; separates uniformity, independence, NULL, integer/continuous endpoints and containment assumptions. Both histogram types show complete and partial bucket arithmetic. Correlation exercise includes AND and OR consequences plus downstream cost.
- L18 builds single-table candidate ledger, counts tree shapes explicitly, explains pruning with its lost-candidate cost, then retains subset plus physical order in a full extension/final-sort ledger.
- Reviewed the six affected canonical quiz banks against retained learning coverage. Expanded six paired rationales with worked reasoning (one per lecture), preserving prompts/options/answers. Localized recurring untranslated vocabulary throughout these six VI quiz locales; verified no duplicate options were introduced, retained all IDs/positions, and restored the literal JOIN keyword in the SQL self-join prompt after the terminology pass.

## Source verification on 2026-10-21

All six current official PDFs downloaded read-only to the OS temporary directory. Physical counts independently checked with PyMuPDF: L13 18; L14 7; L15 43; L16 23; L17 26; L18 24. Text was read against the rewritten topic scope. No source PDF is redistributed in the repository.

| Lesson | Physical source ranges retained | Numbering check and scope |
|---|---|---|
| 13 | 2–6, 7–13, 14–18, 9–13 | 18 physical pages; printed numbers skip in places, so citations remain physical. Iterator, nested-loop state, sort preparation, batches, materialization. |
| 14 | 1–3, 4, 4–7, 4–6 | 7 physical pages, four printed slides per page. Rendered physical page 4: printed slides 15–18. Do not treat slide 17 as PDF page 17. |
| 15 | 3–13, 14–24, 25–42, 39–43 | 43 physical pages. Download fallback succeeded after web reader failed. Rendered physical page 25 shows printed slide 25; checked source fixture differs from teaching fixture. Slide 30's 3510 recap conflicts with 3540 derivation on slide 27; rewrite uses its explicitly separate computed fixture. |
| 16 | 2–6, 7–15 and 19, 16–21, 22–23 | 23 physical pages. Rendered physical page 2 is printed slide 8; last practical is physical 22–23 / printed 28–29. L16 references remain physical pages. |
| 17 | 2–6, 7–11, 12–26, 26 | 26 physical pages; printed slide numbers jump (physical 3 is printed 13). Formulas and histogram assumptions verified rather than treating print numbers as PDF offsets. |
| 18 | 2–7, 8–12/23, 13–23, 14–24 | 24 physical pages. Enumeration, connected left-deep search and interesting-order retention checked. |

The source blocks continue to distinguish original teaching examples from official material. The login-restricted Learn worksheet remains inaccessible and explicitly outside the original PostgreSQL exercise.

## Checks performed

- `node --test tests/execution-transactions-audit.test.mjs`: 6/6 pass after edits. This includes the independent math checks for 2050 partial batches; duplicate self-join multiplicity; 1048/1148 sort totals; 54/9 access cost; histogram endpoints; join-tree counts; property-aware DP totals.
- Custom JSON comparison: every section ID matches across EN/VI; all 24 English bodies differ from HEAD; table row counts and exercise-details counts match between paired locales. Table rows across the six lessons: 11,4,13,8,13,9 in both languages.
- Original cited URL comparison for these six lessons: no missing links after restoring L14's cross-lesson navigation.
- Independently recalculated 920,1048,1148 and 9000 examples; checked age20 and range20–24 manually against the four-page fixture.
- Earlier whole-course preservation test run was blocked by another concurrently edited group's missing takeaway asides, not by this group's examples. Parent owns final integrated build and broad tests.

## Before / after examples

L16 before started by defining an access path and listing kinds. After starts with the exact SQL question and visible four-page contents, shows why finding Linh on P3 cannot finish the query, then derives what an index adds and what RID still lacks. The full composite and index-only scope follows later.

L17 before opened with an optimizer needing cardinality, catalog contents and the System R model in one paragraph. After opens with an actual join's unknown probe count, uses one employee filter population, then separates 240 physical page reads from 12360 CPU steps and 60 output rows.

L18 before named dynamic programming and listed passes before a reader saw why one cheapest subplan was insufficient. After follows a 100/125 subplan choice to 180/125 complete costs and then a six-column extension ledger. EN and VI now expose identical decisions and intermediate numbers.

Remaining: independent review of this group, integrated generated assets/build/tests, website desktop/mobile/browser validation and deployment are parent-owned. This group does not claim those completed.
