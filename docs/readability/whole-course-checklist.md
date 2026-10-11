# Whole-course reading and goal checklist

Baseline: English v3.1.0 `0a1fb0363d2c44a0ca8f508f4e964a01af128720`. Candidate branch: `readability/learner-review-2026-10`; release approval is pending. Three editors read their complete baseline scope; three independent readers then rotated scopes and read all candidate sections, including disclosed answers, in numerical order.

Every displayed goal below has a linked task record in the corresponding final candidate review. Those records include the prompt, available reasoning, intermediate steps, answer, assumptions and any remaining gap. Their 0/1/2 Explain / Trace / Transfer / Bound rubric assesses the documented nearby variant. It is an editorial cognitive walkthrough, **not a human learner study** or a success-rate measurement.

| Resource | Sections read | Goals assessed | Independent candidate report |
|---|---:|---:|---|
| lecture-01 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-02 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-03 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-04 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-05 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-06 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-07 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-08 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-09 | 4 | 3 | [foundations](candidate-foundations-review.md) |
| lecture-10 | 4 | 4 | [foundations](candidate-foundations-review.md) |
| lecture-11 | 4 | 4 | [foundations](candidate-foundations-review.md) |
| lecture-12 | 4 | 4 | [foundations](candidate-foundations-review.md) |
| lecture-13 | 4 | 4 | [systems](candidate-systems-review.md) |
| lecture-14 | 4 | 4 | [systems](candidate-systems-review.md) |
| lecture-15 | 4 | 4 | [systems](candidate-systems-review.md) |
| lecture-16 | 4 | 4 | [systems](candidate-systems-review.md) |
| lecture-17 | 4 | 4 | [systems](candidate-systems-review.md) |
| lecture-18 | 4 | 4 | [systems](candidate-systems-review.md) |
| lecture-19 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-20 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-21 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-22 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-23 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-24 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-25 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-26 | 5 | 3 | [systems](candidate-systems-review.md) |
| lecture-27 | 5 | 3 | [systems](candidate-systems-review.md) |
| supplement-28 | 7 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-29 | 7 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-30 | 7 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-31 | 7 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-32 | 6 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-33 | 6 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-34 | 6 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-35 | 6 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-36 | 6 | 3 | [supplements](candidate-supplements-review.md) |
| supplement-37 | 6 | 3 | [supplements](candidate-supplements-review.md) |

Coverage: **37 resources, 181 sections, 120 primary goals**. Counts identify the reviewed scope; they do not demonstrate comprehension.

## lecture-01 — From data to a DBMS

Sections: `l1-1`, `l1-2`, `l1-3`, `l1-4`.

- Distinguish a database, a DBMS, a schema, and an instance
- Explain the three levels of abstraction through an example
- Identify the system responsibilities behind a query

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-02 — SQL: understanding the result

Sections: `l2-1`, `l2-2`, `l2-3`, `l2-4`.

- Work through WHERE, GROUP BY, and HAVING step by step
- Distinguish inner and outer joins and calculate their result sizes
- Use IN and EXISTS with small datasets

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-03 — Relational algebra: from questions to plans

Sections: `l3-1`, `l3-2`, `l3-3`, `l3-4`.

- Evaluate relational operators on small datasets
- Distinguish set projection from SQL bag projection
- Turn a join question into an expression you can check

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-04 — Hardware and the disk-space manager

Sections: `l4-1`, `l4-2`, `l4-3`, `l4-4`.

- Trace the path from SQL down to pages
- Calculate read costs using an explicitly stated model
- Distinguish bytes, pages, and records

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-05 — The buffer pool: pin, dirty, LRU, and CLOCK

Sections: `l5-1`, `l5-2`, `l5-3`, `l5-4`.

- Update pin counts and dirty flags correctly
- Simulate LRU and CLOCK when some pages are pinned
- Explain sequential flooding and the limits of replacement policies

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-06 — Files, pages, and records

Sections: `l6-1`, `l6-2`, `l6-3`, `l6-4`.

- Calculate offsets and capacity under explicit assumptions
- Explain packed pages, bitmaps, free lists, and slotted pages
- Distinguish a slot directory from a field-offset directory

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-07 — Storage models and compression

Sections: `l7-1`, `l7-2`, `l7-3`, `l7-4`.

- Compare row, column, and PAX layouts by the bytes read
- Encode and decode RLE, delta, and dictionary representations
- Distinguish a teaching model from the actual Parquet format

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-08 — File organisations and index types

Sections: `l8-1`, `l8-2`, `l8-3`, `l8-4`.

- Compare heap and sorted-file costs under the same assumptions
- Distinguish a search key, a primary key, and an index entry
- Calculate the data-fetch costs of clustered and unclustered indexes

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-09 — Tree indexing: ISAM and B+ trees

Sections: `l9-1`, `l9-2`, `l9-3`, `l9-4`.

- Use separators to find a leaf and scan a range
- Simulate insertion and deletion using the order-d convention
- Explain copy-up, push-up, and byte-based occupancy

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-10 — Hash-Based Indexing

Sections: `l10-s1`, `l10-s2`, `l10-s3`, `l10-s4`.

- Explain in-memory hashing and collision resolution
- Trace searches, insertions, deletions, and overflow in static chained hashing
- Recognise skew and identify when rehashing is needed
- Simulate global and local depth, bucket splits, and directory changes in extendible hashing

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-11 — External Sorting & Aggregation

Sections: `l11-s1`, `l11-s2`, `l11-s3`, `l11-s4`.

- Connect query execution to the implementation of individual operators
- Calculate the number of passes in two-way and multiway external merge sort
- Compare reading through clustered and unclustered B+ trees
- Use sorting to implement DISTINCT

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-12 — Joins

Sections: `l12-s1`, `l12-s2`, `l12-s3`, `l12-s4`.

- Identify join semantics and the assumptions behind I/O calculations
- Calculate the costs of tuple, page, and block nested-loop joins
- Calculate index nested-loop join costs with clustering
- Handle duplicates and combine the final merge pass with a sort-merge join

Task reasoning and scope: [independent foundations cross-review](candidate-foundations-review.md).

## lecture-13 — Query Evaluation: Processing Models

Sections: `l13-s1`, `l13-s2`, `l13-s3`, `l13-s4`.

- Trace open, next, and close calls in the iterator model
- Explain the state maintained by a selection, heap scan, and nested-loop join
- Identify blocking operations such as sorting and hash-table construction
- Explain pipelining, LIMIT, and iterator overhead

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-14 — Query Optimisation: Plan Space

Sections: `l14-s1`, `l14-s2`, `l14-s3`, `l14-s4`.

- Distinguish the parser, rewriter, and cost-based optimizer
- Describe query blocks and the System R approach
- Apply logical equivalences and safe simplifications
- Change join order while preserving predicates and handling cross products

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-15 — Query Optimisation: Plan Space Example

Sections: `l15-s1`, `l15-s2`, `l15-s3`, `l15-s4`.

- Recalculate the cost after each plan refinement
- Distinguish the effects of selection pushdown on the outer and inner inputs
- Compare both choices of outer and inner join input
- Include the cost of materializing a filtered inner input

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-16 — Access Methods

Sections: `l16-s1`, `l16-s2`, `l16-s3`, `l16-s4`.

- Distinguish sequential-scan cost from output selectivity
- Check whether an index can support a predicate in key order
- Apply the equality-prefix/range rule to a composite B+ tree
- Compare index-only, clustered, and unclustered scans

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-17 — Query Optimisation: Costing

Sections: `l17-s1`, `l17-s2`, `l17-s3`, `l17-s4`.

- Estimate operator costs and the cardinalities passed between steps
- Read catalog statistics and explain when they need updating
- Identify uniformity and independence assumptions
- Calculate selectivity for equality, range, NOT, AND, and OR conditions

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-18 — Query Optimisation: Searching

Sections: `l18-s1`, `l18-s2`, `l18-s3`, `l18-s4`.

- Enumerate and cost access paths for a single table
- Explain why the number of join trees grows rapidly
- Distinguish left-deep, bushy, and right-deep join trees
- Understand the benefits and limits of cross-product pruning

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-19 — Transactions: correctness under concurrency

Sections: `l19-s1`, `l19-s2`, `l19-s3`, `l19-s4`, `l19-s5`.

- Distinguish the four ACID properties
- Construct a precedence graph from a read/write schedule
- Distinguish conflict serializability from view serializability

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-20 — Locking: from locks to correct schedules

Sections: `l20-s1`, `l20-s2`, `l20-s3`, `l20-s4`, `l20-s5`.

- Simulate shared/exclusive locks and the two locking phases
- Explain why cascading aborts occur
- Handle deadlocks through detection or timestamp-based prevention

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-21 — Recovery: why the log must come first

Sections: `l21-s1`, `l21-s2`, `l21-s3`, `l21-s4`, `l21-s5`.

- Derive UNDO and REDO requirements from the buffer policy
- Apply the two mandatory WAL ordering rules
- Follow the analysis, redo, and undo phases

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-22 — Distributed transactions: reaching one decision

Sections: `l22-s1`, `l22-s2`, `l22-s3`, `l22-s4`, `l22-s5`.

- Detect global deadlock by combining local graphs
- Simulate prepare, vote, decision, and acknowledgement
- Explain why a prepared participant can become blocked

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-23 — Conjunctive Queries: A Query Describes a Pattern

Sections: `l23-s1`, `l23-s2`, `l23-s3`, `l23-s4`, `l23-s5`.

- Translate SQL or relational algebra into a conjunctive query
- Distinguish output variables from existentially quantified variables
- Find homomorphisms and determine the result set

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-24 — Conjunctive Query Evaluation and Static Analysis

Sections: `l24-s1`, `l24-s2`, `l24-s3`, `l24-s4`, `l24-s5`.

- Distinguish data complexity from combined complexity
- Use the correct homomorphism direction when checking containment
- Remove redundant atoms while preserving the output variables

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-25 — Acyclic Conjunctive Queries: Use the Tree Structure

Sections: `l25-s1`, `l25-s2`, `l25-s3`, `l25-s4`, `l25-s5`.

- Build a hypergraph from the query atoms
- Check the running-intersection property and apply GYO reduction
- Use bottom-up semijoins to answer a Boolean conjunctive query

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-26 — Parallel query processing: bringing data to each operator

Sections: `l26-s1`, `l26-s2`, `l26-s3`, `l26-s4`, `l26-s5`.

- Compare shared-memory, shared-disk, and shared-nothing architectures.
- Choose a partitioning strategy that fits the workload.
- Estimate broadcast and shuffle costs, and identify bottlenecks.

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## lecture-27 — NoSQL: choosing a model for the system requirements

Sections: `l27-s1`, `l27-s2`, `l27-s3`, `l27-s4`, `l27-s5`.

- Distinguish sharding from replication.
- Explain the trade-off during a network partition.
- Compare key-value, document, column-family, and graph data models.

Task reasoning and scope: [independent systems cross-review](candidate-systems-review.md).

## supplement-28 — Learned DBMS components: predictions need a systems contract

Sections: `supplement-28-status`, `supplement-28-s1`, `supplement-28-s2`, `supplement-28-s3`, `supplement-28-s4`, `supplement-28-s5`, `supplement-28-s6`.

- Locate learning at cardinality estimation, cost/ranking, indexing and configuration boundaries.
- Calculate q-error and end-to-end break-even cost.
- Design a leakage-resistant evaluation with a safe conventional fallback.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-29 — Vector databases: the recall, memory and latency contract

Sections: `supplement-29-status`, `supplement-29-s1`, `supplement-29-s2`, `supplement-29-s3`, `supplement-29-s4`, `supplement-29-s5`, `supplement-29-s6`.

- Define exact top-k and ANN recall using the same metric and filter.
- Compare graph traversal, inverted-file pruning and vector compression.
- Design a recall-matched single-GPU experiment and explain multi-GPU limits.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-30 — LLMs for data systems: semantic operators with measurable quality

Sections: `supplement-30-status`, `supplement-30-s1`, `supplement-30-s2`, `supplement-30-s3`, `supplement-30-s4`, `supplement-30-s5`, `supplement-30-s6`.

- Distinguish LLM-assisted database control from LLM-powered data processing.
- Calculate filter/cascade costs without assuming quality is unchanged.
- Evaluate semantic pipelines against human labels and reference algorithms separately.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-31 — Cloud-native and disaggregated DBMSs: locality becomes a protocol

Sections: `supplement-31-status`, `supplement-31-s1`, `supplement-31-s2`, `supplement-31-s3`, `supplement-31-s4`, `supplement-31-s5`, `supplement-31-s6`.

- Compare shared-nothing, shared-storage and compute-memory-storage designs.
- Trace page ownership, write-ahead logging and recovery responsibilities.
- Estimate remote-access costs and design a workload/failure experiment.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-32 — Project clinic: turn a topic into a falsifiable research question

Sections: `supplement-32-status`, `supplement-32-s1`, `supplement-32-s2`, `supplement-32-s3`, `supplement-32-s4`, `supplement-32-s5`.

- Write a bounded research claim with a falsification condition.
- Connect a proposed mechanism to an observed bottleneck.
- Prepare concrete evidence and decisions for an instructor consultation.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-33 — Project clinic: trustworthy baselines and measurements

Sections: `supplement-33-status`, `supplement-33-s1`, `supplement-33-s2`, `supplement-33-s3`, `supplement-33-s4`, `supplement-33-s5`.

- Choose baselines that isolate the claimed improvement.
- Distinguish workload-total, per-query and tail metrics.
- Design repeatable timing, split and timeout policies.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-34 — Project clinic: ablations, counterexamples and negative results

Sections: `supplement-34-status`, `supplement-34-s1`, `supplement-34-s2`, `supplement-34-s3`, `supplement-34-s4`, `supplement-34-s5`.

- Design ablations that isolate mechanisms without quietly changing the task.
- Interpret interacting components using a small factorial experiment.
- Turn failures and negative results into bounded, useful conclusions.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-35 — Project clinic: reproducible artifacts and defensible conclusions

Sections: `supplement-35-status`, `supplement-35-s1`, `supplement-35-s2`, `supplement-35-s3`, `supplement-35-s4`, `supplement-35-s5`.

- Package the evidence required to rerun a result.
- Separate a smoke test from a full scientific reproduction.
- Audit cost, data permission, limitations and claims before presenting.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-36 — Research symposium: build a conference-style research story

Sections: `supplement-36-status`, `supplement-36-s1`, `supplement-36-s2`, `supplement-36-s3`, `supplement-36-s4`, `supplement-36-s5`.

- Organize a talk around one supported claim.
- Explain a mechanism with a small worked example before benchmarks.
- Design readable evidence slides and coordinated group handoffs.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## supplement-37 — Research symposium: defend, review and close the evidence loop

Sections: `supplement-37-status`, `supplement-37-s1`, `supplement-37-s2`, `supplement-37-s3`, `supplement-37-s4`, `supplement-37-s5`.

- Answer critical questions with evidence and calibrated uncertainty.
- Give actionable peer feedback without inventing a grading scheme.
- Identify the next experiment and preserve the final artifact.

Task reasoning and scope: [independent supplements cross-review](candidate-supplements-review.md).

## Residual learning boundaries

The reports support small changed-input tasks at the advertised introductory or design scope. They do not establish arbitrary implementation skill, complete B+ tree repair, a Parquet encoder, a PostgreSQL performance result, full-paper reproduction or confidence-interval derivation. Reading-time labels remain unchanged and unmeasured. A later human study should record prerequisites, unassisted explanations/solutions, requests for help and actual time.
