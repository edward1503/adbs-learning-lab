# Independent candidate cross-review: Lectures 13–27

## Evidence, method and status

I read every rendered section of `candidate/lecture-13.md` through `candidate/lecture-27.md`, in order, before consulting any canonical course source or editor log. The supplied candidate capture was produced by real Chromium at local port 18440 with answers expanded. I used those frozen rendered files and the parent's rubric in `adbs-learning-lab/docs/readability/baseline-parent-review.md`. I did not use editor logs, canonical source, tests, counts or an outline as substitutes for reading. The Markdown `##` traceability wrapper is not treated as a second on-screen heading.

This is an independent editorial/cognitive walkthrough, not a human-participant study. The examples below are new changed-input tasks reasoned through from the supplied teaching. I did not run a live PostgreSQL server or claim the illustrative EXPLAIN fragment was measured. I made no canonical course, Git, test or deployment changes. The parent's report that all 113 local tests pass is preservation evidence only, not evidence for these comprehension scores. The candidate remains undeployed and pending parent acceptance.

Scores are per stated goal: **E** Explain, **T** Trace, **X** Transfer, **B** Bound. Each uses 0 = reasoning missing; 1 = only the exact supplied answer is reproducible; 2 = a nearby changed-input variant can be solved and explained. A 2 is bounded by the task and assumptions documented below, not a claim of mastery of every topic named in a lesson. No aggregate count or percentage is used for acceptance.

**Status:** Final candidate cross-review complete. After the first ordered reading/task attempt, I reread the fully reloaded Chromium captures of L14/L18 and tested their additions with fresh changed data/costs. Their two formerly provisional goal dimensions are now resolved by the evidence below. Acceptance remains the parent's decision; deployment and human-participant testing remain separate.

## Priority diagnostics

- **L16, l16-s4: startable external fixture repaired.** The temporary table, deterministic `generate_series` seed, index, ANALYZE and two exact EXPLAIN statements are supplied. The PostgreSQL prerequisite and SQLite boundary are explicit. The sample is called “not a measurement from this fixture,” and the explanation separates estimated rows, actual rows per loop and local buffer hits from disk reads. My changed seed/predicate task below predicts rows but does not predict a guaranteed scan type or buffer measurement.
- **L18, l18-s3: definitions precede the ledger.** DP passes, the meaning of k, an unordered-versus-ordered example and “interesting order” appear before the four-route ledger. R(a), S(a,b), T(b), subset names, supplied cost units and final-order preservation are explicit. My changed complete-route costs select an expensive intermediate because it avoids later work. The refreshed l18-s2 also supplies a tiny, predicate-preserving Cartesian route and complete costs; the fresh task reverses its winner after changing the extension cost.
- **L19, l19-s3/s4: legend → graph → swaps is now coherent.** R/W, conflicts, edge direction and a two-transaction cycle precede allowed swaps and the three-transaction topological order. C1/C2/A1 are decoded, including the distinction between abort event A1 and data object A. The same reader/writer pair is traced through unsafe commit, safe commit after a dirty read, and delayed read. Fresh diagnostics below distinguish this from both precedence cycles and waits-for cycles.
- **L24, l24-s1/s2/s4: proof bridges repaired.** The text defines the decision problem, polynomial witness verification, NP and NP-completeness; literally instantiates the triangle/Diff construction; proves its two implications and polynomial construction size. The canonical proof stays with Qsmall/Qall through fresh constants, reverse mapping, a real match and composition, followed by the failing reverse canonical database. Fresh tasks below check a different graph, a renamed containment pattern, equal-arity head preservation and a minimization counterexample.

No serious new correctness failure was found in the full first rendered reading/task attempt. Two modest teaching gaps were reported promptly and then checked in the genuinely refreshed captures:

1. **l14-s1, resolved:** the added Customer/Orders schemas, literal correlated EXISTS SQL, block labels and supplied scan/index comparisons support a fresh changed-cost decision. The one-relation/no-join-order boundary and distinction between per-bound-row cost and full-query cost are explicit.
2. **l18-s2, resolved:** the added tiny R/T Cartesian candidate retains both original predicates and supplies complete route costs. A new data fixture gives equal results for both routes; changing the supplied extension cost changes the winner, exposing the policy's limitation without claiming a Cartesian route is always good.

The report's final scores below apply to the inspected rendered additions, not merely to an editor's statement that they were implemented.

## L13 — Query Evaluation: Processing Models

**Resource:** `candidate/lecture-13.md`, l13-s1–s4.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Trace open, next, and close calls in the iterator model | 2 | 2 | 2 | 2 | A |
| Explain the state maintained by a selection, heap scan, and nested-loop join | 2 | 2 | 2 | 2 | A, B |
| Identify blocking operations such as sorting and hash-table construction | 2 | 2 | 2 | 2 | C |
| Explain pipelining, LIMIT, and iterator overhead | 2 | 2 | 2 | 2 | C, D |

**A — Prompt:** Scan holds `[3,8,6]`, Filter keeps x>5, Project returns x+1. Trace open, three root next calls and close; name what state changes.

**Reasoning/answer:** Opening the root opens its children and initializes the scan position. First next: Filter consumes 3, rejects it, consumes 8, returns 8; Project returns 9. The scan now resumes at 6, not 3. Second next returns 7 from 6. Third returns EOF; close releases child resources. Selection keeps the predicate/child, while the scan keeps the next unread location (page/slot in the heap implementation). One parent call can consume two child tuples because filtering skips candidates.

**B — Prompt:** A nested-loop equality join has outer keys `[1,2]` and two distinct inner tuples with key 2. Trace why both matching pairs appear.

**Reasoning/answer:** Keep outer 1 while scanning both inner tuples; neither matches. Restart inner and advance outer to 2. Return the first matching pair while remembering inner position, then the second pair on the next call. Exhaust inner, then outer. Restarting only when the inner finishes prevents either dropping the second match or combining it with the wrong outer tuple.

**C — Prompt:** Place LIMIT 1 above an ordinary ascending sort of `[9,3,8]`. Can input stop after reading 9? What changes if the sort is removed?

**Reasoning/answer:** No: an unread 3 can be smaller, so the unordered input must be inspected before the minimum 3 is known. Sort has a preparatory blocking boundary; hash join similarly must complete its build before probing. With no blocking operator, LIMIT can stop after the first qualifying tuple, then close the tree. Pipelining avoids whole-intermediate materialization but cannot erase a blocking dependency.

**D — Prompt:** Pass 2,051 unchanged tuples through three operators with batch maximum 512. Compare tuple-passing versus batch-passing calls, excluding EOF.

**Reasoning/answer:** Tuple-at-a-time uses 6,153 calls. Batches are 512,512,512,512,3: five per operator, 15 calls. The last three tuples are valid data, not EOF. This reduces call overhead, not necessarily runtime by 410.2×.

**Assumptions/bounds:** Pull iterator model; input order as supplied; equality join; all duplicates preserved; ordinary sort rather than unstated top-k; no cardinality-reducing operator in D; maximum batch size and excluded EOF calls explicit. **Unresolved gap:** no core gap for these variants. A production implementation's actual allocation/call timings are outside these tasks.

## L14 — Query Optimisation: Plan Space

**Resource:** `candidate/lecture-14.md`, l14-s1–s4.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Distinguish the parser, rewriter, and cost-based optimizer | 2 | 2 | 2 | 2 | A |
| Describe query blocks and the System R approach | 2 | 2 | 2 | 2 | B; refreshed rendered follow-up |
| Apply logical equivalences and safe simplifications | 2 | 2 | 2 | 2 | C |
| Change join order while preserving predicates and handling cross products | 2 | 2 | 2 | 2 | D |

**A — Prompt:** Who handles an unknown column, simplifying `amount>10 AND amount>30`, and choosing an eligible index over a heap scan?

**Reasoning/answer:** Parsing/semantic analysis resolves names/types and rejects the unknown column. The rewriter replaces the two deterministic filters by amount>30 while preserving the result. Cost-based optimization uses statistics and estimated access costs to choose a physical candidate. Equivalence must precede price comparison; a cheap invalid rewrite is not an alternative plan.

**B — Refreshed-render follow-up prompt:** Use the new schemas Customer(customer_id), Orders(order_id,customer_id,total) and its EXISTS query for total>100. Customer rows are 1,2,3,4; Orders rows are (10,1,120),(11,1,130),(12,2,90),(13,4,150). Label the blocks and output; then use new supplied inner costs: scan=9, index=6 for every bound outer row. Outer scan costs 2, and assume four literal, independent inner evaluations. Change the index estimate to 11. What changes, and what is outside this cost claim?

**Reasoning/answer:** There are two SELECT blocks, outer Customer and inner Orders. C.customer_id is bound by the outer row and referenced by the inner correlation. Customer 1 has two qualifying orders but EXISTS is true once for its row; Customer 4 has one; 2's 90 fails and 3 has no match. Output is 1,4. Parsing resolves C/O columns; rewriting must preserve that existence condition; the cost-based stage compares eligible inner access paths. Index 6 beats scan 9 for one bound customer; under the explicit four-evaluation/no-sharing model, whole cost is `2+4×6=26`. At index 11, scan 9 wins, giving `2+4×9=38` instead of the index route's 46. Both blocks contain one base relation, so neither has an internal join order to enumerate; a multi-relation block would add join-order candidates, as the link to L18 explains. Useful properties can be retained in the historical System R organization. The per-bound-row comparison alone does not determine the whole query without the supplied outer/repeated-work assumptions, and a valid optimizer transformation could avoid literal repeated execution. The refreshed text supplies that boundary explicitly. The fresh values differ from the page's 12/3/15 example.

**C — Prompt:** R has a non-NULL unique id. Is a same-table id self-join returning only the left row removable? What if the right side is filtered to id>10, or the key has two rows with value 1?

**Reasoning/answer:** The unfiltered primary-key self-join supplies exactly one right match for every left row, so removal preserves existence and multiplicity. Filtering right can remove matches for left ids≤10, so the same replacement is invalid. Two left/right rows with key 1 create four pairs; selecting R alone creates two rows. Outputting only left columns does not remove multiplicity.

**D — Prompt:** With R(a,x), S(a,b), T(b,y), rewrite `(R join S) join T` into `R join (S join T)`. Where do the two predicates go, and what must an early projection of S retain?

**Reasoning/answer:** Apply S.b=T.b in the S/T subtree, then R.a=S.a at the top join; S must retain a and b. R×T is not itself wrong if S and every predicate later restore the original match requirements, but it can create a large intermediate. An S-only predicate may move into S; one using S and T cannot move into R alone. Outer joins need separate reasoning because unmatched rows are preserved.

**Assumptions/bounds:** SQL bags for join removal; explicit existence and uniqueness; deterministic predicates; inner joins; preserve all needed columns and predicates; declared new Customer/Orders fixture; supplied per-bound-row costs and explicit four-evaluation model for B's total. System R is a historical organization, not a universal modern implementation. **Unresolved gap:** none for the nearby block/access-choice variant after the refreshed addition; a complete modern subquery-optimization algorithm is not claimed.

## L15 — Query Optimisation: Plan Space Example

**Resource:** `candidate/lecture-15.md`, l15-s1–s4.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Recalculate the cost after each plan refinement | 2 | 2 | 2 | 2 | A–D |
| Distinguish the effects of selection pushdown on the outer and inner inputs | 2 | 2 | 2 | 2 | A |
| Compare both choices of outer and inner join input | 2 | 2 | 2 | 2 | A, B |
| Include the cost of materializing a filtered inner input | 2 | 2 | 2 | 2 | B, C |

**Prompt:** Orders has 100 heap pages and filtering produces 10 packed pages; Customers has 30 and filtering produces 15. B=5. Exclude CPU/final-output writes. Recalculate page nested loops before/after filters, both materialized-inner orientations, block nested loops and a narrowed-key alternative.

**A — Reasoning/answer:** Unfiltered Customers outer costs `30+30×100=3,030`. Filtering outer still scans 30 base pages, but creates 15 iterations: `30+15×100=1,530`. Filtering Orders inside each repeated scan does not avoid reading its 100 base pages, so this stays 1,530. Orders outer costs `100+10×30=400`.

**B — Reasoning/answer:** Materialize Customers: base reads 130, temporary write 15, repeated reads `10×15=150`, total 295. Materialize Orders with Customers outer: base reads 130, temporary write 10, repeated reads `15×10=150`, total 290. The cheaper filtered outer alone does not settle the materialized comparison.

**C — Reasoning/answer:** Three working frames remain after inner/output buffers. Customers outer with materialized Orders requires five blocks: `130+10+5×10=190`. Reverse needs four blocks: `130+15+4×15=205`. If projecting Orders' 40-byte tuples to 8-byte keys reduces 10 pages to 2, those keys fit in three frames; retain them and scan Customers once for `100+30=130`, with no temporary write.

**D — Prompt/answer:** If the same qualifying Orders are obtained by clustered access for 10 reads, with 100 tuples and one data read per cached-index probe, index nested loops costs 110. Retaining the same two-page key set and scanning Customers costs 40. Compare those matched assumptions rather than retaining the old 100-page heap-read charge on one competitor. A fully materialized sort-merge alternative for the unprojected filtered 10/15 pages at B=5 has initial run counts 2/3 and one four-way merge each; after 130 base reads add 30+45 sort I/Os and 25 join reads, total 230.

**Assumptions/bounds:** Heap scans must read all base pages; packed output; pipelining unless materialization named; B−2 working frames; duplicate keys preserved; ignored packing overhead; sort final pass not fused; index/data cache assumptions supplied separately. **Unresolved gap:** no core gap; the narrowed key calculation is approximate and is correctly qualified in the text.

## L16 — Access Methods

**Resource:** `candidate/lecture-16.md`, l16-s1–s4.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Distinguish sequential-scan cost from output selectivity | 2 | 2 | 2 | 2 | A, D |
| Check whether an index can support a predicate in key order | 2 | 2 | 2 | 2 | B |
| Apply the equality-prefix/range rule to a composite B+ tree | 2 | 2 | 2 | 2 | B |
| Compare index-only, clustered, and unclustered scans | 2 | 2 | 2 | 2 | C |

**A — Prompt/answer:** A 200-page heap has 10,000 rows; s=.02 retains 200 rows. A heap scan still reads 200 pages. With unchanged width/packing, output occupies about four pages. The four output pages cannot replace the cost of examining every heap page.

**B — Prompt:** Index `(department,age,salary)`. Test department='Math', age>40, salary=900; then department='Math', age=40, salary>900; then age=40 alone. Test a hash index on `(department,age)` too.

**Reasoning/answer:** The first B+ range fixes department then ranges over age, with salary checked as a residual. The second fixes two prefix columns and ranges on salary, forming one contiguous range. Age alone lacks the leftmost equality prefix in this model. The hash pair needs equality on both fields; a missing department or an age range cannot choose its bucket. Nonunique equality must scan overflow for all matches, rather than stopping at the first.

**C — Prompt/answer:** h=2 internal reads, L=80 leaves, N=400 data pages and s=.1 candidate range, 400 matching tuples. Uniform clustered placement costs `2+8+40=50`; index-only costs 10 if every requested attribute is in the index and the teaching visibility model permits avoiding tuple fetches. With one uncached data fetch per tuple, unclustered costs 410. A 400-page heap scan can beat that unclustered model. A residual producing less output does not automatically shrink the candidate leaf range or data fetches.

**D — Exact external fixture task:** Keep the l16-s4 temporary-table schema/index/ANALYZE commands, change `generate_series(1,10000)` to `(1,12000)`, and use `WHERE age IN (7,8)` versus `WHERE age>=0`. Predict rows and explain what actual EXPLAIN evidence could establish.

**Reasoning/answer:** Twelve thousand consecutive g values create 120 occurrences of each residue 0–99. The predicates return 240 and 12,000 rows. In a sequential scan, the first removes 11,760. The supplied SQL uses existing id/age/padding columns, a valid PostgreSQL set-returning-function alias and integer modulo, then gathers statistics. Actual EXPLAIN ANALYZE would execute the read-only SELECT and permit comparing scan type, estimates, actual rows, filtered rows and hits/reads. The displayed sample does not measure this variant; `local hit=200` would mean cached temp-buffer accesses, not 200 disk reads. Neither row calculation forces an index/bitmap choice. The SQLite runner cannot execute this PostgreSQL fixture.

**Assumptions/bounds:** Teaching left-prefix model; complete-key hash equality; h excludes first leaf; uniform density and clustered placement; index-only attributes/visibility; explicit per-tuple unclustered fetch model. D requires an already connected PostgreSQL session and is optional. **Unresolved gap:** no startability/schema gap found; no live PostgreSQL performance measurement is claimed.

## L17 — Query Optimisation: Costing

**Resource:** `candidate/lecture-17.md`, l17-s1–s4.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Estimate operator costs and the cardinalities passed between steps | 2 | 2 | 2 | 2 | A, C |
| Read catalog statistics and explain when they need updating | 2 | 2 | 2 | 2 | A, D |
| Identify uniformity and independence assumptions | 2 | 2 | 2 | 2 | A–D |
| Calculate selectivity for equality, range, NOT, AND, and OR conditions | 2 | 2 | 2 | 2 | B |

**A — Prompt:** Catalog gives 20,000 rows, 400 pages, 50 departments, uniform frequencies and an independent second filter s=.2. Price page reads at 1 and listed CPU steps at .001. Propagate scan/filter/filter/projection rows and cost.

**Reasoning/answer:** Rows go 20,000→400→80→80. Read heap once, 400 pages; charge 20,000 first checks, 400 second checks, 80 projections. Cost is `400+.001×20,480=420.48`, excluding output writes. Stale counts or changing frequencies alter downstream inputs; refreshing a page count alone does not repair column correlation.

**B — Prompt/answer:** Equality on one of 50 equally frequent existing departments has s=.02. Uniform integers 10–29 with A>25 retain 26–29, s=.2. NOT department predicate is .98 with no NULL. Independent AND is .004 and OR is `.02+.2−.004=.216`. For a continuous uniform [10,30], A>25 instead has s=.25; count discrete values rather than substituting interval lengths. If two s=.02 predicates select the very same group, AND is .02, not .0004.

**C — Prompt/answer:** R has 120 rows/6 keys and S 180/9 keys, with the six-key set contained in the nine and both uniform. Each shared key contributes 20×20=400 pairs; six keys yield 2,400. If S instead has a valid non-NULL foreign key to a unique R key, every S row matches once, giving 180. Those are different assumptions, not interchangeable formulas.

**D — Prompt/answer:** Equi-depth buckets [1,2] and [3,6] each hold 20 rows. Under within-bucket uniformity, A≥5 gives two of four values from the second bucket, 10 rows. A=2 gives 10 from the first. Equal bucket depths do not imply equal per-value frequencies; these estimates do not certify actual counts. Changing data calls for updated statistics, and defaults are system/version assumptions rather than observations.

**Assumptions/bounds:** Uniformity, value membership, independence, absent NULL, explicit endpoint/domain model, contained key sets or declared valid FK, within-bucket uniformity, explicit CPU weight. **Unresolved gap:** no core gap for changed arithmetic; no claim that single-column histograms repair cross-column correlation.

## L18 — Query Optimisation: Searching

**Resource:** `candidate/lecture-18.md`, l18-s1–s4.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Enumerate and cost access paths for a single table | 2 | 2 | 2 | 2 | A |
| Explain why the number of join trees grows rapidly | 2 | 2 | 2 | 2 | B |
| Distinguish left-deep, bushy, and right-deep join trees | 2 | 2 | 2 | 2 | C |
| Understand the benefits and limits of cross-product pruning | 2 | 2 | 2 | 2 | D; refreshed rendered follow-up |

**A — Prompt/answer:** 20,000 tuples, 400 pages, 40 leaves, s=.025, ignoring descent. Clustered reads one leaf plus ten data pages, 11. Unclustered under per-tuple repeated-fetch model reads one leaf plus 500 fetches, 501; heap reads 400. Some pages can repeat among those fetches. Enumerating an eligible index does not make it better than a heap scan.

**B — Prompt/answer:** If each join independently has two eligible algorithms, extend the page's syntactic-tree counts: three relations have 12 trees and two joins, giving `12×2²=48`; four have 120 trees and three joins, giving `120×2³=960`. Restricting four to the one left-deep shape gives `24×8=192`. This counts shape/order/algorithm combinations under a declared convention, not equivalence classes or physically valid property alternatives. Permutations, shapes and algorithms compound growth; the text does not claim a universal plan count.

**C — Prompt/answer:** `(((A join B) join C) join D)` is left-deep, with each right child a base table. `A join (B join (C join D))` is right-deep. `(A join B) join (C join D)` is bushy because both top children are intermediates. Pipelining still depends on blocking operators, not shape alone.

**D — Refreshed-render follow-up prompt:** First, in star graph A—B, A—C, A—D, identify the excluded {B,C} subset and permitted {A,B}+C extension. Then use R(a)={1}, T(b)={7,9,11}, S(a,b)={(1,7),(1,9),(2,11)} with both R.a=S.a and S.b=T.b. Compare `(R join S) join T` with `(R×T) join S`, supplied complete-route components connected 8+4 versus product 3+5. Now increase only the product's S extension to 12. No final order is required.

**Reasoning/answer:** R×T has three pairs: (1,7),(1,9),(1,11). Checking both predicates against S keeps (1,7),(1,9); (1,11) fails because S's b=11 row has a=2. Connected R/S first keeps those same two S rows and T keeps both. Thus the Cartesian candidate is equivalent; no condition was removed. In the first supplied model, connected total is 12 and Cartesian total 8, so a no-Cartesian policy discards the cheaper route before costing. With extension 12, Cartesian total becomes 15 and connected 12 wins. The tiny combined (a,b) pairs can use the suitable composite S access path, explaining why forming them first can be useful. A larger product can generate much more work. The costs include remaining accesses and are supplied inputs rather than derived solely from row counts. This changed input/cost task goes beyond copying the page's four-pair/35-versus-10 example and establishes both benefit and limit without making a universal optimizer claim.

**Additional DP priority task — Prompt:** For chain R(a),S(a,b),T(b), change the four entries/extensions to unordered RS 30+50, b-ordered RS 45+15, unordered ST 25+60 and a-ordered ST 50+12. Only the last preserves final a order; other routes need a 25-unit sort. Which complete route wins?

**Reasoning/answer:** Pre-order totals are 80,60,85,62. Complete totals are 105,85,110,62. Keep the a-ordered ST entry despite its 50-unit intermediate costing more than the 25-unit unordered ST; its cheaper extension and saved sort make 62 best. The example's cost units, order-preservation and algorithm costs are supplied, not inferred from undisclosed statistics. DP k counts joined tables; it is not an external-sort I/O pass. This task establishes the requested complete-plan/cheapest-subplan diagnostic separately from the four stated goals.

**Assumptions/bounds:** Same-result subplans; supplied complete cost units; declared property retention; eligible algorithms and counting convention; both predicates retained; suitable (a,b) access; no final-order charge in D; pruning policy; estimates/search space limit optimality. **Unresolved gap:** none for these nearby variants after the refreshed counterexample; neither a guaranteed runtime nor universal optimizer theorem follows.

## L19 — Transactions

**Resource:** `candidate/lecture-19.md`, l19-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Distinguish the four ACID properties | 2 | 2 | 2 | 2 | A |
| Construct a precedence graph from a read/write schedule | 2 | 2 | 2 | 2 | B, D |
| Distinguish conflict serializability from view serializability | 2 | 2 | 2 | 2 | B, C |

**A — Prompt/answer:** Move 2 units between balances initially 8/12 while another transaction totals them. Atomicity prevents retaining only the subtraction; consistency requires implementing total=20; serializable isolation makes the observer equivalent to before/after the complete move rather than 6+12=18; durability preserves acknowledged committed database updates within the promised failure model. An external shipment is not reversed by database rollback.

**B — Prompt:** Graph `R1(X), R2(Y), W1(Y), W2(X)` and assess permitted swaps.

**Reasoning/answer:** X's R1 before W2 gives T1→T2; Y's R2 before W1 gives T2→T1. There is a precedence cycle, hence no conflict-equivalent serial order. The first two reads on different objects may swap, but that does not reverse either conflicting pair and cannot remove the cycle. T1's own read/write order must stay fixed. A graph edge reflects an executed conflicting pair, not a blocked lock request.

**C — Prompt/answer:** `W2(X), W3(X), W2(X)` has T2→T3 and T3→T2, but no reads and final writer T2; serial T3,T2 preserves the view. Conversely, `R1(X), W2(X), R1(X)` reads initial X then T2's X; placing T1 wholly before T2 loses the second source, and placing it after loses the initial source. No serial order preserves that view. A precedence cycle rejects conflict serializability only, not every equivalence criterion.

**D — Priority recoverability task:** Compare `W1(X),R2(X),C2,C1`; `W1(X),R2(X),C1,C2`; and `W1(X),C1,R2(X),C2`.

**Reasoning/answer:** All have read/write precedence T1→T2 and no precedence cycle. First: T2 commits before the writer it read from, violating recoverability even though T1 eventually commits. Second: read is dirty but commit order is recoverable; T1 aborting before its commit could require T2's cascade. Third: reader uses committed data and is cascadeless; with no other accesses it is also strict. C is commit, and an Abort1/A1 event would abort a transaction, not access X/A. Unsafe reader commit order is a dependency-outcome issue, not a graph-cycle test. `W1(X),W2(X),C2,C1` has no reads, hence is vacuously cascadeless, yet contains a dirty write and is not strict.

**Assumptions/bounds:** Preserve transaction-internal order; conflicts require different transactions, same object and at least one write; read sources/final writers for view; explicit read-from dependency and commit order for recoverability; no claim of durability from a graph proof. **Unresolved gap:** no core gap in the legend, swaps, graph or dependency timeline variants.

## L20 — Locking

**Resource:** `candidate/lecture-20.md`, l20-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Simulate shared/exclusive locks and the two locking phases | 2 | 2 | 2 | 2 | A |
| Explain why cascading aborts occur | 2 | 2 | 2 | 2 | B |
| Handle deadlocks through detection or timestamp-based prevention | 2 | 2 | 2 | 2 | C, D |

**A — Prompt/answer:** Under basic 2PL, T1/T2 both hold S(A); T1 requests upgrade to X(A). It waits for T2's incompatible S. If T2 releases S(A), that begins T2's shrinking phase, so it cannot next acquire S(B). T1's upgrade is permitted while still growing once the other holder releases. Under this lesson's strict convention, both instead keep S/X locks until completion.

**B — Prompt/answer:** Basic 2PL writer releases X(A) after finishing acquisition but before commit. T2 reads A and writes B; T3 reads B. T1 aborts. T2 used work removed by T1's abort and may need rollback, followed by T3. Strict lock retention prevents the first dirty read by making T2 wait. Basic 2PL's conflict-serializable discipline alone does not resolve abort dependencies.

**C — Prompt/answer:** T1 writes A while holding X(A), T2 writes B while holding X(B); each requests the other's lock. Waits-for edges are T1→T2 and T2→T1, so neither can progress. Before the blocked operations execute there is no same-object cross-transaction pair among the two writes, so this is not an already-executed precedence cycle. Abort/undo one victim and release its lock. Granting a known entire lock set atomically would avoid hold-and-wait; sequential early requests do not.

**D — Prompt/answer:** Timestamp 5 requests a lock held by 20; timestamp 30 requests one held by 5. Wait-die allows 5 to wait for 20 but aborts 30. Wound-wait aborts holder 20 for requester 5 and allows 30 to wait for 5. Waiting timestamps increase along wait-die edges and decrease along wound-wait edges, so no strict monotone chain can circle back. Restart retains the timestamp to avoid repeatedly becoming youngest.

**Assumptions/bounds:** All accesses appropriately locked; phase begins at first release; upgrade is acquisition; strict convention retains S and X; victim rollback/release; preserved timestamps. **Unresolved gap:** none for the task. The wait graph, precedence graph and L19 unsafe commit timeline are three distinct diagnostics, not interchangeable uses of a cycle.

## L21 — Recovery

**Resource:** `candidate/lecture-21.md`, l21-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Derive UNDO and REDO requirements from the buffer policy | 2 | 2 | 2 | 2 | A |
| Apply the two mandatory WAL ordering rules | 2 | 2 | 2 | 2 | B |
| Follow the analysis, redo, and undo phases | 2 | 2 | 2 | 2 | C |

**A — Prompt/answer:** STEAL+FORCE can persist uncommitted values, so needs UNDO; force of all committed data removes this model's missing-committed-page REDO need. NO-STEAL+NO-FORCE disallows that uncommitted-page persistence but may lose committed RAM-only changes, so needs REDO. STEAL+NO-FORCE needs both. The policy names alone do not make a partial multi-page commit flush atomic.

**B — Prompt/answer:** An update log record exists only in RAM. May its updated page be flushed? No: make the recovery log durable first. COMMIT is then only in RAM; may success be acknowledged? No: flush through COMMIT first. After that, NO-FORCE can leave data pages unflushed because the durable log permits redo. Page-before-log risks losing undo evidence; acknowledgement-before-durable-commit risks losing a reported success.

**C — Prompt:** Disk P=20,Q=9; durable log has T1 P20→15 and COMMIT, T2 Q9→4 without commit; neither page flushed. Trace introductory ARIES phases. Then consider rollback of T2 with a durable CLR whose page change is lost.

**Reasoning/answer:** Analysis identifies T1 winner/T2 loser and the updates needing recovery. Redo repeats required history, P=15,Q=4, including T2. Undo restores Q=9, leaving P=15. If a CLR records Q restored to 9 and `undoNextLSN` points to an earlier uncompensated update, redo that CLR after another crash and continue undo at that earlier record. Do not undo the CLR or compensate Q's update twice. A prepared distributed transaction must first resolve its global decision, rather than being treated as this ordinary single-node loser.

**Assumptions/bounds:** Durable log survives; supplied no-flush case; introductory state trace rather than full pageLSN/checkpoint tests; FORCE/STEAL conventions; CLR continuation rule. A backup/replica in another failure domain is required if data and log are both destroyed. **Unresolved gap:** no core transfer gap; full ARIES implementation is explicitly outside the introductory promise.

## L22 — Distributed Transactions

**Resource:** `candidate/lecture-22.md`, l22-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Detect global deadlock by combining local graphs | 2 | 2 | 2 | 2 | A |
| Simulate prepare, vote, decision, and acknowledgement | 2 | 2 | 2 | 2 | B |
| Explain why a prepared participant can become blocked | 2 | 2 | 2 | 2 | B, C |

**A — Prompt/answer:** At a common current state, N1 reports T1→T2, N2 T2→T4, N3 T4→T1. Each local one-edge graph is acyclic; the union has a global waits-for cycle. This is waiting, not the precedence graph of already executed conflicts. A live distributed detection implementation must establish relevant current dependencies; the task is the frozen graph union, not a claim to implement that protocol.

**B — Prompt:** Three participants P/Q/R send YES; C logs COMMIT and crashes before Q receives it. P commits but its ACK is lost. Trace required durable boundaries and recovery decisions. Then change R's vote to NO.

**Reasoning/answer:** Each YES follows durable PREPARE/recovery evidence. C may commit only after all YES and must make its decision durable before announcing. P durably records/implements COMMIT before its ACK in the stated protocol. C recovers and resends COMMIT; lost P ACK does not reopen voting or authorize ABORT, and P handles retransmission without applying its update twice. If R votes NO before a decision, C must decide ABORT; other prepared participants resolve that decision and clean up locally.

**C — Prompt/answer:** Q has only PREPARE and times out. It cannot distinguish undecided C from a C that committed and notified P. Local abort in the latter case breaks atomicity; Q obtains a valid outcome or waits, retaining strict locks. A participant's PREPARE-only state is not the presumed-abort coordinator's missing-entry case. END is completion bookkeeping, not a new decision. A decision-replica majority cannot erase a transaction participant's NO.

**Assumptions/bounds:** Partitioned, nonreplicated core model; one global transaction identity; protocol's stated durable boundaries and presumed-abort convention; current waits edges; strict S/X retention; knowledge/authority required for a final decision. **Unresolved gap:** none for the nearby cases. Quorum/consensus implementation and asynchronous global-detection mechanics remain explicitly separate extensions.

## L23 — Conjunctive Queries

**Resource:** `candidate/lecture-23.md`, l23-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Translate SQL or relational algebra into a conjunctive query | 2 | 2 | 2 | 2 | A |
| Distinguish output variables from existentially quantified variables | 2 | 2 | 2 | 2 | A, B |
| Find homomorphisms and determine the result set | 2 | 2 | 2 | 2 | B, C |

**A — Prompt:** Buy(customer,product), Category(product,label). Translate `SELECT DISTINCT B.customer FROM Buy B JOIN Category C ON B.product=C.product WHERE C.label='Tea'`.

**Reasoning/answer:** `Q(x) :- Buy(x,p), Category(p,'Tea')`. Shared p enforces the equijoin; Tea is fixed, not a variable; projection places only x in the head. p is an existential witness. The equivalent RA filters Category then joins on product and projects customer under set semantics. The full SQL uses only the task's declared columns.

**B — Prompt/answer:** Facts Buy(An,a), Buy(An,b), Buy(Bao,b), Category(a,Tea), Category(b,Tea) give assignments (An,a),(An,b),(Bao,b); each satisfies both atoms, so Q(x) returns {An,Bao}. Q(x,p) returns all three distinct pairs. An's two witnesses do not create a duplicate head tuple in Q(x). Adding Category(b,Coffee) cannot replace Tea in the same query.

**C — Prompt/answer:** Pair={(b,a),(b,b),(c,c)}. `Q(x) :- Pair(x,x)` returns {b,c}; the same x must satisfy both positions. `Q(x) :- Pair(x,y)` additionally accepts the b,a witness, yet still returns b once. Different variables may map to the same value. Its Boolean form returns {()} when a match exists and the empty set when none exists, not a witness count.

**Assumptions/bounds:** Pure positive CQ, constants fixed, one consistent value per variable, safe head, no NULL, set semantics/SQL DISTINCT. **Unresolved gap:** none for translation, head/witness separation or matching variants; arbitrary negation/disjunction is not inferred from this language.

## L24 — CQ Evaluation and Static Analysis

**Resource:** `candidate/lecture-24.md`, l24-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Distinguish data complexity from combined complexity | 2 | 2 | 2 | 2 | A, B |
| Use the correct homomorphism direction when checking containment | 2 | 2 | 2 | 2 | C, D |
| Remove redundant atoms while preserving the output variables | 2 | 2 | 2 | 2 | E |

**A — Prompt/answer:** Fixed two-variable query: 10 candidate values give at most 100 assignments; 20 give 400. This is data growth with a fixed exponent. If the query changes to three variables at n=20, there are 8,000, a combined-input change. Checking one supplied assignment substitutes variables, fixes constants, checks every atom and candidate head; it does not enumerate 8,000. Brute-force growth alone does not establish NP-hardness.

**B — Literal reduction task:** Translate the four-cycle 1–2–3–4–1 into the supplied three-color Diff database, check a coloring, then add edge 1–3.

**Reasoning/answer:** `Q() :- Diff(v1,v2), Diff(v2,v3), Diff(v3,v4), Diff(v4,v1)`. Assignment red,blue,red,blue maps all four atoms to allowed ordered unequal-color pairs, so the Boolean answer is YES. Add Diff(v1,v3): the old witness fails on red/red. Change to red,blue,green,blue; all five atoms now satisfy unequal-color facts. A general graph produces one variable per vertex and one atom per edge; satisfying assignments and valid colorings correspond in both directions. Diff has six ordered unequal pairs. Construction size is polynomial. NP membership is witness verification; NP-hardness uses the known 3-coloring problem, not the existence of a large brute-force search. This task does not claim to prove 3-coloring's known NP-completeness from scratch.

**C — Continuous canonical-proof task:** `Qactive(x) :- Follow(x,y), Active(y)`; `Qany(x) :- Follow(x,z)`. Prove containment, map the canonical database, compose with a real match, and disprove reverse containment.

**Reasoning/answer:** Qactive⊆Qany. Map from Qany into Qactive: x→x,z→y. Canonical Dactive={Follow(cx,cy),Active(cy)} makes Qactive return cx, and Qany returns it with z=cy. Replacing fresh constants by origin variables gives that reverse map. In any real Qactive match, e.g. Follow(Mai,DB),Active(DB), reuse x=Mai,z=DB in Qany, so Mai is returned. This is the map followed by the real values, preserving the head. Dany={Follow(cx,cz)} has no Active facts; Qany returns cx and Qactive does not. That one canonical database disproves Qany⊆Qactive.

**D — Head-position diagnostic:** `P(x,y) :- Link(x,y)` versus `V(x,y) :- Link(y,x)`. Can a body map that swaps x/y prove equivalence?

**Reasoning/answer:** No: it swaps output positions instead of preserving them. On D={Link(a,b)}, P returns (a,b), V returns (b,a). Same head arity alone is insufficient. This is a nearby new counterexample derived from the explicit position-by-position head rule.

**E — Minimization task:** `Q(x) :- R(x,y),R(x,'b'),Tag(x),Tag(x)`. Minimize, then change the head to Q(x,y) and assess deletion of R(x,y).

**Reasoning/answer:** Remove duplicate Tag, then R(x,y) by y→fixed 'b'. Core is `R(x,'b'),Tag(x)`. Removing either remaining atom changes results: D with only R(a,'b') or only Tag(a) supplies the respective counterexample. With head Q(x,y), deleting R(x,y) loses y's binding/output values and is invalid. On D={R(a,'b'),R(a,'c'),Tag(a)}, the original head returns (a,'b') and (a,'c'); collapsing y to 'b' loses the latter. Inclusion supplies one containment; the reverse map preserving constants and head positions supplies the other. Recheck after each deletion.

**Assumptions/bounds:** Decision/membership, not full result printing; fixed-query versus input-query distinction; known 3-coloring NP-hardness; positive CQ sets, no NULL/bags or additional constraints; constants fixed; homomorphism direction opposite containment; all head positions bound/preserved. **Unresolved gap:** no priority proof-continuity gap found for these changed tasks. General SAT/complexity theory and arbitrary constrained/bag minimization are not claimed.

## L25 — Acyclic Conjunctive Queries

**Resource:** `candidate/lecture-25.md`, l25-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Build a hypergraph from the query atoms | 2 | 2 | 2 | 2 | A |
| Check the running-intersection property and apply GYO reduction | 2 | 2 | 2 | 2 | A |
| Use bottom-up semijoins to answer a Boolean conjunctive query | 2 | 2 | 2 | 2 | B |

**A — Prompt:** Query atoms R(a,b,c), S(c,d), T(b,e). Build its hypergraph and join tree; reduce it by GYO.

**Reasoning/answer:** Vertices are a,b,c,d,e, edges {a,b,c},{c,d},{b,e}. R root with S/T children has c along R/S and b along R/T; all other variables occur once. This differs from turning {a,b,c} into a triangle of separate atoms. Remove unique a,d,e, leaving {b,c},{c},{b}; remove contained singleton edges, then unique b/c and empty edge. The hypergraph disappears, so it is acyclic. Every variable's occurrences must form a connected subtree, not merely every atom be connected.

**B — Prompt:** R(A,B,C)={(x,1,k),(y,2,m)}, S(C,D)={(m,e)}, T(B,E)={(1,t)}. With the A tree rooted at R, decide the Boolean query; then change T to {(2,t)}.

**Reasoning/answer:** Bottom-up children S/T are already reduced leaves. R⋉S keeps only (y,2,m). R⋉T removes that tuple because T supports B=1, leaving the root empty: NO. With T's key changed to 2, (y,2,m) survives both children, giving witness A=y,B=2,C=m,D=e,E=t: YES. Independent successful branch matches are not sufficient unless the same root tuple survives every child. Running intersection lets those branch assignments combine consistently.

**Assumptions/bounds:** Valid join tree, variable sets versus atom-node meanings, consistent constants/repeated variables, semijoin preserves only parent columns, Boolean existence; output-tuple membership first binds the head. A top-down pass/full enumeration is a separate task, and printing outputs cannot evade output-size cost. **Unresolved gap:** none for this branched transfer; no inference that arbitrary cyclic queries are tractable.

## L26 — Parallel Query Processing

**Resource:** `candidate/lecture-26.md`, l26-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Compare shared-memory, shared-disk, and shared-nothing architectures. | 2 | 2 | 2 | 2 | A |
| Choose a partitioning strategy that fits the workload. | 2 | 2 | 2 | 2 | B, D |
| Estimate broadcast and shuffle costs, and identify bottlenecks. | 2 | 2 | 2 | 2 | C, D |

**A — Prompt/answer:** Private RAM with common disks is shared-disk, requiring storage/cache coordination. Common RAM address space is shared-memory, with bandwidth/synchronization contention. Private CPU/RAM/storage communicating by network is shared-nothing, paying network/cross-partition correctness costs. A faster single-query latency and higher queries/second throughput are separate measurements. Replicas are copies, not additional logical rows.

**B — Prompt/answer:** Customer-key retrieval favors hash(customer_id); month intervals favor range(date); distributing twelve equal rows over four round-robin workers balances counts at three each but sends key lookups to several workers. If one customer's rows form 40% of work, a key hash cannot spread that one key merely by distributing distinct keys well. Balanced row counts also fail to balance bytes or CPU for an expensive row.

**C — Prompt:** R=18 GB, S=2 GB, four workers. S starts on one worker; compare broadcast versus separate uniformly random-placement shuffle scenario. Workers finish in 4,5,5,9 seconds.

**Reasoning/answer:** Broadcast sends S to the other three: 6 GB. Shuffle both moves expected fraction 3/4 of 20 GB: 15 GB. These exclude output/overhead and require each worker to hold/process S for broadcast. Phase duration is at least 9 seconds, not average 5.75; total network bytes are not a runtime guarantee.

**D — Prompt/answer:** R and S both have join keys 20/70; R ranges split at 50, S at 100. Key 20 meets on worker 1, but 70 reaches R worker 2/S worker 1, so local-only joining loses its pair. Align both ranges or exchange data. Local sorts plus ordered nonoverlapping ranges can concatenate into global order; sorted hash buckets cannot. Co-partitioning needs the same function, mapping and placement, not the same attribute name alone. Worker, external-partition and in-memory-bucket hash levels have separate purposes.

**Assumptions/bounds:** Explicit architecture/resources; key workload; equal-row model only where stated; broadcast starting placement; uniform shuffle destination/current placement; capacity and skew; compatible partition functions/ranges; excluded startup/output; latency versus work. **Unresolved gap:** none for these changed costs/placement cases; linear scaling is not assumed.

## L27 — NoSQL

**Resource:** `candidate/lecture-27.md`, l27-s1–s5.

| Stated goal | E | T | X | B | Task coverage |
|---|---:|---:|---:|---:|---|
| Distinguish sharding from replication. | 2 | 2 | 2 | 2 | A |
| Explain the trade-off during a network partition. | 2 | 2 | 2 | 2 | B |
| Compare key-value, document, column-family, and graph data models. | 2 | 2 | 2 | 2 | C, D |

**A — Prompt/answer:** Split 240 GB logical data into four equal shards, three total copies each. Each shard is 60 GB; raw copies occupy 720 GB before overhead. A routable key touches its shard/suitable replica; an all-shard query can fan out. Replication changes physical copies/coordination, not logical row count, and does not turn every shard into a local copy of the whole database.

**B — Prompt:** E/W both hold 100. They are partitioned; E completes an acknowledged write to 120. A W read begins afterward, with no later writes. Compare returning 100, waiting indefinitely, and returning an error. What if read/write overlap?

**Reasoning/answer:** Returning 100 violates linearizability because a completed write must precede the later-starting read. Waiting/rejecting fails CAP availability, which requires a valid completed operation at a non-failing node, not merely an error response. Overlapping operations lack that real-time completed-before-start ordering, so the stated stale-read argument alone cannot reject a read linearized before the write. CAP's guarantee ranges over permitted partitioned executions, not a claim every request fails; outside partitions it does not forbid C/A together. Eventual convergence additionally needs stopped updates and successful propagation; it supplies no deadline or concurrent-cart conflict rule. Stale visibility and loss of acknowledged durable data are different failures.

**C — Prompt/answer:** Exact session-ID blob retrieval fits the basic key-value get/put contract; searching all user ages needs a wider scan/index/query API. Varying nested product specs with field filtering fit a document model, but types/units and atomic multi-document updates still need rules. Sparse per-device time-named cells fit column-family access by row key; absent battery/temperature cells need not be SQL NULL placeholders. This differs from a columnar OLAP layout. Relationship patterns fit a graph model with direction, labels and path length.

**D — Prompt/answer:** Mai—FRIEND→An—FRIEND→Bao plus Mai—DRIVES→Car7 gives Bao for exact two-hop outgoing FRIEND; the DRIVES edge does not satisfy either FRIEND step. A property-graph language and SPARQL/RDF are different model/syntax families. A stale recommendation may display one remaining unit to two buyers, but checkout needs an authoritative atomic conditional reservation/transaction to prevent both consuming it; a model label or replication count does not enforce the invariant.

**Assumptions/bounds:** Copy count is total copies; routable shard key; CAP linearizability/operation-result availability, real-time ordering, non-failing nodes and communication partition; eventual propagation/stopped updates; basic model versus extra product APIs; validation/authoritative inventory protocol; no current popularity recommendation from a historical chart. **Unresolved gap:** none for these nearby variants. Exact vendor APIs, performance and current rankings are not established by this lesson or this review.

## SQL, notation and cross-lesson boundary check

- The full SQL in l16-s4 uses the declared temporary-table columns and PostgreSQL-specific `generate_series`, modulo, `repeat`, ANALYZE and EXPLAIN options. It is explicitly external to SQLite; the sample plan is unmeasured. Schema and deterministic row reasoning were checked, without claiming a live PostgreSQL execution.
- l14-s1's self-join expression uses R.id declared as a non-NULL primary key. The alternate nonunique-key fixture is separate. Join removal explicitly requires existence and uniqueness under bags.
- The refreshed l14-s1 EXISTS SQL uses exactly the declared Customer(customer_id) and Orders(order_id,customer_id,total) attributes, including the correlated C.customer_id and residual O.total. This independent fixture is explicitly declared separately from the later l14-s2 Customers/Orders/Products example.
- l23-s2's full SQL uses the declared Enrol/Teach columns and a quoted Linh constant; its CQ/RA correspondence preserves head/course roles and set semantics through DISTINCT.
- Composite-index conditions, cost formulas, iterator calls, R/W/C/A schedules, CQ atoms and homomorphism arrows are explanatory notation. They are not all executable SQLite SQL. The NoSQL models are contracts/examples, not unlabelled vendor-specific commands.
- **Precedence cycle:** contradictory required order among already executed conflicting accesses; rejects conflict serializability. **Waits-for cycle:** transactions currently blocked on each other's held locks; detects deadlock. **Unsafe commit order:** a reader commits before its read-from writer; can be unrecoverable even with an acyclic precedence graph. The rendered L19–L22 sequence supports all three distinctions with different operational evidence.
- Core claims are bounded: cache/packing and I/O-only assumptions for cost estimates; properties/search-space estimates for DP; log survival for recovery; durable prepare/global outcome for 2PC; sets/no NULL/constant and head preservation for CQ; matching placement and skew for parallelism; formal execution/freshness definitions for CAP. These qualifications generally appear at the point where they change an inference.

## Remaining review work

No candidate cross-review task remains pending for this L13–L27 scope. The refreshed L14/L18 additions were read and their fresh changed-cost/data tasks completed before finalizing the scores. No deployment or human-study approval is implied. Repeated source/scope panels remain a reading-flow cost, but they do not invalidate the documented core transfers and are not used as a token/count-based failure criterion. Broader real-learner testing and the parent's final acceptance remain separate.
