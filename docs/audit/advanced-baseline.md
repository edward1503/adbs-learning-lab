# Advanced audit baseline: Modules 5–10

Review recorded 2026-10-11. Baseline application commit: `b694ecf13394d3cf9f35bf78b880bb95acf46995`.

This is a condensed public record of baseline findings supplied by independent content reviewers. It preserves the pre-integration findings; it is not a review of the subsequently edited files, generated assets or deployed site. The complete raw reviewer Markdown and its exact per-section classification table were not available to the documentation consolidator. The tables below therefore preserve proposed additions and known corrections without inventing a new classification for every section.

The target syllabus has **13 modules, 15 weeks and 30 sessions**. This report covers Edinburgh source resources L13–L27, mapped to Modules 5–10. The 27 source resources are not 27 scheduled sessions. New research, clinic and symposium study resources must remain explicitly supplemental, rather than becoming purported Edinburgh lectures 28–37.

## Baseline outcome

| Check | Recorded result | Interpretation |
| --- | --- | --- |
| Source-resource sections | 69 reviewed | L13–L27 baseline explanations. |
| Topic-bank answer keys | All 635 checked answers substantively correct | Preserve original answers and option meanings. |
| Embedded checks | All 15 checked answers substantively correct | No replacement answer keys proposed. |
| Total answer checks | 650 | Bank and embedded checks counted separately. |
| Proposed explanation additions | 40 | Ten execution/optimization, fourteen transaction/recovery/distributed, sixteen CQ/NoSQL additions. |
| Proposed original bank additions | Seven | Original exercises reinforcing execution models, rewriting, costs, histograms and enumeration. |
| Citation refinements | Specific improvements listed below | Preserve correct keys; refine source navigation and clarify assumptions. |
| Source-slide errata | L15 physical p30 and L17 physical p20 | Source errors are not evidence that the site's existing answer keys were wrong. |

## Execution and optimization findings

`DEPTH_ADDITION_PROPOSED` preserves the proposed work. The condensed handoff does not establish an individual `PARTIAL` or `MISSING` label for every item. These are baseline recommendations; implementation and independent acceptance must be recorded separately.

| ID | Baseline status | Target | Proposed explanation and original check | Public source physical pages |
| --- | --- | --- | --- | --- |
| EX13-MODELS | DEPTH_ADDITION_PROPOSED | L13 `l13-s3` | Compare pull-based tuple/batch execution, materialization and workload trade-offs. A 2,050-row result in batches of 1,000 yields 1,000, 1,000, 50, then EOF. | L13: 13–18 |
| EX14-REWRITE | DEPTH_ADDITION_PROPOSED | L14 `l14-s1` | Explain query blocks, rewriting and historical System R scope. A self-join can be removed under the stated primary-key/existence assumptions; a non-key two-row self-join can produce four rows under bag semantics. | L14 2×2 handout: 1–3 |
| EX15-SORT | DEPTH_ADDITION_PROPOSED | L15 `l15-s3` | Make sort/join materialization costs explicit. Base 800, filtered inputs 12/50 pages, B=8: 36+150+62+800=1,048. B=7 makes the 50-page sort require two merge passes: 36+250+62+800=1,148. Output and CPU costs excluded; no silent fusion. | L15: 25–29 |
| EX15-FAIR | DEPTH_ADDITION_PROPOSED | L15 `l15-s4` | Compare alternatives under the same filtered outer input. 12+1,200=1,212 for stated index probes; a projected 1,200-key two-page in-memory outer input gives 12+200=212. For 30 qualifying tuples on one outer page, the stated index plan costs 31 versus 201 for the other plan. | L15: 39–43 |
| EX16-COSTS | DEPTH_ADDITION_PROPOSED | L16 `l16-s3` | Separate internal descent, leaf scan and data fetch. With h=3, L=120, N=900, s=0.05: clustered full-row cost 3+6+45=54; covering cost 3+6=9. RIDs [7,2,7,4,2] refer to three distinct data pages. | L16: 16–18 |
| EX16-HASH | DEPTH_ADDITION_PROPOSED | L16 `l16-s2` | A nonunique hash lookup must inspect all matches, including overflow; a failed lookup traverses the whole relevant chain. One primary plus two overflow pages costs three bucket-only reads. Composite hash equality needs the complete key. | L16: 19 |
| EX17-RANGES | DEPTH_ADDITION_PROPOSED | L17 `l17-s2` | Distinguish discrete inclusive counts from continuous interval approximations, clamp outside-domain selectivities and handle degenerate ranges. Integer 10–29 with A>24 gives 5/20=0.25; continuous 10–30 with A>24 gives 6/20=0.30; A>40 gives zero. | L17: 7–9 |
| EX17-DEPTH | DEPTH_ADDITION_PROPOSED | L17 `l17-s3` | Explain equi-depth buckets of unequal width. Three 30-row buckets [1,3], [4,9], [10,12] estimate A=5 as 5 rows, A=11 as 10, A≥7 as 45/90 and 2≤A≤10 as 60/90. State within-bucket uniformity. | L17: 15–26 |
| EX18-ENUM | DEPTH_ADDITION_PROPOSED | L18 `l18-s2`, `l18-s3`, `l18-s4` | Retain alternatives by subset and useful physical property. An ordered intermediate costing 52 plus merge 20 totals 72 versus unordered 40+45=85. With the supplied ORDER BY costs, four alternatives total 115, 102, 115, 70. Restrict optimality claims to the chosen model/search space. | L18: 8–23 |
| EX18-COUNTS | DEPTH_ADDITION_PROPOSED | L18 `l18-s2` | Count binary tree shapes separately from labeled leaf orders and physical algorithms. Three labeled relations: 2×6=12 binary trees. Four: 5×24=120; left-deep orders 24 before predicate pruning. | L18: 8–12 |

## Transaction, recovery and distributed-system findings

| ID | Baseline status | Target | Proposed explanation and evidence | Public source physical pages |
| --- | --- | --- | --- | --- |
| P19A | DEPTH_ADDITION_PROPOSED | L19 `l19-s1` | Define BEGIN/commit/abort, abstract reads/writes and atomicity boundaries. Rolling back database work does not cancel an external courier action. Compare logging/shadow methods and pessimistic/optimistic coordination without conflating them. | L19: 4–5, 8–11, 14, 17 |
| P19B | DEPTH_ADDITION_PROPOSED | L19 `l19-s2`, `l19-s3` | Preserve each transaction's internal order in a schedule. Explain conflicts, safe adjacent swaps and precedence edges. `R2(A),W2(A),R1(A),R1(B),W1(B),R3(B),W3(B)` gives 2→1→3. An independent T3 can appear in three serial positions in the supplied two-transaction example. | L19: 24–26, 32–37, 40, 42 |
| P19C | EXPLANATORY_BRIDGE_PROPOSED | L19 `l19-s4`; L20 `l20-s2` | Add an explicitly labeled bridge beyond the source definitions: recoverability, cascadelessness and strictness. Strict ⇒ cascadeless ⇒ recoverable; these properties differ from conflict serializability. Contrast dirty-read and dirty-write schedules. | L19: 29–30; L20: 11–14 |
| P19D | DEPTH_ADDITION_PROPOSED | L19 `l19-s5` | Define view equivalence by initial reads, reads-from relations and final writers. The supplied `R1(A),W2(A),W1(A),W3(A)` history has a conflict cycle but is view-equivalent to serial 1,2,3. `R1(A),W2(A),R1(A)` is not view serializable. | L19: 43–46 |
| P20A | DEPTH_ADDITION_PROPOSED | L20 `l20-s1`, `l20-s2` | Explain lock holders/waiters, S/S compatibility, X permissions and the first-release shrinking phase of 2PL. Per-operation locking alone can violate 2PL; early X release permits cascading effects. | L20: 2–7, 10–12 |
| P20B | DEPTH_ADDITION_PROPOSED | L20 `l20-s3`, `l20-s4` | Distinguish waits-for and precedence graphs. Explain deadlock detection/victim trade-offs, conservative atomic lock acquisition and timestamp orientation in wait-die/wound-wait. Retain the timestamp on restart. | L20: 19–27 |
| P21A | DEPTH_ADDITION_PROPOSED | L21 `l21-s2`, `l21-s5` | Classify transaction/system/media failures and state durable-log assumptions. Old=20/new=15 supports undo/redo reasoning; loss of pages and all logs requires backup evidence. | L21: 3–6, 18 |
| P21B | DEPTH_ADDITION_PROPOSED | L21 `l21-s4` | Explain introductory ARIES analysis, redo and undo without inventing a full CLR specification from slides. The supplied durable-log/no-page-flush trace redoes A=10/B=3, then undoes loser T2 to B=7. Redo start can differ from analysis start. | L21: 19, 25–26 |
| P21C | OPTIONAL_BEYOND_SLIDES | L21 `l21-s4` | Label CLR/restart handling as a primary-paper extension. In the supplied A=5→8/B=9→4 trace, durable CLR30 restoring B=9 is redone after a crash, followed by remaining undo to A=5. CLRs are not undone and already compensated LSN20 is not compensated twice. | L21: 25–26; ARIES primary paper: 20–21, 25, 29–34 |
| P22A | DEPTH_ADDITION_PROPOSED | L22 `l22-s1` | Explain partitioned shared-nothing scope, coordinator/participant roles and authority with the data. Local waits-for edges 1→2 at N1 and 2→1 at N2 form a global deadlock. Whole-table authority is coarse, rather than a universal architecture requirement. | L22: 3–4, 7–11, 13–14 |
| P22B | DEPTH_ADDITION_PROPOSED | L22 `l22-s2`, `l22-s3` | Trace durable PREPARE before YES, durable coordinator COMMIT before decision messages, participant decision before ACK and END as completion. Missing ACK does not reverse commit. END forcing differs among the depicted variants; do not state it as universal. | L22: 20, 22, 31, 33–35, 37–39, 41–43, 45–47 |
| P22C | DEPTH_ADDITION_PROPOSED | L22 `l22-s3`, `l22-s4` | Add the presumed-abort recovery table. A prepared participant without a decision must ask/wait; it cannot infer abort from timeout because another participant may already have committed. A missing coordinator entry implies abort only under the stated presumed-abort protocol. | L22: 49–54 |
| P22D | DEPTH_ADDITION_PROPOSED | L22 `l22-s3`, `l22-s5` | Scope dense sequence numbers to sender/receiver/transaction streams; missing k requires buffering k+1, not a guarantee of arrival. Distributed strict locking lasts until completion. A prepared 2PC transaction cannot be undone as an ordinary single-node loser before its decision is resolved. | L22: 49–50, 54–56 |
| P22E | OPTIONAL_BEYOND_SLIDES | L22 `l22-s5` | Distinguish atomic commit from replicated consensus using a primary-paper extension. Majority agreement among decision replicas does not replace readiness of all transaction participants. Basic 2PC can block a prepared participant that loses decision access; not every failure blocks every operation. | L22: 20, 49, 56–57; Consensus on Transaction Commit: 2–7, 9–10 |

## Conjunctive queries, parallelism and NoSQL findings

| ID | Baseline status | Target | Proposed explanation and original check | Public source physical pages |
| --- | --- | --- | --- | --- |
| G23-1 | DEPTH_ADDITION_PROPOSED | L23 `l23-s1`, `l23-s2` | Connect positive conjunctive SQL to algebra and safe calculus, with set semantics and Codd expressiveness separated from cost. An original Enrol/Teach query returns A and B under DISTINCT. | L23: 2–11, 14–18 |
| G23-2 | DEPTH_ADDITION_PROPOSED | L23 `l23-s3`, `l23-s4`, `l23-s5` | Explain valuations, fixed constants, output projection, duplicate collapse and Boolean empty tuples. A supplied two-hop Link instance gives (a,c), (b,c), (c,c); (a,c) has two witnesses. | L23: 26, 31–33 |
| G24-1 | DEPTH_ADDITION_PROPOSED | L24 `l24-s3`, `l24-s4` | Explain containment direction, head-preserving homomorphisms, constants and fixed-query versus combined complexity. `A(x):-R(x,y),R(x,z)` and `B(x):-R(x,y)` are equivalent by mapping z to y. State the positive-CQ setting. | L24: 19–22, 25–26, 28–31 |
| G24-2 | DEPTH_ADDITION_PROPOSED | L24 `l24-s5` | Explain repeated-atom deletion, head binding, cores and isomorphism without a polynomial minimization claim. For `Q(x):-R(x,y),R(x,a),S(x),S(x)`, collapse duplicate S and map y to fixed a to obtain core `R(x,a),S(x)`. | L24: 32–37 |
| G25-1 | DEPTH_ADDITION_PROPOSED | L25 `l25-s1`, `l25-s2`, `l25-s3` | Distinguish primal graph, hypergraph and join-tree nodes. A single U(a,b,c) atom and triangular R(a,b),S(b,c),T(c,a) have the same primal graph but different hypergraph acyclicity. Scope tractability claims to the stated class/model. | L25: 3–6, 11–12, 25–26 |
| G25-2 | DEPTH_ADDITION_PROPOSED | L25 `l25-s4`, `l25-s5` | Explain candidate-head constraints, constants, repeated variables and atom occurrences. Bottom-up semijoins suffice for the stated Boolean decision, not arbitrary full-answer enumeration. In the supplied R/S/T/U tree, the surviving witness is (b,1,k); replacing T by only c empties the root. | L25: 27–36 |
| G26-1 | DEPTH_ADDITION_PROPOSED | L26 `l26-s1` | Distinguish latency and throughput, course-specific parallel/distributed terminology and shared-memory/disk/nothing costs. Replication must not multiply the logical bag of rows; data transparency does not imply unchanged latency. | L26: 2–8, 18, 45 |
| G26-2 | DEPTH_ADDITION_PROPOSED | L26 `l26-s2` | Explain disjoint round-robin/hash/range partitioning, skew and replication. Round-robin 1–10 over three partitions gives {1,4,7,10}, {2,5,8}, {3,6,9}. Equal row counts do not guarantee equal bytes/load. | L26: 12–17, 20–21 |
| G26-3 | DEPTH_ADDITION_PROPOSED | L26 `l26-s3` | Distinguish node/partition/in-memory hash functions and compatible join partitioning. In the original range example, both sides split at 100 retain matches for keys 75 and 130; splitting S at 50 alone misplaces key 75 unless exchange repairs it. | L26: 22–25 |
| G27-1 | DEPTH_ADDITION_PROPOSED | L27 `l27-s1` | Explain horizontal/vertical scaling, routing and cross-shard costs without universal performance claims. 300 GB in three shards with two copies per shard totals 600 GB; one-key and all-category queries have different routing. | L27: 2–6 |
| G27-2 | DEPTH_ADDITION_PROPOSED | L27 `l27-s2`, `l27-s3` | Explain BASE, soft state and eventual convergence under stated progress/quiescence assumptions. Separate ACID invariant consistency from CAP linearizability, and staleness from lost durability. No universal convergence deadline follows. | L27: 8–9, 11 |
| G27-3 | DEPTH_ADDITION_PROPOSED | L27 `l27-s4` | Explain opaque key/value base APIs, additional product features and replica/failure domains. An acknowledged write at A can still be stale at delayed B under the supplied eventual-consistency example. | L27: 12, 14 |
| G27-4 | DEPTH_ADDITION_PROPOSED | L27 `l27-s4` | Explain JSON objects, ordered arrays, validation and transaction semantics separately. Age>25 selects Bo/Cy from ages 25/26/30; [a,b] and [b,a] are different arrays. Relational systems can also store JSON. | L27: 15–17, 21 |
| G27-5 | DEPTH_ADDITION_PROPOSED | L27 `l27-s4`, `l27-s5` | Separate property graphs, RDF and language contexts without unverified standards dates. A two-hop Friend path reaches Cy; an unrelated Drives edge does not invent a Cy/Car8 result. | L27: 13, 18–19 |
| G27-6 | DEPTH_ADDITION_PROPOSED | L27 `l27-s5` | Mark product rankings as the historical March 2026 slide example, not current performance evidence. Match catalog, checkout and recommendation requirements to contracts; stale recommendations must not become inventory authority. | L27: 20–21 |
| G27-7 | PRIMARY_SOURCE_REFINEMENT_PROPOSED | L27 `l27-s2`; `l27-cap-q1`–`l27-cap-q5` | Explain CAP from the formal primary source: linearizability and successful availability over permitted executions with communication loss. An error response is not a successfully served read. Preserve existing keys and add per-question primary-paper references. | L27: 9–10; Gilbert/Lynch: 2–4 |

## Proposed original bank additions

Canonical answer positions are zero-based and describe the supplied options. Presentation may permute the options while preserving their canonical meanings and saved selections.

| Stable question ID | Concept and expected conclusion | Canonical answer | Source physical pages |
| --- | --- | --- | --- |
| `ex13-models-q1` | 2,050 rows with batch size 1,000 → 1,000, 1,000, 50, EOF | 1 | L13: 13–18 |
| `ex14-rewrite-q1` | The stated self-join elimination needs exactly one right-side match for every left row. | 1 | L14 2×2 handout: 1–3 |
| `ex15-sort-q1` | The stated B=7 sort of the 50-page input has extra cost 250. | 2 | L15: 25–29 |
| `ex15-fair-q1` | The stated projected-outer in-memory alternative costs 212. | 2 | L15: 39–43 |
| `ex16-costs-q1` | Internal descent plus leaf and clustered data scans costs 54. | 2 | L16: 16–18 |
| `ex17-depth-q1` | The equi-depth example estimates A≥7 as 45 rows. | 2 | L17: 15–26 |
| `ex18-enum-q1` | Retaining the ordered intermediate gives total cost 72. | 2 | L18: 8–23 |

## Citation precision, assumptions and source errata

| Item | Baseline recommendation | Boundary |
| --- | --- | --- |
| L14 query-goal q3 | Use handout physical pages [1,3]. | Retain the 7-page 2×2 handout variant unless all citations are explicitly remapped. |
| L16 index-scan q3 | Use physical pages [4,5,6,19]. | Hash lookup support is on p19; it is not a B-tree reference. |
| L16 clustered B-tree q1/q2 | Clarify that the given three I/Os are **internal-node descent before leaf scanning**. | Avoid counting the first leaf twice; keep the existing answer. |
| L18 principle-of-optimality q3/q4/q5 | Use physical pages [13,20]. | Explain useful physical properties and the restricted search-space guarantee. |
| L16 `l16-s2` | Link hash explanation to p19. | Do not imply that B-tree pages 7–15 support hash-chain costs. |
| L17 `l17-s3` | Include p12 for missing-statistics discussion. | Default estimates depend on implementation/version; no timeless product-wide number is asserted. |
| `l22-two-phase-commit-q5` | Extend decision/ACK citation to the relevant pages 38–43 or 47. | Retain existing answer 2; losing an ACK does not undo a durable commit. |
| L22 `l22-s2` | Extend explanation evidence to pages 31–47. | Treat force/END behavior as the specific shown variant. |
| L22 dense-message explanation | Cite p55 and scope the numbering stream. | No broad claim that every network protocol uses one global dense sequence. |
| L15 source p30 | Source-slide total 3,510 conflicts with the components. Correct sum: 1,500+30+1,750+260 = **3,540**, consistent with p27. | This is a source erratum, not a newly found wrong website answer key. |
| L17 source p20 | The shown selected range is **[5,8]**, not the printed [5,18]; the shown quarter selects 19 under the supplied example. | This is a source erratum. |
| L20 source p17 | The depicted unlock-before-commit ordering can mislead a strict-locking explanation. | Explain lock retention to completion using the actual protocol scope. |
| L22 source p57 | Informal consensus/availability wording needs primary-source qualification. | Atomic commit is not identical to consensus, and not every failure makes every service operation unavailable. |

### L14 source variant

The retained [L14 2×2 handout](https://opencourse.inf.ed.ac.uk/sites/default/files/https/opencourse.inf.ed.ac.uk/adbs/2026/lecture14-query-optimisation-plan-space-2x2.pdf) has seven physical pages. A normal one-slide-per-page variant has 26 physical pages. Handout pages 1–7 map to normal physical ranges 1–4, 5–8, 9–12, 13–16, 17–20, 21–24 and 25–26 respectively. Printed slide numbers skip 11 and 13; they must not be used as physical-page indices. Changing the source variant without remapping every citation is unsafe.

## Public primary evidence and publication boundaries

The source page references above identify Edinburgh's public 2026 ADBS resources. Exact URLs are retained in [baseline-inventory.json](baseline-inventory.json) and [coverage-matrix.json](coverage-matrix.json). This report links evidence; the repository does not redistribute course PDFs or textbooks.

- [ARIES primary paper](https://cs.stanford.edu/people/chrismre/cs345/rl/aries.pdf): optional CLR/restart extension, physical pages 20–21, 25 and 29–34. It must be marked beyond the introductory source slides.
- [Consensus on Transaction Commit](https://dsf.berkeley.edu/cs286/papers/paxoscommit-tods2006.pdf): optional atomic-commit/consensus extension, physical pages 2–7 and 9–10.
- [Gilbert and Lynch's CAP paper](https://groups.csail.mit.edu/tds/papers/Gilbert/Brewer6.pdf): formal source for the CAP clarification and per-question provenance, physical pages 2–4.

The reported 650 answer checks are reviewer baseline conclusions. This condensed document does not claim a fresh independent reread of every source byte, a hash-verified PDF corpus, an exhaustive textbook audit or post-change acceptance. No exact RG/DBT textbook page is invented. Canvas/LEARN-only assigned readings, instructor-specific rubrics, deadlines, presentation durations and submission rules remain unverified. Private course content and URLs are excluded.

## Required post-integration evidence

Keep this baseline report unchanged when resolving findings. Record the implementation target and supporting test in separate resolution records, then independently inspect the actual rendered material. Appropriate checks include arithmetic under the stated assumptions, preserved original answer/option semantics, source variants and physical-page targets, 2PC prepared-state recovery, query results/duplicates and honest historical product labels.

Technical acceptance must also cover navigation, reading, quiz grading, old saved progress/answer migration and the 13-module/15-week/30-session syllabus counts. A successful build or JSON validation does not by itself verify these teaching explanations or the deployed site.
