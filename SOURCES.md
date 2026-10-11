# ADBS learning sources

The 27 core resources retain the supplied Edinburgh Spring 2026 source-review records. The 2026-10-11 integration used independently supplied source audits and independently checked the resulting explanations, calculations and answers. This executor did not repeat an exhaustive page-by-page review of every PDF or textbook. The site presents original explanations and exercises with links to the official sources; it does not redistribute slide PDFs or images. Page references mean physical PDF pages unless explicitly identified as printed slide numbers. See docs/audit/README.md for exact evidence and limitations.

Official schedule: https://opencourse.inf.ed.ac.uk/adbs/schedule

## Lecture 1: From data to a DBMS

Course Introduction: motivation, database/DBMS, flat-file weaknesses, abstraction, data models; course organisation, assessment and academic integrity.

- PDF pp. 10–19 · databases, DBMSs, and abstraction; no printed slide numbers: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture01-intro.pdf#page=10
- PDF pp. 21–35 · roadmap and information for the Spring 2026 course: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture01-intro.pdf#page=21

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 2: SQL: understanding the result

SQL terminology and history; DDL/DML/DCL; SELECT, sorting, limits, aggregates, grouping, joins, IN/EXISTS, ALL/ANY.

- PDF pp. 6–12 / printed slides 7–13 · tables and SELECT: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture02-sql.pdf#page=6
- PDF pp. 13–19 / slides 14–20 · aggregates and evaluation: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture02-sql.pdf#page=13
- PDF pp. 20–28 / slides 21–29 · joins and nested queries: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture02-sql.pdf#page=20

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 3: Relational algebra: from questions to plans

Query compilation and Codd’s theorem; compositional relational algebra, set semantics, core operators, joins and additional operators.

- PDF pp. 2–7 / slides 2–7 · plans, calculus, and semantics: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture03-ra.pdf#page=2
- PDF pp. 8–18 / slides 8–18 · operators: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture03-ra.pdf#page=8
- PDF pp. 19–20 / slides 19–20 · additional operators: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture03-ra.pdf#page=19

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 4: Hardware and the disk-space manager

Layered DBMS architecture; storage hierarchy; HDD/SSD; random versus sequential access; page abstraction and disk-space allocation/mapping.

- PDF pp. 2–14 / slides 2–14 · architecture and the memory hierarchy: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture04-hardware-disk-space-management.pdf#page=2
- PDF pp. 15–23 / slides 15–24 · devices and I/O: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture04-hardware-disk-space-management.pdf#page=15
- PDF pp. 24–29 / slides 25–31 · the disk-space manager: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture04-hardware-disk-space-management.pdf#page=24

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 5: The buffer pool: pin, dirty, LRU, and CLOCK

Buffer metadata and pin/unpin; LRU/CLOCK/MRU; sequential flooding; LRU-K; priority hints, partitioned pools, prefetch and OS interaction.

- PDF pp. 3–11 / slides 3–11 · buffer state: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture05-buffer-management.pdf#page=3
- PDF pp. 13–21 / slides 14–22 · LRU/CLOCK: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture05-buffer-management.pdf#page=13
- PDF pp. 22–35 / slides 26–39 · scans, MRU, and practical considerations: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture05-buffer-management.pdf#page=22

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 6: Files, pages, and records

Files/records API; heap page lists and directories; fixed packed/unpacked layouts; slotted pages; fixed/variable fields and NULL metadata.

- PDF pp. 4–9 / slides 4–9 · files and heaps: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture06-file-pages-records.pdf#page=4
- PDF pp. 11–22 / slides 11–22 · page layout: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture06-file-pages-records.pdf#page=11
- PDF pp. 24–29 / slides 24–29 · record bytes: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture06-file-pages-records.pdf#page=24

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 7: Storage models and compression

OLTP/OLAP/HTAP; row/column/PAX; Parquet organisation and metadata; lossless compression trade-offs; RLE, delta, bit packing, dictionary.

- PDF pp. 2–16 / slides 2–17 · workloads and storage: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture07-storage-models-compression.pdf#page=2
- PDF pp. 17–20 / slides 18–21 · PAX/Parquet: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture07-storage-models-compression.pdf#page=17
- PDF pp. 21–28 / slides 22–29 · compression: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture07-storage-models-compression.pdf#page=21

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 8: File organisations and index types

I/O-only file cost model; heap/sorted operations; index entry variants; search keys; tree/hash; clustering, primary/secondary and uniqueness.

- PDF pp. 5–19 / slides 5–21 · cost model: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture08-file-organisations.pdf#page=5
- PDF pp. 20–29 / slides 22–33 · index concepts: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture08-file-organisations.pdf#page=20
- PDF pp. 30–34 / slides 36–49 · clustering: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture08-file-organisations.pdf#page=30

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 9: Tree indexing: ISAM and B+ trees

ISAM and overflow; fanout; B+ tree search and invariants; leaf/inner splits; redistribution/merge; deletion practice; variable-length occupancy and key compression.

- PDF pp. 2–12 / slides 2–12 · ISAM/fanout: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture09-tree-indexing.pdf#page=2
- PDF pp. 13–20 / slides 13–20 · B+ tree search and insertion: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture09-tree-indexing.pdf#page=13
- PDF pp. 21–29 / slides 21–29 · deletion and optimisations: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture09-tree-indexing.pdf#page=21

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 10: Hash-Based Indexing

The full official PDF has been reviewed. Coverage: In-memory hashing and collision resolution; Static chained hashing: search, insertion, deletion, and overflow; Hash functions, skew, and rehashing; Extendible hashing: global/local depth, splitting, doubling, and shrinking. The explanations and worked calculations above are original teaching material rather than reproductions of the slides.

- Official PDF, pages 1–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture10-hash-indexing.pdf#page=1
- PDF pages 2–12: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture10-hash-indexing.pdf#page=2
- PDF pages 13–25: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture10-hash-indexing.pdf#page=13
- PDF pages 26–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture10-hash-indexing.pdf#page=26

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 11: External Sorting & Aggregation

The full official PDF has been reviewed. Coverage: Query execution and operator implementations; Lexicographic sorting, two-way and multiway external merge sort; B+ tree sorting: clustered/unclustered; Sort-based DISTINCT; External hashing, recursive partitioning, and skew; Hash aggregation, running state, and memory bounds. The explanations and worked calculations above are original teaching material rather than reproductions of the slides.

- Official PDF, pages 1–32: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture11-sorting-aggregation_0.pdf#page=1
- PDF pages 2–14: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture11-sorting-aggregation_0.pdf#page=2
- PDF pages 15–20: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture11-sorting-aggregation_0.pdf#page=15
- PDF pages 21–32: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture11-sorting-aggregation_0.pdf#page=21

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 12: Joins

The full official PDF has been reviewed. Coverage: Join semantics and I/O assumptions; Tuple/page/block nested loops; Index nested loops and clustering; Sort-merge, duplicates, and final-pass fusion; In-memory hash join and Grace hash join; Recursive partitioning and algorithm trade-offs. The explanations and worked calculations above are original teaching material rather than reproductions of the slides.

- Official PDF, pages 1–43: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture12-joins.pdf#page=1
- PDF pages 2–15: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture12-joins.pdf#page=2
- PDF pages 16–33: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture12-joins.pdf#page=16
- PDF pages 34–43: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture12-joins.pdf#page=34

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 13: Query Evaluation: Processing Models

The full official PDF has been reviewed. Coverage includes the open/next/close iterator interface and composability; selection, heap-scan, and nested-loop state; blocking sorts and hash builds; pipelining, LIMIT, and iterator overhead; vectorized batch and SIMD processing; and materialization, execution direction, and workload trade-offs. The explanations and calculations are original teaching material rather than reproductions of the slides.

- Official PDF, pages 1–18: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture13-query-evaluation-processing-models.pdf#page=1
- PDF pages 2–9: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture13-query-evaluation-processing-models.pdf#page=2
- PDF pages 10–14: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture13-query-evaluation-processing-models.pdf#page=10
- PDF pages 15–18: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture13-query-evaluation-processing-models.pdf#page=15

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 14: Query Optimisation: Plan Space

The full official PDF has been reviewed. Coverage includes the parser, rewriter, and cost-based optimizer; query blocks and the System R approach; logical equivalences and safe simplifications; join reordering, cross products, and transitive predicates; selection and projection pushdown; and physical implementation choices. The explanations and calculations are original teaching material rather than reproductions of the slides.

- Official PDF, pages 1–7 (2×2; slides 1–28, numbering contains gaps): https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture14-query-optimisation-plan-space-2x2.pdf#page=1
- PDF pages 1–2: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture14-query-optimisation-plan-space-2x2.pdf#page=1
- PDF pages 3–5: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture14-query-optimisation-plan-space-2x2.pdf#page=3
- PDF pages 6–7: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture14-query-optimisation-plan-space-2x2.pdf#page=6

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 15: Query Optimisation: Plan Space Example

The full official PDF has been reviewed. Coverage includes repeated plan refinement; selection pushdown inside and outside nested loops; join orientation; materializing filtered inner input; sort-merge pass accounting; block nested loops and projection width; and clustered outer access with an indexed inner join. The explanations and calculations are original teaching material rather than reproductions of the slides.

- Official PDF, pages 1–43: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture15-query-optimisation-plan-space-example.pdf#page=1
- PDF pages 3–13: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture15-query-optimisation-plan-space-example.pdf#page=3
- PDF pages 14–24: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture15-query-optimisation-plan-space-example.pdf#page=14
- PDF pages 25–38: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture15-query-optimisation-plan-space-example.pdf#page=25
- PDF pages 39–43: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture15-query-optimisation-plan-space-example.pdf#page=39

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 16: Access Methods

The complete official PDF was read. Topics covered: Sequential scan and selectivity; Index eligibility and key ordering; Composite B+ tree prefix/range rule; Index-only, clustered, unclustered scans; Hash composite equality; Multi-index RID intersection/union; PostgreSQL EXPLAIN practical scope. The explanations and calculations above are original teaching material, not reproductions of the slides.

- Official PDF, pages 1–23: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture16-access-methods0.pdf#page=1
- PDF pages 2–7: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture16-access-methods0.pdf#page=2
- PDF pages 8–16: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture16-access-methods0.pdf#page=8
- PDF pages 17–23: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture16-access-methods0.pdf#page=17

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 17: Query Optimisation: Costing

The complete official PDF was read. Topics covered: Operator costs and propagated cardinalities; Catalog statistics and refresh; Uniformity and independence; Equality/range/NOT/AND/OR selectivity; Key–foreign key and general equijoin size; Missing statistics defaults; Equi-width/equi-depth histogram equality/range estimates. The explanations and calculations above are original teaching material, not reproductions of the slides.

- Official PDF, pages 1–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture17-query-optimisation-costing.pdf#page=1
- PDF pages 2–12: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture17-query-optimisation-costing.pdf#page=2
- PDF pages 13–20: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture17-query-optimisation-costing.pdf#page=13
- PDF pages 21–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture17-query-optimisation-costing.pdf#page=21

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 18: Query Optimisation: Searching

The complete official PDF was read. Topics covered: Single-table access enumeration and cost; Join-tree combinatorial growth; Left-deep versus bushy/right-deep; Cross-product pruning; Dynamic programming and optimal substructure; Interesting orders and property-aware retention; Final grouping/sorting cost. The explanations and calculations above are original teaching material, not reproductions of the slides.

- Official PDF, pages 1–24: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture18-query-optimisation-searching.pdf#page=1
- PDF pages 2–7: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture18-query-optimisation-searching.pdf#page=2
- PDF pages 8–19: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture18-query-optimisation-searching.pdf#page=8
- PDF pages 20–24: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture18-query-optimisation-searching.pdf#page=20

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 19: Transactions: correctness under concurrency

Lecture 19 introduces transactions, ACID, execution schedules, conflicts, and two serializability criteria. A dependency graph checks conflict serializability, while logging or shadow paging supports atomicity and durability.

- PDF pages 1–17: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture19-transactions.pdf#page=1
- PDF pages 18–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture19-transactions.pdf#page=18
- PDF pages 27–42: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture19-transactions.pdf#page=27
- PDF page 29 · slide 32 (dirty read); pages 28–30 (anomalies): https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture19-transactions.pdf#page=29
- PDF pages 43–48: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture19-transactions.pdf#page=43

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 20: Locking: from locks to correct schedules

Lecture 20 covers shared and exclusive locks, 2PL, strict 2PL, deadlock detection, and the wait-die and wound-wait prevention rules.

- PDF pages 2–14: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture20-locking.pdf#page=2
- PDF pages 3–17: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture20-locking.pdf#page=3
- PDF pages 18–22: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture20-locking.pdf#page=18
- PDF pages 23–27: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture20-locking.pdf#page=23
- PDF pages 7–28: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture20-locking.pdf#page=7

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 21: Recovery: why the log must come first

Lecture 21 connects buffer policies to recovery, explains WAL, and introduces the three ARIES phases: analysis, redo, and undo.

- PDF pages 2–17: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture21-recovery.pdf#page=2
- PDF pages 18–24: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture21-recovery.pdf#page=18
- PDF pages 18–24: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture21-recovery.pdf#page=18
- PDF pages 25–27: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture21-recovery.pdf#page=25
- PDF pages 3–5: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture21-recovery.pdf#page=3

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 22: Distributed transactions: reaching one decision

Lecture 22 studies partitioned, nonreplicated data, distributed locking, global deadlock, two-phase commit, and the coordination of logging with recovery. Two-phase commit can block progress when the coordinator is unreachable.

- PDF pages 3–20: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture22-distributed-transactions.pdf#page=3
- PDF pages 21–31: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture22-distributed-transactions.pdf#page=21
- PDF pages 32–54: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture22-distributed-transactions.pdf#page=32
- PDF pages 47–57: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture22-distributed-transactions.pdf#page=47
- PDF pages 55–57: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture22-distributed-transactions.pdf#page=55

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 23: Conjunctive Queries: A Query Describes a Pattern

Lecture 23 connects relational algebra and calculus with conjunctive queries. It defines head and body syntax, homomorphisms, and result semantics in terms of matches.

- PDF pages 1–19: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture23-cqs-syntax-and-semantics.pdf#page=1
- PDF pages 20–25: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture23-cqs-syntax-and-semantics.pdf#page=20
- PDF pages 26–31: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture23-cqs-syntax-and-semantics.pdf#page=26
- PDF pages 26–33: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture23-cqs-syntax-and-semantics.pdf#page=26
- PDF pages 19–33: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture23-cqs-syntax-and-semantics.pdf#page=19

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 24: Conjunctive Query Evaluation and Static Analysis

Lecture 24 studies the complexity of conjunctive-query evaluation, canonical databases, satisfiability, containment and equivalence through homomorphisms, and minimization to a core.

- PDF pages 10–18: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture24-cqs-evaluation-and-static-analysis_0.pdf#page=10
- PDF pages 10–18: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture24-cqs-evaluation-and-static-analysis_0.pdf#page=10
- PDF pages 19–29: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture24-cqs-evaluation-and-static-analysis_0.pdf#page=19
- PDF pages 23–31: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture24-cqs-evaluation-and-static-analysis_0.pdf#page=23
- PDF pages 32–37: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture24-cqs-evaluation-and-static-analysis_0.pdf#page=32

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 25: Acyclic Conjunctive Queries: Use the Tree Structure

Lecture 25 introduces conjunctive-query graphs and hypergraphs, useful structural classes, join trees, GYO reduction, and Yannakakis’s algorithm for acyclic queries.

- PDF pages 1–13: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture25-cqs-fast-evaluation.pdf#page=1
- PDF pages 4–13: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture25-cqs-fast-evaluation.pdf#page=4
- PDF pages 14–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture25-cqs-fast-evaluation.pdf#page=14
- PDF pages 27–36: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture25-cqs-fast-evaluation.pdf#page=27
- PDF pages 28–37: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture25-cqs-fast-evaluation.pdf#page=28

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 26: Parallel query processing: bringing data to each operator

Lecture 26 compares resource-sharing architectures, levels of parallelism, partitioning and replication, parallel scans, sorts, and joins, and cost models that account for network traffic and skew.

- PDF pages 1–11: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture26-parallel-query-processing.pdf#page=1
- PDF pages 12–19: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture26-parallel-query-processing.pdf#page=12
- PDF pages 20–26: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture26-parallel-query-processing.pdf#page=20
- PDF pages 27–42: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture26-parallel-query-processing.pdf#page=27
- PDF pages 43–45: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture26-parallel-query-processing.pdf#page=43

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Lecture 27: NoSQL: choosing a model for the system requirements

Lecture 27 covers the motivation for NoSQL, sharding and replication, CAP and BASE, data models, and workload-driven choices. This learning material also explains how to interpret simplified CAP diagrams carefully.

- PDF pages 1–8: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture27-nosql.pdf#page=1
- PDF pages 9–11: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture27-nosql.pdf#page=9
- PDF pages 11–14: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture27-nosql.pdf#page=11
- PDF pages 12–19: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture27-nosql.pdf#page=12
- PDF pages 18–21: https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture27-nosql.pdf#page=18
- Gilbert & Lynch: CAP definitions and theorem, PDF pages 2–4: https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf#page=2

Verified coverage and page mappings are recorded in coverage-manifest.json.

## Original supplemental resources

Resources 28–37 are independent practice for Modules 11–13 of the supplied syllabus. They are not verified official lectures, assigned Canvas readings, rubrics or deadlines. Publication identities and supported claims are recorded in docs/audit/supplemental-evidence.md. No proposed GPU benchmark was run; hardware calculations are feasibility estimates.

### M11 · Session 1: Learned DBMS components: predictions need a systems contract

- Is Your Learned Query Optimizer Behaving As You Expect? A Machine Learning Perspective · Published peer-reviewed research / evaluation: https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf
- Data-Agnostic Cardinality Learning from Imperfect Workloads · Published peer-reviewed research: https://www.vldb.org/pvldb/vol18/p2519-wu.pdf
- Join Size Bounds using Lp-Norms on Degree Sequences · Accepted PODS 2024 paper; linked arXiv is an author manuscript first posted in 2023: https://arxiv.org/abs/2306.14075

### M11 · Session 2: Vector databases: the recall, memory and latency contract

- CAGRA: Highly Parallel Graph Construction and Approximate Nearest Neighbor Search for GPUs · Accepted ICDE 2024 paper; linked author manuscript v2 revised July 2024, first posted August 2023: https://arxiv.org/abs/2308.15136
- RaBitQ: Quantizing High-Dimensional Vectors with a Theoretical Error Bound for Approximate Nearest Neighbor Search · Accepted SIGMOD 2024 paper; linked author manuscript explicitly confirms acceptance: https://arxiv.org/abs/2405.12497
- NVIDIA cuVS: CAGRA guide · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/api-guides/indexing-guide/cagra
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies
- NVIDIA cuVS: Installation · Official software documentation, checked 2026-10-11; version-sensitive: https://docs.nvidia.com/cuvs/installation
- pgvector official repository documentation · Official software documentation, checked 2026-10-11; version-sensitive: https://github.com/pgvector/pgvector

### M11 · Session 3: LLMs for data systems: semantic operators with measurable quality

- Semantic Operators and Their Optimization: Enabling LLM-Based Data Processing with Accuracy Guarantees in LOTUS · Published peer-reviewed research; use published title, not earlier preprint title: https://www.vldb.org/pvldb/vol18/p4171-patel.pdf
- DocETL: Agentic Query Rewriting and Evaluation for Complex Document Processing · Published peer-reviewed research: https://www.vldb.org/pvldb/vol18/p3035-shankar.pdf
- vLLM Optimization and Tuning · Official software documentation, checked 2026-10-11; version-sensitive: https://docs.vllm.ai/en/stable/configuration/optimization/

### M11 · Session 4: Cloud-native and disaggregated DBMSs: locality becomes a protocol

- PolarDB-MP: A Multi-Primary Cloud-Native Database via Disaggregated Shared Memory · Published industrial paper; not a SIGMOD research-track or PODS paper: https://cighao.com/papers/polardb_mp.pdf
- GaussDB: A Cloud-Native Multi-Primary Database with Compute-Memory-Storage Disaggregation · Published industrial/system paper: https://www.vldb.org/pvldb/vol17/p3786-li.pdf
- Architecture decisions in Neon · Official engineering design account; historical architecture example: https://neon.com/blog/architecture-decisions-in-neon

### M12 · Session 1: Project clinic: turn a topic into a falsifiable research question

- Is Your Learned Query Optimizer Behaving As You Expect? A Machine Learning Perspective · Published peer-reviewed research / evaluation: https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies

### M12 · Session 2: Project clinic: trustworthy baselines and measurements

- Is Your Learned Query Optimizer Behaving As You Expect? A Machine Learning Perspective · Published peer-reviewed research / evaluation: https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies

### M12 · Session 3: Project clinic: ablations, counterexamples and negative results

- Is Your Learned Query Optimizer Behaving As You Expect? A Machine Learning Perspective · Published peer-reviewed research / evaluation: https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf
- Data-Agnostic Cardinality Learning from Imperfect Workloads · Published peer-reviewed research: https://www.vldb.org/pvldb/vol18/p2519-wu.pdf
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies

### M12 · Session 4: Project clinic: reproducible artifacts and defensible conclusions

- ACM SIGSIM PADS 2024: Reproducibility and Artifact Evaluation · Official ACM conference guidance; used as a general example, not the course rubric: https://sigsim.acm.org/conf/pads/2024/blog/artifact-evaluation/
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies

### M13 · Session 1: Research symposium: build a conference-style research story

- ACM SIGSIM PADS 2024: Reproducibility and Artifact Evaluation · Official ACM conference guidance; used as a general example, not the course rubric: https://sigsim.acm.org/conf/pads/2024/blog/artifact-evaluation/
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies

### M13 · Session 2: Research symposium: defend, review and close the evidence loop

- ACM SIGSIM PADS 2024: Reproducibility and Artifact Evaluation · Official ACM conference guidance; used as a general example, not the course rubric: https://sigsim.acm.org/conf/pads/2024/blog/artifact-evaluation/
- NVIDIA cuVS: Benchmarking methodologies · Official software documentation, checked 2026-10-11: https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies
- Join Size Bounds using Lp-Norms on Degree Sequences · Accepted PODS 2024 paper; linked arXiv is an author manuscript first posted in 2023: https://arxiv.org/abs/2306.14075

## Engine and supplementary semantics

- sql.js: https://sql.js.org/ and https://github.com/sql-js/sql.js
- SQLite SELECT: https://www.sqlite.org/lang_select.html
- PostgreSQL EXCEPT semantics: https://www.postgresql.org/docs/current/sql-select.html#SQL-EXCEPT

EXCEPT ALL and INTERSECT ALL in the Relational Lab are separate bag-semantics simulations, not SQLite syntax.

## Typography

Noto Serif comes from the official Google Fonts repository: https://github.com/google/fonts/tree/main/ofl/notoserif . Its OFL license is included in vendor/noto-serif-LICENSE.txt. The bundled face retains Latin, Vietnamese, and combining-mark glyphs.
