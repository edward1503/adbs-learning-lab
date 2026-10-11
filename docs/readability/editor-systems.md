# Systems lessons: human-first reading revision, Lectures 13–27

## Method and ownership

I read all fifteen immutable rendered baseline lessons, including disclosure answers, in numerical order before editing: `readability-work/baseline/lecture-13.md` through `lecture-27.md`. I then read the independent baseline review at `readability-work/reviews/systems-reader.md` and incorporated the parent's precise findings. The baseline is main `0a1fb0363d2c44a0ca8f508f4e964a01af128720`.

This is editorial comprehension review, not a study with human participants. The decisions below concern what a new learner can explain, trace, transfer to a small changed case, and qualify by its assumptions. Passing automated checks is preservation evidence, not proof of understanding.

I edited only `course/lecture13.json` through `course/lecture27.json`. No quiz bank, embedded quiz, app, stylesheet, test, build script, Git state or deployment was changed by this editor. Copies of the pre-edit canonical records are in `readability-work/edits/lecture13-preedit.json` through `lecture27-preedit.json`. Three local editing scripts and text reading copies in that scratch directory are review aids, not application deliverables.

Content is frozen for root's rendered cross-review. Root owns technical/browser checks, active audit-location overlays, review packaging, publication and any deployment decision.

## Whole-range reading checklist

All rows received the same source-flow edit: repeated source paragraphs were collected into a section-ending **Sources and teaching scope** disclosure. Each original section retains every original hyperlink and exact linked page label. No audit-history label now interrupts that section's teaching steps. The lesson-level source panel continues to provide provenance. Optional extensions retain explicit scope boundaries.

| Lesson | Decision after the complete baseline read | Preserved good pattern and fresh-transfer reasoning |
|---|---|---|
| 13 | Revise lifecycle/state gap; expand SIMD once; retain blocking/batch arithmetic. | Added `open → next → EOF → close` propagation to the existing scan/filter/project trace. Selection state explains resumption. On fresh scan `[6,1,8]`, filter `x>5`, projection `2x`, LIMIT 1, the learner can return 12 then close without reading 1 or 8; adding a global sort removes that early input stop. |
| 14 | Revise System R name-only explanation; retain rewrite examples. | The historical per-block access-path/join-order/cost/property organization now explains the name. Fresh three-table projection/filter transfer retains both join keys and the output column; changing join grouping still does not remove predicates. Bag/outer-join/determinism boundaries remain. |
| 15 | Integrate sort ledger with its introduction; shorten duplicate defense of the old/new clustered baselines. | Keep every page-I/O term, B=8/B=7 pass boundary, projection multiplicity and matched access-path comparison. With new filtered sizes 30/20 and six outer frames, the stated model gives Customers-outer `800+30+ceil(20/6)×30=950` versus Orders-outer `800+20+ceil(30/6)×20=920`. |
| 16 | Revise the cost legend and optional external exercise; retain composite-key and RID examples. | `s` is now the fraction of all index entries covered by the candidate scanned range, not the smaller final output after residual filtering. The PostgreSQL TEMP fixture supplies seed, index, ANALYZE and two exact SELECT/EXPLAIN predicates. A read-only illustrative output is explicitly unmeasured. Fresh `(region,day,amount)` transfer uses equality on region, a day range, then residual amount; h=2,L=80,s=.1 gives 10 index-only reads before any separately modeled data fetch. |
| 17 | Add one catalog-like record and whole-plan rows/work table; retain derivations. | The existing 12,000→300→60 progression now flows through a 240-page heap scan and a stated CPU weight, yielding an illustrative 252.36 cost units. Original shared-key derivation, NULL/independence, discrete/continuous ranges and equi-depth calculations remain. Fresh partially overlapping key sets need the actual number of shared keys, not blind use of the containment formula: 2 shared keys ×20×15=600. |
| 18 | Move DP ledger after method/property definitions; retain tree counts with tree shapes. | The simple 100+80 versus 125+0 example remains before the four-route ledger. R(a),S(a,b),T(b), subset/order/cost entry meaning, supplied-cost convention and final-order-preservation assumptions are explicit. Fresh extensions must compare full routes plus final sorting, not intermediate minima. |
| 19 | Move formal swap/graph extension after notation and edge construction; complete anomaly answers and commit/abort key. | Warehouse intuition stays in s2. Edge constraint precedes “topological.” Lost-update exercise now gives both graph directions and all conflicting pairs. C1/C2/A1 have a local legend and the same two transactions show unsafe commit, safe commit order and waiting to read. Blind write is defined. Fresh schedule R1(A),R2(B),W1(B),W2(A) has both conflict edges and incompatible initial-value read sources in either serial order. |
| 20 | Move prevention proof after complete action rules; clarify upgrade and cascade dependency. | S→X upgrade is defined and transaction-phase pronouns are clear. Basic-2PL early release now has a concrete T1-aborts→dependent-T2-aborts trace; strict locking prevents its first read. Fresh older-holder/younger-requester cases distinguish wait-die abort from wound-wait wait. |
| 21 | Reorder the no-flush trace ahead of checkpoint machinery; define dirty page and log fields; chunk optional/future material. | Original physical crash motivation, STEAL/NO-FORCE reasoning and WAL ordering remain. LSN, pageLSN and undoNextLSN are explained locally. Checkpoint detail, distributed PREPARE forward connection and CLR repeated-crash trace are separate disclosures. Fresh committed-A/uncommitted-B recovery preserves A's committed value and removes B's loser effect, while exact physical redo skipping still requires the complete algorithm. |
| 22 | Integrate repeated durability/timeout prose; define local architecture, ACK and stream numbering; make consensus extension optional. | Stock prepare/vote/decision/finish sequence and the two indistinguishable prepared states remain. Presumed-abort and END force rules remain variant-qualified. Fresh C-commits/informs-only-W/crashes scenario requires E to obtain the fixed decision, retain locks until completion and avoid applying stock changes twice. Replica quorum still cannot override West's NO. |
| 23 | Retain successful question→query→good/bad assignment progression; add an actual algebra translation and schema; shorten repeated homomorphism definition. | Enrol(student,course)/Teach(teacher,course) support both shown SQL and π/⋈/σ translation. Optional calculus context retains Codd's expressive-power connection. Witness/head/set distinctions and self-loop complete output remain. Adding Required(DB) to the fresh Enrol/Teach example retains only `(A,DB)`, yielding `{A}` or `{()}` depending on the head. |
| 24 | Revise complexity prerequisite ladder and canonical proof continuity; gloss arity/core/isomorphism. | NP is explained through a polynomial-checkable YES witness. Triangle coloring shows six allowed ordered color pairs, a successful RGB assignment, a same-color failure and YES/NO-preserving reduction from known NP-complete 3-coloring. Qsmall/Qall continue through Dsmall, an An/pen real match, composition and reverse counterexample. Existing assignment counts and reverse-map theorem remain. Fresh constant-preserving minimization maps a witness variable to `'a'` and fails if a required output binding is dropped. |
| 25 | Define both GYO rules and size notation locally; make width theory optional; retain chain→branch trace. | Every-child semijoin support and running intersection are unchanged. Fresh two supported branches with conflicting B=1 and B=2 requirements make the root empty despite each branch being nonempty. Complexity claims still concern decision/membership rather than printing all answers. |
| 26 | Explain three hashing levels with a small resource example; state separate starting placement and 1/8-stays shuffle reasoning. | Existing aligned/misaligned range example, four join scenarios, broadcast/shuffle arithmetic and slowest-worker metric remain. Fresh four-worker R=40 GB, S=2 GB transfer gives 6 GB broadcast from one existing complete copy versus 31.5 GB shuffle under separately specified uniform placement; neither byte count establishes latency or memory feasibility. |
| 27 | Supply sparse column-family instance; remove bank-authoring prose; put historical popularity detail with sources. | Strong completed-write/disconnected-read CAP example, convergence conditions, original numeric capacity and document/graph examples remain. Sparse device rows show row-key access versus cross-device predicate cost without promising a product-specific API. Three 20 GB shards with three copies still mean 60 GB logical data and 180 GB raw copies. Checkout follows authoritative conditional inventory reservation regardless of stale recommendations or popularity. |

These transfer checks are reasoned editorial checks of small cases. Independent revised rendered acceptance is still required and is owned by root/cross-reviewer.

## Relocation ledger for active source mappings

No stable section anchor was deleted or reordered. Existing original per-section hyperlinks remain in their old section as well as any extra link copied to the new teaching location.

| Existing material | Old anchor/location | New anchor/location | Retained evidence/scope |
|---|---|---|---|
| Four-route DP ledger and useful-order extension, previously “Enumerate legal extensions and retain useful properties” | `l18-s2` after tree/pruning prose | `l18-s3` after DP passes, 100/125 example and interesting-order definition; heading “Extend a small DP ledger” | Added that block's original physical-pages 8–23 link to s3; all original s2 links remain. Preserve 40+45=85,52+20=72,35+50=85,60+10=70 and final 115,102,115,70. Tree-count extension remains in s2. |
| Conflict-preserving swaps, three-transaction graph and independent T3 serial-placement exercise | `l19-s2` after warehouse example | `l19-s3` after R/W notation, edge rule and small two-transaction graph | Added the original pages 24–42 link to s3. Warehouse motivation remains entirely in s2. All original trace operations and three permissible T3 placements remain. |
| Wait-die/wound-wait monotone timestamp proof | `l20-s3` before the action rules | `l20-s4` after complete old/new action rules | Added the original pages 19–27 link to s4; original s3 links remain. s3 retains deadlock detection, atomic preclaiming and its exercise. |
| Checkpoint-analysis paragraph | Early extension in `l21-s4`, before no-flush trace | Later optional checkpoint disclosure in the same `l21-s4` | Same anchor and URLs. No-flush trace comes first; all redo-start/checkpoint limitations remain available. |
| Distributed PREPARE/ordinary-loser exception | Between no-flush trace and its question in `l21-s4` | Separate explicitly labeled forward-connection disclosure in same `l21-s4` | Defines PREPARE minimally and points to Lecture 22; still says “global decision must first be resolved.” Full protocol teaching remains in L22. |
| Optional CLR crash/undo trace | Inline subsection of `l21-s4` | Optional disclosure in same `l21-s4` | All original LSN 10/20, CLR 30,undoNextLSN=10 values and primary-paper link remain. |
| Structural-width complexity connection | Inline extension of `l25-s3` | Optional disclosure in same `l25-s3` | Defines |Q| and |D| before bounds. Original source URLs and O(|Q|),O(|D|·|Q|) scope remain. |
| Consensus/participant-readiness distinction | Inline optional subsection of `l22-s5` | Optional disclosure in same `l22-s5` | Keeps every participant/quorum scenario and primary Paxos Commit link. |
| Historical Oracle/MongoDB popularity snapshot paragraph | Before shop requirements in `l27-s5` | Sources/teaching-scope disclosure within same `l27-s5` | Keeps March 2026 source facts and original URLs; the main flow now reaches inventory requirements without the ranking interruption. |

## Representative before/after

### L18: vocabulary and causal sequence

Before, s2 introduced “Original DP ledger: extending unordered RS costs 40+45=85...” before s3 explained DP or interesting orders.

After, s2 teaches shapes/counting/pruning only. In s3, after the simple two-plan example: “Each ledger entry records the tables joined, its output order, and its cost.” The schemas name a/b. Supplied extension costs and assumed order preservation precede the same 85/72/85/70 ledger and final 115/102/115/70 totals. The learner knows what each entry means before comparing it.

### L19: define the arrow before using it

Before, the warehouse section jumped into “R2(A),W2(A),R1(A)...” and “topological serial order.”

After, warehouse intuition stays first. s3 defines R1/W2 and then: “A graph edge T1→T2 records the constraint ‘T1 must come before T2 in an equivalent serial order.’” Its two-transaction trace is followed by the moved three-transaction example. Only after obeying T2→T1→T3 does it name that ordering “topological.”

### L16: executable optional exercise and honest output

Before, the learner was asked to create an unspecified PostgreSQL table and vary selectivity.

After, a TEMP table with declared id/age/padding columns, generate_series seed, age index and ANALYZE supplies a complete disposable fixture. `age=7` retains 100 rows and `age>=0` retains 10,000. Both exact EXPLAIN SELECTs are shown. An annotated sample is explicitly illustrative and unmeasured; identical plans are a question to investigate, not a failed exercise. Existing PostgreSQL official docs, verified by root, are linked. This editor did **not** execute the fixture in PostgreSQL.

### L24: one continuous containment example

Before, the canonical proof switched from shoppers/premium to a new abstract R/S pattern before saying “compose.”

After, Dsmall={Buy(cx,cp),Premium(cp)} supplies Qall's matching Buy atom. Reusing the actual An/pen assignment makes the direction concrete; then composition is named. Dall={Buy(cx,cp)} is the reverse-direction counterexample. The theorem still preserves constants/head positions and remains scoped to positive CQs under set semantics without external constraints.

### Source flow

Before, several “Audit addition” and long page-list paragraphs interrupted the teaching sequence between its original explanation and extension.

After, the explanations proceed continuously. A section-ending source disclosure retains exact URL/page labels and original-teaching scope. The links remain inspectable and source-addressable without becoming the next conceptual step.

## Preservation and remaining verification

After the final freeze, a local structural comparison checked 15 lessons and69 HTML fragments against the pre-edit canonical copies:

- Every non-section lesson field is identical, including lesson IDs, lecture numbers, leads/goals, source/coverage metadata, timing, lab assignment and embedded quiz objects/options/answer/explanation.
- Section IDs and array order are identical.
- Original important-note blocks are byte-identical and in their original order.
- Every original per-section href remains in that same section.
- A stack-based HTMLParser check found balanced fragment nesting in all 69 sections.
- Original numerical worked examples were retained. New calculations have stated inputs/units: the illustrative L17 pipeline uses240 page reads plus 0.001×12,360 listed CPU steps=252.36; L16 seed gives100 matching age7 rows and10,000 nonnegative-age rows.

The evidence above does not replace root's npm/build/test/browser checks or independent revised rendered reading. No claim of complete ARIES implementation, exhaustive real optimizer search, observed PostgreSQL plans, product-independent column-family APIs, or measured human learning gains is made. No publication/deployment was performed.
