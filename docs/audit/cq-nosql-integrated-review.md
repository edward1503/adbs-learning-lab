# Independent review of integrated CQ, parallel-query and NoSQL additions

Review date: 2026-10-11. Scope: canonical `course/lecture23.json` through `course/lecture27.json`, the five CAP questions in `course/quiz27.json`, and the corresponding resolution record. This review was performed by an agent other than the author of these additions.

**Result: accepted for content integration.** All sixteen findings have substantive explanations and examples in the actual canonical HTML. No incorrect answer, mathematical result or scope claim was found in the additions. This is acceptance of the staged content, not a statement that browser rendering or deployment has passed.

The reviewer read the complete appended HTML, the surrounding lesson context, all five CAP questions with their source metadata, and the seven focused tests. The Enrol/Teach and path examples, round-robin assignment and replica capacity were also recomputed separately from the author's test evaluator. The remaining theory and worked examples were checked by explicit derivation below.

## Findings checked

| Finding | Integrated targets | Independent check | Result |
|---|---|---|---|
| G23-1 | `l23-s1`, `l23-s2` | Three Enrol/Teach assignments are `(A,DB)`, `(A,AI)`, `(B,AI)`. Projection gives the set `{A,B}`; adding the course to the head retains three tuples. Safe positive CQ language is separated from arbitrary negation, disjunction and universal quantification. Codd's connection is an expressive-power statement. | Accepted |
| G23-2 | `l23-s3`, `l23-s5` | With edges `ab,bc,ac,cc`, four two-edge witnesses are `abc`, `bcc`, `acc`, `ccc`. Their distinct heads are `ac,bc,cc`. The Boolean result is `{()}` when a witness exists and the empty set otherwise. Constants and repeated variables are preserved consistently. | Accepted |
| G24-1 | `l24-s3`, `l24-s4` | To establish containment, the body/head-preserving homomorphism points opposite to containment. For `A(x):-R(x,y),R(x,z)` and `B(x):-R(x,y)`, identity maps B into A, while `z→y` maps A into B. Both maps preserve the one-column head. The differently arity-headed variant is expressly rejected. NP-completeness is separated from fixed-query data complexity and from certificate verification. | Accepted |
| G24-2 | `l24-s5` | In `R(x,y),R(x,'a'),S(x),S(x)`, remove duplicate S, then map `y→'a'` to remove the redundant R atom. The remaining `R(x,'a'),S(x)` is minimal: databases containing only `R(b,'a')` or only `S(b)` demonstrate that either further deletion changes the answer. Constant/head preservation, repeated deletion and uniqueness up to isomorphism are qualified correctly. | Accepted |
| G25-1 | `l25-s1`, `l25-s3` | One ternary hyperedge and three binary triangle edges have the same primal graph. The single atom has a one-node join tree; the binary triangle cannot connect every variable's occurrences in a tree. Width and evaluation claims are scoped to the relevant query/decomposition model, and decision complexity is distinguished from printing all answers. | Accepted |
| G25-2 | `l25-s4`, `l25-s5` | U reduces S to `(1,k)`; S reduces R to `(a,1),(b,1)`; T then leaves `(b,1)`, yielding witness `(b,1,k)`. Replacing T by `{c}` empties the root. Every reduced child must be considered. Candidate-head binding, atom occurrences, Boolean bottom-up evaluation and optional top-down full reduction are separated. | Accepted |
| G26-1 | `l26-s1` | Latency and throughput are different measurements. Replication does not add logical bag rows. Moving physical placement preserves the declared logical result while costs can change. Course terminology and architecture bottlenecks are expressly qualified. | Accepted |
| G26-2 | `l26-s2` | Round-robin rows 1–10 produce `{1,4,7,10}`, `{2,5,8}`, `{3,6,9}`. Balanced counts need not balance bytes or CPU. Shard replication is distinguished from replicating an entire small relation; unrelated-key fan-out is conditioned on absent locating mechanisms. | Accepted |
| G26-3 | `l26-s3` | Splitting both R and S at 100 preserves the key-75 and key-130 matches. Splitting S at 50 while R uses 100 loses key 75 in a local-only join. Inter-node, local external and in-memory hash functions have different resource domains. Local sorted hash partitions do not establish global order. | Accepted |
| G27-1 | `l27-s1` | Three 100 GB shards with two total copies each require 600 GB of raw data copies, excluding overhead. “Two total copies” avoids ambiguity about primary-plus-two-extra replicas. Logical rows, physical capacity, routing and all-shard work are separated. | Accepted |
| G27-2 | `l27-s3` | BASE is expanded as a design description, not an unconditional availability theorem. Background replication can change soft state without a local client write. Eventual convergence requires quiescence and progress, does not give a deadline or conflict policy, and differs from losing acknowledged durable work. | Accepted |
| G27-3 | `l27-s4` | The basic opaque-value get/put/delete interface is separated from field-query APIs that actual products may add. Placement/replica functions and local hashing have distinct roles. Stale replica visibility is conditioned on the chosen protocol. | Accepted |
| G27-4 | `l27-s4` | `age>25` returns Bo and Cy for ages 25,26,30; the inclusive variant also returns An. JSON arrays preserve order, so `[a,b]` and `[b,a]` differ. Structure, type/semantic validation and transactional guarantees are distinguished. Relational JSON facilities are not denied. | Accepted |
| G27-5 | `l27-s4`, `l27-s5` | Two outgoing FRIEND hops from An via Bo reach Cy. DRIVES→Car7 cannot satisfy that pattern. Property-graph language context is distinguished from RDF/SPARQL; no unverified standard date or universal syntax claim appears. | Accepted |
| G27-6 | `l27-s5` | The Oracle/MongoDB statement is explicitly about the lecture's March 2026 historical snapshot. It is not a current ranking, performance benchmark or product recommendation. Checkout uses an authoritative reservation protocol rather than a stale recommendation value. | Accepted |
| G27-7 | `l27-s2`, `l27-cap-q1`–`q5` | The explanation uses permitted histories, linearizability, completion at non-failing nodes and communication partitions. Arbitrary refusal does not satisfy an operation's service contract. The theorem is not treated as a mechanical free “pick two” rule, and sharding is distinct from communication loss. All five questions retain original option order and answers `[1,2,3,0,1]` while adding Gilbert–Lynch physical pages 2–4. | Accepted |

## Supporting checks

`node --test tests/cq-nosql-audit.test.mjs` completed with **7 passing tests, 0 failures**. The tests cover witness/projection/Boolean semantics, constant-preserving minimization on all small instances, primal/hypergraph distinctions, branching semijoins, aligned partition joins, CAP source metadata and the labeled property-graph pattern.

Separate recomputation produced three Enrol assignments and two student answers, four path witnesses and three distinct path answers, the stated 4/3/3 round-robin assignment, and 600 GB raw replica storage. These finite-instance checks support the examples; they do not prove the general containment or complexity theorems.

## Evidence and verification boundaries

- Source URLs and physical page ranges were checked against the coordinator's supplied primary-source audit packet and the integrated source notes. The reviewer did **not** newly download or read every source PDF. Historical source claims such as the March 2026 table are accepted within that supplied evidence boundary, not represented as a fresh current-state web lookup.
- The Gilbert–Lynch reference is attached to each CAP question. Its primary definitions supplement the retained lecture-page metadata. The runtime should expose the relevant evidence without implying that the primary CAP paper supplies every ACID background definition.
- Existing lesson/key-takeaway content remains in place. This review does not replace the parent's global preservation check for all 1,100 original questions.
- Browser rendering, accessibility, navigation, localStorage migration, generated bundles and deployment remain technical QA responsibilities. No course/runtime/build/branch/commit/push changes were made by this review.
- No content blocker remains for these sixteen additions within the stated evidence scope.

## Reviewed canonical file hashes

SHA256 hashes identify the staged bytes read in this review. Later changes require checking their scope against this acceptance.

| File | SHA256 |
|---|---|
| `course/lecture23.json` | `0f696d32859ec6090828a835c0f7b135b4fad8e9d46fe99b0461b54519b67cbd` |
| `course/lecture24.json` | `78330f42172546e9e20c952066db8e632e87e93b43c20bd648096bb9cbbc4ccd` |
| `course/lecture25.json` | `bd41686a7935b50d3c163affbb08231787a5fc440d580034366e9bb1a8cc1191` |
| `course/lecture26.json` | `688fd55cc18cfb18c679cce191627db2f9855b1494fa8a271674159fe9e90428` |
| `course/lecture27.json` | `26d9f7f8d940083a3343fad3d8301e5a12a1f11fda8f3241f02075296a5be198` |
| `course/quiz27.json` | `e19d8449f13ca6eff0a94bdb6d4c712d96fe9654b96f757996e76016a1a3010e` |
