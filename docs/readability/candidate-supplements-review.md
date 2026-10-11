# Independent candidate cross-review: Supplements 28–37

## Scope, independence, and rubric

I read `readability-work/candidate/supplement-28.md` through `supplement-37.md` in order, including the rendered expanded answers. The parent identified these as the frozen candidate rebuilt and captured with real Chromium at 18440. This is a different editor and scope from my initial Lectures 13–27 review. The first reading and task attempts used only the rendered prose; I did not consult canonical content, editor logs, or test results to supply missing reasoning. The repeated `##` metadata and DOM heading in these capture files are a traceability wrapper, not evidence of duplicate UI headings.

I used the parent's rubric from `adbs-learning-lab/docs/readability/baseline-parent-review.md`:

- **Explain (E):** Describe the idea without simply repeating the formal definition.
- **Trace (T):** Reproduce intermediate states or decision steps.
- **Transfer (X):** Solve a nearby changed-input case and explain the change.
- **Bound (B):** Name the assumption that makes the claim valid.
- **0:** Required reasoning is absent. **1:** The exact worked answer can be copied. **2:** A nearby variant can be solved and explained.

The task records below map explicitly to all 30 stated goals. Each includes a fresh prompt, the reasoning available in the prose, an answer, and assumptions/gaps. Scores are judgments about the text's support for these small tasks, not observed learner performance. No human participants were tested. They do not establish arbitrary implementation skill, full-paper understanding, or general mastery. For design/communication goals, a trace is an applied sequence of experiment or argument decisions rather than program execution.

## Editorial outcome

No high-impact unresolved reasoning gap appeared in the prioritized repairs. The rendered candidate now supplies the actual six-query leakage exercise, metric direction and normalization, filtered recall, cascade routing and missed positives, durable recovery evidence and page ownership, aggregation weights and matched-pair uncertainty, signed factorial interaction, typed budgets, a batching trace and losing case, and evidence-conditional research responses.

All goal/task pairs below reach 2 on the four dimensions at their stated introductory/design scope. This is deliberately a narrow conclusion: the prose supports the documented nearby variants. It is not blanket course acceptance, a test-suite inference, or a human-study claim. Parent review and approval remain pending. I made no course-content, Git, published, or deployed-asset writes.

Remaining small refinements, none blocking the tasks below:

1. **S29-s1:** A two-coordinate unnormalized counterexample could reinforce why inner-product and Euclidean rankings may differ; the normalized formula and explicit restriction already support the reviewed task.
2. **S31-s2:** A short KiB/GiB unit reminder would make the byte arithmetic friendlier. The text gives pages in bytes and an example, so the numeric variant is reconstructible.
3. **S34-s2:** Label the index order explicitly as `t(cache,batching)`. The symmetric interaction and the table are already unambiguous for the calculation, but naming the two bits would help later marginal-effect discussion.
4. **S33-s5:** The small procedure is descriptive, not a full confidence-interval tutorial. That is appropriately stated; tasks or future assessment should not require an interval algorithm that is not supplied here.
5. Implementation extensions in S28–S31 are project-design guidance, not self-contained installation tutorials. Their goals use “design”/“explain” rather than promise a runnable reproduction. Preserve that distinction.

## Supplement 28 — Learned DBMS components

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Locate learning at cardinality, cost/ranking, indexing, configuration boundaries | 28A | 2 | 2 | 2 | 2 |
| Calculate q-error and end-to-end break-even cost | 28B | 2 | 2 | 2 | 2 |
| Design leakage-resistant evaluation with conventional fallback | 28C | 2 | 2 | 2 | 2 |

**28A. Resources:** `supplement-28-s1`, `supplement-28-s4`. **Fresh prompt:** Classify (i) predicting 800 join rows, (ii) choosing one of ten already-correct plans, (iii) predicting a key's sorted-array position, and (iv) selecting a memory knob. The lookup predicts 50 with a valid supported-key error bound of 3; what is its search interval, and what if the bound was measured only on training keys? Explain why a small point-prediction error is not an upper-bound certificate.

**Available reasoning:** s1 assigns different inputs/outputs and correctness consequences to four components, then expands position 420±6 into an interval. s4 distinguishes point predictions from one-sided bounds with aligned count vectors.

**Answer/trace:** (i) cardinality, (ii) cost/ranker, (iii) learned index, (iv) configuration. Lookup examines and verifies positions 47–53. A training-only empirical bound does not prove future keys lie there; use a correct fallback/search strategy or establish an updated valid bound. A cardinality mistake can choose a poor plan while preserving SQL; an unverified lookup can return the wrong key. A prediction below the true count may have small q-error while still failing the upper-bound contract. **Bound/gap:** Interval validity must cover supported future keys and updates. The prose supports this design-level transfer, not a particular index implementation.

**28B. Resources:** `supplement-28-s2`, `supplement-28-s3`. **Fresh prompt:** Actual count 12,000, estimate 3,000. Native planning/execution are 1/20 ms; learned planning/execution are 6/13 ms. Training/collection cost 120 seconds. Compute q-error, execution-only and end-to-end speedups, and simplified break-even requests. What happens if learned execution rises to 17 ms?

**Available reasoning:** s2 gives max of reciprocal count ratios. s3 separately totals planning and execution and divides training cost by per-request savings.

**Answer/trace:** Q-error is `max(3,000/12,000,12,000/3,000)=4`. Execution-only speedup is `20/13≈1.54`; end-to-end totals are 21 and 19 ms, speedup `21/19≈1.105`, saving 2 ms. Break-even is `120/0.002=60,000` requests. At 17 ms learned execution, its total is 23 ms; it loses to 21 ms, so positive training-cost amortization cannot create a deployment saving under these fixed costs. **Bound/gap:** Positive-cardinality convention, same workload/correctness, and stable costs are required; retraining, fallback and operational costs are omitted. No reasoning gap for this variant.

**28C. Resource:** `supplement-28-s5`. **Fresh prompt using the actual six-query fixture:** For unseen-template evaluation, use Q1 for training, Q2/Q3 for validation, Q4–Q6 for final test. After inspecting Q5's error, the researcher changes the representation. Is Q4/Q6 still an unseen-template test? Give the separate new-literal split and a fallback decision for unsupported SQL.

**Available reasoning:** The table exposes Q1–Q3 as `city=?` and Q4–Q6 as `city=? AND pass=1`. The answer states the two experiments are alternatives and that any tuning influence from the held-out template destroys unseen-template status. The final paragraph requires conventional fallback for unsupported SQL/unfamiliar input/inference failure.

**Answer/trace:** Before inspection, the proposed split holds the entire second template out. Once Q5 influences tuning, that template has been seen; leaving Q4/Q6 individually unused cannot restore template-level generalization. Freeze the tuned method and use a genuinely new untouched template/workload for a confirmatory unseen-template claim, or disclose the exploratory result. A known-template/new-literal design is train Q1/Q4, validate Q2/Q5, test Q3/Q6 untouched. Unsupported SQL routes to the conventional system rather than an unchecked prediction. **Bound/gap:** Fixed snapshot, intended generalization unit, and test isolation must hold; all tuning choices count as influence. A concrete unfamiliar-input detector is not specified, but this task needs the fallback contract, which is explicit. The six-query leakage repair is actually solvable rather than just advised.

## Supplement 29 — Vector databases

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Define exact top-k and ANN recall under same metric/filter | 29A | 2 | 2 | 2 | 2 |
| Compare graph traversal, IVF pruning, vector compression | 29B | 2 | 2 | 2 | 2 |
| Design recall-matched single-GPU experiment/explain multi-GPU limits | 29C | 2 | 2 | 2 | 2 |

**29A. Resources:** `supplement-29-s1`, `supplement-29-s3`. **Fresh prompt:** Unit query q=(1,0). Objects A=(1,0), B=(0,1), C=(−1,0), D=(0,−1). Filter permits only B,C,D. For k=2, find exact neighbors using inner product and squared Euclidean distance. ANN returns B,C. Compute recall; explain what changes if a raw vector is not normalized or fewer than k eligible objects exist.

**Available reasoning:** s1 defines dot product, direction of metric preference, the unit-vector `d²=2−2(q·x)` relation, exact eligible top-k and recall denominator. s3 requires recomputing ground truth after filtering.

**Answer/trace:** Eligible dot products are B=0,C=−1,D=0; squared distances are B=2,C=4,D=2. Larger similarity/smaller distance both choose {B,D}. Intersection with {B,C} has one ID: recall@2=1/2. A is excluded despite being closest globally. The unit-vector identity cannot be assumed for arbitrary unnormalized raw vectors; recompute the declared metric and preprocessing. With fewer than k eligible items, report count and an explicit denominator convention rather than silently divide by returned count. **Bound/gap:** Same snapshot/filter/metric/preprocessing and deterministic ties; enough eligible items in this instance. No task gap. The text gives the normalization restriction even without a second unnormalized numeric example.

**29B. Resources:** `supplement-29-s2`, `supplement-29-s4`. **Fresh prompt:** An index is too large for its fast memory tier. Propose a candidate path combining IVF, quantized distances and original-vector reranking. Explain how graph search differs, and whether a bounded distance-estimation error proves exact top-k when two true distances are 1.00 and 1.01 and estimation error may be ±0.02.

**Available reasoning:** s2 separates neighbor navigation, selected-cluster pruning and economical codes, and says mechanisms can combine; reranking uses originals. s4 states candidate selection and near ties still matter despite an error bound.

**Answer/trace:** Query chooses clusters → scans selected compressed codes → makes shortlist → reranks retained IDs with originals. More IVF probes or graph breadth typically inspect more candidates; graph follows neighbor links instead of choosing IVF clusters. Compression may let data fit a faster tier but can reorder estimates. For the close pair, permitted estimates 1.02 and 0.99 reverse true order; even correct reranking cannot recover an omitted true neighbor. **Bound/gap:** Compare matched recall and include memory/build/filter/update costs. The text supports mechanism comparison and the near-tie transfer; it does not supply a full graph or quantizer implementation, which the goal does not require.

**29C. Resources:** `supplement-29-s5`, `supplement-29-s6`. **Fresh prompt:** Method A gives 18,000 QPS at recall .85; B gives 11,000 at .97. Required recall is .95. Design the comparison, then estimate vector/degree-32 graph payload for 500,000 128-dimensional FP32 vectors with 32-bit neighbor IDs. Can two devices be declared twice as fast?

**Available reasoning:** The paper checkpoint rejects changed-quality speed comparisons; the memory example multiplies object count, dimensions/degree and four-byte payload. Timing waits for GPU completion. Exact local top-k suffices for global top-k but approximate local candidates do not establish exactness.

**Answer/trace:** B's stated point qualifies; A's does not. Sweep both on independent validation data to ≥.95 and compare matched settings on held-out queries, reporting p50/p95/p99, QPS/concurrency, build, peak memory, transfers and end-to-end boundary. Coordinates use `500,000×128×4=256,000,000` bytes; links use `500,000×32×4=64,000,000`; sum .320 GB decimal before metadata/workspace/duplicates/buffers. For two shards, search both and merge under the same metric; measure routing/transfer/merge and recall rather than infer 2×. **Bound/gap:** Selected library/hardware capacity and fixed quality/filter/ground truth. Payload is an estimate, not measured peak or feasibility proof. No task gap.

## Supplement 30 — LLMs for data systems

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| DB control assistance versus LLM-powered processing | 30A | 2 | 2 | 2 | 2 |
| Filter/cascade costs without assuming quality unchanged | 30B | 2 | 2 | 2 | 2 |
| Human-label versus reference-algorithm evaluation | 30C | 2 | 2 | 2 | 2 |

**30A. Resource:** `supplement-30-s1`. **Fresh prompt:** Classify an LLM proposing an index for a DBMS, versus classifying complaints as overheating reports. The generated SQL runs but a join duplicates customers. The complaint text says to bypass access rules. What checks belong at each boundary?

**Available reasoning:** s1 distinguishes DBMS control from semantic operators and explicitly separates executable SQL from interpretation, evidence spans, uncertain labels, RAG and document-text handling.

**Answer/trace:** Index proposal is control assistance; DBMS validates schema/syntax/permissions/resources and the query's meaning. Complaints are semantic processing; define label policy/evidence/uncertainty and evaluate outputs. A runnable duplicate-producing query can be semantically wrong for the question. Complaint text remains input data and cannot change the pipeline's tools/permissions. RAG context does not create transactional guarantees or grounded correctness. **Bound/gap:** Correct SQL execution, intended meaning, label quality and answer factuality are separate contracts. Text supplies the nearby distinction; no gap.

**30B. Resources:** `supplement-30-s2`, `supplement-30-s5`. **Fresh prompt:** 10,000 notes, trustworthy date filter keeps 2,000; expensive classifier $0.003/note, cheap classifier $0.0003/note routes 20% onward. Compute all-expensive-before-filter, filter-first and cascade costs. Then trace independent labels P,N,P,N,P against cheap outputs P,N,uncertain,N,N; the expensive model labels only the uncertain note P.

**Available reasoning:** s2 uses retained count and route fraction to charge both cheap and expensive work, defines TP/FP/FN and precision/recall. s5 traces uncertain routing and the confident-negative miss.

**Answer/trace:** Costs are $30, $6, and `2,000×.0003+400×.003=$1.80`. Final labels are P,N,P,N,N. TP=2, FP=0, FN=1: precision=1 and recall=2/3. The fifth positive is confidently missed and never reaches the expensive model. If recall target is .9, lower cost cannot qualify this cascade. **Bound/gap:** Date field and predicate scope must make pushdown safe; route fraction is measured/stated, independent calibration/test sets are needed, and labeling/retries/loading/optimization charges are excluded from this toy arithmetic. No reasoning gap; routing quality is demonstrated rather than asserted.

**30C. Resources:** `supplement-30-s3`, `supplement-30-s4`, `supplement-30-s6`. **Fresh prompt:** Independent labels on six notes are P,N,P,N,P,N. Pipeline and reference LLM both output P,P,N,N,P,N. May 100% reference agreement be called factual accuracy? Design a leakage-resistant evaluation and repair a prompt selected after reviewing test errors.

**Available reasoning:** s3 distinguishes statistical reference accuracy from independent truth; s4 gives annotation guide, evidence, splits by source/entity and frozen test; s6 reclassifies an inspected test as development.

**Answer/trace:** Reference agreement is 6/6, but independent labels show TP=2, FP=1,FN=1,TN=2. Precision and recall are both 2/3; four of six labels agree with independent labels. Prepare inclusion/exclusion/uncertain cases and evidence spans, adjudicate sampled disagreement, split by document/entity, calibrate separately and test frozen versions. After prompt selection on test errors, that set is development; freeze the new prompt and evaluate on a new held-out set or disclose exploratory status. **Bound/gap:** Human labels also need a defined guide; repeated inference and subgroup errors can matter. Text supports the distinction and repair; no human evaluation was performed by this review.

## Supplement 31 — Disaggregated systems

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Compare shared-nothing/shared-storage/compute-memory-storage | 31A | 2 | 2 | 2 | 2 |
| Trace page ownership/WAL/recovery responsibilities | 31B | 2 | 2 | 2 | 2 |
| Estimate remote costs/design workload-failure experiment | 31C | 2 | 2 | 2 | 2 |

**31A. Resources:** `supplement-31-s1`, `supplement-31-s4`. **Fresh prompt:** Compare (a) workers with private data partitions, (b) stateless compute with durable page storage service, (c) compute plus separate shared-buffer/lock service plus storage. A new compute node reads a cached page: does that make it an authorized writer, and does the diagram establish RDMA or CXL?

**Available reasoning:** s1 draws ownership/durability boundaries, distinguishes CXL from RDMA and caches from authority; s4 compares where buffers/locks/ownership/recovery reside rather than equating product names.

**Answer/trace:** (a) shared-nothing with cross-partition communication; (b) compute-storage separation with durable storage and potentially cold compute caches; (c) a further memory/coordination layer with separate responsibility and failure behavior. For each box list owned state, replication, durable evidence and membership/coordination. Cached P is neither a commit record nor permission to modify P. The access protocol determines memory/network mechanism; the diagram does not. **Bound/gap:** Independent resource scaling remains coupled to coherence and recovery. This task is supported at architecture-contract level, not an implementation reproduction.

**31B. Resource:** `supplement-31-s3`. **Fresh prompt:** A owns P generation 4, changes 20→21, durably logs update/commit, acknowledges, then fails while stored page remains 20. B is assigned generation 5. What recovers, and what happens when A returns with generation 4? Change the case so A failed before durable commit.

**Available reasoning:** The explicit update→commit→failure→replay/fence trace separates authoritative version, durable commit evidence and writer generation. The answer branches on pre-commit failure.

**Answer/trace:** Durable evidence establishes committed status despite old stored page. Recovery reconstructs 21 and grants current authority to B. A's stale-generation writes are rejected, including if A remained alive behind a partition. If commit evidence never became durable, recovery cannot treat 21 as committed solely because A had it in cache; use the declared protocol to undo/ignore unfinished work. Replicated copies of old page 20 do not recover the acknowledged value. **Bound/gap:** Durable evidence must survive; ownership changes need effective fencing and interacting logs need ordering/dependency rules. No task gap; this is an original generic protocol trace, not every named system's exact algorithm.

**31C. Resources:** `supplement-31-s2`, `supplement-31-s5`, `supplement-31-s6`. **Fresh prompt:** 200 remote 8-KiB pages, usable 1 GiB/s, .25-ms round trip. Estimate bytes/bandwidth and serialized latency, then the ideal lower bound with 20 outstanding requests. Repeat with 80% cache hits. Design a comparison that also checks committed recovery.

**Available reasoning:** s2 separates byte transfer from round trips, uses waves with concurrency and the maximum as an overlap-aware lower bound. s5 controls cache/resource/network conditions and crashes between commit and page flush.

**Answer/trace:** Bytes `200×8192=1,638,400`; transfer ≈1.526 ms. Serialized latency `200×.25=50` ms. With 20 outstanding, ten waves give 2.5 ms; lower bound at least max(1.526,2.5)=2.5 ms, not an exact sum/prediction. At 80% hits, 40 remote pages transfer ≈.305 ms and take two waves=.5 ms, lower bound at least .5 ms. Compare local/remote/fixed-cache access under sequential/random/skew workloads; vary delay separately from bandwidth, record queueing/concurrency and warm/cold state. Crash after durable commit and before page flush, then validate recovered value and authority. **Bound/gap:** Ideal overlap, effective bandwidth and fixed cache-hit model; CPU/queues/coordination add costs. Unit arithmetic is reconstructible; no mechanism gap.

## Supplement 32 — Research question clinic

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Bounded claim with falsification condition | 32A | 2 | 2 | 2 | 2 |
| Connect mechanism to observed bottleneck | 32B | 2 | 2 | 2 | 2 |
| Concrete evidence/decisions for consultation | 32C | 2 | 2 | 2 | 2 |

**32A. Resources:** `supplement-32-s1`, `supplement-32-s4`. **Fresh prompt:** Rewrite “microbatching makes ANN faster” for public 128-dimensional vectors, recall@5≥.9, p95≤10 ms, comparing a two-ms bounded wait with immediate dispatch. Name a falsification and a deliverable.

**Available reasoning:** s1 supplies mechanism/baseline/conditions/metric/constraint; s4 gives an operational charter and null conditions.

**Answer/trace:** “For this fixed public 128-D vector workload across declared arrival rates, does a two-ms bounded batch wait improve completed QPS over immediate dispatch at recall@5≥.9 and p95 arrival-to-response≤10 ms?” Hold device/index/search settings and ground truth fixed. Falsify if gains disappear at matched p95 or recall falls below .9; deliver a plot of useful/losing arrival regimes including queue/execution time and failed requests. **Bound/gap:** This is a question, not novelty or a positive result. State the load model; closed-loop generation can hide overload. Text supports the revised charter; no gap.

**32B. Resource:** `supplement-32-s2`. **Fresh prompt:** Device utilization is low, but measured host preprocessing consumes 80% of request time. A proposed change optimizes kernel launch scheduling. Build the causal explanation and smallest discriminating experiment.

**Available reasoning:** s2 traces symptom→cause→mechanism→trade-off and names observables; it explicitly warns that host-side preprocessing can make search-kernel optimization ineffective.

**Answer/trace:** Low utilization alone does not prove insufficient device batching. Trace request preprocessing, queue wait, launch/device execution and response; inspect arrival/batch distributions. Hold search/index/quality constant and separately test whether reducing/bypassing the host bottleneck changes utilization and the kernel policy's end-to-end effect. A faster kernel with unchanged preprocessing may leave total time mostly unchanged. **Bound/gap:** Controlled measurements, realistic workload generator and matching boundaries are required before a causal claim. Text supports this alternative explanation and critical-arrow test, not attribution from utilization alone.

**32C. Resources:** `supplement-32-s3`, `supplement-32-s5`. **Fresh prompt:** A four-GPU proposal has one device available; the closest paper used four. Assemble the consultation evidence and two decisions without claiming reproduction or inventing course rules.

**Available reasoning:** s3 names the literature/evidence matrix; s5 lists charter, measured bottleneck, closest-paper difference, trace/uncertainty, decisions, and a hardware rescope example.

**Answer/trace:** Bring a single-device mechanism question, bottleneck diagram, exact paper/status/conditions and difference, preliminary trace with configuration/uncertainty, and hardware limitation. Ask whether the single-device scope and baseline are appropriate, and whether filtered recall or update freshness should be prioritized. Rescope to one-device mechanism or explicitly labeled communication model; do not call it a four-device reproduction. Log the actual instructor response, owner and next evidence after consultation; leave those fields pending beforehand. **Bound/gap:** Follow confirmed appointment/assessment instructions when supplied. The prose supports concrete preparation; it supplies no actual instructor decision, appropriately.

## Supplement 33 — Baselines and measurements

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Choose baselines isolating improvement | 33A | 2 | 2 | 2 | 2 |
| Workload-total/per-query/tail metrics | 33B | 2 | 2 | 2 | 2 |
| Repeatable timing/split/timeout policies | 33C | 2 | 2 | 2 | 2 |

**33A. Resources:** `supplement-33-s1`, `supplement-33-s4`. **Fresh prompt:** A learned selector gets four times the memory and 100 tuning trials; native baseline gets ten. Choose practical/simple/ablation/oracle comparisons and identify what must be fixed or disclosed.

**Available reasoning:** s1 explains which question each baseline answers and requires comparable tuning/resources/quality. s4 diagnoses unequal search budgets and independent validation.

**Answer/trace:** Native tests practical value; simple heuristic/ranker tests complexity need; component ablation isolates the proposed mechanism; candidate oracle supplies hindsight headroom, not deployable performance. Equalize total memory, quality target and tuning effort or show resource/budget sensitivity; keep training/evaluation data fair and tune on validation. Report default as default, search cost and any remaining asymmetry. **Bound/gap:** Correctness and workload/cache/concurrency must match. A positive result under unequal capacity alone cannot establish algorithmic benefit. Text supports the nearby fairness repair.

**33B. Resources:** `supplement-33-s2`, `supplement-33-s3`. **Fresh prompt:** Two baseline times are 2 and 8 s; proposed times are 1 and 12 s. Compute arithmetic/geometric per-query means and fixed-workload speedup. If a third request times out at 5 s, may it be deleted or reported as exactly 5 s? Can ten observations establish stable p99?

**Available reasoning:** s2 derives both ratio aggregation methods and explains baseline-time weighting. s3 identifies timeout as censored evidence, not a discarded/exact completed time.

**Answer/trace:** Individual ratios 2 and 2/3. Arithmetic mean 4/3≈1.333; geometric mean √(4/3)≈1.155. Workload total is 10/13≈.769, so it slows by 3 s despite favorable equal-query summaries. The long query is 8/10 of baseline time; its 4-s loss outweighs the 1-s saving. A five-second timeout is incomplete/censored evidence: report failure count and an appropriate lower bound, not an invented exact completion or omission. Ten observations do not make a stable p99 claim; declare convention and obtain justified independent data. **Bound/gap:** Positive times, fixed workload/frequencies, declared timing boundary and quantile convention. No task gap.

**33C. Resources:** `supplement-33-s3`, `supplement-33-s4`, `supplement-33-s5`. **Fresh prompt:** Three independent whole-workload matched pairs are B=[50,52,49] ms, P=[49,53,47] ms. Report effect/variability and experimental unit. Specify timing, split and failure policies for a learned GPU method; can the pairs' individual queries be resampled independently to make an interval tight?

**Available reasoning:** s5 gives paired differences, mean/range and whole independent pair resampling; s3 defines request-to-response boundary/synchronization and stopping/failure policies; s4 splits by intended generalization.

**Answer/trace:** Paired savings are [1,−1,2] ms, mean 2/3≈.667 ms, range −1 to 2; one pair regresses. A complete workload run is one repetition. Show all pairs and call this descriptive evidence, not a confidence interval or robust general result. Pin versions, warm-up and trial count; alternate/randomize order; include preprocessing/transfers/queues/planning/postprocessing in end-to-end wall time, synchronizing GPU completion for kernel measurements. Split by intended template/entity/time generalization; tune only on validation. Predeclare timeout threshold and record censored runs. Do not resample correlated query rows as independent repetitions; use whole justified independent pairs. **Bound/gap:** Independence, matching protocol and practical significance matter. Text intentionally does not teach a full interval estimator; no such estimator is needed for this descriptive task.

## Supplement 34 — Ablations and negative results

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Ablations isolating mechanisms without task changes | 34A | 2 | 2 | 2 | 2 |
| Small factorial interaction interpretation | 34B | 2 | 2 | 2 | 2 |
| Bounded failures/negative conclusions | 34C | 2 | 2 | 2 | 2 |

**34A. Resource:** `supplement-34-s1`. **Fresh prompt:** Removing adaptive ANN search also lowers candidate budget from 100 to 20 and loses recall. Is this a clean necessity test? Distinguish a fixed-parameter from a best-achievable-without-component comparison.

**Available reasoning:** s1 requires coherent remaining systems with workload/correctness fixed and distinguishes local fixed parameters from retuned ablations.

**Answer/trace:** Two mechanisms and the quality task changed, so the loss cannot isolate adaptivity. First remove adaptivity at comparable candidate/resource budget while preserving the target quality and protocol; label that local fixed-configuration effect. Separately retune the coherent nonadaptive system to the same quality target with declared tuning cost if testing its best achievable performance. An obviously mistuned/broken ablation does not prove necessity. **Bound/gap:** Control choice follows the causal claim; equivalence/approximation target must remain explicit. Text supports this nearby design repair.

**34B. Resource:** `supplement-34-s2`. **Fresh prompt:** On a signed latency scale with equal workload/quality, t00=120, t10=90, t01=100, t11=80 ms; first bit enables cache, second batching. Compute additive prediction, I and marginal savings. Does its sign prove cause?

**Available reasoning:** s2 supplies four-cell comparison, additive savings, `I=t11−t10−t01+t00`, sign interpretation, scale and uncertainty restrictions.

**Answer/trace:** Cache alone saves 30, batching alone 20, so additive prediction is 120−30−20=70. Observed joint latency is 80; `I=80−90−100+120=+10` ms. Positive means ten extra milliseconds versus additive expectation, not ten extra saving. Cache saves 30 without batching but 20 with it; batching saves 20 without cache but 10 with it. Thus the components help individually but are less than additive together in this toy latency scale. Repeat cells and trace hits/request/scheduling to investigate cause; sign alone does not prove it. **Bound/gap:** Same task/quality/protocol, meaningful variability and latency-scale definition. No sign gap; the text supports an opposite-sign variant.

**34C. Resources:** `supplement-34-s3`, `supplement-34-s4`, `supplement-34-s5`. **Fresh prompt:** Distance calculations fall 30%, but end-to-end runtime does not improve because host transfers dominate. Gains appear after excluding high-contention runs. Classify supported/unsupported claims and choose a discriminating follow-up.

**Available reasoning:** s3 ledger connects assumptions to violations; s4 makes unchanged latency a host-bound negative result; s5 refuses favorable-only exclusions and narrows conditions.

**Answer/trace:** Supported: less distance work in measured runs. Not established: general end-to-end speedup. The broad benefit is contradicted for the measured host-bound/high-contention regimes if no gain occurs. Verify correctness/baseline/boundaries first; retain all intended runs and describe contention breakdown. Follow-up: hold the search task fixed while controlling/removing transfer bottleneck, or vary contention deliberately, to discriminate host-bound versus search-bound conditions. Preserve the original negative evidence instead of replacing it with favorable datasets. **Bound/gap:** Claim only measured regimes and distinguish exploratory from frozen confirmatory work. No task gap.

## Supplement 35 — Artifacts and conclusions

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Package evidence needed to rerun | 35A | 2 | 2 | 2 | 2 |
| Smoke test versus scientific reproduction | 35B | 2 | 2 | 2 | 2 |
| Audit cost/data permission/limitations/claims | 35C | 2 | 2 | 2 | 2 |

**35A. Resources:** `supplement-35-s1`, `supplement-35-s2`. **Fresh prompt:** A plot came from one private dataset, a model, and an API; README says “run latest on standard data.” Trace a reproducible artifact and state what can be shared when the dataset cannot.

**Available reasoning:** s1 defines input→code/config→raw results→plot evidence chain and data permission; s2 supplies manifest categories and explains checksums/secrets/logs.

**Answer/trace:** Pin code/dependency/model/prompt revisions; identify dataset version/hash, preprocessing and split IDs; record hardware/driver/resource limits, timing/warm-up/repetitions/trial order/timeout/quality target. Link exact command/configuration to raw outputs/errors/correctness checks and figure-generation command with expected variation. Supply permitted access instructions and synthetic smoke input when raw data cannot be redistributed, disclosing inaccessible full results. Keep keys/tokens out and inspect sensitive logs. A hash detects change, not correctness. **Bound/gap:** Containers do not equalize hardware/data/APIs/numerics. Text supports a concrete package design; it cannot grant redistribution rights, appropriately.

**35B. Resource:** `supplement-35-s3`. **Fresh prompt:** Ten synthetic queries reproduce expected IDs on a laptop; the claimed million-vector GPU benchmark has not run. State what is established and prepare the next execution path. A clean rerun later differs from the old plot: what then?

**Available reasoning:** s3 defines tiny setup/correctness smoke path and full-resource/protocol run with resume/retry; discrepancies require investigation.

**Answer/trace:** The smoke test establishes a tiny installation/schema/result/output-path check, not paper-scale performance. Full path names dataset preparation/access, supported environment/resource/time requirements, evaluation command/configuration, timing/quality/failure protocol, raw format and plotting command, plus retry/resume and service cost. A clean rerun should record changed defaults/paths/nondeterminism and investigate; do not paste the old chart into a supposedly new reproduction. **Bound/gap:** Declared workload/environment/comparison and uncertainty are necessary for performance reproduction. No gap for the distinction; concrete project commands must come from the selected artifact, not be invented by generic guidance.

**35C. Resources:** `supplement-35-s4`, `supplement-35-s5`, with data rules in `supplement-35-s1`. **Fresh prompt:** Three configurations, four repetitions each, five GPU-minutes per query repetition. Builds use two GPU-minutes per configuration if reused, or per repetition if rebuilt. Data prep uses .5 CPU-hour once. Compute both budgets; can the CPU time be added as GPU time or divided by two to declare two-device elapsed time? An unmeasured memory estimate accompanies restricted data.

**Available reasoning:** s4 explicitly types resource time and build reuse, separates timed query region from budget, and distinguishes GPU-hours from elapsed wall time. s5 labels estimates and untested capacity claims; s1 bounds sharing.

**Answer/trace:** Query work `3×4×5=60` GPU-min. Reused builds `3×2=6`, total 66 GPU-min=1.1 GPU-hours. Rebuilt builds `3×4×2=24`, total 84 GPU-min=1.4 GPU-hours. Report .5 CPU-hour separately; it is not a GPU-hour. Two devices may overlap work but these totals do not determine actual wall time without schedule/overheads. Keep builds outside query timing but in study budget. Label memory analytical with omitted workspace; do not call it measured peak/fit proof. Redistribute only permitted data, using access instructions/synthetic smoke where needed. **Bound/gap:** Fixed resource/reuse rules and included operations. No typed-budget gap remains.

## Supplement 36 — Research story

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Organize talk around supported claim | 36A | 2 | 2 | 2 | 2 |
| Mechanism via small worked example before benchmarks | 36B | 2 | 2 | 2 | 2 |
| Readable evidence/coordinated handoffs | 36C | 2 | 2 | 2 | 2 |

**36A. Resources:** `supplement-36-s1`, `supplement-36-s2`, `supplement-36-s3`. **Fresh prompt:** At fixed recall .95, measured QPS rises 2,000→3,000 while p95 rises 3→6 ms. Required p95 budget is 5 ms. Organize the argument and replace “50% faster” with an honest central statement.

**Available reasoning:** Four questions and the outline connect scope/bottleneck/mechanism/method/result/counterexample/artifact. s3 exposes throughput versus response-budget trade-off and insists hypothetical figures are not experiments.

**Answer/trace:** State this measured workload/device/quality boundary, explain baseline and waiting mechanism, describe matched method, show QPS and p95 with uncertainty, then expose failure at the 5-ms requirement and artifact. A central statement is “At recall .95, this batching point raises QPS by 50% but increases p95 from 3 to 6 ms, exceeding the 5-ms target.” It is not an acceptable speed win under that target. **Bound/gap:** Measured conditions and end-to-end boundary are necessary; throughput is not response latency, and illustrative numbers cannot be passed off as measurements. Text supports the narrative transfer.

**36B. Resource:** `supplement-36-s3`. **Fresh prompt:** Keep arrivals at 0 and 1 ms and the illustrative serial baseline of two ms per query, but change assumed batch execution from two to three ms. Dispatch batch at 1 ms. Compute finishes/responses and explain the losing change before citing a benchmark.

**Available reasoning:** The prose traces arrival, dispatch, completion and response for baseline and batch, then gives a single-arrival losing case and warns supplied costs do not derive the benchmark.

**Answer/trace:** Baseline completions remain 2 and 4 ms, responses 2 and 3. New batch completes both at 1+3=4 ms; responses are 4−0=4 and 4−1=3. Completion of the pair is no earlier, and the first request loses two ms. Thus a larger batch alone does not guarantee benefit; device work saved must outweigh queue and execution changes. A single arrival with one-ms wait and two-ms execution gives three instead of two ms with no batch gain. **Bound/gap:** Illustrative serial dispatch and supplied batch cost, not a benchmark derivation or universal ANN schedule. No mechanism gap: the changed cost can be traced rather than inferred from the throughput headline.

**36C. Resources:** `supplement-36-s3`, `supplement-36-s4`, `supplement-36-s5`. **Fresh prompt:** Three speakers present one QPS/latency result; chart shows only best runs, borrowed paper curve is labeled “our result,” and live demo fails. Design the evidence and handoffs.

**Available reasoning:** s3 fixes axis/denominator/uncertainty, s4 shares claim/terms and logical transitions, s5 labels external versus own numbers and recorded fallback.

**Answer/trace:** Use separate readable QPS-higher and latency-lower comparisons, direct units/baselines/quality targets and declared repetition aggregation/uncertainty; expose best-case selection if retained. Attribute paper curve as authors' reported result under their conditions, following reuse license. Speaker 1 frames scope/bottleneck and small trace; speaker 2 tests whether that bottleneck dominates and shows measured comparison; speaker 3 gives limits/ablation/artifact. All know central claim/method/limitation and use shared notation. Document demo failure, diagnose it, and use a clearly recorded fallback; narrow reliability claim if needed. **Bound/gap:** Real allotted time/course requirements remain unconfirmed. Text supports a coordinated design, not a requirement for a particular number of speakers.

## Supplement 37 — Discussion and evidence handoff

| Stated goal | Task | E | T | X | B |
|---|---|---:|---:|---:|---:|
| Critical answers with evidence/calibrated uncertainty | 37A | 2 | 2 | 2 | 2 |
| Actionable peer feedback without invented grading | 37B | 2 | 2 | 2 | 2 |
| Next experiment and final artifact preservation | 37C | 2 | 2 | 2 | 2 |

**37A. Resources:** `supplement-37-s1`, `supplement-37-s2`. **Fresh prompt:** Evidence contains one-GPU median latency 8→6 ms and 99% agreement with a reference LLM; no tails/timeouts, independent human labels or two-GPU runs. Answer “Does it improve tail latency?”, “Is factual accuracy 99%?”, and “Will two GPUs double throughput?”

**Available reasoning:** s2 explicitly conditions tail/human/scaling responses on actual measurements; s1 answers narrow evidence and proposes missing tests rather than inventing data.

**Answer/trace:** Tail behavior is unmeasured; median alone cannot establish it, so collect timeout-aware p95/p99 under declared protocol. 99% is reference agreement, not independently verified factual accuracy; design an independent held-out label/factual check. One GPU gives no two-device ratio; measure routing, placement, communication/merge and matched quality/workload. State measured median benefit only in its scope and identify each missing experiment. **Bound/gap:** No uncollected human sample/result can be supplied. Conditional responses are actually supported by the candidate text; no evidence-ownership gap.

**37B. Resource:** `supplement-37-s3`. **Fresh prompt:** Group A shows 30,000 QPS at recall .80; baseline shows 20,000 at .95. Give one specific methodological feedback item and one concrete repair. Another group has a well-controlled negative result; should it receive invented penalty points?

**Available reasoning:** s3 uses unequal-recall operating points as actionable feedback, distinguishes explanation gap from method flaw and provides a negative-result response without grading rules.

**Answer/trace:** Restate their intended equal-quality speed claim and observed points, identify unmatched recall as alternative explanation, then ask for parameter sweeps at a shared target with resources/latency/failure boundaries shown. Avoid guessing effort or intent. For the negative study, assess whether meaningful hypothesis and controls support the measured boundary; propose the smallest discriminating follow-up, not fabricated grading weights or automatic failure for no speedup. **Bound/gap:** Discussion form is suggested, not official rubric. Text supports concrete peer feedback with proportionate claims.

**37C. Resource:** `supplement-37-s5`, with confound response in `supplement-37-s2`. **Fresh prompt:** Raw data say p95=50 ms, chart says 50 seconds and incorrectly suggests a 100-ms target is exceeded. Discussion also reveals the new method used twice the memory. What correction/handoff and next experiment matter most?

**Available reasoning:** s5 requires figure/derived-claim corrections, errata and preserved code/config/data/raw/slides/report, choosing an experiment that most changes belief. s2 gives equal-total-memory comparison for capacity confound.

**Answer/trace:** Correct axis/figure to ms; recompute the target statement: 50 ms is below 100 ms. Check raw units and neighboring plots, preserve what changed in errata, and communicate through the actual course process. Save final revisions/configuration/data instructions/raw results/slides/report/open questions with owners/next evidence. Prioritize equal-total-memory comparison plus memory breakdown/sensitivity to resolve algorithm-versus-capacity explanation before simply scaling dataset size. **Bound/gap:** Never invent an upload destination/deadline or assume unit correction fixes every related claim. Text supplies a defensible next experiment and evidence chain; no gap.

## Closing limits

The ordered rendered read and the documented task reasoning are complete. Strong claims here are limited to those tasks and the introductory/design scope. I did not run the optional GPU/cloud/model experiments, verify external research in this pass, gather human comprehension evidence, or approve release. Publication/deployment and parent approval remain outside this read-only cross-review.
