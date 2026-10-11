# Representative actual before/after passages

These excerpts come from full Chromium-rendered baseline and final candidate text. Baseline is `0a1fb0363d2c44a0ca8f508f4e964a01af128720`; candidate is the local review branch named in the handoff. Quotes are shortened only where marked `[…]`. They are actual material, not proposed replacement copy. See the three independent final reviews for fresh tasks and reasoning.

## 1. A manageable introduction

Resource: `lecture-01`; baseline `l1-4`, candidate `l1-4`.

Before:

> Query planning parses a query, checks its meaning and selects a physical plan. Operator execution performs scans, filters and joins. File and index management locates logical records; buffer management manages frames and replacement; disk-space management maps page IDs to storage and performs reads or writes. These are responsibilities and interfaces, not necessarily five separate operating-system processes. Concurrency and recovery coordinate work across layers.

After:

> A visitor asks whether B017 is available. The DBMS finds the Book row and relevant Loan rows, reads that data, and answers. The logical description identifies the related data; the physical description locates its bytes. Moving those bytes should not force the query to change. The mechanisms below preview later lessons.

The request stays the main thread; later concepts are explicitly labeled previews with lesson links.

## 2. One consistent SQL fixture

Resource: `lecture-02`; baseline `l2-3`, candidate `l2-3`.

Before:

> Original fixture: Member has (1, An), (2, Binh), (3, Chi). Borrow has (1, A), (1, B), (2, C), and an added orphan (4, D), where the first field is member_id. No foreign-key constraint is enforced in this fixture; otherwise the orphan could be rejected. Join on Member.member_id = Borrow.member_id.

After:

> Original fixture: Member has (1, An), (2, Binh), (3, Chi). Borrow has (1, A), (1, B), (2, C), and an added orphan (4, D), where the first field is mid, using the same Member(mid,name) and Borrow(mid,book) schemas. No foreign-key constraint is enforced in this fixture; otherwise the orphan could be rejected. Join on Member.mid = Borrow.mid.

The same mid field now connects the declared fixture, prose and runnable statements; 4/4/5 outer-join counts remain.

## 3. Intermediate SQL truth values

Resource: `lecture-02`; baseline `l2-4`, candidate `l2-4`.

Before:

> ALL/ANY are also introduced on PDF page 28. For the set {30,90}, 50 > ANY is true and 50 > ALL is false. This example contains no NULL values. NULL’s three-valued logic, TRUE, FALSE, UNKNOWN, needs supplementary reading; it cannot be inferred from an outer-join diagram.

After:

> An ordinary comparison with NULL gives UNKNOWN. SQL conditions use TRUE, FALSE, and UNKNOWN; WHERE retains only TRUE. For 2 NOT IN (1, NULL), 2<>1 is TRUE but 2<>NULL is UNKNOWN. NOT IN requires both: TRUE AND UNKNOWN gives UNKNOWN, so WHERE discards the row. For 1 NOT IN (1, NULL), 1<>1 supplies a decisive FALSE. IN and NOT IN run in the SQLite lab; ANY/ALL syntax requires PostgreSQL.

Comparison → UNKNOWN → conjunction → WHERE rejection is taught before the warning. Complete negative queries and a separate NULL row follow.

## 4. Named B+ tree child movement

Resource: `lecture-09`; baseline `l9-3`, candidate `l9-3`.

Before:

> For redistribution, let the parent separator be 40, the left internal sibling [10,20,30], and the underfull right sibling [60]. Move the left sibling’s rightmost child to the right sibling’s leftmost position. Move 40 down into the right node and 30 up to the parent. The result is left [10,20], parent [30], right [40,60]. Moving a separator without its associated child pointer breaks routing.

After:

> Move D3, the left sibling’s rightmost child, to the right sibling’s leftmost position. Move separator 40 down into the right node and 30 up to the parent. The result is left keys [10,20] with D0,D1,D2; parent [30]; right keys [40,60] with D3,D4,D5. D3 still covers [30,40), now reached through the right node. A search for 35 therefore reaches D3 before and after repair. Moving a separator without its associated child pointer breaks routing.

The learner can trace a child interval and look up 35 before and after a one-level redistribution; practical occupancy caveats follow the textbook trace.

## 5. A self-contained optional PostgreSQL task

Resource: `lecture-16`; baseline `l16-s4`, candidate `l16-s4`.

Before:

> Create a separate test table in PostgreSQL. Run EXPLAIN for predicates with few and many matches, then compare it with EXPLAIN ANALYZE on a safe SELECT. Record estimated rows, actual rows, scan type, and buffer statistics if that option is enabled. ANALYZE actually executes the query; use it with data-changing statements only when you understand and accept their effects.

After:

> CREATE TEMP TABLE adbs_access_demo (
>   id integer PRIMARY KEY,
>   age integer NOT NULL,
>   padding text NOT NULL
> );
> INSERT INTO adbs_access_demo (id, age, padding)
> SELECT g, g % 100, repeat('x', 100)
> FROM generate_series(1, 10000) AS generated(g);
> CREATE INDEX adbs_access_demo_age_idx ON adbs_access_demo (age);
> ANALYZE adbs_access_demo;

A disposable schema, seed, index, ANALYZE and two EXPLAIN commands are supplied. Output is illustrative and unmeasured; a plan switch is not guaranteed.

## 6. Teach DP before its ledger

Resource: `lecture-18`; baseline `l18-s2`, candidate `l18-s3`.

Before:

> Original DP ledger: extending unordered RS costs 40+45=85; extending RS ordered by b costs 52+20=72. Extending unordered ST costs 35+50=85; extending ST ordered by a costs 60+10=70. The cheapest RS subplan alone would lose the 72-unit RS route. Costs for each extension already include its stated algorithm and input assumptions.

After:

> Return to the chain with schemas R(a), S(a,b), and T(b): R joins S on a, and S joins T on b. Each ledger entry records the tables joined, its output order, and its cost. RS means the joined subset {R,S}; ST means {S,T}. “Ordered by b” is an output property, not another table. Explore both outer/inner orientations and eligible join algorithms under the earlier no-Cartesian-product policy.

Schemas, supplied costs and output-order assumptions now precede the four-route ledger. The method and simple order example occur first.

## 7. Define conflict edges before graph operations

Resource: `lecture-19`; baseline `l19-s2`, candidate `l19-s3`.

Before:

> Original trace R2(A), W2(A), R1(A), R1(B), W1(B), R3(B), W3(B) yields T2→T1 on A and T1→T3 on B. There is no direct T2/T3 conflict, and the graph is acyclic. Its topological serial order is T2,T1,T3. Read-read pairs add no edge.

After:

> A graph edge T1 → T2 records the constraint “T1 must come before T2 in an equivalent serial order.” Create that edge for operations from different transactions on the same object when at least one is a write and T1’s operation occurs first.

R/W notation and what an arrow requires now come before swaps, a three-transaction graph and topological terminology.

## 8. Commit and abort notation in three timelines

Resource: `lecture-19`; baseline `l19-s4`, candidate `l19-s4`.

Before:

> Under these definitions, strict implies cascadeless, which implies recoverable. These implications concern read/write and commit/abort dependencies, not the same criterion as an acyclic precedence graph. In W1(A), R2(A), C2, A1, T2 commits based on work T1 later aborts: the schedule is not recoverable. In W1(A), R2(A), C1, C2, the read is dirty but commit order is recoverable. In W1(A), C1, R2(A), C2, the read is cascadeless.

After:

> This supplementary bridge asks what happens if the writer aborts. A reader that has used another transaction's uncommitted write may also need to abort; this is cascading-abort risk. In the schedules below, C1 means commit(T1), C2 means commit(T2), and A1 means abort(T1). A1 is an abort event, not data object A.

The local C/A legend supports unsafe commit, safe commit order and waiting to read; all lost-update conflict pairs are supplied.

## 9. A literal complexity reduction

Resource: `lecture-24`; baseline `l24-s2`, candidate `l24-s2`.

Before:

> Membership in NP: use one assignment as a witness. Preserve the constants, substitute the variables, and check that every resulting atom is in D and that the head produces the candidate tuple. The witness size and verification time are polynomial in the input size. Verifying one witness does not require trying every assignment.
> NP-hardness: reduce 3-coloring to Boolean conjunctive-query evaluation. Create one variable for each graph vertex and an atom Diff(u,v) for each edge (u,v). The database relation Diff contains the six ordered pairs of distinct colors among three colors, such as (red,blue), and contains no equal-color pair. A match exists exactly when the graph can be colored with three colors.

After:

> Membership in NP: use one assignment as a witness. Preserve the constants, substitute the variables, and check that every resulting atom is in D and that the head produces the candidate tuple. The witness size and verification time are polynomial in the input size. Verifying one witness does not require trying every assignment.
> NP-hardness: use the known NP-completeness of graph 3-coloring. It asks whether every graph vertex can receive one of three colors while adjacent vertices have different colors. First try a triangle with vertices u,v,w. Build Q() :- Diff(u,v), Diff(v,w), Diff(w,u) and the database Diff={(red,green),(red,blue),(green,red),(green,blue),(blue,red),(blue,green)}. Assigning u=red,v=green,w=blue satisfies all three atoms. Assigning u=red,v=red fails the first atom because (red,red) is absent. For a general graph, create one variable for each vertex and one Diff atom for each edge. A match exists exactly when the graph  […]

Witness verification and the reduction are distinguished. A triangle provides a concrete assignment and failed same-color edge.

## 10. A continuous containment proof

Resource: `lecture-24`; baseline `l24-s4`, candidate `l24-s4`.

Before:

> For Q(x) :- R(x,y), S(y), construct the small database D = {R(cx,cy), S(cy)} by replacing x with cx and y with cy. Use a distinct fresh constant for each variable, while preserving any constants already in the query. This is the canonical database of Q, and cx certainly belongs to Q(D).

After:

> Keep the premium-shopper queries from the previous section: Qsmall(x) :- Buy(x,p), Premium(p) and Qall(x) :- Buy(x,p). Replace the variables x,p in Qsmall with distinct fresh constants cx,cp. The canonical database is Dsmall={Buy(cx,cp), Premium(cp)}. Qsmall returns cx on this database by construction.

The shopper/premium atoms persist through the canonical database, assignment composition and reverse counterexample; set/CQ assumptions remain explicit.

## 11. A bounded research starting task

Resource: `supplement-28`; baseline `supplement-28-s5`, candidate `supplement-28-s5`.

Before:

> Suggested experiment, not an assigned implementation. Build a small selectivity/cardinality model or reuse an available learned-optimizer artifact. Use one fixed database snapshot and three distinct test regimes: unseen predicate literals on known templates, held-out templates, and a later workload period. Preserve a validation split for all tuning; keep the final test set untouched.

After:

> Paper-first task. All six queries count rows in the same fixed Customer snapshot:
>
> Query	WHERE condition
> Q1	city = 'A'
> Q2	city = 'B'
> Q3	city = 'C'
> Q4	city = 'A' AND pass = 1
> Q5	city = 'B' AND pass = 1
> Q6	city = 'C' AND pass = 1
> Group the templates. Propose a new-literal test and a new-template test. Which queries may tune the method?
>
> Worked answer. Q1–Q3 share one template; Q4–Q6 share another. To test new literals on known templates, train on Q1/Q4, tune on validation queries Q2/Q5, and leave Q3/Q6 untouched for the final test. To test a new template instead, train on Q1, tune on Q2/Q3, and hold all of Q4–Q6 out. These are two alternative experiment designs. If Q4 influences tuning in the second design, its template is no longer unseen. A later workload period is a third test regime; fix the date boundary before inspecting its results.

Six literal queries make the split decision inspectable; paper work precedes optional model implementation. Oracle/template/ablation terms and the aligned vector bridge are defined.

## Follow-up A. Open addressing needs a probe policy

Resource: `lecture-10`; baseline `l10-s1`, candidate `l10-s1`.

Before:

> Original worked example: divide each ticket code by 4 and use the remainder as its bucket number. In compact notation, h(k)=k mod 4, where k is the ticket code and h(k) is a bucket number from 0 to 3. Codes 6, 10, and 14 all enter bucket 2. Finding code 10 requires checking the entries in that bucket; finding every code from 6 to 14 cannot be done by reading bucket 2 alone. Chaining links entries into a list; open addressing searches for another slot in an in-memory table. In a database, a bucket commonly occupies one or more pages.

After:

> Use an explicitly chosen linear-probing toy policy: four initially empty slots numbered 0–3, h(k)=k mod 4, and no deletions. If the home slot is occupied, try the next slot, wrapping from 3 to 0.
>
> Insert 6: its home slot is 2, so store 6 there.
> Insert 10: slot 2 contains 6, so store 10 in the next slot, 3.
> Insert 14: slots 2 and 3 are occupied, so wrap and store 14 in slot 0.
>
> The slots now contain [14, empty, 6, 10]. To find 14, start at its home slot 2, compare with 6, then with 10 in slot 3, then find 14 in slot 0. The lookup follows the same probe rule as insertion. This trace illustrates one collision policy; other open-addressing policies use different probe sequences. Deletion needs its own policy so it does not break a later lookup’s probe chain.

Independent cross-review found the original gap. The final text supplies insertion and lookup under linear probing, wraparound, and a no-deletion boundary.

## Follow-up B. Query blocks need an actual query

Resource: `lecture-14`; baseline `l14-s1`, candidate `l14-s1`.

Before:

> A query block consists of its SELECT/FROM/WHERE structure, including inputs that may themselves be query blocks. Parsing and semantic checks establish legal names and types; rewriting establishes equivalence; cost-based choices use statistics and a search policy. The historical System R organization is a useful model, not a description of every modern optimizer.

After:

> The outer block is the SELECT over Customer; the inner block is the SELECT over Orders. The inner condition refers to C.customer_id from the outer block, so it is correlated. For one bound customer, the inner block asks whether a matching order exists; it does not return every order to the outer result.

A declared correlated EXISTS query separates the outer and inner blocks; supplied scan/index costs change the winner. A single-relation block has no internal join-order choice.

## Follow-up C. A pruning limitation needs a counterexample

Resource: `lecture-18`; baseline `l18-s2`, candidate `l18-s2`.

Before:

> In the join graph R—S—T, predicates connect R to S and S to T, but not R to T. The optimizer therefore often discards the candidate {R,T}, which creates a Cartesian product, and instead extends subsets {R,S} and {S,T}. This is a search-space heuristic, not a proof that a Cartesian product is always the slowest choice for every dataset.

After:

> Supplied-cost counterexample. In one common abstract unit, building the connected RS candidate costs 20 and adding T costs 15, totaling 35. Building the tiny R×T candidate costs 2 and adding S through a suitable access path on (a,b) costs 8, totaling 10. Each extension cost includes the stated route’s remaining accesses; there is no final-order requirement in this example. These are exercise inputs, not costs derived from row counts or a benchmark.

A tiny RT product costs 2+8 versus connected RS 20+15 under explicitly supplied complete costs. Both original predicates remain; no empirical performance claim is made.
