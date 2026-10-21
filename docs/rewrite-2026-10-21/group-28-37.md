# Supplemental group 28–37: rewrite and review evidence

All ten supplemental resources have new EN/VI teaching bodies in every section: **64 section pairs**, with the same section IDs, goals counts and routes. All 50 practice questions were checked against the new explanations. Eighteen feedback pairs now show the relevant calculations or reasoning more explicitly; options, keyed positions and IDs are unchanged. The inline self-check remains synchronized with the first bank question.

This group retains its original **supplemental** status. It does not claim to be ten additional Edinburgh lectures, verified Canvas assignments, an instructor rubric or an assessed question bank. The existing sources and source-scope metadata remain unchanged. GPU exercises remain optional; none were launched.

## Inventory and coverage

Canonical EN files are `course/supplements/supplementNN.json`; paired VI files are `course/translations/supplementNN.vi.json`. Quiz translations are `course/quiz-translations/supplementNN.vi.json`. There are no new runtime assets or route changes in this group.

| Resource | Sections, EN and VI | Running problem and visible work | Main source scope | Review state |
|---|---:|---|---|---|
| 28 Learned DBMS components | 7 | Customer correlation → 500 vs 5,000; both q-error ratios; plan/inference totals; amortization; learned lookup verification; aligned join counts and bound; held-out templates | LQO evaluation, GRASP and Lp join-size bounds | Rewritten; author arithmetic/source/identity checks complete; independent review requested |
| 29 Vector databases | 7 | Two 2D vectors → squared distances and dot products; exact/ANN ID intersections; filtered eligibility; candidate survivors; coordinate/link memory; matched-recall GPU plan | CAGRA, RaBitQ, cuVS and pgvector | Rewritten; author checks complete; independent review requested |
| 30 LLM data systems | 7 | Support notes → date filter → cheap/expensive routing → calls/cost; TP/FP/FN and quality; four-note routing trace; weights vs runtime memory | LOTUS, DocETL, vLLM | Rewritten; author checks complete; independent review requested |
| 31 Disaggregation | 7 | One acknowledged page update through cache/log/storage/failure/fencing; bytes vs serialized/overlapped requests | PolarDB-MP, GaussDB, Neon architecture account | Rewritten; author checks complete; independent review requested |
| 32 Research question | 6 | Microbatching's device benefit and queue cost → falsification → observables → charter → consultation decisions | LQO evaluation and cuVS methodology; original planning practice | Rewritten; independent full EN/VI prose read found no blocker |
| 33 Baselines/measurement | 6 | Two-query totals vs ratio means; nine-win/one-loss transfer; three matched run pairs; timing and timeout boundaries | LQO evaluation and cuVS methodology | Rewritten; independent prose read complete; opener continuity feedback applied |
| 34 Ablation/negative results | 6 | Four cache/batching cells → conditional effects → additive prediction → signed interaction; bottleneck explanation | LQO, GRASP and cuVS; original factorial arithmetic | Rewritten; independent full EN/VI prose read found no blocker |
| 35 Reproducibility | 6 | Figure-to-input evidence chain; two-level execution; reused/rebuilt index budgets by resource | ACM PADS artifact guidance and cuVS methodology; original budget example | Rewritten; independent full EN/VI prose read found no blocker |
| 36 Research story | 6 | Two arrival times → both execution paths → per-query response times → single-arrival counterexample; hypothetical throughput/latency claim | ACM artifact guidance and cuVS methodology; original talk exercise | Rewritten; independent full EN/VI prose read found no blocker |
| 37 Discussion/handoff | 6 | Untested hardware, tails, evaluator truth → bounded answers → discriminating next test → correction handoff | ACM artifact guidance, cuVS methodology and Lp bibliography | Rewritten; independent full EN/VI prose read found no blocker |

The six-section resources use their existing section structure; the seven-section frontier resources use theirs. They are not forced into one eight-heading template.

## Sources checked on 21 October

The checks below verified the primary-source identity and the conceptual claims used in these supplemental explanations. They do **not** claim a fresh full reading of every research paper or execution of its artifact. These research PDFs have physical PDF page counts, not the lecture slide-number convention.

| Primary source | Evidence inspected | Relevant distinction retained |
|---|---|---|
| [LQO evaluation, PVLDB 2024](https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf) | 13 physical pages; title/abstract and evaluation overview | Train/test design matters; PostgreSQL comparison is scoped to tested methods/splits |
| [GRASP, PVLDB 2025](https://www.vldb.org/pvldb/vol18/p2519-wu.pdf) | 14 physical pages; title/abstract and problem/design overview | Query/count-driven learning without raw-table access; imperfect join templates |
| [Lp join-size bounds](https://arxiv.org/abs/2306.14075) | Author abstract/version record | Upper bounds differ from point estimates; lesson's two-vector calculation is original and not the general theorem |
| [CAGRA](https://arxiv.org/abs/2308.15136) | Author abstract and acceptance comment | GPU graph design; ICDE 2024 acceptance confirmed; reported results are not H100 promises |
| [RaBitQ](https://arxiv.org/abs/2405.12497) | Author abstract and acceptance comment | D-bit coordinate code and distance-estimation bound; not unconditional exact-top-k retrieval |
| [LOTUS](https://www.vldb.org/pvldb/vol18/p4171-patel.pdf) | 14 physical pages; title/abstract | Accuracy defined relative to a reference algorithm; independent truth needs a separate check |
| [DocETL](https://www.vldb.org/pvldb/vol18/p3035-shankar.pdf) | 14 physical pages; title/abstract | Data/task decomposition and plan rewriting; reported evaluation covers four tasks |
| [PolarDB-MP](https://cighao.com/papers/polardb_mp.pdf) | 14 physical pages; title/abstract and printed Companion citation on physical page 1 | PMFS coordination and log partial ordering; industrial/Companion status preserved |
| [GaussDB](https://www.vldb.org/pvldb/vol17/p3786-li.pdf) | 13 physical pages; title/abstract and architecture/ownership text on physical pages 2–3 | Compute-memory-storage separation, ownership, global buffers/locks; generic fencing trace is not claimed as the exact implementation |
| [Neon architecture account](https://neon.com/blog/architecture-decisions-in-neon) | Official engineering account dated 8 July 2022 | Historical responsibility split; no current SLA/price inferred |
| [cuVS methodology](https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies) | Official recall, fair comparison and Pareto sections | Matched quality and explicit search/build scope |
| [cuVS CAGRA](https://docs.nvidia.com/cuvs/user-guide/api-guides/indexing-guide/cagra), [installation](https://docs.nvidia.com/cuvs/installation) | Official index overview, footprint headings, platform requirements | Construction peak differs from coordinate payload; current Linux/WSL2 path is version-sensitive |
| [vLLM optimization](https://docs.vllm.ai/en/stable/configuration/optimization/) | Official optimization/memory guidance | Weights alone do not determine fit; context/batch/runtime state matter |
| [pgvector](https://github.com/pgvector/pgvector) | Official project documentation overview | Exact/approximate search and filtering need a defined version/eligible set |
| [ACM PADS artifact evaluation](https://sigsim.acm.org/conf/pads/2024/blog/artifact-evaluation/) | Criteria, badge distinctions and artifact instructions | Functional/reusable artifacts and reproduced results differ; no course rubric inferred |

The ACM page initially timed out; a second read succeeded. No unresolved source-fetch denial remains in this group.

## Before and after examples

These comparisons describe pedagogy rather than declaring the previous content technically wrong.

**28, q-error:** Previously the Customer counts, conjunction and formula were compressed into a short block. The new lesson explicitly derives City A's 10,000 rows, the 5,000 pass holders, why all 5,000 satisfy both, why independence instead keeps 5% of 10,000, and both directions of each q-error ratio. The exercise reverses the counts to separate metric symmetry from asymmetric system consequences. EN and VI show the same steps.

**31, architecture:** Previously the first teaching section introduced several architecture names together. The new opening begins with an acknowledged change followed by compute failure and an old page. The reader then labels compute/cache/durable responsibilities, calculates remote cost, and follows generation 7 → durable evidence → failure → recovery → generation 8 → stale-writer rejection before comparing named systems. Its first prerequisite was corrected from storage-model lesson 7 to buffer-management lesson 5 in the teaching prose; immutable source metadata was not changed.

**34, interaction:** The existing four measurements were useful and are retained. The new body walks each conditional subtraction separately (30/40 ms cache savings and 20/30 ms batching savings), derives 50 ms additive expectation, compares the supplied 40 ms and only then names signed interaction −10 ms. It distinguishes that arithmetic from proof of mechanism and requires repeated measurements.

**36, research story:** The existing two-query example was sound. It now occupies the center of the explanation, with arrival/run/completion/response arithmetic for both paths and a single-arrival losing case. Only afterward does the lesson introduce the separate hypothetical throughput/latency claim; it explicitly says the trace does not derive benchmark results.

## Checks and limits

- Author review covered all 64 EN/VI section pairs and all 50 supplemental questions. Source metadata, source kind, goals counts, routes, section identities, options and canonical keys are preserved.
- Every original per-section cited URL remains present in EN and VI; ordered EN Key takeaway blocks remain byte-for-byte compatible. HTML paragraphs/details/summary/asides/strong elements were checked for matching open/close counts. No escaped paragraph markup or undefined text was found.
- Independent arithmetic rechecked q-error, latency totals, 138,462-request break-even, the eight-row join/bound, recall, 3.072/0.256 GB payloads, cascade prices/quality, remote bandwidth/latency, workload totals, matched pairs, −10 ms interaction, both build budgets and queue response times.
- `node --test tests/readability-preservation.test.mjs` passed both preservation checks after the edits. Full build/runtime/browser/mobile testing belongs to the integrating parent; this group does not claim those tests were run here.
- Independent reviewer read every EN/VI body in 32–37 and found no semantic or mathematical blocker. The minor opener mismatch in 33 was corrected from “nine queries” to “some queries” before the two-query worked example. Fresh transfer exercises and the parent's independent 28–31 review remain to be recorded by integration.
- No benchmark, model inference, GPU job, external transmission, deployment or paid service was executed by this group. Actual research reproduction and login-restricted course requirements remain outside verified evidence.
