# Independent review: supplements 28–31

Reviewer: integration owner, independent of the supplemental author. Read all 28 EN and 28 corresponding VI sections in canonical course files, including all answers. Compared the causal sequence, numerical inputs, assumptions, failure cases and qualification of paper claims. This is an editorial review, not a human learner study or an independent reproduction of the papers.

The explanations now make a systems choice before naming the research: a prediction needs a correctness/fallback contract; ANN needs a defined reference result; semantic filters need labels and a quality budget; remote storage needs durable evidence and valid ownership. EN/VI retain the same intermediate steps. Research results are qualified by their workloads; hypothetical prices/timings and unrun GPU experiments are clearly marked.

## Changed-input tasks independently calculated

| Resource | New task | Result and reasoning |
|---|---|---|
| 28 | Estimate 200 vs actual 800; planning/execution 2+10 vs 9+6 ms | q-error 4. End-to-end times 12 vs 15 ms: better execution alone loses after planning. |
| 28 | One-time 900 s, saving 0.003 s/request | 300,000 requests to break even before retraining/operating costs. |
| 28 | Key counts R=(4,2), S=(3,1) | Join has 4×3+2×1=14 rows; Cauchy–Schwarz gives √200≈14.142, hence an integer upper bound 14. |
| 29 | q=(1,0), A=(3,0), B=(1,1), no normalization | Squared Euclidean chooses B (1 vs 4); inner product chooses A (3 vs 1). Cannot transfer unit-vector equivalence. |
| 29 | Exact top4={a,b,c,d}, approximate={a,c,x,y}; 40 candidates with independent 30% acceptance | recall=2/4=0.5. Expected survivors=12, not a guarantee of twelve or a filtered-recall measurement. |
| 30 | TP36, FP4, FN9 | Precision 36/40=0.9, recall36/45=0.8; a recall≥0.9 requirement fails despite good precision. |
| 30 | A cheap stage confidently rejects a true positive | Uncertainty-only routing never sends that note onward. More expensive-stage accuracy cannot recover an unseen note. |
| 31 | 500 pages×8KiB at1GiB/s, RTT0.4ms,50 outstanding | Transfer lower bound≈3.815ms; serial RTT200ms; ideal ten-batch RTT4ms. Ideal overlap lower bound max≈4ms, not an automatic sum or measured performance. |
| 31 | A returns with generation8 after B received generation9 | Reject stale A authority; a cached value or live process does not establish current write permission. |

Numerical results were independently computed with Node, separately from the authored worked answers. The changed tasks test the same reasoning on different numbers rather than reciting definitions.

No blocking mathematical or EN/VI reasoning mismatch found in this scope. Exact source identity and page validation remain documented by the author in group-28-37.md; this reviewer did not claim to rerun GPU/model/distributed experiments. Root browser review separately checks rendered versions at desktop/mobile widths.
