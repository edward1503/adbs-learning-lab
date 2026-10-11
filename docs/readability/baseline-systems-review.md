# Independent learner-comprehension review: Lectures 13–27

> Baseline evidence only. This review precedes candidate editing and does not grant candidate acceptance. Rendered baseline captures were generated locally from commit `0a1fb0363d2c44a0ca8f508f4e964a01af128720`; references to `readability-work/baseline` describe that capture, not a public folder. Canonical historical text is available in the linked Git commit.


## Scope and method

I read every section of the immutable Chromium-rendered baseline files `readability-work/baseline/lecture-13.md` through `lecture-27.md`, in numerical order, including expanded disclosure answers. The reference branch is `readability/learner-review-2026-10`; the supplied baseline is main `0a1fb0363d2c44a0ca8f508f4e964a01af128720`. This is a reasoned first-time-learner review of the lesson text, not human-participant testing. I did not edit course files, Git state, tests, or deployments. I did not use a passing test, word count, or example count as evidence of comprehension.

For each stated learning goal below, **E** means the learner can explain the concept, **T** means trace a concrete application, **X** means transfer to a fresh small case, and **A** means identify assumptions or boundaries. **✓** means the lesson provides sufficient support for the small cases reviewed; **△** means support is incomplete or requires a prerequisite that is not locally introduced. These are editorial judgments, not measured success rates. A trace for a descriptive goal means applying the distinction to a concrete scenario.

The fresh exercises deliberately change structure or assumptions, rather than merely repeating the lesson's numbers. Their answers are reasoned using only the lesson text. A successful small transfer does not establish mastery of arbitrary instances. I flag prerequisite names when the lesson appears to assume them; I have not claimed those concepts are absent from Lectures 1–12, which are outside this assignment.

## Priority findings

### P1: Put the method and legend before the worked trace

1. **l18-s2 → l18-s3:** The extra DP ledger assumes dynamic programming, physical-property retention, and interesting orders before the following section explains them. The learner first encounters four additive costs, two output orders, a final sort, and an optimality qualification together. Move that ledger after the simpler two-plan example in s3. Keep the definitions of tree shapes and join-graph pruning in s2. The s3 example `100+80` versus `125+0` gives the necessary intuition before the four-route ledger.
2. **l19-s2 → l19-s3:** The warehouse story is accessible, but its appended swap/three-transaction exercises use `R1`, `W2`, conflict rules, acyclic graphs, and topological serial order before s3 defines the notation and graph construction. Move the appendix after s3, and say that a topological order places the source of every arrow before its destination. Keep the first warehouse story before the formalism.
3. **l19-s4:** Define `C2 = commit(T2)` and `A1 = abort(T1)` immediately before recoverability examples. Otherwise `A1` is easily read as another data-object reference. Use one schedule with an annotated timeline before presenting the hierarchy.
4. **l21-s4:** Expand **LSN** as *log sequence number* before the first numbered log trace. Explain `pageLSN` as a page's record of the last applied logged update, and `undoNextLSN` as where recovery should continue undo, if those fields remain. The distributed `PREPARE` qualification belongs with L22 or in an explicitly optional forward link; it currently interrupts the first ARIES explanation with a protocol the reader has not learned yet.
5. **l20-s3 → l20-s4:** The timestamp proof in s3 precedes the complete wait-die/wound-wait action rules in s4. Keep detection/preclaiming in s3; state the old/new actions in s4, then prove the single-direction waiting property.
6. **l25-s3:** Define `|Q|` and `|D|` where the complexity bounds first appear, rather than waiting until s5. Explain that `|Q|` measures query size and `|D|` database size. The structural-width discussion is optional background; it should not interrupt the first GYO trace.

### P2: Match the promised goals with a concrete demonstration

7. **L13 lifecycle goal:** The worked example traces `next()` only. Add a short `open → repeated next → close` timeline, including who opens/closes the children. State whether the filter retains its predicate and child state, and what position the heap scan and nested-loop join remember. This closes a stated-goal gap without requiring more algorithms.
8. **L14 System R goal:** “The historical System R organization is a useful model” identifies the name but does not describe the approach. A compact connection between per-query-block rewriting, access-path costing, and join-order search would make the goal concrete; otherwise narrow the goal to what is taught.
9. **L17 operator-cost/catalog goals:** Cardinality/selectivity teaching is strong, but there is no catalog-like record to read and no small plan that carries an estimated cardinality into an actual cost calculation. A two-step table with rows/pages/distinct values and one outer-probe cost calculation would support the two promises. The absence does not invalidate the selectivity material.
10. **L27 model comparison:** Key-value, document, and graph models get concrete access examples. Column-family gets only “many sparse fields around keys and access patterns” plus a warning against confusion with OLAP columnar storage. Add one sparse keyed-row example and show a query it serves well, alongside the equivalent request in the other models. This is the weakest of the four model comparisons.
11. **L24 complexity prerequisites:** The witness/reduction distinction is carefully explained, but NP, NP-hardness, NP-completeness, polynomial time, and 3-coloring are assumed terminology. Add a prerequisite link or a few plain-language definitions. This is a first-reader dependency, not a request to replace the proof with a slogan.

### P2: Reduce audit/provenance text in the learning path

The repeated provenance paragraphs and long physical-page lists are useful for verification but repeatedly interrupt the conceptual sequence. In L23–L27, labels such as “Audit addition” foreground editing history rather than the learner's task. Several extensions restate the base paragraph before adding one useful boundary. Retain a concise source link per section and put detailed audit/source-scope explanations in a collapsed source note. Label extensions by their concept rather than their origin.

Specific examples to shorten or relocate:

- **l27-s2:** “attached directly to the five CAP bank questions” introduces an unseen assessment artifact and has no instructional role on this lesson page.
- **l27-s5:** “without asserting any unverified standard date” discusses an authoring concern, not how to choose a graph model. The repeated popularity qualification can be one historical-source note.
- **l20-s1:** The strict/rigorous naming convention is stated repeatedly. State the local convention once, retain the practical reason, and remove the unexplained warning about copying a schematic early-unlock line.
- **l22-s2/s3/s4/s5:** Prepared participants' inability to abort is important, but repeated warnings can become one progression: promise → two indistinguishable states → wait/lock consequence → one transfer check.
- **l24-s4:** The supplemental paragraph repeats fixed-query polynomial evaluation and canonical-database satisfiability after those have been established. Keep its new containment-complexity information and put the rest in a short reminder if needed.
- **l26-s3/s5:** The co-location condition is repeated. Keep the initial rule, the mismatched-range counterexample, and one final question; avoid re-explaining the full condition every time.

### Patterns to preserve

- **l17-s2:** Counts shared-key pairs before presenting the general equijoin formula, then names its assumptions.
- **l23-s2/s3:** Question → readable query → successful assignment → failed assignment → witness/output distinction.
- **l24-s3/s4:** Shopper/premium intuition before reverse homomorphism direction; canonical database as a counterexample witness.
- **l25-s4:** Chain semijoin trace before a branching example that requires every child to support the same root tuple.
- **l21-s1/s2/s3:** Physical crash possibilities before buffer-policy labels, then a two-product example and log ordering.
- **l27-s2:** A completed write followed by a disconnected read makes the real-time consistency/availability tension concrete.

## Lesson-by-lesson checklist and transfer checks

### Lecture 13 — Query Evaluation: Processing Models

**Reading checklist.** The motivation is clear: how operators pass work and rows. Scan → filter → projection provides intuition before a performance comparison. `EOF`, the call interface, pipelining, blocking, and batch size are explained. The lesson assumes earlier familiarity with heap scans, nested-loop/hash joins, and a left-deep plan; a prerequisite reminder would help. The boundary from blocking sort to LIMIT is useful. The batch/partial-batch extension adds a real boundary, although source text interrupts the flow. `SIMD` could be expanded once. Most importantly, the lifecycle trace skips opening and closing despite the first goal.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Trace open, next, close | △ | △ | △ | ✓ | Definitions are present; numerical trace covers only next; LIMIT discusses close without a full lifecycle. |
| Explain selection, heap-scan, nested-loop state | △ | △ | △ | ✓ | Heap page/slot and join outer/inner position are named; filter state is inferred from repeated requests, without an explicit state snapshot. |
| Identify blocking sort/hash construction | ✓ | ✓ | ✓ | ✓ | Sort must inspect all input; hash build precedes probe; LIMIT counterexample supports the boundary. |
| Explain pipelining, LIMIT, iterator overhead | ✓ | ✓ | ✓ | ✓ | Streaming segments and 300,000 versus 300 calls connect mechanics to overhead, with EOF/filter qualifications. |

**Fresh transfer.** Scan `[6,1,8]` → filter `x>5` → project `2x` → LIMIT 1. Trace the lifecycle and say whether 8 must be scanned. From the text: initialization is `open`; the root's first `next` obtains 6 and returns 12; LIMIT then stops requesting and closes the child chain. Neither 1 nor 8 need be consumed. Put a sort before the projection: all input must then be considered before the globally first row can be selected. This transfer is supported for next/blocking/early close, but the exact open propagation and selection-state description are not demonstrated locally. A lifecycle example would resolve that gap.

### Lecture 14 — Query Optimisation: Plan Space

**Reading checklist.** Three optimization questions establish motivation. Empty-input COUNT and nonunique self-join examples turn bag semantics into concrete consequences. Predicate availability and needed columns are explained before the invalid rewrite exercise. Determinism, multiplicity, inner-join scope, and outer-join boundaries are stated. The System R/query-block extension contains substantial repetition of the parser/rewriter/optimizer roles, but little actual System R process. Relational-algebra operators are described in prose rather than derived symbolically; prior SQL/joins are assumed.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Distinguish parser, rewriter, cost optimizer | ✓ | ✓ | ✓ | ✓ | Checking names/types, equivalence, and comparing estimated cost have distinct responsibilities. |
| Describe query blocks/System R approach | △ | △ | △ | ✓ | SELECT/FROM/WHERE block is described; the named historical approach is not walked through. |
| Apply logical equivalences/safe simplifications | ✓ | ✓ | ✓ | ✓ | False condition, stronger range, and unique/nonunique self-join show both valid and invalid rewrites. |
| Reorder joins preserving predicates/cross products | ✓ | ✓ | ✓ | ✓ | Column availability and retained join predicates support a fresh three-table rewrite. |

**Fresh transfer.** `R(a,p)`, `S(a,b)`, `T(b,q)` join on `R.a=S.a` and `S.b=T.b`; retain only `p`, with filter `T.q>10`. A learner can push the filter into T but must retain T.b for the S–T join, S.a and S.b for both joins, and R.a plus R.p until the final projection. The tree `R join (S join filtered T)` remains equivalent only if the top join retains `R.a=S.a`. A right-side duplicate can still duplicate p. The text supports this transfer; it does not let the learner explain how a System R search would choose among physical implementations.

### Lecture 15 — Query Optimisation: Plan Space Example

**Reading checklist.** A single practice problem and explicit I/O assumptions provide a strong anchor. Base reads, packed output, temporary writes, outer orientation, and memory frames are tracked consistently. Selection on a repeatedly scanned inner relation is carefully distinguished from a materialized filtered inner. The progression becomes crowded in s3: block loops → projection → brief sort/index alternatives → full sort-pass extension. A small comparison table would make the final candidates easier to hold in memory. The matched clustered-access comparison is valuable and should remain; its transition can state the new access assumption once instead of defending both baselines repeatedly.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Recalculate cost after each refinement | ✓ | ✓ | ✓ | ✓ | Every major refinement has separated terms and numerical totals. |
| Distinguish outer/inner selection effects | ✓ | ✓ | ✓ | ✓ | Outer packed pages reduce repetitions; filtering inside each full inner scan does not reduce base reads. |
| Compare outer/inner orientations | ✓ | ✓ | ✓ | ✓ | Both orientations and their different temporary writes are calculated. |
| Include filtered-inner materialization | ✓ | ✓ | ✓ | ✓ | Read + write + repeated read are explicit, including the memory-resident exception. |

**Fresh transfer.** Retain the 600/200 base pages and B=8, but filtering produces 30 Orders pages and 20 Customers pages. Under the same heap-scan and explicit inner-materialization model, Customers outer with Orders materialized costs `800+30+ceil(20/6)×30 = 950`. Orders outer with Customers materialized costs `800+20+ceil(30/6)×20 = 920`. The learner can derive both from the text and choose 920. The reasoning must retain the 800 base reads rather than replacing them with 50 filtered pages, and must charge the selected inner temporary write. This is a supported structural transfer to block counts/orientation, not just a substitution into the original page-loop total.

### Lecture 16 — Access Methods

**Reading checklist.** Motivation is practical: index eligibility and cost differ. Output fraction versus pages read is concrete. Composite ordering is illustrated before the left-prefix rule; the later-key residual test is particularly useful. RIDs are expanded locally, and AND/OR sets give a clear multiple-index example. The cost extension defines h carefully, but could derive `sL`/`sN` in one sentence before the formula. Hash-bucket termination is useful supplementary material but creates a second topic inside the composite-B+ section. The open-ended PostgreSQL exercise requires setup that the lesson does not supply; it is optional rather than evidence of concept mastery.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Sequential scan cost versus output selectivity | ✓ | ✓ | ✓ | ✓ | N reads versus sN packed output is explicit, including width/packing assumptions. |
| Check index support in key order | ✓ | ✓ | ✓ | ✓ | Full hash-key equality and B+ tree order are distinguished. |
| Equality-prefix/range composite rule | ✓ | ✓ | ✓ | ✓ | Equality prefixes, first range, and later residual checks are demonstrated. |
| Index-only/clustered/unclustered comparison | ✓ | ✓ | ✓ | ✓ | Needed columns, nearby/scattered data pages, formula convention, and cache/visibility assumptions are stated. |

**Fresh transfer.** Index `(region,day,amount)`; predicate `region='E' AND day>10 AND amount=5`; output only region/day. Use the region equality and day range to locate entries, then test amount as a residual. Since all three predicate attributes and both output attributes are in the index, the teaching model permits index-only access. With h=2, L=80, N=400, and qualifying contiguous-range fraction s=0.1, reads estimate `2+8=10`; full-row clustered access adds 40, totaling 50. This is supported if s is clearly the scanned range fraction. Using the final amount-filter output fraction for s would require extra distribution assumptions; the lesson's cost formula should make this scanned-range/output distinction explicit.

### Lecture 17 — Query Optimisation: Costing

**Reading checklist.** Strong intuition-before-formula teaching: equal shares, integer endpoints, overlap, and shared-key pairs. The distinction between “selective” and the numerical fraction is helpful. Uniformity, independence, key-set containment, non-NULL foreign keys, and within-bucket assumptions are named where relevant. The range and histogram extensions add useful cases, though they repeat some base prose. Catalog statistics are listed rather than shown. Cardinality propagation is described but never carried through a small costed multi-operator plan. The combined-condition notation defines s and s1 for P separately; this is correct but unnecessarily increases working memory.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Estimate operator costs and passed cardinalities | △ | △ | △ | ✓ | Multiple cardinality calculations are supported; an actual operator-cost calculation/whole-plan trace is absent. |
| Read catalog stats/explain updating | △ | △ | △ | ✓ | Names the statistics and staleness; no sample catalog or interpretation exercise. |
| Identify uniformity/independence assumptions | ✓ | ✓ | ✓ | ✓ | Examples distinguish equal frequencies, overlap independence, and correlation counterexample. |
| Equality/range/NOT/AND/OR selectivity | ✓ | ✓ | ✓ | ✓ | Derivations and null/discrete/continuous boundaries support fresh calculations. |

**Fresh transfer.** R has 80 rows across four equally common keys `{1,2,3,4}`; S has 90 across six equally common keys `{3,4,5,6,7,8}`. Only two keys overlap. The lesson's shared-key reasoning gives 20 R rows and 15 S rows per shared key, so `2×20×15=600` join rows. The compact max-distinct formula would give `80×90/6=1,200`, because its containment assumption fails. This small transfer is fully supported and is a good reason to preserve the derivation. It exposes the difference between applying a formula and identifying its required key overlap. It does not exercise the promised actual operator costing, which needs a separate example.

### Lecture 18 — Query Optimisation: Searching

**Reading checklist.** Single-table access costs give an accessible starting point. Shape definitions and R—S—T pruning are clear. The instructional order breaks when the s2 appendix jumps to a DP ledger before DP and interesting order are defined in s3. The shape-count extension lacks a drawn/bracketed example of the two three-table shapes; a first reader must visualize these while also tracking factorial leaf orders. Assumptions and relative optimality are conscientiously stated, but dense caveats belong after the core example. s4 compares totals effectively but is more a two-route choice than an actual DP table construction.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Enumerate/cost single-table access paths | ✓ | ✓ | ✓ | ✓ | Heap, clustered and unclustered examples distinguish pages and tuple fetches. |
| Explain rapid join-tree growth | ✓ | △ | △ | ✓ | Counts are provided, but shapes and leaf permutations are not actually enumerated. |
| Distinguish left/right-deep/bushy | ✓ | △ | △ | ✓ | Definitions are precise; small drawn/bracketed trees would make classification much easier. |
| Benefits/limits of cross-product pruning | ✓ | ✓ | ✓ | ✓ | Connected subsets and heuristic scope are explicit. |

**Fresh transfer.** Join graph R—S—T. Two RS alternatives cost 25 unordered and 35 ordered by a. Adding T costs 30 from the unordered plan and 10 from the ordered plan, preserving its order. Final ORDER BY a costs 20 otherwise. Totals: unordered `25+30+20=75`; ordered `35+10+0=45`. Under no-Cartesian-product pruning, RT is excluded. This transfer is supported after reading s3, but arriving at the four-route s2 ledger before s3 forces the reader to infer the method. A small bracketed `((R join S) join T)` and `(R join (S join T))` example would also make the search-tree goal easier to transfer.

### Lecture 19 — Transactions

**Reading checklist.** The box transfer motivates all-or-nothing behavior before ACID labels. The two-warehouse anomaly makes read observations matter beyond final state. s2 then abruptly switches to unexplained schedule notation and graph reasoning. s3 explains those concepts clearly once reached. s4 introduces anomalies, recoverability hierarchy, dirty writes, and vacuity in one long section; the local commit/abort legend is missing. s5 explains read-source/final-writer criteria with good positive/negative examples, but “blind write” needs a definition. Distinguishing graph correctness, recovery, application invariants, and external actions is useful; repeated qualifications can be consolidated.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Four ACID properties | ✓ | ✓ | ✓ | ✓ | Transfer/invariant/read anomaly plus commit-survival explanation distinguish responsibilities. |
| Construct precedence graph | ✓ | ✓ | ✓ | ✓ | s3 gives vertices, objects, write-containing pairs, arrow direction and a cycle. Definition arrives after s2 uses it. |
| Conflict versus view serializability | ✓ | ✓ | ✓ | ✓ | Cyclic blind-write trace and changed read sources support both sides; define blind write locally. |

**Fresh transfer.** Schedule `R1(A), R2(B), W1(B), W2(A)`. On A, R1 precedes W2: T1→T2. On B, R2 precedes W1: T2→T1. Therefore conflict serializability fails. Both reads obtain initial values. In serial T1 then T2, T2 would read T1's B; in T2 then T1, T1 would read T2's A. Thus no serial order preserves both read sources, and this case also fails view serializability. The learner can reason this after s3/s5; a final-state-only test would miss it. If a recoverability exercise is added, the schedule must explicitly mark commit/abort and any reads-from dependency rather than rely on undefined C/A markers.

### Lecture 20 — Locking

**Reading checklist.** Read/write access motivates S/X compatibility; phase boundary is explicit. The unsafe access-by-access sequence is a good warning that individual locks do not suffice. The strict/rigorous naming convention is repeated enough to dominate the core explanation. s2 shows how strict locking prevents the dependency that causes a cascade, but no actual T1-aborts → T2-must-abort cascade trace is given. Waits-for versus precedence graphs are distinguished well. Prevention proof precedes the complete timestamp rules; move it after s4. Upgrade is used in s1 before its concrete meaning appears in s5; define S→X once.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Simulate S/X and two locking phases | ✓ | ✓ | ✓ | ✓ | Compatibility and acquisition-after-release violations are concrete. |
| Explain cascading aborts | ✓ | △ | △ | ✓ | Dirty-read dependency/risk and strict prevention are explained; no explicit chain of dependent rollbacks. |
| Detect/prevent deadlock with timestamps | ✓ | ✓ | ✓ | ✓ | Two-lock cycle, victim, all-or-nothing preclaiming, and old/new rules support small cases. |

**Fresh transfer.** T_old(ts=5) holds X(A); T_new(ts=9) requests S(A). Under wait-die, new aborts. Under wound-wait, new waits. Reversing requester/holder: wait-die lets old wait; wound-wait aborts the younger holder. If old later releases A and then requests X(B), it violates basic 2PL regardless of which deadlock rule was used. The text supports this transfer and distinguishes a prevention choice from a locking-phase rule. A separate dirty-read/abort chain would be needed to trace the second goal directly.

### Lecture 21 — Recovery

**Reading checklist.** Crash motivation and STEAL/NO-FORCE reasoning are clear. “Flush” is defined before the policies; WAL is expanded and ordering is concrete. The initial two-product trace is easier than the later optional machinery. In s4, analysis/checkpoint discussion, LSN trace, future distributed PREPARE qualification, and CLR/undoNextLSN extension are accumulated in one section. These require separate optional chunks and a local legend. Dirty page is not explicitly defined. The failure model is well bounded but its media-loss reminder repeats in s5. Do not remove the essential repeat-history/undo distinction while trimming caveats.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Derive UNDO/REDO from buffer policy | ✓ | ✓ | ✓ | ✓ | Physical persistence possibilities precede labels and show why both may be required. |
| Apply mandatory WAL rules | ✓ | ✓ | ✓ | ✓ | Log-before-page and durable COMMIT-before-success have a concrete crash-window reason. |
| Follow analysis/redo/undo phases | ✓ | △ | △ | ✓ | Logical phase goals and small value trace work; fields/checkpoint starts are not operationally explained. Scope is explicitly introductory. |

**Fresh transfer.** Durable records: T1 changes A 8→11, T2 changes B 4→6, then T1 COMMIT. A's page was flushed; B's was not. Crash disk has A=11,B=4. Analysis identifies committed T1 and uncommitted T2. Logical redo repeats required history, including B=6; undo removes T2 and returns B=4. Final A=11,B=4. WAL requires the corresponding update evidence to have been durable before A was flushed, and the COMMIT durable before success. This is supported at the introductory level. Whether an individual page update is physically skipped requires pageLSN/redo tests not supplied in full; the learner should not be asked to infer exact ARIES implementation decisions from this overview.

### Lecture 22 — Distributed transactions

**Reading checklist.** Global lock cycle and stock transfer provide concrete reasons for coordination. Prepare/vote/decision/ACK sequence is readable and distinct from 2PL. Recovered state tables add meaningful depth, but presumed abort, END, dense message numbering, and replica consensus enlarge the workload substantially. “Shared-nothing” is used before L26's full architecture definition; a one-line local placement description would help. `ACK` is operationally described by Finish but can be expanded as acknowledgement. Replace the unexplained “idempotently” in s2 with “without applying the stock change twice,” already exemplified in s3. The repeated prepared-timeout message can be shortened while preserving the two-indistinguishable-states explanation.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Detect global deadlock from local graphs | ✓ | ✓ | ✓ | ✓ | Union of locally acyclic edges makes both two- and three-node cycles. |
| Simulate prepare/vote/decision/ACK | ✓ | ✓ | ✓ | ✓ | Durable ordering and lost-ACK resend cases support a small complete run. |
| Explain prepared participant blocking | ✓ | ✓ | ✓ | ✓ | PREPARE alone fits undecided or remote COMMIT worlds; timeout cannot decide, with locking consequence. |

**Fresh transfer.** E and W vote YES; C durably commits, informs only W, and crashes. E has PREPARE only; W has COMMIT. E cannot abort on timeout. It may obtain the fixed decision from a participant that knows it (W), then record/apply COMMIT and acknowledge without repeating its stock operation. C's recovery also resends its recorded COMMIT. Under the lecture's strict convention, E retains locks until completion. If a replica quorum knows only E's YES, that fact cannot override a W NO in a different run. The text supports the protocol/blocking transfer, although the consensus extension is not necessary to achieve the three stated goals.

### Lecture 23 — Conjunctive queries

**Reading checklist.** Excellent question-to-pattern progression. Head/body/atom notation is defined with a tiny database. Set semantics and DISTINCT are grounded by two witnesses for A. Successful/failed assignments expose constant preservation and shared-variable consistency. Repeated-variable equality and noninjective assignments are concrete. The first “relational language bridge” inserts Codd/safe/domain-independent calculus vocabulary beyond the goals; make it optional or connect it to a stated prerequisite. SQL translation is shown, but a worked relational-algebra-to-CQ translation is not. The self-loop extension completes what the base exercise leaves to the learner; combine them into one optional challenge with answer.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Translate SQL/relational algebra to CQ | ✓ | △ | △ | ✓ | SQL join/filter example is explicit; algebra is only a prose bridge, without an actual expression to translate. |
| Output versus existential variables | ✓ | ✓ | ✓ | ✓ | Course witness stays out of head, then adding it changes result tuples. |
| Find homomorphisms/results | ✓ | ✓ | ✓ | ✓ | Consistent assignment, constants, repeated variables, paths and Boolean answers are demonstrated. |

**Fresh transfer.** Data: Enrol(A,DB), Enrol(A,AI), Enrol(B,AI); Teach(Linh,DB), Teach(Linh,AI); Required(DB). Query `Q(s) :- Enrol(s,c), Teach(Linh,c), Required(c)`. All three atoms must use the same c. Only c=DB survives; s=A, giving `{A}`. If c is also output, answer `{(A,DB)}`; if the head is empty, result is `{()}`. A DISTINCT SQL translation joins Enrol to Teach and Required on course and filters teacher='Linh'. This is supported. Translation from an unfamiliar algebra expression requires either prior notation knowledge or one local worked algebra example.

### Lecture 24 — Evaluation and static analysis

**Reading checklist.** Fixed query versus growing query/data is explained before formal complexity claims. Assignment count is not mistaken for an NP-hardness proof; this is worth preserving. The coloring construction needs a plain-language statement of the three-coloring task and NP terminology. Containment direction is strongly taught by shoppers/premium, reverse maps, and a counterexample. Canonical database gives a witness to the theorem rather than just a rule to memorize. Head positions/constants are repeatedly emphasized for a good reason, but some scope qualifications are redundant. “Core,” “arity,” and “isomorphism” could be glossed locally; uniqueness is optional after minimization is understood.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Data versus combined complexity | ✓ | ✓ | △ | ✓ | Fixed variable count and n/k cases are clear; full complexity vocabulary requires prior background. |
| Correct containment-map direction | ✓ | ✓ | ✓ | ✓ | Intuition, direction, canonical database and failed reverse mapping reinforce the rule. |
| Remove redundant atoms preserving outputs | ✓ | ✓ | ✓ | ✓ | Variable collapse, constants, duplicate atoms, head binding and counterexamples are concrete. |

**Fresh transfer.** `A(x) :- R(x,y), R(x,'a')`; `B(x) :- R(x,'a')`. B maps into A by inclusion; A maps into B with y↦'a'. The same x head position and constant are preserved, so A and B are equivalent. If the head changes to `(x,y)`, dropping R(x,y) removes y's binding and changes the task. To disprove deleting R(x,'a') instead, use D={R(b,'c')}: the weakened query returns b, while A does not. The learner can reason through both map directions and the counterexample from the text. The theoretical terms in s1/s2 remain the main prerequisite gap rather than containment itself.

### Lecture 25 — Acyclic queries

**Reading checklist.** Chain, triangle, and adding a central hyperedge give excellent intuition for running intersection. Variable vertices versus atom nodes are explained; the primal/hypergraph comparison is particularly useful. GYO is shown through a trace but the two legal operations deserve a short explicit rule list before it. Width and complexity guarantees are supplemental and introduce symbols before their s5 definitions. The semijoin definition is clear, chain filtering is stepwise, and the branching counterexample demonstrates why every child must support the same root tuple. Preserve that sequence. Binding a membership candidate is explained without a concrete new tuple trace; optional extension rather than a gap in the three stated goals.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Build atom hypergraph | ✓ | ✓ | ✓ | ✓ | Variables are vertices; complete atom-variable sets are hyperedges, with a primal-graph counterexample. |
| Running intersection and GYO | ✓ | ✓ | ✓ | ✓ | Chain/triangle and central U illustrate both tests; explicit GYO rule list would ease first use. |
| Bottom-up semijoins for Boolean CQ | ✓ | ✓ | ✓ | ✓ | Chain and branching trace expose parent/child direction, complete witness and empty root. |

**Fresh transfer.** Root R(B)={1,2}; children S(B,C)={(1,k),(2,m)} and T(B,D)={(1,p),(2,q)}; U(C)={k} below S and V(D)={q} below T. This is a join tree: R—S—U and R—T—V, with connected occurrences of B,C,D. Bottom-up S⋉U retains (1,k); T⋉V retains (2,q). R⋉S retains 1, then R⋉T becomes empty. Answer NO despite each branch being individually nonempty. The hyperedges `{B}`, `{B,C}`, `{B,D}`, `{C}`, `{D}` reduce by contained-edge removal and degree-one variable removal. This fresh branching transfer is supported and validates why the original branching trace should stay.

### Lecture 26 — Parallel query processing

**Reading checklist.** Architectures and three kinds of parallelism are defined before plan examples. Workload-driven hash/range/round-robin choices are accessible. Row-count balance versus byte/work skew is useful. Scan time and global order are concrete; same-key co-placement counterexample strengthens local join reasoning. Three hash-function roles may rely on the prior Grace-join lesson; link that prerequisite rather than expand it here. Broadcast/shuffle arithmetic is clear, but uses different initial placement assumptions, so the comparison must keep those assumptions visible. Say explicitly that one of eight workers is the destination, so 1/8 stays and 7/8 moves. Latency/throughput/bytes distinction is worth preserving.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Compare resource-sharing architectures | ✓ | ✓ | ✓ | ✓ | Resource ownership plus contention/coordination/network costs give concrete distinctions. |
| Choose workload-fit partitioning | ✓ | ✓ | ✓ | ✓ | Customer equality, date range, round robin, skew and routing exceptions are demonstrated. |
| Broadcast/shuffle costs and bottlenecks | ✓ | ✓ | ✓ | ✓ | Network formulas and slowest-worker example separate traffic from elapsed time. |

**Fresh transfer.** Four workers; R=40 GB, S=2 GB, S initially complete on worker 1. Broadcasting S to the other three transfers `2×3=6 GB`. For a separately specified uniform-random initial placement of both inputs, shuffling transfers `(40+2)×3/4=31.5 GB`. If phase durations are 4,4,4,14 seconds, elapsed phase time is at least 14 seconds even if broadcast uses fewer bytes. If workers cannot each retain/process S, the smaller broadcast byte count does not establish feasibility. Text supports the transfer but should not encourage treating traffic as a latency calculation or forgetting that the two network estimates have different starting-placement assumptions.

### Lecture 27 — NoSQL

**Reading checklist.** Requirements lead the lesson, and sharding/replication plus network partition are differentiated. CAP's stale-read timeline is strong; C/A are concretely defined and distinguished from ACID. BASE and convergence conditions are explained with profiles and carts. s4 is overloaded: four model summaries → JSON → key-value interface/routing → JSON validation → graph pattern. Column-family is the only model without a worked instance. s5 repeats graph and popularity cautions. Unseen “CAP bank questions,” authoring qualifications about standard dates, and audit labels should leave the main path. A compact four-model comparison using the same workload would improve chunking more than additional warnings.

| Stated goal | E | T | X | A | Evidence/gap |
|---|---|---|---|---|---|
| Sharding versus replication | ✓ | ✓ | ✓ | ✓ | Three shards/two copies distinguishes logical rows, capacity and routing. |
| Trade-off during network partition | ✓ | ✓ | ✓ | ✓ | Completed E write followed by W read proves the tension with explicit real-time/failure assumptions. |
| Compare KV/document/column-family/graph | △ | △ | △ | ✓ | KV, document and graph have concrete requests; sparse keyed column-family access is only named. |

**Fresh transfer.** Three 20-GB logical shards, each with three total copies: raw copies use `3×20×3=180 GB`, while the logical data remain 60 GB. A disconnected W reads after E's acknowledged update: returning the old value violates the stated C guarantee; waiting indefinitely or rejecting fails the stated A guarantee. For a product request by exact SKU, basic KV is plausible; filtering nested product attributes fits the document example; exact two-hop FRIEND paths fit the graph example. For “one sensor key, sparse named readings, retrieve a recent keyed slice,” the column-family sentence gives insufficient information to justify the design with equal confidence. A concrete column-family row/access example is needed to complete this transfer rather than asking the learner to infer a product model from its label.

## Representative before/after wording

These are editorial sketches for revised explanations, not edits applied to the course. They deliberately retain the relevant assumptions without audit-history prose.

### L13: trace the promised lifecycle

**Before:** “On the first call to root.next(), Filter requests 2 and discards it...”

**After:** “First the root calls `open`; each operator initializes its state and opens its child. Now call `next` at the root: the filter reads 2, rejects it, reads 7, and returns 7; projection returns 70. A second call returns 90, and a third returns EOF. Finally `close` travels down the tree to release each operator's resources. The scan remembers where it stopped, so the second call resumes at 4 rather than restarting at 2.”

### L18: define the search method before the ledger

**Before:** “Original DP ledger: extending unordered RS costs 40+45=85; extending RS ordered by b costs 52+20=72.”

**After, placed after s3's simple ordered/unordered example:** “We now keep two entries for RS: cheapest unordered, and cheapest already ordered by b. The ordered one costs more initially, but its next join is cheaper. Compare whole routes: unordered 40+45=85; b-ordered 52+20=72. This is why the search remembers an output order instead of keeping only the smallest intermediate cost.”

### L19: legend, then arrows

**Before:** “Original trace R2(A), W2(A), R1(A)... yields T2→T1 on A... Its topological serial order is T2,T1,T3.”

**After, following the graph method:** “`R2(A)` means T2 reads A; `W2(A)` means T2 writes A. In this trace, T2's write of A is before T1's read of A, so T2 must come before T1. T1's write of B is before T3's read/write of B, so T1 must come before T3. The arrows are T2→T1→T3. A serial order that respects every arrow is T2,T1,T3; this is called a topological order.”

### L19: local commit/abort key

**Before:** “In W1(A), R2(A), C2, A1, T2 commits based on work T1 later aborts...”

**After:** “Use `C2` for `commit(T2)` and `A1` for `abort(T1)`. Read this schedule left to right: T1 writes A; T2 reads that uncommitted value; T2 commits; then T1 aborts. T2 has already committed a result based on work that was removed. The schedule is therefore not recoverable.”

### L21: explain the log field before the crash trace

**Before:** “Durable records are LSN 10... CLR 30 with undoNextLSN=10.”

**After:** “Each log record has a log sequence number, or LSN, showing its position in the log. In the optional rollback trace, CLR 30 records an undo action that restored B. Its `undoNextLSN=10` tells recovery where to continue undo next. If another crash loses the restored B page, recovery repeats CLR 30, then resumes at record 10; it does not undo the CLR itself.”

### L25: state the reduction rules before applying them

**Before:** “Start with the chain {a,b}, {b,c}, {c,d}. Remove a and d because each belongs to only one edge.”

**After:** “GYO repeatedly uses two operations: remove a variable that occurs in only one hyperedge, or remove a hyperedge contained in another. Delete empty edges as they arise. Now apply the rules to the chain {a,b}, {b,c}, {c,d}: a and d occur only once, leaving {b}, {b,c}, {c}. The two single-variable edges are contained in {b,c}, so remove them...”

### L27: give column-family the same concrete support as the other models

**Before:** “Column-family: Organize many sparse fields around keys and access patterns.”

**After:** “Column-family: organize sparse named fields around a row key. For example, a sensor row can contain only the readings that exist for that sensor, while another sensor has different fields. Design the key and grouped fields around the reads you need. This is different from OLAP columnar storage, which stores one table column's values together for scans.”

This example remains deliberately basic; any precise time-range API or ordering guarantee needs the chosen model's convention rather than a product claim.

### Global: put source verification behind the explanation

**Before:** “Audit addition: original explanation and worked example. Related evidence: Lecture source · physical PDF pages 2, 3, 4, 5...”

**After main text:** “Two witnesses can produce the same output tuple. The CQ result is a set, so keep that tuple once.”

**Collapsed source note:** “Sources and teaching scope: [source links and exact pages]. This worked example is original.”

## Cross-review status

Initial independent review is complete for all 15 assigned lessons. A later read of a different editor's revised output is still pending; it should use the revised rendered lesson, compare the affected concept and its nearby exercise, and re-run the fresh transfer reasoning above. This report does not claim that proposed fixes have already been implemented or independently verified.
