# Supplemental syllabus alignment and primary evidence

Prepared 2026-10-11. Original English content, not official lecture reconstruction.

## Status boundaries

- Canvas-assigned W11–12 readings: UNVERIFIED. The exact Canvas syllabus URL led to authentication; no assigned list was retrieved.
- The ten study records are a suggested arrangement of the user-supplied 4 frontier + 4 clinic + 2 symposium sessions. Within-module sequencing is not claimed to be official.
- Instructor rubric, grading weights, exact talk duration, deadlines and submission format: UNVERIFIED and not invented.
- No proposed GPU experiment has been run. One-/two-H100 feasibility is an inference, subject to actual memory, platform, library and interconnect checks.

## Coverage

- M11/W11–12: learned DBMS components: SUPPLEMENTAL_CONTENT_ADDED. Component contracts; q-error; end-to-end overhead; train/test leakage; learned-index correction; original PODS-style bound example.
- M11/W11–12: vector databases and ANN search: SUPPLEMENTAL_CONTENT_ADDED. Exact semantics, graph/IVF/quantization comparison, filtered recall, memory calculation, H100 mini-experiment.
- M11/W11–12: LLMs for data systems: SUPPLEMENTAL_CONTENT_ADDED. Two directions of LLM integration; semantic operators; cost/cascade arithmetic; human-label vs reference agreement; H100 inference plan.
- M11/W11–12: cloud-native/disaggregated DBMS: SUPPLEMENTAL_CONTENT_ADDED. Architecture comparison, ownership, WAL/recovery, network cost model, contention/cold-cache/failure experiments.
- M11: recent SIGMOD/VLDB/ICDE/PODS papers assigned on Canvas: UNVERIFIED_ASSIGNED_LIST. Nine verified supplemental accepted/published papers supplied across all four venue families. No claim that any is assigned on Canvas. Authentication boundary prevented source retrieval.
- M12/W13–14: four project-clinic sessions; supervised research and instructor consultations: SUPPLEMENTAL_GUIDANCE_ADDED. Falsifiable charter; baseline/evaluation protocol; factorial ablations; negative results; consultation agendas; artifact manifest and report audit.
- M13/W15: two research-symposium sessions; conference-style group presentations: SUPPLEMENTAL_GUIDANCE_ADDED. Adaptable talk structure; claims/evidence; group handoffs; rigorous Q&A; peer-review guidance; scientific closure.
- Instructor-specific deadlines, grading, talk duration and submission rules: UNVERIFIED_NOT_INVENTED. All templates/timings are expressly suggested practice. Actual rules must come from instructor materials.

## Primary research bibliography

### lqo — Is Your Learned Query Optimizer Behaving As You Expect? A Machine Learning Perspective

Claude Lehmann, Pavel Sulimov, Kurt Stockinger. PVLDB 17(7): 1565–1577, 2024.
Status: Published peer-reviewed research / evaluation.
Primary URL: https://www.vldb.org/pvldb/vol17/p1565-lehmann.pdf
Supported scope: An end-to-end learned-optimizer evaluation framework; sensitivity to training/test design; PostgreSQL wins in most tested comparisons, depending on split. This is evidence about the evaluated systems and protocol, not impossibility of learned optimization.
DOI: https://doi.org/10.14778/3654621.3654625

### grasp — Data-Agnostic Cardinality Learning from Imperfect Workloads

Peizhi Wu, Rong Kang, Tieying Zhang, Jianjun Chen, Ryan Marcus, Zachary G. Ives. PVLDB 18(8): 2519–2532, 2025.
Status: Published peer-reviewed research.
Primary URL: https://www.vldb.org/pvldb/vol18/p2519-wu.pdf
Supported scope: GRASP learns from queries and observed cardinalities without raw data access; compositional models target incomplete or imbalanced join templates and range-predicate shifts. Evaluated on three database instances.
DOI: https://doi.org/10.14778/3742728.3742745

### lp — Join Size Bounds using Lp-Norms on Degree Sequences

Mahmoud Abo Khamis, Vasileios Nakos, Dan Olteanu, Dan Suciu. PODS 2024 / Proceedings of the ACM on Management of Data 2(2), 2024.
Status: Accepted PODS 2024 paper; linked arXiv is an author manuscript first posted in 2023.
Primary URL: https://arxiv.org/abs/2306.14075
Supported scope: Join-output upper bounds incorporating Lp norms of degree sequences; distinct from point estimates. Official PODS list verifies 2024 acceptance.
DOI: https://doi.org/10.1145/3651597
Acceptance/track evidence: https://2024.sigmodconf.hosting.acm.org/pods_list.shtml

### cagra — CAGRA: Highly Parallel Graph Construction and Approximate Nearest Neighbor Search for GPUs

Hiroyuki Ootomo, Akira Naruse, Corey Nolet, Ray Wang, Tamas Feher, Yong Wang. ICDE 2024, pp. 4236–4247.
Status: Accepted ICDE 2024 paper; linked author manuscript v2 revised July 2024, first posted August 2023.
Primary URL: https://arxiv.org/abs/2308.15136
Supported scope: GPU-oriented graph construction and ANN search, including large- and small-batch evaluation. Authors’ record explicitly states ICDE 2024 acceptance.

### rabitq — RaBitQ: Quantizing High-Dimensional Vectors with a Theoretical Error Bound for Approximate Nearest Neighbor Search

Jianyang Gao, Cheng Long. SIGMOD 2024 / Proceedings of the ACM on Management of Data 2(3), Article 167, 2024.
Status: Accepted SIGMOD 2024 paper; linked author manuscript explicitly confirms acceptance.
Primary URL: https://arxiv.org/abs/2405.12497
Supported scope: Randomized D-bit quantization, distance estimation, and a theoretical error bound; this is not a guarantee that an arbitrary ANN search returns the exact top k.
DOI: https://doi.org/10.1145/3654970

### lotus — Semantic Operators and Their Optimization: Enabling LLM-Based Data Processing with Accuracy Guarantees in LOTUS

Liana Patel, Siddharth Jha, Melissa Pan, Harshit Gupta, Parth Asawa, Carlos Guestrin, Matei Zaharia. PVLDB 18(11): 4171–4184, 2025.
Status: Published peer-reviewed research; use published title, not earlier preprint title.
Primary URL: https://www.vldb.org/pvldb/vol18/p4171-patel.pdf
Supported scope: Semantic operators and optimization with statistical accuracy relative to a reference algorithm; guarantees for individual operators do not certify factual truth or automatically compose into an end-to-end guarantee.
DOI: https://doi.org/10.14778/3749646.3749685

### docetl — DocETL: Agentic Query Rewriting and Evaluation for Complex Document Processing

Shreya Shankar, Tristan Chambers, Tarak Shah, Aditya G. Parameswaran, Eugene Wu. PVLDB 18(9): 3035–3048, 2025.
Status: Published peer-reviewed research.
Primary URL: https://www.vldb.org/pvldb/vol18/p3035-shankar.pdf
Supported scope: Agent-guided document-pipeline rewriting and evaluation, including task/data decomposition; evaluation covers four document-processing tasks. No generalized accuracy improvement is promised here.
DOI: https://doi.org/10.14778/3746405.3746426

### polar — PolarDB-MP: A Multi-Primary Cloud-Native Database via Disaggregated Shared Memory

Xinjun Yang, Yingqiang Zhang, Hao Chen, Feifei Li, Bo Wang, Jing Fang, Chuan Sun, Yuhui Wang. SIGMOD 2024 Industry, SIGMOD Companion, pp. 295–308.
Status: Published industrial paper; not a SIGMOD research-track or PODS paper.
Primary URL: https://cighao.com/papers/polardb_mp.pdf
Supported scope: Disaggregated memory/storage with PMFS transaction, buffer and lock fusion; partial log ordering and recovery. Official conference program confirms Industry classification.
DOI: https://doi.org/10.1145/3626246.3653377
Acceptance/track evidence: https://2024.sigmodconf.hosting.acm.org/program_sigmod.shtml

### gauss — GaussDB: A Cloud-Native Multi-Primary Database with Compute-Memory-Storage Disaggregation

Guoliang Li, Wengang Tian, Jinyu Zhang, Ronen Grosman, Zongchao Liu, Sihao Li. PVLDB 17(12): 3786–3798, 2024.
Status: Published industrial/system paper.
Primary URL: https://www.vldb.org/pvldb/vol17/p3786-li.pdf
Supported scope: Three-layer separation; global buffers/locks, page ownership transfer, affinity-aware placement/routing and two-tier recovery. Bibliography and abstract verified through the publisher-indexed PDF; direct full-PDF fetch timed out.
DOI: https://doi.org/10.14778/3685800.3685806

## Official software and research-practice references

- cuvs: NVIDIA cuVS: CAGRA guide — https://docs.nvidia.com/cuvs/user-guide/api-guides/indexing-guide/cagra. Current official implementation guide for the GPU graph index; implementation may differ from the 2024 experimental artifact.
- cuvsbench: NVIDIA cuVS: Benchmarking methodologies — https://docs.nvidia.com/cuvs/user-guide/benchmarking-guide/methodologies. Recall-matched comparisons, parameter sweeps, Pareto trade-offs and reporting of build/search cost.
- cuvsinstall: NVIDIA cuVS: Installation — https://docs.nvidia.com/cuvs/installation. GPU/software/platform requirements. Current guide states Linux packages, WSL2 route for Windows and supported CUDA/GPU requirements; pin a release before running.
- pgvector: pgvector official repository documentation — https://github.com/pgvector/pgvector. Exact/approximate vector search inside PostgreSQL and distance operators; filtering and iterative scans require attention to deployed version.
- vllm: vLLM Optimization and Tuning — https://docs.vllm.ai/en/stable/configuration/optimization/. Inference memory/throughput configuration and preemption considerations; no assertion that a particular model or workload has been benchmarked on the user’s hardware.
- artifact: ACM SIGSIM PADS 2024: Reproducibility and Artifact Evaluation — https://sigsim.acm.org/conf/pads/2024/blog/artifact-evaluation/. Distinction between documented, exercisable artifacts and stronger reuse/results evidence. No badge or course requirement is claimed.
- neon: Architecture decisions in Neon — https://neon.com/blog/architecture-decisions-in-neon. Separation of compute, WAL safekeepers and pageserver responsibilities; not a current SLA or service-price source.
