# Independent learner-comprehension review: supplements 28–37

> Baseline evidence only. This review precedes candidate editing and does not grant candidate acceptance. Rendered baseline captures were generated locally from commit `0a1fb0363d2c44a0ca8f508f4e964a01af128720`; references to `readability-work/baseline` describe that capture, not a public folder. Canonical historical text is available in the linked Git commit.


Reviewed 2026-10-11. Scope: every actual rendered supplement, in order, including revealed exercises/answers and source/status labels. Read-only baseline: `readability-work/baseline/supplement-28.md` through `supplement-37.md`, captured from baseline main `0a1fb0363d2c44a0ca8f508f4e964a01af128720`. The active isolated branch supplied by the parent is `readability/learner-review-2026-10`; this review does not edit course content, Git, tests, or deployment.

This is an independent text-based learner-comprehension analysis and worked transfer check. It is not empirical human testing, a claim that learners completed tasks, or a fresh verification of the cited papers. I treated paper summaries as attributed research claims and checked whether their conditions are intelligible and preserved. All fresh exercises below are original hypothetical checks, solved from the resource's stated rules plus the explicit facts in the exercise.

## Scope and overall judgment

The resources generally preserve the crucial scientific boundaries: original course supplement versus verified assigned reading; paper-reported versus locally measured results; candidate oracle versus global optimum; prediction/metric quality versus systems benefit; analytical estimate versus measured peak allocation; and single-device feasibility versus multi-device scaling. Existing arithmetic examples checked here are internally consistent. The main weakness is that correct cautions and good research checklists often arrive before a beginner has a minimal operational model to which they can attach them.

The sequence progresses coherently from frontier mechanisms (28–31), to research planning/evaluation (32–35), to explanation/review (36–37). It should make that sequence explicit, and give each resource a short prerequisite bridge and one small complete trace. Particularly important corrections are metric direction in 29, classification definitions in 30, WAL/ownership vocabulary in 31, aggregation/uncertainty instruction in 33, signed factorial effects in 34, and the missing mechanism example in 36.

### Every rendered section checked

Stable IDs below are from the immutable rendered baseline. `status` includes the full suggested/official boundary. Source shelves, all stated goals, all takeaway boxes, every exercise, and all revealed answers were also read.

| Resource | Sections checked, in displayed order | Section-level coverage judgment |
|---|---|---|
| 28 | `supplement-28-status`, `supplement-28-s1`, `-s2`, `-s3`, `-s4`, `-s5`, `-s6` | Contracts, q-error, overhead/break-even, three research contracts, split/fallback protocol, and critical-reading answer all covered. Definitions and causal plan trace need a bridge. |
| 29 | `supplement-29-status`, `supplement-29-s1`, `-s2`, `-s3`, `-s4`, `-s5`, `-s6` | Exactness/recall, mechanisms, filtered recall, paper scope, memory/sharding protocol, and quality-matched answers covered. Metric direction and toy exact ranking are missing. |
| 30 | `supplement-30-status`, `supplement-30-s1`, `-s2`, `-s3`, `-s4`, `-s5`, `-s6` | Two uses, pushdown/cascade bill, reference-versus-truth claims, evaluation, GPU feasibility, and leakage repair covered. Class-label vocabulary and a row-by-row cascade trace need explanation. |
| 31 | `supplement-31-status`, `supplement-31-s1`, `-s2`, `-s3`, `-s4`, `-s5`, `-s6` | Architecture boundaries, cost model, commit/failure, source-specific designs, experiment, and synthesis answers covered. Topology, units, and WAL/ownership/fencing need explicit definitions. |
| 32 | `supplement-32-status`, `supplement-32-s1`, `-s2`, `-s3`, `-s4`, `-s5` | Five-part question, causal chain, evidence matrix, research charter, and consultation/rescope covered. Open/closed-loop and a filled evidence/decision row are missing. |
| 33 | `supplement-33-status`, `supplement-33-s1`, `-s2`, `-s3`, `-s4`, `-s5` | Baseline roles, metric reversal, timing/failures, evaluation matrix, and uncertainty answer covered. General formulas, censoring calculation, percentile vocabulary, and a concrete uncertainty procedure need teaching. |
| 34 | `supplement-34-status`, `supplement-34-s1`, `-s2`, `-s3`, `-s4`, `-s5` | Fair ablations, four cells, assumption stress, host-bound negative result, and bounded claims covered. Factorial interaction needs a table and sign convention. |
| 35 | `supplement-35-status`, `supplement-35-s1`, `-s2`, `-s3`, `-s4`, `-s5` | Artifact boundary, manifest, two-level path, budget, and report audit covered. A fully filled traceable artifact example and resource-specific cost units would improve transfer. |
| 36 | `supplement-36-status`, `supplement-36-s1`, `-s2`, `-s3`, `-s4`, `-s5` | Story questions, outline, scoped headline, handoff, citation/rehearsal answers covered. The advertised small operational mechanism example is absent. |
| 37 | `supplement-37-status`, `supplement-37-s1`, `-s2`, `-s3`, `-s4`, `-s5` | Question categories, response examples, specific peer review, frontier/core contract links, and correction/handoff covered. Condition prewritten claims before presenting them; add one filled correction/next-test row. |

### Every goal: explain, trace, transfer, identify assumptions

`S` means sufficient for the stated task at a small scale from this resource; `P` means partial, relying on an unstated definition, implicit reasoning step, or a template without a complete example; `M` means the advertised worked element is missing. These are reviewer judgments, not learner test results. Each row corresponds to a displayed “After this resource” goal.

| Resource and goal | Explain | Trace | Transfer | Identify assumptions |
|---|---|---|---|---|
| 28: locate learning at four DBMS boundaries | P: four roles clear; plan/cardinality/selectivity bridge absent | P: only index lookup is operationally traced | P: selecting a component needs an explicit input→output→decision example | S: correctness, maintenance, fallback boundaries explicit |
| 28: calculate q-error and break-even | S: positive-value formula and cost boundary stated | S: correlation, q-error, total cost, amortization examples | S: fresh positive-count and cost calculation below | S: zero convention, overhead, excluded retraining stated |
| 28: leakage-resistant evaluation and fallback | P: template/validation/ablation vocabulary assumed | P: procedural list lacks a tiny assigned split/fallback trace | P: can choose regimes, but not implement a split from one example | S: tuning/test separation and confidence limits explicit |
| 29: exact top-k and same-metric/filter recall | P: smaller-distance/larger-similarity direction omitted | P: ID intersection worked; ranking from coordinates/scores not worked | P: filtered recall transfers; defining exact ranking needs more instruction | S: normalization, ties, eligibility, denominator and relevance separated |
| 29: compare graph, IVF and compression | S: qualitative trade-offs described in approachable prose | P: no same-query toy traversal/probe/reranking trace | P: bottleneck advice lacks a worked choice among mechanisms | S: mechanisms can combine; build, transfer, filtering matter |
| 29: recall-matched GPU experiment and limits | P: FP32, QPS, percentiles, IVF-PQ/Flat and synchronization assumed | S: memory arithmetic and shard guarantee/limit are concrete | P: quality matching transfers; actual experiment setup remains checklist-level | S: lower-level estimate, peak memory, local approximation, 2× limits labeled |
| 30: DBMS assistance versus data operators | S: directions and four correctness checks clear | P: SQL duplicate example and semantic record path remain verbal | S: classify a new use and name its correctness target | S: SQL validity, semantics, labels and grounded answers distinct |
| 30: filter/cascade costs and quality | P: precision/recall first appear as formulas in the answer | S: date-filter and two-stage cost arithmetic concrete | S: fresh bill and quality gate below, after reading worked answer | S: trustworthy metadata, excluded evidence, calibrated routing, shared errors |
| 30: human labels versus reference evaluation | S: reference agreement distinguished from truth | P: no small joint example of shared reference/human-label errors | S: cannot turn agreement into factual accuracy | S: label policy, independent test, judge bias, search costs explicit |
| 31: compare three architecture types | P: shared-storage name and CXL/RDMA terms not unpacked | P: no drawn compute/memory/storage topology | P: cost consequences understandable; exact ownership boundary requires supplied design | S: cold cache, authoritative state, replication and coordination explicit |
| 31: ownership, WAL and recovery | P: WAL/fencing/durable commit/ownership assumed | P: correct failure prose needs numbered ordering and a stale-owner branch | P: can diagnose volatile-only commit; cannot derive a full protocol | S: durable evidence, dependencies, stale writers and old replicas explicit |
| 31: access cost and workload/failure experiment | P: binary units/concurrency model not taught stepwise | S: byte, serial round-trip and ideal overlap calculations | S: fresh remote-page calculation below | S: idealization, cache confound, fixed resources, emulation limits explicit |
| 32: bounded question/falsification | S: five parts plus negative possibility | S: example and rewritten optimizer question | S: bounded question/failed quality gate below | S: novelty, reproduction terminology and changed conditions labeled |
| 32: mechanism from bottleneck | S: possible causal chain and alternative host bottleneck | S: observables attached to arrows | P: no small trace showing which observed arrow is actually supported | S: queueing and end-to-end latency can reverse QPS win |
| 32: consultation evidence and decisions | S: agenda and actionable decision prompts | P: no filled evidence-matrix or decision-log row | S: select evidence and rescope to available hardware | S: actual instructor authority kept separate from suggested guidance |
| 33: baseline selection | S: practical, simple, ablation and oracle roles | P: no populated comparison table demonstrating each role | S: budget/quality/resource fairness checks transfer | S: defaults, reimplementations, equal tuning and workload confounds explicit |
| 33: total/per-query/tail metrics | P: geometric mean and percentile definitions not general | S: two-query reversal completely calculated | S: fresh two-query reversal below; >2-query formula missing | S: weighting, enough observations and correlated units matter |
| 33: repeatable timing/split/timeout policy | P: censoring, JIT, intervals/resampling and p-values assumed | P: requested timeline/lower bound/uncertainty procedure never worked | P: small timeout bound inferable; interval construction cannot be learned here | S: boundaries, fixed stopping, untouched test, failures and drift explicit |
| 34: isolating ablations | S: coherent fixed-parameter versus retuned comparison | P: no fully worked fixed-versus-retuned case | S: choose matched controls without changing task | S: remaining system must be valid, quality/resources held comparable |
| 34: small factorial interaction | P: factorial and signed interaction not defined | S: four values and conditional savings computed | S: fresh non-additive case below | S: scale, noise, mechanism and causal proof distinguished |
| 34: useful negative conclusions | S: verify controls, diagnose boundary, preserve negative result | S: fewer ANN evaluations but host-bound latency example | S: classify bounded supported/unsupported conclusion | S: exploration, exclusion, contention and correctness limits explicit |
| 35: package rerunnable evidence | S: artifact and manifest field roles | P: no filled input→command→raw file→figure chain | S: identify omissions and construct an evidence bundle | S: versions, permissions, unavailable data, hardware differences explicit |
| 35: smoke versus reproduction | S: execution-path versus performance evidence distinction | P: no actual miniature run and expected output | S: tiny test cannot establish performance reproduction | S: full dataset/protocol/environment/comparison required |
| 35: cost/data/claims audit | P: GPU-time versus preparation/build resource units ambiguous | P: 600 GPU-min calculation done; reuse alternatives unfinished | P: fresh typed budget below requires declared resource facts | S: estimates/measured values, licensing and official requirements distinct |
| 36: one supported talk claim | S: four questions, outline and scope | S: weak headline→bounded trade-off claim | S: fresh claim/quality-budget check below | S: hypothetical numbers, actual allocation and official rubric distinguished |
| 36: worked mechanism before benchmarks | P: instructs what to show but does not demonstrate it | M: operational baseline/proposed path absent | P: losing budget case supplied; path-to-cost reasoning not taught | S: waiting and throughput/latency trade-off acknowledged |
| 36: evidence slides and handoffs | S: units, denominators, evidence/limits, logical transitions | P: no rendered/example slide with annotated evidence | S: choose evidence and a logical speaker transition | S: uncertainty, source reuse, contributions and recorded demo status explicit |
| 37: critical questions and uncertainty | S: meaning/fairness/mechanism/generality categories | S: three appropriately bounded discussion examples | S: new unequal-memory objection answered below | S: unrun measurements, omitted subgroup evidence, evaluator limits explicit |
| 37: actionable peer feedback | S: concrete matched-recall example and suggested form | S: vague critique→specific methodological concern | S: alternative explanation plus one discriminating test | S: missing explanation versus flaw, evidence versus effort, no invented rubric |
| 37: next experiment and final artifact | S: preserve evidence/corrections and choose belief-changing test | P: no filled errata/next-experiment handoff | S: correct units and choose confound test | S: actual sharing process, measured boundary and limitations explicit |

## Priority findings and representative edits

Priority denotes likely learner impact: P1 = ambiguity/missing instruction at a core goal, P2 = substantial scaffold/transfer improvement, P3 = readability or copy-safety improvement. Suggested wording is illustrative; preserve original/supplemental, hypothetical, publication-status and unverified-Canvas boundaries.

### P1 — Metric direction and normalization must be explicit

**IDs:** `supplement-29-s1`, `supplement-29-s3`.

**Before:** “A query vector q is compared with a declared distance or similarity measure…” and “squared Euclidean distance is 2−2 times their inner product, so these rankings agree.”

**Problem:** A novice is not told that distance is minimized while similarity is maximized. The prose formula can be parsed as `(2−2) × inner product`. Dot product, unit normalization and cosine distance are not introduced. The recall example begins with already-known IDs, so it does not repair this prerequisite.

**Representative after:** “An embedding is a list of D numbers representing an object. For a distance, smaller is better; for a similarity, larger is better. Write the inner product as q·x. If both nonzero vectors have length 1, their squared Euclidean distance is d²(q,x)=2−2(q·x). Thus maximizing q·x minimizes d². For similarities 0.9, 0.7 and 0.2, the corresponding squared distances are 0.2, 0.6 and 1.6; both rules choose the first two for top-2. Without normalization the equivalence need not hold.” State a precise cosine convention rather than assuming all conventions match.

**Transfer evidence:** Exercise 29 below computes normalized score ordering, filtered exact IDs, recall and short-result precision. It also shows exactly which supplied direction assumption the baseline needs to teach.

### P1 — Teach TP/FP/FN and route semantics before cascade evaluation

**IDs:** `supplement-30-s2`, `supplement-30-s4`.

**Before:** “Exercise: a cascade labels 400 true positives correctly, misses 100 positives, and produces 50 false positives. Find precision and recall.” Formula definitions appear only in the worked answer; F1 later appears without definition.

**Problem:** The learner can copy a ratio without understanding which population is the denominator. The 25% routing example gives the right bill but never explicitly says the small model processes all 4,000 notes, 3,000 decisions are accepted and 1,000 are passed on.

**Representative after:** “Every retained note first goes to the small model. Accept 3,000 of its decisions; send 1,000 uncertain cases to the expensive model, which supplies those final decisions. You therefore pay for 4,000 small calls and 1,000 expensive calls. Against independent labels, TP is a correctly detected positive, FP is a negative incorrectly returned as positive, and FN is a positive missed. Precision=TP/(TP+FP) asks how many returned positives are correct. Recall=TP/(TP+FN) asks how many actual positives were found.” If F1 remains, define it as `2PR/(P+R)` and name P and R before using it.

**Transfer evidence:** Exercise 30 gives a cheaper cascade that fails a recall target; quality failure is distinct from cost arithmetic.

### P1 — Give WAL, ownership and fencing a complete failure trace

**IDs:** `supplement-31-s1`, `supplement-31-s3`, `supplement-31-s6`.

**Before:** “Before acknowledging commit, the system must satisfy its durable-commit rule for the corresponding log/commit information… Recovery must reconstruct the committed change from durable evidence and fence stale owners.” WAL is named in the goal and synthesis but never expanded.

**Problem:** The invariant is sound, but key nouns carry the reasoning. A learner unfamiliar with logging cannot say what was made durable, why the old page is acceptable, or what fencing prevents.

**Representative after:** “Write-ahead logging (WAL) saves enough information to redo a committed change before the system acknowledges that commit. A page owner is the node currently allowed to modify that page; fencing makes an old owner's authority unusable. Trace: (1) A obtains write authority and changes its cached page. (2) The required log and commit information become durable under this system's rule. (3) A acknowledges commit. (4) A fails before flushing the new page. (5) Recovery uses durable evidence to reconstruct the change. (6) The authority protocol prevents A, if it returns with stale state, from writing as the current owner. A volatile-only acknowledgment fails at step 2.” Do not imply every cited system implements this same concrete protocol.

**Transfer evidence:** Exercise 31 separates remote cost from durable evidence and stale ownership, rather than assuming replicated old pages solve recovery.

### P1 — Generalize aggregation formulas and teach a usable uncertainty procedure

**IDs:** `supplement-33-s2`, `supplement-33-s3`, `supplement-33-s5`; early vocabulary also `supplement-29-s5` and `supplement-32-s1`.

**Before:** A two-query square-root geometric mean is worked, then “Choose an interval or resampling procedure appropriate to the unit of analysis” and “Do not interpret an overlapping interval as proof of equality or a tiny p-value as evidence of practical importance.”

**Problem:** The distinction between summaries is excellent. The learner is not taught the general mean formula, percentile definition, censored lower-bound arithmetic, or how to choose independent observations. Naming statistical techniques is a research-paper instruction, not a worked procedure. This is the weakest path from “report uncertainty” to doing it.

**Representative after, aggregation:** “For query i, speedup sᵢ=baseline time bᵢ/new time nᵢ; values above 1 are faster. Across m queries, geometric mean=(s₁×…×sₘ)^(1/m). For one completion of the fixed workload, speedup=(Σbᵢ)/(Σnᵢ). That total is dominated by long queries, while each query contributes equally to the geometric mean of ratios. p95 is a declared 95th-percentile convention for response times; it is not a confidence interval.”

**Representative after, timeout:** “If completed queries take 4 s and 6 s and a third is still running when stopped at 30 s, true total completion time is at least 40 s. Report two completions, one timeout and this lower bound; 30 s is not the third query's exact completion time.”

**Representative after, uncertainty scaffold:** Supply a small, explicitly illustrative paired-trial table and say what is independent: “Run both systems on the same fixed workload in each independent trial, alternate order, retain one workload total per system per trial, and compute the paired difference. Report the trial count and the distribution of these differences. Use an interval method appropriate to this unit and stated assumptions; if interval construction is out of scope, link a prerequisite and avoid implying this checklist teaches it.” Do not teach a universal CI procedure or turn a run's many dependent queries into independent replications.

**Transfer evidence:** Exercise 33 proves that a geometric-mean win can coexist with a workload loss and handles a timeout without inventing runtime. It cannot establish statistical certainty from aggregate percentages alone, matching the resource's honest answer.

### P1 — Supplement 36 needs the promised operational mechanism example

**IDs:** `supplement-36-s1`, `supplement-36-s3`; goal “Explain a mechanism with a small worked example before benchmarks.”

**Before:** “Worked example: replace a headline with an argument” replaces “2× faster” with QPS/recall/p95 values.

**Problem:** This teaches reporting style and a quality budget, not how the mechanism changes execution. The goal requires baseline path, proposed path, costs, trade-off and losing case before the aggregate plot.

**Representative after:** Add a small hypothetical serial trace: “Baseline performs three 2 ms transfers and 4 ms processing: 10 ms total. Proposed grouping removes one transfer but waits 3 ms to form the group: 2×2+4+3=11 ms. It moves fewer bytes but is slower here. If grouping waits only 1 ms, the total is 9 ms. This trace explains why waiting and transfer cost must both appear in the benchmark.” Label this a simplified original illustration with no overlap; do not attach it to a paper or hardware result.

**Transfer evidence:** Exercise 36 uses this kind of path reasoning, then builds a scoped talk claim and a logical handoff. The baseline teaches the reporting portion but supplies no corresponding operational example.

### P2 — Add a concise prerequisite bridge and define abbreviations where they first matter

**IDs:** `supplement-28-s1`, `supplement-28-s5`, `supplement-29-s1`, `supplement-29-s5`, `supplement-30-s5`, `supplement-31-s1`, `supplement-32-s4`, `supplement-33-s3`.

**Examples of unintroduced terms:** selectivity/cardinality/physical plan; validation, held-out template and ablation; dtype/FP32/QPS/p50–p99/IVF-Flat/IVF-PQ/Pareto frontier; KV cache/tensor parallelism; RDMA/CXL/WAL/PMFS/fencing; open- versus closed-loop load; JIT/censored data/resampling/p-value.

**Representative after:** Introduce only terms needed for the immediate task. “Cardinality is a row count; selectivity is the fraction of input rows that survive. An optimizer chooses a correct physical execution plan, such as join order and algorithm. A learned estimator's row count affects that choice.” For optional advanced experiment terms, add a compact glossary or prerequisite link instead of another dense caveat paragraph. Expand QPS (“queries per second”), FP32 (“four bytes per coordinate”), and latency percentiles before the first benchmark. Define open-loop arrivals as continuing independently of completion, versus a closed-loop client waiting for responses; this explains the queue-growth warning.

**Transfer evidence:** Exercises 28–32 are solvable at a small scale, but hardware/protocol implementation remains checklist-level in the baseline. Do not claim that explanatory edits make a beginner able to configure any library.

### P2 — Turn experiment and evidence lists into ordered steps with one filled row

**IDs:** `supplement-28-s5`, `supplement-29-s5`, `supplement-30-s4`, `supplement-31-s5`, `supplement-32-s3`, `supplement-32-s5`, `supplement-33-s4`, `supplement-35-s2`, `supplement-37-s5`.

**Before:** Dense successive imperative sentences (“Log… Compare… Measure… Ablate… Specify…”) or manifest fields without one filled example.

**Problem:** The reader knows what eventual completeness looks like but not which step must precede another. Independence and calibration are easy to treat as extra metadata rather than part of validity.

**Representative after:** Number the dependency order: “1 Define task/correctness and metric. 2 Freeze data and intended generalization split. 3 Tune only on development/validation/calibration. 4 Verify baselines and quality-matched settings. 5 Measure raw independent trials, failures and resource totals. 6 Interpret and package the claim.” Add one filled split row, literature row, consultation decision, manifest, and errata row where useful. A complete manifest example should map an input/version and configuration to the exact evaluation command, raw output and plotting command, without inventing empirical results.

### P2 — Use a four-cell table and a declared sign for factorial interaction

**IDs:** `supplement-34-s2`.

**Before:** “the observed combined 40 ms suggests a 10 ms interaction on this latency scale.”

**Problem:** Four prose values are interpretable, but “10 ms interaction” is not signed and “factorial” is not explained. A novice could subtract cells in different orders, mix speedup with milliseconds, or infer a cause.

**Representative after:** “A 2×2 factorial experiment tests every on/off combination of two features. Put no-cache/no-batching=100, cache-only=70, batching-only=80, both=40 in a table. Additive predicted latency=70+80−100=50 ms. Define latency interaction I=L₁₁−L₁₀−L₀₁+L₀₀=40−70−80+100=−10 ms. With this convention, negative means 10 ms extra saving beyond addition. This is evidence of non-additivity on this scale, not proof of its cause.” Preserve repetition/quality assumptions.

**Transfer evidence:** Exercise 34 makes a feature useless alone but useful with another, and computes extra saving without calling it a universal benefit.

### P2 — Separate resource-time units and complete build-reuse alternatives

**IDs:** `supplement-35-s4`; related amortization `supplement-28-s3`.

**Before:** “600 GPU-minutes, or 10 GPU-hours. If data preparation costs another hour and index construction costs 4 minutes per configuration… add those costs according to whether builds are reused.”

**Problem:** The GPU-query total is correct, but the preparation hour and construction minutes have no resource type. Wall time, GPU-device time, CPU time and billed cost cannot automatically be added into a single GPU-hours figure. The example stops before showing per-configuration versus per-repetition construction.

**Representative after:** “Assume each build uses the same single GPU for 4 minutes. Reusing one build per configuration adds 20×4=80 GPU-minutes; rebuilding for each repetition adds 20×5×4=400 GPU-minutes. The query-plus-build budget is then 680 or 1,000 GPU-minutes. Report the preparation hour separately until its CPU/GPU and overlap assumptions are specified.” Prices remain stated hypothetical assumptions, not fetched real bills.

**Transfer evidence:** Exercise 35 separately accounts for GPU query/build time and CPU preparation; reuse changes the answer.

### P2 — Keep research claims intelligible by connecting each source to a contract

**IDs:** `supplement-28-s4`, `supplement-29-s4`, `supplement-30-s3`, `supplement-31-s4`, `supplement-32-s3`, `supplement-37-s4`.

**Before:** “Its compositional design targets unseen or imbalanced join templates and range-predicate distribution shifts”; “natural-language-parameterized semantic operators”; “global buffer/lock services… affinity… recovery combines memory/storage mechanisms.”

**Problem:** These read like abstracts. The resource often states good scope caveats without first unpacking the main idea in the same simple example. Paper titles/status and limitations can dominate the useful comparison.

**Representative after:** Use a repeated four-part micro-summary: “Problem/input. Mechanism in plain language. What the source established under stated conditions. What remains untested here.” For 28 retain the explicit difference among an observed point estimate, one-sided bound and measured plan/runtime; the join bound's integer floor is valid in the given example, but do not present the two-vector exercise as the paper's general theorem. For 30 show why a shared wrong label can yield perfect reference agreement yet poor truth. For 31 retain industry/research-track distinctions and Neon's historical scope in evidence notes. The reviewer has not independently verified those external claims.

### P3 — Consolidate repeated caveats, keep boundaries visible, remove empty source labels

**IDs:** All `supplement-XX-status`; all source shelves; repeated pre-body paragraph; blank `Source links:` after original sections.

**Before:** Each page has an original-resource/Canvas-unverified card, a second introductory status sentence, then a full status section before technical teaching. Exact headings appear in the extraction as `01How…` and twice; most original sections end with an empty source label.

**Problem:** The learner must re-read several boundaries and source-publication labels before reaching the concept, and empty labels imply missing references. The required caution is important; repetition is not what establishes it. Extraction cannot alone prove that duplicated title text is visually duplicated, so confirm the rendered UI before changing that element.

**Representative after:** Keep one prominent sentence: “Original supplemental practice aligned to the supplied syllabus; Canvas-assigned readings and instructor-specific requirements remain unverified.” Keep source cards/evidence notes discoverable, relocate detailed manuscript/venue and feasibility cautions beside the claim or into concise footnotes, and remove empty `Source links:`. Leave local warnings where they alter interpretation: hypothetical numbers, measured-versus-estimated memory, reference-versus-human truth, and no unmeasured hardware/scaling guarantee. Do not erase boundary information.

### P3 — Branch conditional discussion examples before the statement a learner might copy

**IDs:** `supplement-37-s2`; related `supplement-36-s5`.

**Before:** “We also checked a held-out human-labeled sample under this guide…” followed by “Omit the human-check claim if it was not performed.”

**Problem:** The caveat is explicit and correct, but the first-person ready-made response may be copied before the condition is noticed.

**Representative after:** “If you performed an independent human check, name its guide, sample and result. If you did not, say: ‘We measured agreement with our evaluator; factual accuracy against independent labels is untested. That is the next check.’” Likewise condition “Here is our p95/p99…” on actually collecting the breakdown. No fabricated study or human test should be implied.

## Ten fresh small transfer checks, in resource order

These are reviewer-created hypothetical exercises. They are not empirical learner outcomes. Answers use the baseline resource's mechanisms, formulas and caveats; additional exercise facts are stated explicitly. Where the baseline leaves a definition implicit, that limitation is noted.

### 28 — Estimation win, systems loss, then a real break-even

**Exercise.** Actual cardinality is 12,000; native estimate is 3,000 and learned estimate is 9,000. Native planning/execution take 1/40 ms. Learned planning/execution take 7/36 ms. A later configuration reduces learned execution to 30 ms at the same 7 ms planning cost. Training costs 600 s. What are the q-errors, both end-to-end comparisons and the later break-even? Name one split and fallback assumption.

**Solution.** Native q-error=max(3,000/12,000,12,000/3,000)=4. Learned q-error=max(9,000/12,000,12,000/9,000)=4/3≈1.333. Native total=41 ms; initial learned total=43 ms, so native/learned speedup=41/43≈0.953: better estimates still lose. Later total=37 ms; saving=4 ms=0.004 s, so simplified break-even=600/0.004=150,000 requests. If overhead/updates change, that volume changes. Hold out complete templates when that is the intended generalization; tune only on validation. Unsupported SQL/inference failure must use a correctness-preserving conventional fallback. The text gives this last requirement but not a complete fallback implementation.

### 29 — Same normalized ranking, new eligible set, short return

**Exercise.** Unit-normalized nonzero query/object vectors have inner products A=.9, B=.8, C=.5, D=.1. Higher inner product is better. Only B,C,D are eligible; k=2. An ANN result is {B,D}. Then a different run returns only {B}. Give squared distances, exact eligible top-2 and both recall values. Distinguish precision for the short run.

**Solution.** Using the stated relation, squared distances are A=.2, B=.4, C=1.0, D=1.8. Min-distance and max-similarity both rank A,B,C,D. Filter first: exact eligible top-2 is {B,C}. {B,D} intersects in one ID, so recall@2=.5. {B} also intersects in one ID, so recall@2=.5, not 1.0; among returned IDs its precision is 1/1=1. The eligible-set ground truth and denominator are fixed. These say nothing about real-world relevance or factual correctness. This exercise supplies the direction that baseline 29-s1 should state explicitly.

### 30 — A cheaper cascade that fails the required quality target

**Exercise.** Of 3,000 public notes, a trustworthy date filter retains 600. Expensive classification costs a hypothetical $0.01/note. A small model costs $0.001/note and routes 10% of retained notes to the expensive model; all retained notes see the small model. Against independent human labels, the final cascade has TP=90, FN=10, FP=5. Required recall is .95. Its agreement with a reference LLM is .99. Calculate the three bills, precision/recall and the defensible claim.

**Solution.** Expensive-before-filter=$30. Expensive-after-filter=600×.01=$6. Cascade=600×.001+60×.01=$1.20 before labeling, tuning, retries and other overhead. Precision=90/95≈.947; recall=90/100=.90. It misses the .95 recall requirement; lower call cost does not make it acceptable at that target. Reference agreement .99 is a different metric and does not overwrite .90 recall or prove .99 factual accuracy. The date filter's safety depends on truthful metadata and no need for excluded evidence. Independent calibration/test data remain required.

### 31 — Bytes, dependency rounds and acknowledged state

**Exercise.** A query needs 2,000 remote 4 KiB pages. Assume 1 GiB/s usable bandwidth, .1 ms round-trip latency and at most 50 independent outstanding requests; ignore other costs. A warm cache hits 75%. Compute uncached and warm-cache transfer components and idealized latency-round components. Then A acknowledges commit after durable log/commit evidence, fails before page flush, and later reconnects with old ownership. What must recovery accomplish?

**Solution.** Uncached bytes=2,000×4,096=8,192,000. Transfer time=8,192,000/1,073,741,824 s≈7.63 ms. Serialized round-trip component would be 200 ms; with 50 independent outstanding requests, ideal rounds=40 and latency component=4 ms. Overlap means total is at least max(7.63,4)=7.63 ms, not necessarily 11.63 ms. Warm cache leaves 500 pages: transfer≈1.91 ms and 10 ideal rounds×.1=1 ms, lower bound at least 1.91 ms. Concurrency, sharing and queues can make real time higher. Recovery reconstructs the acknowledged committed change from durable evidence even though the stored page is old, and fences A's stale authority. Replicated old pages alone cannot establish this. Byte-unit conversion is exercise arithmetic; the baseline could show it explicitly.

### 32 — Falsify the proposed question at its constraint

**Exercise.** Tiny batches coincide with low GPU utilization. Immediate ANN dispatch gives 1,000 QPS, p95=12 ms and recall@10=.96. A bounded-wait batching prototype gives 1,500 QPS, p95=20 ms and recall=.96 on the same workload. The intended p95 budget is 15 ms. Write the five-part question, interpret the result and choose two consultation decisions.

**Solution.** Question: “On this fixed public ANN workload and arrival regime, does bounded-wait batching increase end-to-end QPS over immediate dispatch while preserving recall@10≥.95 and p95≤15 ms?” Mechanism=bounded waiting/batching; baseline=immediate dispatch; workload/conditions=fixed workload/arrivals; metric=QPS; constraints=recall and p95. The tested setting has 50% higher QPS but violates the latency budget, so it does not support the constrained benefit. Low utilization plus tiny batches suggests an arrow, not proof that the GPU is the causal bottleneck. Measure batch distribution, queue delay, device time and end-to-end time. Ask whether the immediate-dispatch and tuned fixed-batch baselines are adequate, and whether the priority should be a smaller wait cap or a different arrival regime. Record the instructor's actual decisions; do not invent approval requirements.

### 33 — Per-query win, workload loss, and a censored bound

**Exercise.** Baseline runtimes are 2 s and 20 s; proposed runtimes are 1 s and 25 s. Calculate arithmetic/geometric mean speedup and fixed-workload speedup. Now add a third query: baseline=10 s; proposed times out at 30 s without completing. What lower bound and upper bound on workload speedup can be reported? Does “2% faster, 5% run variation” resolve uncertainty?

**Solution.** Individual speedups=2 and .8; arithmetic mean=1.4; geometric mean=√1.6≈1.265. Fixed two-query speedup=22/26≈.846, so completion is 4 s slower. With the third query, proposed true completion total is at least 1+25+30=56 s; baseline total=32 s, so true workload speedup is at most 32/56≈.571. Report one timeout; 30 s is censored evidence, not an exact completion time. The two percentages alone cannot establish or rule out a benefit; independent trial count, paired differences and an appropriate uncertainty interval are needed. The baseline does not teach interval construction, so claiming a computed confidence level would exceed its text.

### 34 — An individually neutral feature with an interaction

**Exercise.** Repeated, quality-matched measurements give latency: neither A nor B=100 ms, A only=80 ms, B only=100 ms, both=60 ms. Calculate each conditional saving and the additive prediction. What conclusion is supported, and what trace would distinguish a mechanism?

**Solution.** A saves 20 ms without B and 40 ms with B. B saves 0 ms without A and 20 ms with A. Additive prediction=100−20−0=80 ms; both=60 gives 20 ms extra saving on the additive latency scale. Under the declared signed convention in the proposed edit, interaction=60−80−100+100=−20 ms. B is useful in combination under these conditions, so “B is useless” is unsupported. Neither “always faster” nor a causal explanation follows from four cells alone. Examine relevant cache hit rates/request counts/scheduling and repetition variability, keep quality/workload fixed, and test the assumed bottleneck. Preserve negative or high-contention regimes rather than removing them.

### 35 — Typed artifact budget and build reuse

**Exercise.** Eight configurations each run three repetitions at 4 single-GPU-minutes per repetition. A build needs 2 single-GPU-minutes. CPU-only preparation needs 20 CPU-minutes. First assume one build reused per configuration, then rebuilding per repetition. A tiny synthetic smoke test succeeds, but full-data access is restricted. What goes in the budget and conclusion?

**Solution.** Query GPU-time=8×3×4=96 GPU-minutes. Reused builds add 8×2=16, so total=112 GPU-minutes. Per-repetition builds add 8×3×2=48, so total=144 GPU-minutes. CPU preparation remains 20 CPU-minutes; it is not automatically GPU-time or extra wall time if overlap differs. The manifest needs exact commit/dependencies, input/version/hash or lawful data-access instructions, configurations/splits, warm-up/stopping/timing rules, raw results/errors/correctness checks and figure command. The smoke test establishes the tiny execution path only. Disclose that restricted full results cannot yet be rerun by the recipient; do not redistribute restricted data or present the smoke test as performance reproduction.

### 36 — Explain the path before defending the headline

**Exercise.** In a hypothetical serial model, the baseline has three 2 ms transfers plus 4 ms processing. Proposed grouping removes one transfer but adds 3 ms waiting; all quality checks are identical. A separate hypothetical benchmark gives baseline/proposed QPS=6,000/9,000, recall=.96/.96 and p95=7/11 ms under a 10 ms budget. Write the small mechanism argument, supported result sentence and handoff.

**Solution.** Baseline path=3×2+4=10 ms. Proposed path=2×2+4+3=11 ms; one saved transfer is outweighed by waiting, so fewer transfers do not guarantee lower response latency. The numerical benchmark claim is: “On this stated workload/configuration, grouping raises throughput by 50% at recall .96, while p95 rises from 7 to 11 ms.” It fails the 10 ms target; it is not simply “50% faster.” Show units, resource/timing boundary, repetitions/uncertainty and a waiting/batch-size trace; clearly mark these exercise values as hypothetical. Handoff: “The path predicts a trade-off between saved transfers and waiting; the next speaker will test which cost dominates the measured response time.” Baseline 36 teaches claim/handoff style but needs the operational path example itself.

### 37 — Defend an unequal-resource result and preserve the correction

**Exercise.** A group reports 1.2× throughput with 16 GB memory; baseline has 8 GB. No equal-memory comparison was run, and no human labels were checked for its LLM evaluator. Discussion finds one figure labeled seconds although its source data are milliseconds. Give a defense, actionable peer feedback, next experiment and artifact correction.

**Solution.** Defense: “We measured this unequal-memory configuration; the result does not yet isolate the algorithm from added capacity. Our evaluator result is agreement with that evaluator; independent human-label quality is untested.” Feedback: “The memory difference is an alternative explanation. Compare both systems at equal total memory and include a breakdown/sensitivity curve.” This confound test should precede a larger benchmark because it directly changes belief in the central algorithmic claim. Correct the unit label and every affected derived statement, inspect the raw source/neighboring figures, preserve an errata explanation, and inform the relevant audience through the actual course process. Freeze the corrected code/configuration/data instructions/raw outputs/slides/report and record this next test. Do not invent human checks, grading criteria or submission rules.

## Conditions for the later independent cross-review

Read a different editor's final supplements 28–37 changes against the immutable baseline. Confirm that each P1 teaching change actually supplies a definition or worked path, rather than merely adding headings; that formulas/units and fresh examples are correct; that recall/filter and cascade quality gates remain explicit; that uncertainty does not imply an unsupported significance claim; that interactions state their metric/sign; and that paper/source, hypothetical/measured and Canvas-unverified boundaries survive consolidation. Re-run the fresh transfer reasoning above against the edited text. Any pass judgment will remain a reviewer/text check unless actual human learner testing is separately performed and documented.

Cross-review is pending final editor changes; no blocker affects this completed baseline review.
