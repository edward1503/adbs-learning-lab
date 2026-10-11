# Independent review of integrated execution and transaction additions

Review date: 2026-10-11. Reviewer: the CQ/NoSQL integration worker, independently reviewing the execution/transaction worker's content.

**Disposition: accepted for integration after the three corrections below.** No unresolved incorrect worked result or answer key was found in the reviewed additions. This is content acceptance of the canonical local files; browser, build, CI and deployment acceptance remain separate checks.

## Scope and method

- Read the complete appended HTML for all ten execution/optimization additions EX13–EX18 and all fourteen transaction/recovery/distributed additions P19–P22 in `course/lecture13.json` through `course/lecture22.json`.
- Read all seven new bank questions, their options, explanations and source overrides. Compared the implemented explanations with the coordinator's source-linked packets and stated assumptions.
- Independently recomputed the numerical examples and replayed the conflict/view, recoverability, locking, recovery and distributed-decision cases. Ran the six focused tests in `tests/execution-transactions-audit.test.mjs`; all six passed.
- Compared every original bank question by stable ID against source commit `b694ecf13394d3cf9f35bf78b880bb95acf46995`: all 1,100 original option arrays and answer indices remain exactly unchanged. This verifies preservation of the previously audited answer meanings; it is not a second independent solution of all 1,100 questions.
- Read the 33 entries in the implementation resolution record, including citation/assumption refinements and source-slide errata. Source URLs and physical-page scopes agree with the supplied packets. This reviewer did not redownload and exhaustively reread every cited PDF.

## Execution and optimization results

| Finding | Independently checked result and contract | Disposition |
|---|---|---|
| EX13-MODELS | 2,050 rows split into full batches of 1,000, 1,000 and a partial 50, followed by EOF. Pull requests travel downward; tuples/batches return upward. Materialization and workload tendencies do not alter logical result semantics. | Accepted |
| EX14-REWRITE | A non-NULL primary-key self-join over the same relation gives each left row exactly one right match. Two rows sharing one nonunique key produce four pairs, rather than two; bag multiplicity prevents the proposed elimination. | Accepted |
| EX15-SORT | At B=8: run counts 2 and 7, one merge each, 800+36+150+62=1,048 I/Os. At B=7: Customers runs 8→2→1, two merges, 800+36+250+62=1,148. Base reads are charged once; no final-merge/join fusion and no final output writes are silently assumed. | Accepted |
| EX15-FAIR | Matched clustered access yields 12+1,200=1,212 for indexed probes versus 12+200=212 for retained keys and scan. The smaller case yields 1+30=31 versus 1+200=201. Retained keys preserve multiplicity. The earlier 800-page heap baseline is correctly separated. | Accepted |
| EX16-COSTS | Internal descent excludes leaf scanning: 3+0.05×120+0.05×900=54; index-only 3+6=9. RIDs [7,2,7,4,2] refer to three distinct pages under the stated retention assumption. Real visibility/cache costs are qualified. | Accepted |
| EX16-HASH | Nonunique and failed searches inspect the primary bucket and full overflow chain. One primary and two overflow pages cost three bucket-only reads; directory, record and cache costs remain separate. Successful known-unique lookup may stop at its match. | Accepted |
| EX17-RANGES | Integer domain 10…29 with A>24 gives 5/20=0.25; continuous [10,30] gives 6/20=0.30. Out-of-domain bounds are clipped and the degenerate single-value case avoids division by zero. | Accepted |
| EX17-DEPTH | Thirty rows per inclusive bucket [1,3], [4,9], [10,12] gives estimates A=5:5, A=11:10, A≥7:45/90=0.5, and 2≤A≤10:60/90=2/3. Uniformity inside buckets and version-specific missing-statistics defaults are explicit. | Accepted |
| EX18-ENUM | Complete route costs are 85,72,85,70; required ORDER BY a changes them to 115,102,115,70. The 52-cost b-ordered intermediate wins its RS extension at 72. Cartesian pruning and optimizer optimality are appropriately scoped. | Accepted |
| EX18-COUNTS | Two ordered binary shapes × 3! gives 12; five shapes × 4! gives 120; one four-relation left-deep shape gives 24 leaf orders. These are stated syntactic counts before physical algorithms and predicate/equivalence pruning. | Accepted |

All seven new questions have the correct keyed option:

| Question ID | Canonical answer index | Correct meaning |
|---|---:|---|
| ex13-models-q1 | 1 | 1,000; 1,000; 50; EOF |
| ex14-rewrite-q1 | 1 | Exactly one right-hand match for each left row |
| ex15-sort-q1 | 2 | 250 extra materialized-sort I/Os |
| ex15-fair-q1 | 2 | 212 I/Os under the matched clustered access |
| ex16-costs-q1 | 2 | 54 I/Os with internal descent defined separately |
| ex17-depth-q1 | 2 | 45 estimated rows |
| ex18-enum-q1 | 2 | 72 for the cheaper complete RS route |

These are source-option indices, not a claim about displayed letter balance. The application's option-permutation behavior is reviewed separately.

## Transactions, locking and recovery results

| Finding | Prose and replay checks | Disposition |
|---|---|---|
| P19-A | Database schedules abstract object reads/writes, and rollback does not recall a physical shipment. Concurrency control, atomicity and durability remain distinct obligations. | Accepted |
| P19-B | The three-transaction trace gives T2→T1→T3, with no direct T2/T3 conflict. The adjacent R2(B)/W1(A) swap is nonconflicting. The independent T3 has three placements around required T1<T2. | Accepted |
| P19-C | Strict ⇒ cascadeless ⇒ recoverable under the stated definitions. W1,R2,C2,A1 is nonrecoverable; W1,R2,C1,C2 is recoverable with a dirty read; W1,C1,R2,C2 is cascadeless. The no-read dirty-write trace is vacuously cascadeless but not strict. The hierarchy is labeled a supplementary bridge. | Accepted |
| P19-D | R1(A),W2(A),W1(A),W3(A) has a conflict cycle but the same initial read and final writer as serial T1,T2,T3. R1(A),W2(A),R1(A) has no view-equivalent serial placement of T1/T2. | Accepted |
| P20-A | S/S compatibility and X read/write authority are correct. The individually locked example reacquires after release and violates 2PL. Basic 2PL's cascading risk is explicit. The lecture's all-S-and-X-until-completion convention is distinguished from terminology that calls it rigorous 2PL. | Accepted |
| P20-B | Wait-die waiting edges increase timestamps; wound-wait waiting edges decrease them. Neither monotone direction admits a cycle. Restart retains age. Atomic whole-set conservative preclaiming is distinguished from sequential requests; waits-for and precedence graphs have different meanings. | Accepted |
| P21-A | Transaction, volatile-system and media failures have distinct assumptions. Update 20→15 is undone to 20 and redone to 15. Destruction of both data and its log requires surviving backup/replica evidence. | Accepted |
| P21-B | The no-flush trace redoes A=10,B=3, then undoes T2 to B=7, ending A=10,B=7. Analysis/checkpoint and redo starting positions are distinguished. Durable PREPARE is explicitly excluded from ordinary single-node loser undo. | Accepted |
| P21-C | The optional CLR example redoes CLR 30 to restore B=9, follows undoNextLSN=10, and restores A=5. It does not undo the CLR or compensate LSN 20 again. Full transaction chains, pageLSN tests and WAL requirements are acknowledged. | Accepted |
| P22-A | Shared-nothing partitioning is separated from replication. Two individually acyclic local waits-for graphs can combine into T1↔T2. Coarse whole-table authority must cover the logical table. | Accepted |
| P22-B | Durable participant PREPARE precedes YES; durable coordinator COMMIT precedes announcement; durable participant COMMIT precedes ACK under the stated protocol. Missing ACK cannot reverse the decision. END is completion bookkeeping and its forcing rule is explicitly variant-dependent. | Accepted after clarification |
| P22-C | Presumed-abort coordinator absence is scoped to that convention. A prepared participant without a decision remains in doubt and cannot abort on timeout; abort's lack of further protocol work does not waive local cleanup. | Accepted |
| P22-D | Dense numbering is per declared stream, detects gaps but does not guarantee delivery. The prepared interval retains the lecture's strict locks, and prepared participants are not undone as ordinary losers without the permitted global outcome. | Accepted |
| P22-E | Optional Paxos Commit discussion separates decision replicas from transaction participants. A replica quorum cannot override West's NO. Basic 2PC may block an in-doubt participant; the text does not claim every failure blocks all work. | Accepted |

Independent temporary replay checks additionally passed for the four recoverability histories, 2PL reacquisition, five distinct timestamp ranks in both monotone wait directions, the local/global wait cycle, repeat-history and CLR continuation, durable message order, and the prepared-state outcome boundary. These small checks illustrate the stated cases; they do not implement or certify a production lock manager, ARIES or atomic-commit protocol.

## Issues found, corrected and reread

1. **L15/l15-s3, cost-language precision:** “Both 800 base-page reads” was ambiguous about the combined input cost. The root changed it to “The combined 800 base-page reads have already been charged.” Reread the actual corrected section; 1,048/1,148 totals are unchanged.
2. **L17/l17-s2, HTML rendering:** the exercise summary had `A&amp;gt;24`, which renders the literal entity text. The root replaced it with the single-encoded `A&gt;24`. Verified the old double-encoded text is absent from that section. Its arithmetic and answer are unchanged.
3. **L22/l22-s2, durable ACK boundary:** the root made participant durability explicit: “Under the stated protocol, a participant durably records COMMIT before its ACK, and applies the decision with the required local recovery actions.” Reread the full corrected paragraph and confirmed that PREPARE, coordinator COMMIT, irrevocability and END-variant qualifications remain intact.

No incorrect original website answer was inferred from the documented slide errata: L15's displayed 3,510 versus the computed 3,540, and L17's mislabeled interval are source-slide issues with a separate provenance record. The two L16 descent-prompt clarifications preserve the original 113/13 answer meanings, and the six question-page refinements preserve keys and options.

## Remaining acceptance boundaries

- This review read canonical content and assessed supplied source evidence; it did not claim a new exhaustive audit of every source PDF or every pre-existing advanced-course question.
- Physical-page citations and optional-extension scope are retained. No textbook, Canvas reading list, instructor deadline or rubric has been invented or newly verified.
- Six focused tests and independent replay checks passed. The main integrator must still run the complete suite, inspect rendered lessons, check navigation/quiz/progress behavior, and verify CI/CD before publishing.
- The preservation comparison covers exact original option meanings and answer indices. It does not establish DOM rendering, saved quiz-state migration or deployment correctness.

## Reviewed canonical snapshot

The hashes below bind this content acceptance to the local files read after the three corrections. Later content changes require a proportionate recheck.

| Canonical file | SHA-256 |
|---|---|
| course/lecture13.json | 9c51db78f28075b3c2ceaded15b5d96c2828f18c925412f231bd2a22001ffe30 |
| course/quiz13.json | 9e9aa32324c270f9ea4053f43d4de88b63a7260a8f9d2358ef44bd85804039f1 |
| course/lecture14.json | be8257388bf13c4056187b86621b07fd374ad95a9542582c74e259da1c9bb7d8 |
| course/quiz14.json | 19a9ad771da9ac209b9e9dbbe51bb1d538a04cdfee78b610029410a80707b694 |
| course/lecture15.json | c04e4f9b8333c412719a6ab77ccb5b06f4c3a11bb20c25838ee6e800020aadd5 |
| course/quiz15.json | 9a901046ee43e0415b16fd66c0d060de145158a34ee08011ded4ee1d75941eb2 |
| course/lecture16.json | a704838c5469232b161ef53bac9b9f94b32139336baea76e54fa7bb5271e59e3 |
| course/quiz16.json | 04cd4fa7647634e4a4c30861e71141df48a3354781b2bcff55e9e3db2d7c9e9a |
| course/lecture17.json | b7714dcc563222f360593617041bbb1b49a3defe442c60b6cbfa65d70e759a55 |
| course/quiz17.json | 4b0596621a9c110f818252d65dabb252cb69e3465b1f0f58b3bffb39ed0e7f37 |
| course/lecture18.json | 40e38f20b4a5182af2192d2a1eb4ba4efc124bc7a51bb44bbaac7a1fe61bd658 |
| course/quiz18.json | 04ff9f33eb10d9d0415320b55303b317050235f6f992a8a1bf2fe7ba6a496bde |
| course/lecture19.json | 3ae875cf0080e98276ed21af1f556165708d48fe68fe916d57e177bc35b21c21 |
| course/quiz19.json | bf7d7bb42a63d3cca15d7842816710871d4d58c6bb1a8e71edd1581146b86a33 |
| course/lecture20.json | a4a3e9223344649dad0bfe4f1199fe020c574161893d8c9540490202ea60689f |
| course/quiz20.json | faff55cef213745806cb1537de3df1740377bfaeaa8e43da3985a98c062a9db7 |
| course/lecture21.json | 3be941d9ef673976c78664b891ea19b1dabe5ff378d514c234f42cbd34168843 |
| course/quiz21.json | eb83192074910023a2278411a67a0c07b6eed4030fc044824854865bd13a7cea |
| course/lecture22.json | e45e19d9d0271b292222e3d7603688c28e88423e64ea57bbb6b3a32d6a213460 |
| course/quiz22.json | 01a4908d82c8d1777ce3fc6944df57b1b39d90131769b7468d3bea8e98aa3c72 |
