# Independent candidate cross-review: lectures 01–12

Reviewed 2026-10-11, using the frozen candidate's actual Chromium-rendered text in `readability-work/candidate/lecture-01.md` through `lecture-12.md`, read in order. Candidate render was supplied at port 18440. I read no editor logs or canonical lesson source during the initial reading or task attempts. The `##` metadata identifies actual DOM section headings; its repetition in this capture is not evidence of duplicate visible headings.

This is a different editor/scope from my original supplements 28–37 baseline review. Scores use the practical rubric in `adbs-learning-lab/docs/readability/baseline-parent-review.md`: Explain, Trace, Transfer, Bound, each 0 (necessary reasoning absent), 1 (exact answer can be copied), or 2 (nearby variant can be solved and explained). Tasks below are original hypothetical changed-input editorial checks, not empirical human testing or measured learning time. I did not run or rely on local tests to establish teachability. Candidate deployment and final release approval remain the parent's responsibility.

## Decision and scope

The named foundations revisions are integrated into the instructional sequence. All 39 goals have sufficient rendered reasoning for their nearby changed-input checks, including explicit assumptions, and receive Explain/Trace/Transfer/Bound=2/2/2/2 under the editorial rubric. During cross-review, I identified one bounded gap in open-addressing collision resolution in `l10-s1`. The parent added a labeled linear-probing trace; I verified its actual fully reloaded Chromium capture and independently solved different keys (3,7,8), including wraparound and displaced-key lookup. That gap is resolved at the stated toy-model scope. No unresolved teaching blocker remains in lectures 01–12 for the nearby tasks documented here.

Every section read: `l1-1`–`l1-4`, `l2-1`–`l2-4`, `l3-1`–`l3-4`, `l4-1`–`l4-4`, `l5-1`–`l5-4`, `l6-1`–`l6-4`, `l7-1`–`l7-4`, `l8-1`–`l8-4`, `l9-1`–`l9-4`, `l10-s1`–`l10-s4`, `l11-s1`–`l11-s4`, `l12-s1`–`l12-s4`. All goal lists, source labels, takeaway text, exercises and revealed answers were included. The source-origin distinction and historical-slide boundaries remain intelligible.

### Each displayed learning goal

`E/T/X/B` means Explain/Trace/Transfer/Bound. Task IDs refer to the complete prompts, supplied reasoning, solutions and assumptions below. The score is not a claim that real learners passed. Cross-lesson prerequisites are permitted because the review reads in order; where relevant they are named explicitly.

| Resource | Exact displayed goal | E | T | X | B | Evidence / unresolved gap |
|---|---|---:|---:|---:|---:|---|
| lecture-01 | Distinguish a database, a DBMS, a schema, and an instance | 2 | 2 | 2 | 2 | F01; data versus managing software, adding rows versus structure |
| lecture-01 | Explain the three levels of abstraction through an example | 2 | 2 | 2 | 2 | F01; private view, logical column, physical placement |
| lecture-01 | Identify the system responsibilities behind a query | 2 | 2 | 2 | 2 | F01; cold lookup path; later mechanisms explicitly previewed |
| lecture-02 | Work through WHERE, GROUP BY, and HAVING step by step | 2 | 2 | 2 | 2 | F02a; retained IDs → groups → sums → group test |
| lecture-02 | Distinguish inner and outer joins and calculate their result sizes | 2 | 2 | 2 | 2 | F02b; matched pairs plus two unmatched sides |
| lecture-02 | Use IN and EXISTS with small datasets | 2 | 2 | 2 | 2 | F02c; row-wise existence and NULL comparison chain |
| lecture-03 | Evaluate relational operators on small datasets | 2 | 2 | 2 | 2 | F03; product/join, set operations, division and valid schemas |
| lecture-03 | Distinguish set projection from SQL bag projection | 2 | 2 | 2 | 2 | F03; repeated category disappears only with set/DISTINCT |
| lecture-03 | Turn a join question into an expression you can check | 2 | 2 | 2 | 2 | F03; two valid expressions with intermediate rows and predicate argument |
| lecture-04 | Trace the path from SQL down to pages | 2 | 2 | 2 | 2 | F04; page-ID mapping and cold read responsibility |
| lecture-04 | Calculate read costs using an explicitly stated model | 2 | 2 | 2 | 2 | F04; repeated versus once-only positioning |
| lecture-04 | Distinguish bytes, pages, and records | 2 | 2 | 2 | 2 | F04; offsets with origins, ten pages versus record count |
| lecture-05 | Update pin counts and dirty flags correctly | 2 | 2 | 2 | 2 | F05a; pin eligibility and persistent dirty state separate |
| lecture-05 | Simulate LRU and CLOCK when some pages are pinned | 2 | 2 | 2 | 2 | F05b/c; eligible victim, CLOCK bits and hand |
| lecture-05 | Explain sequential flooding and the limits of replacement policies | 2 | 2 | 2 | 2 | F05d; cyclic working set larger than pool; MRU countercomparison |
| lecture-06 | Calculate offsets and capacity under explicit assumptions | 2 | 2 | 2 | 2 | F06; fixed-position offset and slot overhead |
| lecture-06 | Explain packed pages, bitmaps, free lists, and slotted pages | 2 | 2 | 2 | 2 | F06; hole versus positional movement; free-list update |
| lecture-06 | Distinguish a slot directory from a field-offset directory | 2 | 2 | 2 | 2 | F06; RID, page-relative relocation, name offset/length and NULL bit |
| lecture-07 | Compare row, column, and PAX layouts by the bytes read | 2 | 2 | 2 | 2 | F07a; PAX whole-page assumption stops false disk-I/O equivalence |
| lecture-07 | Encode and decode RLE, delta, and dictionary representations | 2 | 2 | 2 | 2 | F07b; changed runs, negative deltas and code mapping |
| lecture-07 | Distinguish a teaching model from the actual Parquet format | 2 | 2 | 2 | 2 | F07c; metadata pruning and omitted actual-format structures |
| lecture-08 | Compare heap and sorted-file costs under the same assumptions | 2 | 2 | 2 | 2 | F08a; same P/D, unique/absent/range distinctions |
| lecture-08 | Distinguish a search key, a primary key, and an index entry | 2 | 2 | 2 | 2 | F08b; duplicate search key with two RID representations |
| lecture-08 | Calculate the data-fetch costs of clustered and unclustered indexes | 2 | 2 | 2 | 2 | F08c; index reads plus actual matched data pages |
| lecture-09 | Use separators to find a leaf and scan a range | 2 | 2 | 2 | 2 | F09a/b; inclusive range and lookup after separator repair |
| lecture-09 | Simulate insertion and deletion using the order-d convention | 2 | 2 | 2 | 2 | F09a/b/c; split → borrow → merge; named internal pointer movement |
| lecture-09 | Explain copy-up, push-up, and byte-based occupancy | 2 | 2 | 2 | 2 | F09d; distinguish routing separator from leaf data and byte capacity |
| lecture-10 | Explain in-memory hashing and collision resolution | 2 | 2 | 2 | 2 | F10a/e; refreshed probe rule supports changed-home/wraparound insertion and lookup |
| lecture-10 | Trace searches, insertions, deletions, and overflow in static chained hashing | 2 | 2 | 2 | 2 | F10b; primary → overflow → delete/reclaim boundary |
| lecture-10 | Recognise skew and identify when rehashing is needed | 2 | 2 | 2 | 2 | F10c; patterned distinct keys versus duplicates |
| lecture-10 | Simulate global and local depth, bucket splits, and directory changes in extendible hashing | 2 | 2 | 2 | 2 | F10d; all aliases, split without doubling, merge, shrink and stop condition |
| lecture-11 | Connect query execution to the implementation of individual operators | 2 | 2 | 2 | 2 | F11; ORDER BY sorting versus DISTINCT adjacent elimination |
| lecture-11 | Calculate the number of passes in two-way and multiway external merge sort | 2 | 2 | 2 | 2 | F11a; incomplete initial run, fan-in, final-write boundary |
| lecture-11 | Compare reading through clustered and unclustered B+ trees | 2 | 2 | 2 | 2 | F11b; uses L8 page/tuple distinction already taught in ordered sequence |
| lecture-11 | Use sorting to implement DISTINCT | 2 | 2 | 2 | 2 | F11c; preserve copies during merge, then remove adjacent duplicates |
| lecture-12 | Identify join semantics and the assumptions behind I/O calculations | 2 | 2 | 2 | 2 | F12; matching pairs, operation boundary, equality and fit assumptions |
| lecture-12 | Calculate the costs of tuple, page, and block nested-loop joins | 2 | 2 | 2 | 2 | F12a; tuple versus page versus block units and rounded orientations |
| lecture-12 | Calculate index nested-loop join costs with clustering | 2 | 2 | 2 | 2 | F12b; all matches and index-plus-data lookup cost |
| lecture-12 | Handle duplicates and combine the final merge pass with a sort-merge join | 2 | 2 | 2 | 2 | F12c/d; enumerate all pairs, total run buffers, saved writes/reads |

## Findings, priority checks and precise remaining fix

### Resolved: manageable introduction preview (`lecture-01`, `l1-4`)

The catalogue request precedes the layer vocabulary. “The mechanisms below preview later lessons” and two explicit “Preview” blocks link lectures 4, 5 and 7. Terms have short meanings, while the current core remains question, logical data and physical bytes. F01 can therefore explain the lookup without requiring mastery of workload labels or recovery protocols. Preserve this structure; do not expand the preview into a mandatory architectural exercise.

### Resolved: schema/NULL continuity and full Sale transformation (`lecture-02`, `l2-2`–`l2-4`)

The orphan example explicitly retains `Member(mid,name)` and `Borrow(mid,book)` and says the foreign key is not enforced. `Member.mid = Borrow.mid` agrees with the earlier `M.mid=B.mid`. The NULL variant restarts independently rather than silently combining orphan and NULL fixtures. `2<>1=TRUE`, `2<>NULL=UNKNOWN`, `TRUE AND UNKNOWN=UNKNOWN`, and WHERE-only-TRUE are supplied before the query outcome. ANY/ALL's PostgreSQL boundary is adjacent. F02 changes all the identifying values and recomputes both multiplicity and UNKNOWN. The strong Sale retained-rows→groups→sum→HAVING sequence survives.

### Resolved: actual schema use in algebra (`lecture-03`, `l3-2`, `l3-3`)

Each input and intermediate schema is named; the text expressly rejects applying a price condition to R because R lacks that attribute. Filtering S first and joining uses the same fixture. The proof distinguishes checking one instance from the same-column predicate argument for all instances under the same inner-join semantics. F03's changed rows return a different category with every step traceable. Preserve this valid-schema check and the outer-join boundary.

### Resolved: record growth metadata (`lecture-06`, `l6-4`)

The name-growth example now keeps internal offset 9, sets NULL bit 0, updates name length 4→20 and slot record length 13→29, then updates the page-relative slot offset if compaction moves the record. It separately recognizes insufficient total capacity. F06 transfers all these updates with new lengths/location, while keeping the RID and distinguishing empty from NULL.

### Resolved: unit discipline and tree continuity (`lecture-08`, `l8-2`, `l8-3`; `lecture-09`, `l9-2`, `l9-3`)

L8 states P/D, cold cache, key uniqueness, physical-order condition and excluded CPU costs before calculations. Index-entry access is added to data-fetch pages rather than confusing tuples with pages. L9 preserves the same leaf state through split, borrow, changed separator, merge and root collapse. Internal merge names C0–C4; internal redistribution names D0–D5 and D3's interval, asks for a prediction, and verifies search 35 before/after. F09 changes boundaries and checks the moved child and parent separator. Recursive ancestor repair and production occupancy are appropriately bounded, rather than claimed to be fully demonstrated.

### Resolved: hash aliases, deletion and shrink (`lecture-10`, `l10-s3`)

The alias table maps every old pointer to two new suffix labels, explicitly allows unchanged targets to alias, and separates directory growth from copying data buckets. The text states the pointer-count formula, buddy depth/bit condition, capacity condition, and all-local-depth shrink condition. Delete 9 reverses the worked split and explains why old unchanged depths allow shrinking. F10d instead splits a d<g bucket and shows all four affected aliases before merge and shrink; it also explains why shrinking must stop.

### Resolved: fusion before exercise (`lecture-12`, `l12-s4`)

The lesson introduces r/s, one frame per run, one output frame, and `r+s≤B−1` before asking learners to compare join choices. It checks the failed 14-versus-11 case and a feasible B=16 case, then counts pass-zero read/write, fused read and saved final-write/reread costs. Duplicate-buffer assumptions are explicit. F12 changes page counts and buffer budget to distinguish a feasible fused final pass from two independently feasible sorts whose joint input buffers do not fit.

### Resolved after independent cross-review: in-memory open addressing (`lecture-10`, `l10-s1`)

**Initially identified gap:** The rendered text said “Chaining links entries into a list; open addressing searches for another slot in an in-memory table.” Static chained overflow was fully traced, but no open-address probe rule supplied the next slot. I flagged this local scaffold gap without treating it as a flaw in the hash-directory material or a requirement to teach every hash-table policy.

**Actual refreshed teaching:** The fully reloaded Chromium capture now contains “A small in-memory open-addressing trace”: four initially empty slots, `h(k)=k mod 4`, an explicitly chosen linear-probing rule, wrap from 3 to 0, insertions 6/10/14 and lookup 14 following the same probe rule. It states that other policies use different sequences and deletion needs its own policy. I verified this rendered prose before changing the judgment; a prior still-stale capture was not accepted as evidence.

**Independent acceptance evidence:** F10e inserts 3,7,8, changing both the home slot and collision pattern; it traces wraparound and a key whose home is already occupied by a displaced key. Successful lookups for 7 and 8 follow from the supplied rule without an editor explanation. E/T/X/B is now 2/2/2/2 for the stated goal at this scope. Full-table handling, unsuccessful-search stopping and deletion algorithms remain outside the example; no such implementation completeness is claimed.

## Fresh changed-input task attempts

All exercise datasets are hypothetical. Each task maps to all displayed goals for its resource through the named subparts. “Supplied reasoning” records what is available in the candidate prose; the solution does not require canonical code, an editor explanation, or a test log.

### F01 — New library rows and a cold lookup

**Resource/coverage:** `lecture-01`, `l1-1`–`l1-4`; all three goals.

**Prompt.** Let Book(bid,title) contain (K1,Maps),(K2,SQL),(K3,Graphs), and let Loan(bid,member) contain (K2,An). Loan contains only current open loans. A visitor asks whether K2 is available; its page is absent from RAM. Explain database versus DBMS, classify adding (K4,Networks), adding publication_year, hiding member from the visitor and moving the physical file. Trace the lookup responsibilities and answer.

**Supplied reasoning.** Database is the collection; DBMS is software. Schema is structure and instance current rows. View/logical/physical levels are attached to the same library. The cold index lookup passes through file/index, buffer/frame and disk-space read, while planning chooses the path.

**Intermediate reasoning and answer.** The rows are the database instance; the managing software is the DBMS. Adding K4 changes only the instance. Adding publication_year changes logical schema. Hiding member changes the visitor's view/access design. Moving bytes is physical and should be hidden by physical data independence. Planning chooses operations; execution/file-index management locates Book and relevant Loan records; a missing page makes buffer management obtain a frame and request disk-space mapping/read; execution examines loaded rows. K2 has an open Loan, so it is unavailable. Storage relocation should not require changing the logical question.

**Assumptions/bounds.** bid identifies one physical copy; Loan contains open loans; required constraint and transaction mechanisms are configured. The preview is a responsibility model, not a claim that layers are separate processes or that RAM itself provides durability.

**Unresolved gap.** None for the three goals at this nearby scale. Later concurrency/recovery mastery is deliberately deferred.

### F02 — Different sums, different unmatched member, independent NULL list

**Resource/coverage:** `lecture-02`, `l2-1`–`l2-4`; a→goal 1, b→goal 2, c→goal 3.

**Prompt a.** Sale(id,city,amount) contains (1,A,20),(2,A,60),(3,B,40),(4,B,80),(5,B,90). Compute city sums using WHERE amount≥50, GROUP BY city, HAVING sum>100, then descending total. Change only HAVING to sum>170.

**Prompt b.** Member(mid,name)={(10,De),(20,Em),(30,Gi)}; Borrow(mid,book)={(10,P),(10,Q),(30,R),(99,S)}. Count inner, left, right and full joins on mid. No foreign key is enforced.

**Prompt c.** For IN/EXISTS, restart Borrow as {(10,P),(10,Q),(30,R)}. Find members with loans and no loans. Then add (NULL,T), with nullable mid, and compare NOT EXISTS with NOT IN.

**Supplied reasoning.** Logical SQL order and complete Sale transformation precede task variation. Each matching pair contributes a join row; an unmatched side contributes one padded row. Existence is tested once per outer row. Ordinary NULL comparisons yield UNKNOWN, TRUE AND UNKNOWN remains UNKNOWN, and WHERE keeps only TRUE.

**Intermediate reasoning and answer.** a: WHERE keeps IDs 2,4,5. A's group is [60]→60; B's group [80,90]→170. HAVING>100 keeps B; output (B,170). HAVING>170 rejects B too; result empty. b: three matched pairs (De,P),(De,Q),(Gi,R), unmatched Member Em and unmatched Borrow S. Inner=3; left=4; right=4; full=5. c: IN and EXISTS return De,Gi; NOT EXISTS returns Em. With the independent NULL row, NOT EXISTS still returns Em because 20=NULL is UNKNOWN, not an equality match. NOT IN for 20 requires 20<>10 AND 20<>10 AND 20<>30 AND 20<>NULL: TRUE AND TRUE AND TRUE AND UNKNOWN→UNKNOWN, rejected. For 10 and 30 a decisive equal value makes NOT IN FALSE. No member survives NOT IN.

**Assumptions/bounds.** Same `mid` schemas throughout; bag join multiplicity; nullable mid variant separate from orphan fixture; no FK rejection. SQLite supports the demonstrated IN/NOT IN/EXISTS; ANY/ALL is the separately labeled PostgreSQL topic. Query meaning is independent of the physical plan.

**Unresolved gap.** None for these goals. Sale's full transformation remains a strong teaching pattern.

### F03 — Changed product join, valid attributes and set operations

**Resource/coverage:** `lecture-03`, `l3-1`–`l3-4`; all three goals.

**Prompt.** R(pid,category)={(21,tea),(22,tea),(23,coffee)}; S(pid,price)={(21,15),(22,45),(24,70)}. Give set/bag category projections, product size, equality-join rows and categories with price>30 using join-first and filter-first expressions. Is filtering R on price valid? Also compute union/difference/intersection of A={1,5}, B={5,7}, and division when Required={RA,SQL} while person's skills are A={RA,SQL}, B={RA}, C={SQL,RA}.

**Supplied reasoning.** Projection removes identifiers and then duplicates under RA sets; product pairs every row; the explicit join condition preserves matching pairs and both key columns. The pushdown predicate must use only attributes of the target input. Set operations require compatible schemas; division tests every requirement in the projected candidate domain.

**Intermediate reasoning and answer.** Category projection before duplicate removal is tea,tea,coffee. RA/SQL DISTINCT gives {tea,coffee}; SQL SELECT keeps all three values. Product has 3×3=9 rows. Equality join schema (R.pid,category,S.pid,price) has (21,tea,21,15),(22,tea,22,45). Join-first then price>30 keeps only the second row, then projects {tea}. Filter-first S yields (22,45),(24,70); joining R keeps only 22, then {tea}. Valid expressions are π_category(σ_price>30(R⋈R.pid=S.pid S)) and π_category(R⋈R.pid=S.pid σ_price>30(S)). A price selection on R is invalid because R has no price. A∪B={1,5,7}; A−B={1}; A∩B={5}. Division returns A,C; B lacks SQL. With empty Required it returns the candidate domain {A,B,C}.

**Assumptions/bounds.** Ordinary non-NULL set values, compatible set-operation schemas, explicit inner equijoin. The same-column predicate argument extends beyond this instance, but not unchanged to an outer join. Assignment/schema changes are not special empty relations.

**Unresolved gap.** None for the three goals. Extended operator vocabulary is labeled as an extension, rather than required to complete this core task.

### F04 — New I/O model and two offset origins

**Resource/coverage:** `lecture-04`, `l4-1`–`l4-4`; all three goals.

**Prompt.** In an illustrative HDD model, seek=2 ms, rotation=3 ms, transfer=.2 ms/page. Compare twelve serialized random reads with one continuous twelve-page scan. A file has a 128-byte header and 2048-byte pages numbered from 0; find page 9 and a record 64 bytes into it. Explain the cold SQL-to-page path. Finally, 200 requested records lie on ten uncached pages; what extra information is needed to price their reads?

**Supplied reasoning.** Random reads repeat all positioning costs; one continuous scan pays positioning once. The file-origin and page-origin offsets must be distinguished. Disk-space management maps page IDs. Record count does not determine pages or elapsed time.

**Intermediate reasoning and answer.** Random=12×(2+3+.2)=62.4 ms. Sequential=2+3+12×.2=7.4 ms, ratio≈8.43 under the model. Page 9 begins at 128+9×2048=18,560 bytes; record address=18,560+64=18,624. Planning selects a path, execution/file-index asks for the record, buffer management requests the missing page, disk-space maps its ID and reads it. Ten uncached pages establishes ten data-page reads, not a duration: physical adjacency, device behavior, concurrency and read-ahead still matter. Consecutive logical IDs alone do not prove contiguity.

**Assumptions/bounds.** No cache hits/parallelism for the twelve-read comparison; ignore track changes/overheads; continuous physical layout for the sequential case. Header and numbering changed explicitly. These are page-I/O models, not hardware benchmark claims or current device figures.

**Unresolved gap.** None for the three goals.

### F05 — Dirty state, replacement eligibility and another cyclic scan

**Resource/coverage:** `lecture-05`, `l5-1`–`l5-4`; a→goal 1, b/c→goal 2, d→goal 3.

**Prompt a.** P initially has pin=0,dirty=false. Pin three times; one modifier unpins with true; two readers subsequently unpin with false. Give every state and earliest eviction eligibility.

**Prompt b.** Two empty frames, clean pages, immediate unpin; LRU trace A,B,A,C,B. A is modified on its second reference. Give order, misses, hits, victims and writes.

**Prompt c.** CLOCK hand starts F0: A(pin=1,ref=0), B(0,1), C(0,1). Load D, with no intervening access.

**Prompt d.** Compare LRU/MRU on two frames and A,B,C,A,B,C, initially empty and immediately unpinned.

**Supplied reasoning.** Pin increments/releases one outstanding use; dirty is not reset by a reader. Only unpinned frames qualify. LRU uses most recent unpin; CLOCK skips pins, clears one bits, then selects eligible zero. MRU chooses the most recent eligible page; larger cyclic working sets can flood LRU.

**Intermediate reasoning and answer.** a: pin counts 1→2→3, still clean; modifier release gives (2,true), reader releases (1,true) then (0,true). Only the final state is eligible; preserving dirty contents remains necessary. b, oldest→newest: A miss [A]; B miss [A,B]; A hit [B,A], A dirty; C miss evicts B→[A,C]; B miss evicts dirty A→[C,B]. Four misses, one hit, victims B/A, one write-back. c: skip pinned A, clear B and C, wrap/skip A, choose B now ref=0; D becomes pinned/ref=1 in F1 and hand advances F2. d: LRU misses all six. MRU misses A,B; C evicts B; A hits; B evicts A; C hits. Four misses, two hits. This favorable MRU trace is not universal.

**Assumptions/bounds.** No intervening CLOCK access; matching unpins; stated LRU convention; immediate unpin for scans; dirty writes obey persistence protocol. Pin count is frame-use protection, not transaction conflict control. Misses and writes are different counts.

**Unresolved gap.** None for the three goals.

### F06 — Slot overhead, moving a grown record and distinguishing NULL

**Resource/coverage:** `lecture-06`, `l6-1`–`l6-4`; all three goals.

**Prompt.** A 512-byte page has a 16-byte header, fixed 30-byte records and initially no other metadata. Compute capacity and the sixth record's offset. Add two-byte slots and recompute capacity. A separate variable record at RID(12,3) uses the taught 4+2+2+1 fixed-field model, a seven-byte ASCII name and page offset 200. Grow its name to eleven bytes and relocate the record to page offset 320, where it fits. State every changed/unchanged address or length; distinguish empty/NULL. Free list 3→6→9 supplies slot 3, then occupied slot 4 is deleted and prepended. Contrast this with packed deletion.

**Supplied reasoning.** Subtract header then floor complete records; positional offset skips earlier records. Slot ID identifies a movable record, while field offset/length and NULL bits interpret bytes inside it. Growth updates internal name length and slot record length; relocation updates the slot's page-relative offset. Free-list pop/prepend is worked separately from positional packed deletion.

**Intermediate reasoning and answer.** Without slots capacity=floor((512−16)/30)=16; sixth offset=16+5×30=166. With slots capacity=floor(496/32)=15; 480 bytes consumed and 16 remain. Variable fixed prefix=9, name offset=9, old field length=7 and record length=16. Growth makes field length=11, total record/slot length=20; NULL bit remains 0. Slot 3 changes page offset 200→320; RID(12,3) stays unchanged; internal name offset stays 9, so name begins at page byte 329. Empty string has length 0, bit 0; NULL has bit 1. Free list becomes 6→9, then 4→6→9. Packed deletion may move the last record into a hole and change its positional RID; a bitmap/free list marks gaps, while a slot maps stable identity to movable bytes.

**Assumptions/bounds.** No alignment/padding; name byte counts explicitly ASCII; relocation fits contiguous space and same page; slot lifetime/reuse rules not derived. Total free bytes alone need not mean a suitable gap. A slot directory cannot create capacity or replace schema/NULL metadata.

**Unresolved gap.** None for these goals; future overflow/cross-page relocation policy is deliberately outside the small model.

### F07 — PAX page reads and negative-delta decoding

**Resource/coverage:** `lecture-07`, `l7-1`–`l7-4`; a→goal 1, b→goal 2, c→goal 3.

**Prompt a.** Five hundred 40-byte rows exactly fill ten 2000-byte payload pages; no headers/padding/compression. A scan reads a four-byte field per row. Row and PAX storage APIs read whole pages; column values are separately readable. Compare bytes. If aligned arrays city=[A,B,A,C] and amount=[5,7,11,13], compute SUM(amount) where city=A.

**Prompt b.** RLE-encode [4,4,1,1,1,4] and calculate its sum. Delta-encode [9,6,4,3] with first, minDelta and residuals and minimum fixed bit width; decode. Dict black→1,white→0 encodes [white,black,white]: give codes and explain why code order cannot prove alphabetical order.

**Prompt c.** A chunk has valid min=10,max=20, while another has min=10,max=40. For x>25, which can be skipped? Does either result implement the actual Parquet parser?

**Supplied reasoning.** Whole-page PAX does not automatically save disk pages; aligned positions link column values. RLE stores consecutive value/count pairs. Delta subtracts the smallest adjacent difference; negatives are metadata, residuals nonnegative. Codes require their own dictionary and preserve order only if assigned that way. Valid statistics rule out impossible regions, not guarantee a match. The format includes row groups/chunks/pages and omitted nested/encoding details.

**Intermediate reasoning and answer.** a: row/PAX both read ten pages=20,000 bytes under this API; separate column payload=500×4=2,000 bytes. This is a byte-count difference, not guaranteed runtime. City A selects positions 1,3, then gathers amounts 5,11→16. b: runs=(4,2),(1,3),(4,1), sum=8+3+4=15. First=9; deltas=−3,−2,−1; minDelta=−3; residuals=0,1,2, requiring two unsigned bits (range 0–3). Add −3 back→−3,−2,−1; cumulative values 9→6→4→3. Dictionary codes=0,1,0; alphabetical black<white but codes 1>0, so ordered comparison would reverse it. c: first chunk cannot exceed 25 and can be skipped; second could match and must inspect its data. Missing/invalid statistics cannot justify skipping. No: these are array/metadata models, omitting actual headers/block rules, repetition/definition levels and complete parser behavior.

**Assumptions/bounds.** Full payload pages, no metadata costs in byte arithmetic; position alignment; signed delta metadata; same dictionary; valid suitable statistics. PAX page, Parquet encoded page and buffer page are distinct units. Real decoding requires the specification.

**Unresolved gap.** None for the three goals; a real Parquet implementation is not promised.

### F08 — New file size, key categories and index-plus-data I/O

**Resource/coverage:** `lecture-08`, `l8-1`–`l8-4`; a→goal 1, b→goal 2, c→goal 3.

**Prompt a.** P=256 pages, D=.5 ms/I/O, cold cache. One existing unique sorting key has an equally likely page; final heap page has room. Compact sorted file has no gaps. Calculate heap full scan, approximate/exact expected equality, absent-key scan, heap insertion, sorted equality, sorted insertion and a K=5-page range under the declared customary formula.

**Prompt b/c.** Item(id,category,value) has unique id but repeated category. Show category RID entries versus a RID list. Sixty matches exactly occupy three 20-record pages when clustered; in the unclustered case each is on a different page. Index-entry access costs four additional uncached I/Os, already counting its whole path/leaf access once. Give data-only and combined costs.

**Supplied reasoning.** P/D definitions and common assumptions precede formulas. An absent/non-key query cannot stop at one found row. Binary search requires physical sort key match; compact insertion averages half pages read and written. Search key differs from chosen candidate/primary key. Data fetch count is actual matching pages; index access is added.

**Intermediate reasoning and answer.** a: full/absent heap=256×.5=128 ms. Approximate existing heap equality=128×.5=64 ms; exact expected=(257/2)×.5=64.25 ms. Heap insert=2×.5=1 ms. Sorted equality=log₂256×.5=8×.5=4 ms. Sorted insert=(8+256)×.5=132 ms. K-page range=(8+5)×.5=6.5 ms in the stated convention. b: id can be the primary key; category is a nonunique search key. Entries may be (tea,rid=1),(tea,rid=2) or (tea,[rid=1,rid=2]). c: clustered data=3 reads, unclustered=60; with four index reads totals=7 and 64 I/Os, or 3.5 and 32 ms. The benefit comes from placement, not the label “tree.”

**Assumptions/bounds.** Unique existing key versus absent case distinguished; no random/sequential timing difference or CPU counted; actual sort column; cold cache and exact page packing; index access not double-counted. Candidate/primary classification follows this lecture's stated convention, not universal vendor naming.

**Unresolved gap.** None for the three goals. Explicit units and limited cost model are preserved.

### F09 — Continuous leaf repair and a different internal pointer

**Resource/coverage:** `lecture-09`, `l9-1`–`l9-4`; a/b→goals 1,2; c→goal 2; d→goal 3.

**Prompt a.** d=2, root leaf [2,6,10,14]. Insert 8 using the same two/three split policy. Give root/leaf state and inclusive scan 5..12.

**Prompt b.** Continue that tree: delete 2, borrow from right, then delete 6 and merge if necessary. Verify lookup 8 after borrowing and after collapse.

**Prompt c.** Separate internal tree: parent [50], left keys [15,25,35] with children E0–E3, right underfull [70] with E4,E5. E3 covers [35,50), E4 covers [50,70). Right borrows from left. Name moved pointer, changed separators and route lookup 45 before/after.

**Prompt d.** Separate internal split keys [12,24,36,48,60], six children; contrast with leaf copy-up. A byte model has capacity 256, header16, eight-byte pointer per entry; compare maximum counts for 20-byte versus 60-byte keys.

**Supplied reasoning.** Non-root d..2d occupancy, smallest-right leaf separator, leaf copy-up and internal push-up are explained. The same leaf state continues through repair and separator consequence. Named child intervals and parent/downward separators show internal redistribution. Byte occupancy includes keys/pointers/header separately.

**Intermediate reasoning and answer.** a: temporary [2,6,8,10,14] splits to [2,6] and [8,10,14]; new root separator8 and links; scan 5..12 begins left, reads6, follows link and reads8,10. b: delete2 leaves[6]; borrow8 from right→left[6,8],right[10,14],root10. Lookup8 now goes left; retaining separator8 would wrongly send it right. Delete6 leaves[8], right has minimum2 entries and cannot lend; merge[8,10,14], collapse root to that leaf; lookup8 directly succeeds. c: move E3 to right's first child; parent50 moves down,35 moves up. Left=[15,25] childrenE0,E1,E2; parent35; right=[50,70] childrenE3,E4,E5. Before,45<50 routes left then >35→E3. After,45≥35 routes right then <50→E3. d: push36 to parent; left[12,24],right[48,60],three children each; this changes internal separators, not leaf data. A leaf split copies the right boundary while keeping its data entry. Byte counts floor((256−16)/(20+8))=8 versus floor(240/(60+8))=3; entry-count half-full does not encode a common byte fullness rule.

**Assumptions/bounds.** Unique leaf keys; textbook count occupancy/root exception; adjacent sibling shares parent; one internal level only; named intervals retained; byte exercise excludes extra metadata/padding. General recursive repair or lazy production deletion is bounded separately. Duplicate search keys need all entries/RID lists.

**Unresolved gap.** None for the displayed goals' nearby cases. Preserve leaf continuity and the pointer lookup check.

### F10 — Different chain, skew pattern, aliases and reversible local split

**Resource/coverage:** `lecture-10`, `l10-s1`–`l10-s4`; a/e→goal 1, b→goal 2, c→goal 3, d→goal 4. Part e was independently attempted after reading the actual fully reloaded L10 refresh.

**Prompt a/b.** h(k)=k mod4, primary bucket capacity 2. Insert3,7,11; search11 and absent15; delete11. Explain why equal hash is not equal key and what deletion writes/reclamation depend on.

**Prompt c.** Under k mod8, keys0,8,16 collide. What can rehashing change? Can it distribute repeated copies of key 8 normally?

**Prompt d.** An extendible directory has g=3. Odd-suffix bucket T has d=1, capacity 2 and keys [1,5]; aliases001,011,101,111 all point to T. Other buckets U00/U10 have d=2 with aliases000/100 and010/110 respectively. Insert3, then delete3 and merge the resulting buddies; shrink as far as structurally permitted. Give every affected alias at each step.

**Supplied reasoning.** Modulo/bucket key comparisons and static overflow are worked. Rehashing changes mapping but cannot separate copies of the same key under ordinary key partitioning. Directory aliases number 2^(g−d); d<g split does not need doubling. Buddy equal-depth, shared-suffix/differing-bit and combined-capacity conditions precede deletion/shrink.

**Intermediate reasoning and answer.**

- a/b: All keys hash to 3. Primary=[3,7]; overflow=[11]. Searching for 11 compares the primary page then the overflow page: two uncached reads. Searching for 15 follows both and finds no equal key, also two reads. Deleting 11 takes the same path and removes it. Modified pages must be written; whether/how the empty overflow page is unlinked/reclaimed and counted requires an implementation policy. Equal remainder narrows location, not identity.
- c: Distinct patterned keys may be spread by a changed mapping/mixing function; rebuilding costs data reads/writes. Identical copies of 8 still share a key/hash and need separate handling. A prime modulus is not a no-collision proof.
- d, split: Split T using two suffix bits without changing g=3. Bucket 01=[1,5], d=2 has aliases 001/101; bucket 11=[3], d=2 has aliases 011/111. The unchanged even aliases still reach U00/U10.
- d, delete/merge: Deleting 3 empties bucket 11. It can merge with 01: both have d=2, share final bit 1, differ in the preceding distinguishing bit, and their combined two entries fit. T=[1,5], d=1 again receives 001/011/101/111.
- d, shrink: Every local depth is at most 2, so drop g=3 to g=2: 00→U00, 01→T, 10→U10, 11→T. Do not drop to g=1: U00/U10 require two suffix bits and preserve a necessary distinction.

**Assumptions/bounds.** Nonnegative numeric keys; identity hash bits for this toy suffix model; capacity counts entries; remaining local depths explicitly supplied; no copying of unaffected data buckets; equal-hash fallback distinct from key mixing; bucket I/O excludes fetching referenced records and possibly nonresident directory.

**Prompt e, refreshed open addressing.** Use the text's four initially empty slots numbered 0–3 and `h(k)=k mod 4`, with its next-slot linear-probing/wraparound rule and no deletions. Insert keys 3,7,8 in that order. Show all slot states, then the successful lookup paths for 7 and 8. Explain why 8 cannot simply be stored or found by trusting its home slot's current value.

**Supplied refreshed reasoning.** An occupied home triggers the next slot, wrapping 3→0. Lookup follows the same sequence as insertion and compares actual keys. The example explicitly labels its policy and forbids inferring a deletion rule.

**Independent answer e.** Initial slots are [empty,empty,empty,empty]. Insert 3: home=3, so [empty,empty,empty,3]. Insert 7: home=3 contains 3; wrap to empty slot 0, giving [7,empty,empty,3]. Insert 8: home=0 contains 7; try empty slot 1, giving [7,8,empty,3]. Lookup 7 starts at slot 3, rejects key 3, wraps to slot 0 and finds 7. Lookup 8 starts at slot 0, rejects key 7, then finds 8 at slot 1. Key 7 was itself displaced, so 8's home being occupied does not establish either equality or absence. Chaining would instead keep 3/7 in the bucket-3 list and 8 in bucket 0; open addressing stores the displaced keys in other slots under the declared probe rule.

**Assumptions e.** Four initially empty slots; nonnegative keys; this exact linear-probing and wraparound policy; no deletions or intervening changes; enough empty slots. This checks successful lookup, not a full deletion/full-table/unsuccessful-search implementation, and does not convert in-memory slot probes into a database page-I/O promise.

**Unresolved gap.** None for the four stated goals' nearby variants after the refreshed open-addressing task. The model's omitted implementation policies are explicitly bounded rather than silently assumed.

### F11 — Partial run, merge copies, DISTINCT and index order

**Resource/coverage:** `lecture-11`, `l11-s1`–`l11-s4`; all four goals; index comparison uses L8's explicitly taught tuple/page distinction.

**Prompt a.** Sort 37 pages with B=5 frames. Count initial and merged runs/passes, materialized I/O, and cost if only the final write is pipelined away. Compare the separately defined one-page-run two-way algorithm.

**Prompt b.** An ordered B+ path/leaf traversal costs three I/Os. Twenty matching complete records occupy two data pages when clustered, twenty when scattered. Compare complete ordered reading under a cold cache.

**Prompt c.** Merge [2,5,5] with [1,5,8], then implement DISTINCT. Explain how ORDER BY and DISTINCT relate to the operator implementation rather than silently deleting copies during ordinary sort.

**Supplied reasoning.** Pass 0 uses B pages per run, ceil for a partial batch; fan-in B−1 reserves output. All materialized passes read/write N pages; pipelining may omit only the final write. Two-way has its own one-page initial-run convention. Complete unclustered records may require one fetch per tuple. Sorting keeps all copies; adjacent elimination implements DISTINCT separately.

**Intermediate reasoning and answer.**

- a: Initial runs=ceil(37/5)=8; merge fan-in 4 gives 8→2→1. Pass 0 plus two merges=3 passes; materialized cost=2×37×3=222 page I/Os. Omitting the final 37-page write gives 185 I/Os if the next operator consumes it directly. Two-way starts with 37 one-page runs, then 19→10→5→3→2→1: six merges plus pass 0=7 passes, costing 2×37×7=518 I/Os.
- b: Three index reads plus two clustered data reads=5; three plus twenty scattered reads=23. Ordered index entries do not imply data locality.
- c: Current heads produce [1,2,5,5,5,8]; regular sorting retains all three copies of 5. DISTINCT then retains [1,2,5,8] by scanning adjacent equal groups. ORDER BY requests order; DISTINCT requests duplicate elimination. Sorting can support both, while hash-only DISTINCT does not promise key order.

**Assumptions/bounds.** Positive input, B≥3; materialized fixed-size sort input/output; no DISTINCT output shrinkage reused in the fixed 2N-per-pass formula; no CPU/final pipeline storage charge. Exact supplied data-page locations/cold cache and index reads counted once. This is logical operator behavior and modeled I/O, not a universal fastest algorithm.

**Unresolved gap.** None for these four goals in the ordered course. A standalone learner should follow the L8 link for why clustered records occupy fewer pages; that prerequisite has already been read here.

### F12 — Rounded loop orientation, all matches and feasible fusion

**Resource/coverage:** `lecture-12`, `l12-s1`–`l12-s4`; all four goals.

**Prompt a.** R has M=25 pages and m=250 tuples; S has N=13 pages. B=7 frames. Compute R-outer tuple/page/BNLJ costs, reverse BNLJ, and Grace hash cost if partition-fit assumptions hold.

**Prompt b.** Independent index-NL fixture: outer has 8 distinct join-key tuples on 2 pages; each key has 6 inner matches. Index entry access costs 2 I/Os per lookup; all 6 data records fit exactly one page when clustered or six distinct pages when scattered. No probe caching. Give total costs and result count.

**Prompt c.** R has two tuples r1,r2 with key 5; S has four tuples s1,s2,s3,s4 with key 5. List every pair. Assume groups fit in the already allocated current-run buffers without extra spill or rereads.

**Prompt d.** For the 25/13-page unsorted inputs, test unchanged final-sort fusion at B=7, then B=6. Count fused versus materialized-sort-plus-join I/O when feasible, excluding join-output writes. Compare already sorted input scans.

**Supplied reasoning.** The text walks one outer block then repeated inner scans, defines tuple/page/block units and ceiling, calculates both orientations, includes all matches in lookup cost, lists full duplicate cross-products and states spill/fit limits. Fusion's run-buffer condition and saved write/reread arithmetic occur before its exercise.

**Intermediate reasoning and answer.**

- a: R-outer tuple loops=25+250×13=3,275 I/Os; page loops=25+25×13=350. B−2=5 outer pages; R has ceil(25/5)=5 blocks, costing 25+5×13=90. S has ceil(13/5)=3 blocks, costing 13+3×25=88; choose 88 in this model. Grace=3×(25+13)=114 if all build partitions fit with overhead and no recursion. Hashing is not automatically cheaper than this BNLJ.
- b: Clustered lookup=2+1=3; total=2+8×3=26 I/Os. Unclustered lookup=2+6=8; total=2+8×8=66. Eight distinct outer keys, each with 6 matches, produce 48 pairs.
- c: (r1,s1),(r1,s2),(r1,s3),(r1,s4),(r2,s1),(r2,s2),(r2,s3),(r2,s4): 8 outputs. Advancing both once would lose pairs.
- d, feasible fusion: B=7 pass 0 gives ceil(25/7)=4 R-runs and ceil(13/7)=2 S-runs. Their 6 inputs fit B−1=6, so six input frames plus one output fit. Pass 0 reads/writes all 38 pages, costing 76; fused final reads 38, totaling 114. Separate two-pass sorts cost 4×38=152, then the join rereads 38, totaling 190. Fusion saves 76 I/Os: one write and one read of both inputs.
- d, infeasible fusion: B=6 gives 5+3=8 runs, exceeding 5 available input buffers. Each separate sort can be two-pass with fan-in 5, but the unchanged joint final pass cannot fuse. With already sorted inputs and suitable duplicate handling, only 25+13=38 input reads are needed; do not sort or assume pages already cached.

**Assumptions/bounds.** Nonempty inner equijoin; B≥3; all matching pairs retained; cold page-read model excluding CPU/output writes; fixed lookup costs/no retained inner-cache shortcut; sort runs and duplicate groups fit as stated. Hash equijoin costs do not extend to arbitrary inequalities. Grace partitioning must preserve matching pairs and check actual state overhead/skew; otherwise recursion/fallback adds I/O. Materialization versus pipeline boundary is explicit.

**Unresolved gap.** None for these four goals. The output and duplicate-group assumptions remain essential, not universal promises that every real merge join costs M+N.

## Follow-up status

All 39 goals are finalized by this editorial cross-review after the independently verified rendered L10 refresh and F10e's different collision input. There are no remaining blockers for the nearby task scope documented here. No canonical course, Git, test or deployment edit was made by this reviewer. The positive judgment is a text-based editorial check, not a human learner study; actual learner testing, learning-time validation and deployment approval remain separate.
