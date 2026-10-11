# Independent integrated foundation review: L1–12

Review date: 2026-10-11. Baseline comparison commit: `b694ecf13394d3cf9f35bf78b880bb95acf46995`.

**Outcome: accepted for the integrated prose, worked examples, question semantics, and declared source provenance reviewed here. No content blockers found.** This reviewer did not author the canonical lesson or question additions. The reviewed inputs were the actual working-tree `course/lecture01.json` through `lecture12.json`, their corresponding question banks, the foundation baseline, both foundation resolution packets, and the coverage registry.

This is a provided-source integration review with independent mathematical and runtime checks. It is not an exhaustive reread of every Edinburgh PDF, a textbook audit, a browser pixel-layout review, or deployment acceptance. The final registry records the supplied coordinator source-audit evidence and integrated review separately from raw PDF hashes; absent hashes remain meaningful boundaries. This report does not promote them to exhaustive verification.

## Scope and preservation evidence

| Check | Observed result |
| --- | --- |
| Integrated findings | All 20 findings F01–F20 reviewed; 27 resolution records map to 33 existing-section target references |
| Appended explanations | All 33 new subsections read, across 30 stable lesson sections |
| Original lesson content | All 48 original section HTML strings remain exact prefixes of their current strings |
| Original embedded checks | All 12 question/option/answer/explanation objects unchanged |
| Original bank questions | All 465 original IDs remain; prompts, option strings/order, answer indexes, and explanations unchanged |
| Current foundation banks | 93 topics, 475 questions: 465 originals plus exactly 10 additions |
| New question provenance | All 10 additions carry explicit per-question sources; two have multiple source documents |
| Question source bounds | 477 effective source references and 581 physical-page references resolve within registered PDF bounds; zero invalid references |
| Finding source bounds | 33 PDF source references and 233 physical-page references in the F01–F20 packets fit the registry; all target sections/subsection IDs exist |

Source bounds were checked against the registry's **legacy** page counts, not treated as proof that every cited page was independently reread. The rendered prose's source links were also read alongside its explanations. Cross-document L1 architecture questions correctly cite L4/L7 rather than inheriting L1's topic PDF. The new L12 skew question retains both L12 join and L11 aggregation provenance.

The actual `app.js` and `quiz.js` templates were executed over the canonical JSON in a read-only headless DOM harness. All 12 lesson routes rendered all 48 section HTML strings, with no undefined fields. All 10 new questions rendered correct feedback for their canonical keyed choices, including all 12 expected source links. This confirms template inclusion and per-question citation selection; it does not assess browser pixels, scrolling, accessibility interaction, or served/generated asset freshness.

## Finding-level review

| Finding | Integrated target | Independent assessment |
| --- | --- | --- |
| F01 | L1 `l1-1` | Data model, chosen schema, and current instance are distinct. Library and shop examples can use the same relational model. DBMS services are described as configured mechanisms rather than automatic application guarantees. |
| F02 | L1 `l1-4` | Planning selects the access path; execution, file/index, buffer, and disk-space interfaces have distinct responsibilities. The uncached data-page trace and cache-hit qualification are coherent. |
| F03 | L1 `l1-4` | OLTP/OLAP/HTAP describe workloads; disk/in-memory and row/column are separate architecture/layout choices. A cached execution does not change the architecture, and ordinary RAM alone is not durable. |
| F04 | L2 `l2-1`, `l2-3`, `l2-4` | DDL/DML/DCL meanings are correct. The orphan Borrow row explicitly has no enforced foreign key. Actual bundled SQLite returns LEFT 4, RIGHT 4, FULL 5, with the stated NULL-padded rows. NOT EXISTS returns Chi; `2 NOT IN (1,NULL)` is UNKNOWN. Empty ANY/ALL and their NULL qualifications are stated with PostgreSQL provenance and a SQLite syntax boundary. |
| F05 | L3 `l3-1`, `l3-2` | Closure has schema/type conditions. Missing attributes are invalid expressions. Safe/domain-independent calculus and set/bag qualifications avoid overstating equivalence. The employee-manager predicate is `E.manager_id = M.id`; renaming alone changes neither values nor cardinality. |
| F06 | L3 `l3-2`, `l3-4` | Natural join's shared-name behavior and product case are correct. Division returns An initially, then both candidates after Binh gains RA. The empty-required case is restricted to the candidate domain projected from Skill. Bag difference returns two copies for 3−1; distinct EXCEPT returns none. Unsupported SQLite EXCEPT ALL is explicitly distinguished from the relational model. |
| F07 | L4 `l4-1`, `l4-4` | Volatility, persistent block interfaces, HDD delay components, and NAND program/erase granularity are separated. Write amplification uses physical/logical bytes under a stated boundary. Spatial/temporal locality and page-ID mapping are not conflated. |
| F08 | L5 `l5-1`, `l5-4` | Pin/unpin, clean/dirty replacement, and persistence responsibilities are coherent. The three-frame immediate-unpin trace gives MRU 5 misses, evicting C then B, and LRU 8. Eligibility and workload limits are explicit. Lecture LRU-on-unpin and CLOCK-on-pin-increase conventions are preserved. |
| F09 | L6 `l6-1`, `l6-3` | P2 is a candidate for the 60-byte budget only with current directory information and sufficient overhead/contiguity provision. Occupying free slot 2 leaves 5→8; freeing an explicitly occupied slot 4 yields 4→5→8. Positional RIDs, stable slots, heap directories, free-slot structures, and field offsets are distinguished. |
| F10 | L6 `l6-4` | Schema/header/alignment, offsets/lengths, and NULL metadata determine interpretation. Offset 12 alone does not establish a present value. Empty string, deleted slot, and NULL remain separate states. |
| F11 | L7 `l7-1`, `l7-2` | Aligned positions reconstruct logical rows. Selecting city A at positions 1 and 3 requires fetching amounts 10 and 30, totaling 40. PAX is within-page grouping and does not guarantee column-only disk reads when the API reads complete pages. |
| F12 | L7 `l7-4` | Parquet row groups, column chunks, encoded pages, and DBMS pages are distinct units. Footer metadata locates chunks and supports metadata-first reading. Valid bounds 10–20 rule out x>30; bounds 10–50 do not establish that 30 exists. Nested-format and parser limitations are explicit. |
| F13 | L7 `l7-3`, `l7-4` | Domain-aware encoding differs from general byte compression. Dictionary payload is 100 code bytes + 40 dictionary bytes = 140, versus 1,000 raw bytes, excluding metadata. Residual zero, dictionary identity/order, and CPU/performance qualifications are correct. |
| F14 | L8 `l8-2`, `l8-3` | Heap costs distinguish existing unique, absent, and nonunique keys and RID-known deletion. Sorted-file estimates state sorting-key, compact-storage, cold-cache, and approximate page-count assumptions. Reading/writing half the shifted pages explains the P term. Index representation, lecture-specific primary/unique terminology, and clustering are kept distinct. |
| F15 | L9 `l9-3` | Internal merge pulls separator 30 into [10,20,30,40] with five children. Rotation produces left [10,20], parent 30, right [40,60] and moves the correct child pointer. Leaf/internal repair, same-parent sibling requirements, and root collapse are distinguished. Independent routing checks preserve boundary routes. |
| F16 | L9 `l9-1`, `l9-4` | Count-model root exceptions and production byte/deletion policies are qualified. ISAM overflow does not deepen fixed upper levels. Prefix compression remains recoverable; separator truncation must preserve the routing boundary. Duplicate lookups must retain all matches. |
| F17 | L10 `l10-s2`, `l10-s3` | One bucket read and two update I/Os explicitly exclude directory/table-fetch costs. Failed search over one primary plus two overflow pages can read three pages. Modulo 16 collisions, identical-key limits, and local-depth≤global-depth consistency are correctly stated. |
| F18 | L11 `l11-s1`, `l11-s3` | Merge preserves all three copies of 4; DISTINCT and aggregation have different output/state semantics. Empty and materialized sort boundaries are explicit. For N=90, B=10, f=1.2, state is 1.2×90/9=12 pages, exceeding 10 even before stricter allocation constraints. Average partition size does not establish skew feasibility. |
| F19 | L12 `l12-s4` | B=12 gives 10+4=14 runs versus 11 input frames, so the unchanged fused model is infeasible. B=16 gives 8+3=11 runs fitting 15 input frames. Under the stated duplicate assumptions, 320+160=480 I/Os versus 640+160=800, excluding join-output writes; savings are 320. |
| F20 | L12 `l12-s3` | The six 2×3 duplicate pairs are complete. Build tuples and metadata must fit the actual budget; the probe can stream. Repartitioning both corresponding sides adds I/O. Identical-key skew needs a pair-preserving fallback and cannot be replaced by one SUM state for an ordinary join. |

## New question acceptance

All four choices and explanations were read for each addition. The selected canonical options are substantively correct; distractors do not supply another correct answer under the stated premises.

| Question ID | Correct canonical index | Primary physical pages |
| --- | --- | --- |
| `l01-architecture-new-q1` | 1 | L4: 3, 4, 8 |
| `l01-architecture-new-q2` | 3 | L4: 11, 12 |
| `l01-architecture-new-q3` | 0 | L4: 11, 12; L7: 2–6 |
| `l01-architecture-new-q4` | 2 | L4: 11, 12 |
| `l02-negative-new-q1` | 1 | L2: 26–28 |
| `l03-rename-new-q1` | 3 | L3: 13, 16, 17 |
| `l09-internal-merge-new-q1` | 0 | L9: 23, 24 |
| `l09-internal-rotate-new-q2` | 2 | L9: 25 |
| `l12-fusion-new-q1` | 2 | L12: 32 |
| `l12-skew-new-q1` | 0 | L12: 34–36, 39; L11: 22, 29, 30 |

The original L2 terminology q4/q5 now cite physical PDF page 8, whose printed slide number is 9. Their prompts, options, answers, and explanations remain unchanged. L4's physical-page-17 metadata does not invent a printed slide number.

## Executed evidence and source boundary

- `node --test tests/foundation-audit.test.mjs tests/foundation34-math.test.mjs`: **12/12 passed**, including actual SQL outer joins/NULL behavior, buffer traces, corrected citation mapping, internal child routing, dictionary/state arithmetic, fusion feasibility/cost, duplicate pairs, and cross-document quiz provenance.
- Additional read-only execution in the bundled SQLite **3.49.1** reproduced the division exercise: initial result An; empty Required result An and Binh within the Skill candidate domain; adding Binh/RA result An and Binh. The actual relational core returned two EXCEPT ALL copies and zero distinct EXCEPT copies for the 3−1 example.
- Exact baseline comparisons established the preservation counts above; per-source bounds checks reported zero errors. No full-course total was inferred from these foundation counts.
- Independently inspected source evidence is limited to the official SQL PDF's physical page 8 / printed 9 and buffer PDF's physical pages 13 / printed 14 and 15 / printed 16, rendered during this reviewer's preceding scoped QA. The other Edinburgh page references were checked for packet consistency and registry bounds, not independently reread exhaustively.
- The [PostgreSQL subquery documentation](https://www.postgresql.org/docs/current/functions-subquery.html) independently supports the quantified-comparison and NULL qualifications. The [Apache Parquet file-format documentation](https://parquet.apache.org/docs/file-format/) independently supports chunk-location metadata, metadata after data, and metadata-first readers. These are supplemental primary references, not fabricated slide content.

Only original explanations, public links, and this review record are deliverables. Source PDFs remain outside the repository. No instructor-only readings, grading rules, deadlines, or textbook page numbers were inferred. No branch switch, canonical/runtime edit, commit, push, publication, or deployment was performed for this integrated review.
