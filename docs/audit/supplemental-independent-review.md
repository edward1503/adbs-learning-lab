# Independent review of supplemental Modules 11–13

Review date: 2026-10-11. This review examines the proposed supplemental packet, not a deployed site revision. The packet is correctly separated from the 27 Edinburgh lectures and does not claim that the inaccessible Canvas reading list or instructor rubric has been verified.

## Scope and results

- Read the ten proposed session records, including 64 sections and ten embedded checks, plus all 50 questions in the supplemental bank.
- All 50 answer keys are substantively correct. The ten embedded checks exactly match their bank counterparts. Correct-option positions are balanced 13/13/12/12, and no five-question bank uses the earlier fixed cyclic pattern.
- Independently recomputed all 18 values in the arithmetic check list: q-error, end-to-end speedup and break-even, join degree/count bound, vector and graph memory, cascade cost, precision/recall, transfer/round-trip components, workload versus mean speedups, and GPU budget.
- No incorrect numerical result or embedded-check answer found.
- Publication status is appropriately distinguished from the date of an author manuscript. H100 feasibility examples are marked as estimates, not performed benchmarks.
- No site files were edited or published by this review.

## Corrections verified in the revised packet

1. In supplement-33-s5, the exercise comparing a 2% speed gain with approximately 5% run-to-run variation cannot infer instability from those two percentages alone. Sample size, dependence and uncertainty matter. Replace the answer with:

“These two percentages alone are insufficient to establish or rule out a 2% benefit. Inspect the number of independent repetitions, paired differences where appropriate, and an uncertainty interval for the effect. Improve controls or gather justified repetitions if uncertainty is too wide, and separately judge practical importance.”

2. In supplement-29-s1, replace “declared metric: Euclidean distance, cosine distance or inner product” with:

“declared distance or similarity measure: Euclidean distance, cosine distance or inner product similarity”

Inner product similarity and ordinary cosine distance are not generally metrics in the mathematical sense. The normalized-vector ranking equivalence itself is correct.

Both corrections are now verified in the revised lesson records, readable content packet and corresponding per-session transfer packets. This acceptance concerns the reviewed content, not its deployment. The related statistics quiz also now explicitly states that the two percentages alone neither establish nor rule out an effect; its correct answer is unchanged.

## Primary-source spot verification

- [Lehmann, Sulimov and Stockinger, PVLDB 2024](https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf): the publisher-indexed abstract supports the caution about train/test splits and the native PostgreSQL comparison. Do not generalize this result to every learned optimizer.
- [GRASP, PVLDB 2025](https://www.vldb.org/pvldb/vol18/p2519-wu.pdf): title, authors, venue, DOI, data-agnostic scope and imperfect-workload motivation agree with the packet. Its broader SQL limitations remain reading questions rather than invented support claims.
- [PODS 2024 accepted-paper list](https://2024.sigmodconf.hosting.acm.org/pods_list.shtml): confirms acceptance of the Lp-norm degree-sequence paper. The packet's Cauchy–Schwarz calculation is explicitly an original two-vector illustration, not a statement of the paper's general theorem.
- [CAGRA author record](https://arxiv.org/abs/2308.15136) and [RaBitQ author record](https://arxiv.org/abs/2405.12497): explicitly confirm ICDE 2024 and SIGMOD 2024 acceptance, respectively. Their preprint dates are not misrepresented as publication years.
- [LOTUS published paper](https://www.vldb.org/pvldb/vol18/p4171-patel.pdf): supports reference-relative statistical accuracy, not unconditional factual truth. The packet correctly warns about composition and shared reference errors.
- [DocETL published paper](https://www.vldb.org/pvldb/vol18/p3035-shankar.pdf): confirms the title and four-task empirical scope.
- [SIGMOD 2024 official program](https://2024.sigmodconf.hosting.acm.org/program_sigmod.shtml): identifies PolarDB-MP as an Industry paper. The packet does not relabel it research-track or PODS.
- [GaussDB publisher-indexed paper](https://www.vldb.org/pvldb/vol17/p3786-li.pdf): the indexed abstract supports compute/memory/storage roles, ownership transfer, affinity-aware routing and two-tier recovery. Direct full-PDF retrieval timed out; this review does not claim a full implementation-section or theorem audit.

## Remaining boundary

All 50 supplemental questions have now been checked. This review does not establish deployment correctness, browser rendering, accessibility, saved quiz-state migration, or that any benchmark has been run. The bibliography was spot-verified against primary publication records and paper passages, not exhaustively audited claim by claim through every cited paper.
