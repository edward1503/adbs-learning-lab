# Supplemental readability revision — editor evidence

Baseline: public main `0a1fb0363d2c44a0ca8f508f4e964a01af128720`, v3.1.0. I read the complete rendered baselines `supplement-28.md` through `supplement-37.md` in that order before editing. This is an editorial review and candidate revision, not a human learner study or independent acceptance report. Independent cold-reading acceptance and browser QA remain with the coordinating agent.

## Scope and preservation

Edited only `course/supplements/supplement28.json` through `supplement37.json`, exclusively `lesson.sections[*].html` and `lesson.sections[*].title`. There are 30 revised sections, including the ten existing status sections. No section ID or order changed. No cross-section source link moved. No app, style, test, build, Git, deployment or question-bank operation was performed.

The existing status section now gives a resource-specific prerequisite/study path and a consistent short source/course note. The original-companion status, Canvas-unverified boundaries, practice-only activities and timings, and unverified assessment/submission arrangements remain explicit. A few repeated instructor-status sentences in the prose now direct the reader to actual confirmed instructions instead. Hypothetical/inferred-feasibility labels remain beside examples because those labels change what the numbers establish.

Static preservation evidence is in `supplements-preservation-check.json`:

- All fields outside section title/HTML are structurally identical to the baseline, including the source registry, coverage flags, embedded quizzes, all quiz banks, module/week/order fields, study-time labels and provenance.
- Every section's ordered `href` list is identical to the baseline.
- All 20 supplemental takeaway blocks are byte-identical as HTML strings.
- All edited section HTML has balanced tags. This checks markup nesting; it is not a browser layout or accessibility acceptance test.
- The file records a protected-field digest and exact bank/embedded-quiz digest for each resource. Baseline JSON copies remain in the coordinator's scratch `baseline/supplement-json/` directory.

## Resource-by-resource reading and decisions

### 28 — Learned DBMS components

**Changed:** status, s3, s4, s5. **Retained:** s1's correctness-contract distinction and bounded sorted-array search; s2's correlation/q-error arithmetic; s3's complete timing and break-even examples; s6's calibrated seminar conclusion. Those already connect an exact calculation to a changed condition rather than merely asserting a result.

- s3 defines the candidate-plan oracle at the point of use as the fastest measured plan among the same supplied candidates, and states the hindsight boundary before the oracle-gap exercise.
- s4 defines query template before discussing GRASP's generalization contract. The mathematical bridge names `R(k)`/`S(k)`, aligns both frequency vectors to the same keys, and traces the two contributions (6+2) before the unchanged Cauchy–Schwarz bound.
- s5 replaces an immediate model-building/procedural checklist with a six-query paper fixture, grouping task and complete answer. New-literal and new-template tests are explicitly alternative protocols. The answer identifies which examples may tune and which remain untouched. A later-time test remains available as a third regime.
- Model implementation is a bounded optional extension with prerequisites, one table, labeled queries and concrete evidence outputs. Ablation is defined through a fixed-condition example. Timing, collection/training, worst regressions, timeouts, fair label budget and fallback obligations remain.

**Before:** “Ablate workload overlap, representation and training volume.”

**After:** “An ablation repeats an experiment after removing or changing one component while keeping other conditions fixed. For example, halve the training labels while keeping the snapshot, model, split and timing protocol fixed.”

**Before:** “Build a small selectivity/cardinality model or reuse an available learned-optimizer artifact.”

**After:** “To test a new template instead, train on Q1, tune on Q2/Q3, and hold all of Q4–Q6 out. These are two alternative experiment designs. If Q4 influences tuning in the second design, its template is no longer unseen.”

**Precision checks:** unchanged positive-count q-error and zero convention; 82/69 ≈1.19 versus execution-only 80/60 ≈1.33; short-query 5 versus 11 ms; 1,800/0.013 ≈138,462; join output 8, bound √80≈8.94 and integer upper bound 8. The mathematical exercise remains distinct from the cited paper's general theorem.

### 29 — Vector databases

**Changed:** status, s1, s5. **Retained:** s2's complementary mechanism choices; s3's tenant-filter recall example and independence-qualified survivor estimate; s4's measured-paper/theoretical-bound distinction; s6's equal-quality and total-storage exercises.

- s1 says which direction is better before the normalization relation, defines every symbol in `d²(q,x)=2−2(q·x)`, and supplies two literal 2D vectors. ANN and numeric representation are decoded when used.
- s5 begins with a no-GPU recall-matching checkpoint before the unchanged capacity calculation and hardware experiment. The low/high effort settings repeat the existing five-ID fixture. IVF-Flat/PQ, percentiles, QPS and the completion-based GPU timing boundary are explained inline.

**Before:** “For unit-normalized nonzero vectors, squared Euclidean distance is 2−2 times their inner product, so these rankings agree.”

**After:** “Smaller distance is better for Euclidean or cosine distance; larger similarity is better for inner product. For nonzero vectors scaled to unit length, d²(q,x)=2−2(q·x), where d² is squared Euclidean distance and q·x is the sum of matching-coordinate products.”

**Precision checks:** nonzero/unit-normalization assumption retained; exact eligibility/tie/denominator conventions retained; 3/5 recall and 3/10 filtered recall retained; 3.072+0.256=3.328 GB payload estimate retains every excluded allocation category. The 2/3 ms checkpoint is explicitly hypothetical and establishes no H100 result. Multi-shard exact versus approximate limits remain unchanged.

### 30 — LLM data systems

**Changed:** status, s1, s2, s5. **Retained:** cheap deterministic filter/cascade arithmetic; s3's reference-agreement versus independent-truth distinction; s4's complete protocol; s6's test-reuse repair.

- s1 expands RAG once.
- s2 defines TP, FP and FN through the same overheating task and then derives precision/recall before asking the existing exercise.
- s5 starts with four held-out notes, shows which note is routed and why a confident false negative bypasses the expensive model. GPU experiment details follow this causal trace. Batch size and KV cache have local explanations.

**Before:** “Exercise: a cascade labels 400 true positives correctly, misses 100 positives, and produces 50 false positives. Find precision and recall.”

**After, before that unchanged exercise:** “Precision asks ‘of the returned positives, how many are right?’: TP/(TP+FP). Recall asks ‘of all real positives, how many did we find?’: TP/(TP+FN).”

**Precision checks:** $40 →$8 →$2.80 excludes the same overheads and retains the trustworthy-date/semantic-independence assumption; existing 400/450≈0.889 and 400/500=0.8 answer unchanged. The four-note trace is a supplied example, not a measured quality certificate. Independent calibration/testing and local/provider permission boundaries remain.

### 31 — Disaggregated DBMSs

**Changed:** status, s1, s3. **Retained:** s1 resource/responsibility distinctions; s2's latency/bandwidth/cache calculation; s4's three primary-source boundaries; s5's scoped mechanism/failure experiment; s6's resource-confound and recovery exercises.

- s1 expands CXL/RDMA instead of treating them as self-explanatory acronyms.
- s3 defines ownership, WAL and fencing, then traces one cached page: value10 →value11 →durable commit information →acknowledgement →failure before page flush →reconstruction →new ownership generation. A returned former owner is explicitly rejected. An added changed-timing exercise asks about failure before durable commit.

**Before:** “Recovery must reconstruct the committed change from durable evidence and fence stale owners.”

**After:** “Recovery establishes commit status, uses durable evidence to reconstruct 11, and grants current authority to B at generation 8. If A returns with generation 7, its writes are rejected.”

**Precision checks:** this is labeled an original protocol-level example, not a common exact algorithm for all cited systems. Durable commit status, page persistence, global interacting-log dependencies and current write authority remain separate obligations. The 3.81 ms transfer, 200 ms serialized latency, 2 ms idealized concurrent-latency component, overlap lower bound and 90% cache toy model are unchanged.

### 32 — Falsifiable research question

**Changed:** status, s4, s5. **Retained:** all core teaching examples and charter fields in s1–s4. The causal GPU-utilization→batching→queue-delay chain and explicit falsification conditions are particularly effective.

- s4 explains closed-loop versus open-loop arrival generation exactly when that assumption matters.
- s5 begins with the charter decision/evidence rather than another generic official-status warning; confirmed instructor requirements still govern the real consultation.

**Before:** “Under overload, a closed-loop client can hide queue growth; state whether load is open- or closed-loop.”

**After:** “A closed-loop client waits for a response before issuing its next request, so overload slows the offered arrival rate and can hide queue growth. An open-loop generator schedules arrivals independently of prior responses.”

**Precision checks:** no claimed novelty, hypothetical reported result, official deadline or required hardware was added. The question's matched recall target and latency trade-off remain.

### 33 — Baselines and measurements

**Changed:** status, s2, s5. **Retained:** s1's fair comparison contract; s2's original reversal arithmetic/exercise; s3's timing/timeout boundary; s4's staged evaluation matrix and tuning-budget repair.

- s2 gives the general geometric-mean formula and explains equal query weighting versus the long query's workload-time contribution. It keeps both metrics, rather than presenting one as universally correct.
- s5 replaces abstract “appropriate interval or resampling” advice with an experimental unit and three hypothetical independent paired runs. It shows every difference, mean, range and regression, then explicitly bounds what this small descriptive example establishes. Whole-pair resampling is distinguished from treating correlated per-query rows as independent.

**Before:** “Choose an interval or resampling procedure appropriate to the unit of analysis.”

**After:** “For a fixed-workload claim, one complete run of that workload is one repetition; its individual queries are not independent reruns.” Then baseline `100,104,98` and proposed `98,100,99` give differences `2,4,−1` ms.

**Precision checks:** geometric mean ≈1.348 remains distinct from fixed-workload speedup≈0.914; nine 1 ms gains versus one 100 ms loss remains +91 ms. New mean saving is 5/3≈1.67 ms. Three pairs are labeled descriptive evidence, not a confidence interval or robust general claim. Tail sample-count caveat, censoring and practical-importance distinction remain.

### 34 — Ablations and negative results

**Changed:** status, s2. **Retained:** s1's fixed/retuned ablation distinction; s3's targeted assumption stress cases; s4's checked negative result and bottleneck explanation; s5's claim/evidence classification.

- s2 renders the same four measured cells as a 2×2 table, says how to compare rows/columns, and supplies a signed interaction convention. No mechanism cause is inferred from the arithmetic alone.

**Before:** “The observed combined 40 ms suggests a 10 ms interaction on this latency scale.”

**After:** “Define the signed latency interaction as I=t11−t10−t01+t00, with 1 meaning enabled. Here I=40−70−80+100=−10 ms. Negative means lower latency than the additive prediction; the magnitude is 10 ms.”

**Precision checks:** 100/70/80/40 ms, 30/40 ms cache effect, 20/30 ms batching effect and 50 ms additive prediction retained. Negative sign does not reverse the original 10 ms extra-saving meaning. Scale dependence, repetitions and mechanistic uncertainty remain explicit.

### 35 — Reproducible artifacts

**Changed:** status, s4, s5. **Retained:** artifact provenance/permission boundaries, manifest fields, exact smoke/full-run distinction and claim-evidence checklist.

- s4 states that six GPU-minutes is per query repetition and separates shared CPU preparation, reused per-configuration GPU builds and alternative per-repetition builds. Totals now show how reuse changes the budget and why resource-time is not automatically wall time.
- s5 consolidates repeated official-format prose while still directing final assembly to confirmed instructor instructions.

**Before:** “If data preparation costs another hour and index construction costs 4 minutes per configuration outside the timed query region, add those costs according to whether builds are reused.”

**After:** shared preparation is `1 CPU-hour`; reused builds are `20×4=80 GPU-minutes`; rebuilt-each-repetition is `20×5×4=400 GPU-minutes`. Query work is `600 GPU-minutes`, yielding `680` or `1,000` GPU-minutes under the two declared policies.

**Precision checks:** original 20×5×6=600 GPU-minutes=10 GPU-hours retained. New 680/60=11⅓ and 1,000/60=16⅔ GPU-hours are correct. CPU/GPU costs are not silently added; CPU builds are allowed with relabeled units. Setup remains excluded from the timed query interval but included in total experiment cost.

### 36 — Research story

**Changed:** status, s2, s3. **Retained:** four-question argument, complete presentation outline, matched-quality hypothetical headline, group handoff, attribution and rehearsal/failure guidance.

- s3 begins with actual baseline/proposed execution states, then a low-arrival losing case, before the unchanged hypothetical benchmark headline. The supplied two-query trace is explicitly distinct from deriving the hypothetical million-vector result.
- s2 removes one repeated rubric-status preface; course-status and actual allotted-time limits remain visible elsewhere in the same resource.

**Before:** “Use a recurring example with a few rows, pages or vectors. Show the baseline path, the proposed path and the trade-off.” This good advice was not executed by the headline example.

**After:** queries arrive at `0/1 ms`; serial completions are `2/4 ms`; a supplied-cost batch completes both at `3 ms`. A lone query instead waits and finishes at `3 ms` rather than `2 ms`, with no batching benefit.

**Precision checks:** response time is completion minus arrival, giving baseline `2/3 ms`, batch `3/2 ms`; improved completion of the pair does not imply lower latency for every query. All numbers are labeled illustrative/hypothetical. The original 8,000→16,000 QPS at recall0.95 and p95 4→7 ms is unchanged and still fails a 5 ms latency budget.

### 37 — Evidence-based discussion

**Changed:** status, s2. **Retained:** question categories, actionable peer review, core/frontier contract synthesis, correction/handoff/next-experiment loop.

- s2 gives the condition first: only one device versus both measured; tails collected versus not collected; evaluator-only versus an actual independent human check. It then supplies a defensible answer for each branch. This prevents a copied model response from falsely claiming an experiment.

**Before:** “We also checked a held-out human-labeled sample under this guide; the remaining evaluator-bias risk is a limitation.” Followed by “Omit the human-check claim if it was not performed.”

**After:** “Evaluator agreement alone supports: ‘It measures agreement with our evaluator; factual accuracy remains unverified.’ If you also performed an independent held-out human check, state its actual guide, sample and result.”

**Precision checks:** no new experiment is claimed; matched resource/quality and tail/timeout requirements remain; the original equal-total-memory exercise and answer are unchanged.

## Changed-input tasks for independent acceptance

These are prompts and reasoning checks supplied to the coordinator, not claims that a real learner solved them. They exercise nearby transfer and the relevant boundary instead of testing memorized wording.

| Resource / sections | Fresh task | Expected reasoning / answer | Required boundary |
|---|---|---|---|
| 28 s2–s5 | True count20,000, estimate5,000; learned execution saves3 ms but adds5 ms planning. Q5 is used to tune a supposedly new-template test. | q-error4; net2 ms slower before training; using Q5 exposes the held-out template and invalidates that generalization claim. | Positive-count q-error; whole system timing; a template is structure, not literal value. |
| 29 s1/s3/s5 | Exact top-5 is A–E; returned A,B,F,G,H at2 ms versus A–E at4 ms. Target recall0.8. Which setting qualifies? | 2/5=0.4 fails; 1.0 qualifies. Distance direction and the eligible ground truth must stay fixed. | Same metric, preprocessing, eligible set and at leastk items. |
| 30 s2/s5 | 60 TP,15 FP,20 FN; cheap model calls a real positive confidently negative. | Precision60/75=0.8; recall60/80=0.75; routing only uncertain notes never corrects that missed positive. | Independent labels, fixed label policy; lower bill does not establish target quality. |
| 31 s2/s3 | The current durable page is10; commit evidence for11 survives; A fails before flush, then returns with stale ownership. | Recover committed11 from evidence, establish current ownership, reject A's stale writes. Replicated10 alone is insufficient. | The declared durable-commit/replay/fencing protocol; concurrency/bandwidth model does not prove availability. |
| 32 s1/s2/s4 | A closed-loop generator appears to hold latency down under overload. Is that evidence a service handles a fixed arrival rate? | It waits for responses and therefore reduces arrivals; an open-loop test is needed for the fixed arrival-rate claim, with failures reported. | Intended arrival process, recall target and resource boundary. |
| 33 s2/s5 | Baseline1,10 s; proposed0.5,12 s. Each of100 query rows came from a single shared trial. | Workload speedup11/12.5=0.88; geometric mean√(2×10/12)≈1.291. A100-row shared trial is not100 independent repetitions. | Positive ratios, metric-specific weighting, actual experimental unit. |
| 34 s2 | Four cells t00=100,t10=70,t01=80,t11=60 ms. What is the signed interaction? | Additive prediction50; I=60−70−80+100=+10 ms, meaning less saving than additive prediction on this latency scale. | Matched task/quality/resources; repeated cells; arithmetic does not establish cause. |
| 35 s4 | Ten configurations, three repetitions,2 GPU-minutes each; build1 GPU-minute reused per configuration; preparation30 CPU-minutes. | Query60+build10=70 GPU-minutes; preparation30 CPU-minutes separately. Rebuilding every repetition would make builds30 and total90 GPU-minutes. | Declared resource type/reuse policy; GPU-time differs from wall time. |
| 36 s3 | A lone query arrives under the supplied1 ms wait +2 ms execution policy. Does batching help? | Finishes at3 ms versus2 ms baseline; waiting has no companion query to amortize work. | Supplied operational costs, arrival conditions and latency budget; no inferred benchmark. |
| 37 s2 | Only median and evaluator agreement were collected. Can the response cite p99 and independent human checks? | No. State both evidence gaps, bound the claim and propose tail/timeout and held-out independent-label tests. | Claims must follow measurements actually performed. |

## Remaining limits

- Actual learner testing is still required to judge reading-time labels and empirical understanding. No labels were changed.
- Formal statistical intervals require a justified procedure and enough independent data; the three-pair example deliberately teaches descriptive reporting only.
- GPU/software/protocol feasibility remains conditional as in the baseline. No hardware experiment, paper reproduction, model implementation or new measurement was performed.
- Root owns the controlled supplemental-content preservation fixture, full build/test suite, final rendered QA and branch/commit review. Production promotion remains explicitly held.
