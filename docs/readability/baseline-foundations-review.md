# Independent learner-comprehension review: Lectures 1–12

> Baseline evidence only. This review precedes candidate editing and does not grant candidate acceptance. Rendered baseline captures were generated locally from commit `0a1fb0363d2c44a0ca8f508f4e964a01af128720`; references to `readability-work/baseline` describe that capture, not a public folder. Canonical historical text is available in the linked Git commit.


## Basis and limits

I read every section of `baseline/lecture-01.md` through `baseline/lecture-12.md`, in that order. These are the immutable Chromium-rendered baseline, with disclosure answers expanded. I did not use an outline or JSON summary in place of the lessons. Stable section IDs below refer to that rendered baseline. This is an independent cognitive walkthrough from a first-time learner perspective, with worked fresh transfer exercises; it is not human-participant testing.

I reviewed the explicitly shown schemas and SQL statements while reading. I made no canonical-course, Git, test, or deployment changes. The supplied branch is `readability/learner-review-2026-10`; the supplied main baseline is `0a1fb0363d2c44a0ca8f508f4e964a01af128720`. No `AGENTS.md` was found by a workspace file search.

Verdicts about solving an exercise “from the lesson alone” assume ordinary arithmetic and reading tables, and explicitly supplied exercise assumptions. They do not imply that every advanced topic named in a lesson is fully taught.

## Findings to address first

1. **High: the SQL fixture changes column names without changing its schema.** In **l2-3**, `Member(mid,name)` and `Borrow(mid,book)` are followed by “the first field is member_id” and `Member.member_id = Borrow.member_id`. In **l2-4**, the negative-query description again uses `member_id`. Those attributes do not exist in the declared fixture. Keep `mid` throughout, or explicitly redeclare a separate fixture and every query using it. The existing executable LEFT JOIN and EXISTS examples correctly use `mid`.
2. **Medium: record growth omits metadata updates that the lesson has just taught.** **l6-4** recommends compacting the page and updating the slot offset when the name grows from 4 to 20 bytes. The stored name length must change to 20, the slot's record length from 13 to 29, and the NULL bit must remain present. The internal name offset stays 9 in this layout. Updating only the slot offset is not a complete growth procedure. This is a particularly useful place to connect the two directories rather than merely warn that they differ.
3. **Medium: appended teaching appears after a self-check or contradicts the preceding scope statement.** **l2-4** first says NULL logic needs supplementary reading and then teaches quantified NULL cases in a dense appendix. **l3-4** says EXCEPT ALL multiplicity “is not developed here,” then supplies its formula. **l12-s4** gives a final exercise/answer before teaching the advertised final-sort-pass fusion outcome. Move necessary teaching before its check; place genuinely optional material behind a plainly titled extension. Remove now-false scope sentences.
4. **Medium: abstract vocabulary enters before a usable example.** **l3-1** introduces safe/domain-independent calculus and Codd-style equivalence without showing a safe query versus an unsafe one. **l3-4** uses `π_person(Skill)` without declaring `Skill(person,skill)` and `Required(skill)`. **l8-3** introduces “candidate key” without defining it. **l5-4** invokes WAL before it is explained. These do not break the central arithmetic, but they make a novice decide whether an unexplained term is essential.
5. **Medium: pointer-heavy algorithms need one complete state representation.** The central leaf split/deletion in **l9-2/l9-3** is strong, but internal redistribution introduces child moves without labelled child ranges. **l10-s3** explains a bucket split without listing the whole before/after directory and gives only a conceptual shrinking condition. The supplied examples can be followed, but independent internal repair or a concrete deletion/shrink trace is not yet reliably supported. Add labelled child pointers and directory suffixes, and one worked deletion/shrink decision if that remains in scope.
6. **Lower: the rendered reading flow contains repeated headings and citation audit text.** Every section repeats its numbered heading immediately below the Markdown section heading, with labels such as `01The conceptual framework`. Many lessons repeat “original supplementary explanation and practice,” slide-page lists, and caveats within each section. Preserve attribution, but collect detailed provenance in one source panel; keep assumptions beside the calculation they qualify. **l7-2** also repeats the byte-ratio warning within the same takeaway. This is a visible reading-flow finding, not a counts-based proxy for comprehension.

## Lesson-by-lesson checklist and transfer checks

### Lecture 1 — From data to a DBMS

- **Motivation:** Clear application failure question and a concrete library-file failure in **l1-2**.
- **Prerequisites and definitions:** Database/DBMS, model/schema/instance, transaction, index, view/logical/physical levels are introduced in usable language. `Book(book_id,title)` is explained by example. The schema variants in l1-1 and l1-3 are separate examples, not executable SQL.
- **Intuition and steps:** The broken book reference is specific, and l1-3 separates adding a row from adding a column. The page-offset/storage-change example gives a reason for physical independence.
- **Transition and chunking:** **l1-4** starts as a practice roadmap, then adds the complete DBMS layer stack and workloads/storage architectures from later lessons. This is a large change of task after the introduction's central concept checks.
- **Repetition/caveats:** The caveat about RAM persistence is useful; the workload and row/column overview is better used as an optional preview or moved to Lecture 7. Expand OLTP/OLAP/HTAP on first use if retained here.
- **SQL/schema audit:** No executable SQL. Library schema names vary between explicitly separate illustrations; no code references a nonexistent column.

**Fresh exercise:** A library adds the row `(B018, "Networks")`, adds `publication_year` to Book, changes its page size, and hides borrowers' names from visitor users. Classify each change. Then the book ID changes while the matching loan ID does not; state the failed rule and the needed unit of work.

**Reasoning:** Adding a row changes the instance; adding a column changes the logical schema; page size is physical; visitor visibility is view/access design. The loan refers to an absent book; the paired ID updates need an all-or-nothing transaction. **Verdict: yes**, the lesson supplies every relevant distinction. The layers/workload extension is not needed to solve this exercise and distracts from the successful core.

### Lecture 2 — SQL: understanding the result

- **Motivation:** “Calculate the result before running” is a productive learning strategy.
- **Prerequisites and definitions:** Alias, bag semantics, DISTINCT, row versus group filtering and join multiplicity are explained through small fixtures. NULL first appears through a preserved unmatched member.
- **Intuition and steps:** **l2-2** walks FROM/WHERE/groups/HAVING/SELECT/order separately; **l2-3** counts each matching pair before contrasting EXISTS. These are strong examples.
- **Transition and chunking:** **l2-4** jumps from top-one ordering to ALL/ANY, slide inconsistencies, correlated execution, NOT IN, empty sets and UNKNOWN. The reader lacks a staged introduction to ordinary NULL comparison and WHERE's TRUE-only rule before the quantifier cases.
- **Repetition/caveats:** Keep dialect support beside ANY/ALL and the NULL trap; remove the obsolete claim that this material is only supplementary reading. A three-row TRUE/FALSE/UNKNOWN example would do more teaching than another qualification paragraph.
- **SQL/schema audit:** The aggregation, LEFT JOIN, EXISTS and LIMIT query use existing columns and valid aliases. The orphan/negative-query appendix's `member_id` does not exist in `Member(mid,name)`/`Borrow(mid,book)`. ANY/ALL set illustrations are semantic shorthand, not runnable full statements; they are correctly labelled PostgreSQL-only relative to the SQLite lab. The ORDER BY/LIMIT example is runnable in SQLite and PostgreSQL against Sale.

**Fresh exercise:** Using `mid` throughout, add Member `(4,Dinh)` and orphan Borrow `(5,E)` to the original fixture. Predict LEFT/RIGHT/FULL result counts and members kept by EXISTS. Then add a NULL `Borrow.mid` and consider Member 3 with NOT IN versus correlated NOT EXISTS.

**Reasoning:** Three matched pairs remain. There are two unmatched members and one unmatched borrow, so LEFT has 5 rows, RIGHT 4, FULL 6. EXISTS keeps An and Binh once each. `3 NOT IN (1,1,2,5,NULL)` is UNKNOWN and WHERE removes it; correlated NOT EXISTS keeps Chi because no equality match exists. **Verdict: yes for joins/EXISTS after fixing the column-name error; qualified for the NULL transfer.** The appendix states enough facts to reason out the NULL case, but does not teach the intermediate comparisons slowly enough for a novice's first independent query.

### Lecture 3 — Relational algebra: from questions to plans

- **Motivation:** The product/price question makes composition useful before symbols appear.
- **Prerequisites and definitions:** Projection and selection symbols are introduced after computing the rows. Theta/natural joins and qualified attributes are explained. Safe calculus, domain independence, and the extended operator list are named rather than taught.
- **Intuition and steps:** **l3-2** shows why projection creates duplicates and removes them under set semantics. **l3-3** calculates both plans and explains why a price-only predicate can move into S.
- **Transition and chunking:** **l3-1** adds a formal equivalence caveat before the novice has used a single operator. **l3-2** moves from one concrete join to self-join roles and then a five-operator vocabulary list. Separate the extended operators from the main operator ladder.
- **Repetition/caveats:** **l3-4** contradicts itself about EXCEPT ALL scope. Declare `Skill(person,skill)` and `Required(skill)` before introducing `π_person` or division.
- **SQL/schema audit:** `SELECT category` and `SELECT DISTINCT category` are illustrative fragments rather than complete runnable queries; add `FROM R` if shown as statements. The RA join/filter expressions use the declared R/S attributes. Employee's schema is not explicitly declared; the rename explanation assumes `Employee(id,manager_id,...)`.

**Fresh exercise:** Add `(12,30)` to S. Find the set of categories with price greater than 25 using (a) join then filter and (b) filter S then join.

**Reasoning:** The join contains `(11,tea,11,20)`, `(12,tea,12,30)`, `(13,cake,13,35)`. Filtering leaves product 12 and 13, and projection yields `{tea,cake}`. Filtering S first keeps IDs 12,13,14; 14 has no R match, so the same two categories result. **Verdict: yes for core RA and predicate placement.** This does not establish competence with safe calculus or division; those need an additional defined-schema example and an operator construction if they remain learning goals.

### Lecture 4 — Hardware and the disk-space manager

- **Motivation:** Scattered I/O versus low computation is clear and concrete.
- **Prerequisites and definitions:** Seek, rotation, transfer, latency, pages and address origins are introduced. Expand I/O as input/output on first use. Write amplification is defined accurately but is a second technical strand before the basic worked example.
- **Intuition and steps:** **l4-2** charges positioning per random request and once per contiguous run; **l4-3** explicitly distinguishes page-relative and file-relative offsets.
- **Transition and chunking:** Architecture repeats the Lecture 1 preview. A compact “page request through the layers” drawing would fulfil the trace objective better than another list of layer names.
- **Repetition/caveats:** The benchmark/hardware-price warnings recur in l4-1, l4-2 and l4-4. Keep the supplied model assumptions together. **l4-4** mixes number of page I/Os with physical closeness, which primarily changes latency under l4-2's model; distinguish the two questions explicitly.
- **SQL/schema audit:** No SQL statements or schema-dependent code.

**Fresh exercise:** Under the same 4 ms seek, 3 ms rotation, 0.1 ms/page model, six uncached pages are read in three separate contiguous runs of two pages, sequentially with no overlap. Compare this with six random reads.

**Reasoning:** Each two-page run costs `4+3+2×0.1=7.2 ms`; three runs cost 21.6 ms. Six random reads cost `6×7.1=42.6 ms`. **Verdict: yes.** The exercise transfers the positioning-cost reasoning rather than copying the original 200-page calculation. The lesson should call this a duration calculation, distinct from counting logical page reads.

### Lecture 5 — The buffer pool

- **Motivation:** State tracing is a good way to make replacement rules operational.
- **Prerequisites and definitions:** Page/frame, hit/miss, pin, dirty and replacement eligibility are defined. The LRU last-unpin and CLOCK pin-event conventions are explicit.
- **Intuition and steps:** **l5-2** distinguishes one user's clean unpin from the accumulated dirty flag. **l5-3/l5-4** trace all victim choices and separate reads from write-backs.
- **Transition and chunking:** CLOCK follows LRU naturally; the MRU trace makes sequential flooding useful. The last practical-systems paragraph switches to LRU-K, partitions, hints, prefetch and WAL without working any of those mechanisms.
- **Repetition/caveats:** The pinned-page invariant and dirty preservation are worth repeating. Replace unexplained WAL with a forward reference such as “the log-before-data rule introduced in recovery,” or define it briefly. Mark the remaining policy names optional.
- **SQL/schema audit:** No SQL. `pin`/`unpin` are explicitly model API calls, not SQL.

**Fresh exercise:** CLOCK starts at F0: A `(pin=1,ref=0,dirty=true)`, B `(0,1,true)`, C `(0,0,false)`. Load D, immediately unpin D, then request E without any other accesses. Count victims and I/O.

**Reasoning:** Skip pinned A, clear B's reference bit, evict clean C, read D, set D's reference bit and advance to F0. For E, skip A and evict now-unreferenced B, writing B and reading E. Victims are C then B; there are 2 reads and 1 write. **Verdict: yes.** The lesson supplies all state rules, including why dirty A is irrelevant while pinned.

### Lecture 6 — Files, pages, and records

- **Motivation:** Stable address versus moving bytes connects physical layout with indexes.
- **Prerequisites and definitions:** Heap file, record, RID, slot directory, field metadata, free-page directory and free-slot list are explicitly distinguished. Floor and position numbering are explained.
- **Intuition and steps:** **l6-2** works capacity before a formula; **l6-3** explains the half-open interval and why the RID survives compaction. These are strong novice-facing details.
- **Transition and chunking:** The slot-directory versus field-offset comparison is valuable; the appended list of four directory kinds should be a labelled diagram/table or placed beside the examples that use them.
- **Repetition/caveats:** **l6-4** distinguishes empty/NULL/deleted, but its growth extension omits changes to both stored lengths. “A slot directory cannot create capacity” is useful once, after a complete growth procedure.
- **SQL/schema audit:** No executable SQL. NULL is a stored-field state in an explicitly defined original record model.

**Fresh exercise:** The record model stores non-NULL name `Linh` in slot `(9,2)`, name offset 9, name length 4, record length 13. Replace it with ASCII `Nguyen` and move the record during compaction to page offset 850. State every relevant metadata value and whether the index RID changes.

**Reasoning:** `Nguyen` is 6 ASCII bytes, so name length becomes 6 and record length becomes `9+6=15`; name offset stays 9 and the NULL bit stays 0. Slot 2 becomes `(offset=850,length=15)`. The RID remains `(9,2)`. **Verdict: qualified.** All components can be inferred from the lesson, but the provided growth recipe tells the learner only to change the slot offset. Add the complete metadata update as an explicit worked step.

### Lecture 7 — Storage models and compression

- **Motivation:** Choosing bytes by workload connects OLTP/OLAP with layouts.
- **Prerequisites and definitions:** Row/column/PAX, row group/chunk/page, run, delta, residual and dictionary are defined by examples. The crucial distinction between a Parquet page and a DBMS buffer page is made.
- **Intuition and steps:** **l7-2** shows filtering positions before fetching amounts; **l7-3** shows both encoding and decoding, including required base/minimum information. Dictionary ordering is correctly separated from equality.
- **Transition and chunking:** l7-3 combines three encodings, block codecs, dictionary-size accounting, cross-dictionary comparison, zero-bit residuals and format caveats. Split into encoding mini-sections with a check after each, then one optional format note.
- **Repetition/caveats:** **l7-2** repeats the same 8.33 ratio and speedup warning within its takeaway; l7-4 repeats the whole-operation warning. Keep one ratio warning next to the byte calculation and one compact format disclaimer.
- **SQL/schema audit:** No executable SQL. The three columns and arrays in the position-gather example correspond correctly.

**Fresh exercise:** Encode `[40,43,42,46]` using first value, minimum delta and unsigned residuals. Find the residual bit width, then decode.

**Reasoning:** Deltas are `[3,-1,4]`; minimum delta is -1; residuals are `[4,0,5]`. Three unsigned bits cover 0–7. Add -1 back to obtain `[3,-1,4]`, then accumulate from 40 to recover 43,42,46. **Verdict: yes under the stated payload model.** This transfers the procedure to a decreasing step. Add one line that deltas/minimum may be negative and must be represented accordingly; the lesson intentionally does not specify a real format's signed metadata encoding.

### Lecture 8 — File organisations and index types

- **Motivation:** Workload plus a shared cost model is a good design frame.
- **Prerequisites and definitions:** Search key, RID entry variants, sorted versus heap and clustering are useful. “Candidate key” needs a definition; “primary/secondary” needs to be explicitly tied to this course's convention before learners carry it into a product.
- **Intuition and steps:** **l8-2** carefully states cold cache, unique present key, compact sorted file, and equal I/O costs. **l8-3** separates index traversal from table data fetches.
- **Transition and chunking:** “Complete the cost model” is a dense formula appendix. A small operation/cost/assumption table is more usable than prose containing several formulas. Tree/hash choices are named before their mechanisms; l8-4 gives the tree-range conclusion without a brief “ordered versus scattered buckets” reason.
- **Repetition/caveats:** The repeated approximate-model caveats are appropriate but can be consolidated. Keep the present/absent/unique/nonunique distinctions because they change the answer.
- **SQL/schema audit:** No executable SQL. `Product(pid,category,price)` is used consistently; category is nonunique while pid is unique in the fixture.

**Fresh exercise:** A 16-page file has D=3 ms. A range on its sorting key covers exactly 4 data pages. Compare heap and sorted-file estimates. An index needs 2 uncached index I/Os and finds 20 records: compare a clustered 4-data-page placement with one-record-per-page placement.

**Reasoning:** Heap range scan is `16×3=48 ms`; sorted range estimate is `(log2 16+4)×3=(4+4)×3=24 ms` under the stated no-overlap convention. Index totals are `2+4=6 I/Os=18 ms` versus `2+20=22 I/Os=66 ms`. **Verdict: yes.** The example transfers assumptions and separates data-page counts from index cost. Explain the course-defined candidate-key vocabulary before using it as a classification rule.

### Lecture 9 — Tree indexing

- **Motivation:** Separator role versus leaf data role is concrete and immediately used.
- **Prerequisites and definitions:** Fanout, separator, order-d occupancy and root exceptions are specified. ISAM is explained functionally but its acronym is never expanded. The fanout logarithm needs a repeated-division interpretation if logarithms are not a stated prerequisite.
- **Intuition and steps:** **l9-2/l9-3** give an excellent leaf split, equality routing, range scan, borrow and merge chain. The stale-root-separator counterexample teaches why the update matters.
- **Transition and chunking:** Internal split, merge and redistribution follow in prose without named child ranges. Prefix/suffix compression and duplicate policies add separate tasks to the final section. Give internal repair its own drawn state sequence.
- **Repetition/caveats:** Production occupancy exceptions should follow the textbook example rather than precede its first update. Keep unique-key and byte-capacity assumptions close to their examples.
- **SQL/schema audit:** No SQL. Keys in worked trees are ordered numeric values; the prefix/suffix example explicitly declares ordinary lexicographic order.

**Fresh exercise:** With d=2, a root separator 20 points to left leaf `[5,10]` and right leaf `[20,25,30]`. Delete 5, then search for 20.

**Reasoning:** Left becomes `[10]`, below minimum. Right can lend 20, giving `[10,20]` and `[25,30]`; update root separator to 25. Search 20 goes left and succeeds. **Verdict: yes for leaf repair.** A separate transfer involving internal redistribution is only partially supported: the prose supplies the key movement rule, but the unlabelled child ranges make it difficult to verify that a fresh pointer arrangement preserves routing. The strong leaf example should be the template for teaching that case.

### Lecture 10 — Hash-based indexing

- **Motivation:** Collision versus matching key, and equality versus range, are explained before growth.
- **Prerequisites and definitions:** Bucket, overflow, modulo, global/local depth and suffix convention are defined. Chaining and open addressing are only named in one sentence; numeric-to-binary conversion is assumed.
- **Intuition and steps:** **l10-s1/s2** makes repeated collisions and overflow cost tangible; l10-s3 gives a concrete overflowing bucket with supplied binary hashes. Pointer-table growth is correctly distinguished from copying every bucket.
- **Transition and chunking:** Full-directory before/after tables are missing. “Deletion may allow merge/shrink when structural conditions permit” is too general to teach an independent deletion decision.
- **Repetition/caveats:** Hash quality and duplicates are usefully distinguished. Duplicate source URLs and repeated “original supplementary material” lines add noise. Put the `d≤g` invariant alongside the split rather than in a detached appendix.
- **SQL/schema audit:** No executable SQL. `SELECT` is mentioned only as an operation whose complete-row cost includes data fetches.

**Fresh exercise:** g=3. A local-depth-1 bucket identified by suffix `1` holds two keys with hash suffixes `001` and `011`. Insert a third with suffix `101`, capacity still 2. List the new buckets and their directory aliases.

**Reasoning:** Increase local depth to 2. Bucket suffix `01` holds `001` and `101`, and directory entries `001`,`101` point to it. Bucket suffix `11` holds `011`, with aliases `011`,`111`. Each has two aliases; g remains 3, so no directory doubling. **Verdict: yes when binary hashes are supplied.** The fresh algorithmic transfer is supported. If learners must compute binary hashes, add a short conversion example. Exact merging/shrinking still requires a worked buddy/capacity/alias case.

### Lecture 11 — External sorting and aggregation

- **Motivation:** More data than RAM gives a clear reason to count reads/writes and passes.
- **Prerequisites and definitions:** N/B, frame, run, fan-in/output reservation, ceil and pass zero are all introduced. The worked run ladder precedes the logarithmic formula.
- **Intuition and steps:** **l11-s1** follows current run heads and preserves duplicates before DISTINCT. **l11-s3** uses sum/count rather than averaging averages and distinguishes group-state size from raw tuples.
- **Transition and chunking:** External hashing, skew, overhead and recursion sit in a long aggregation section. A small partition/state table would make the memory bound concrete before the overhead formula.
- **Repetition/caveats:** State model boundaries once beside sort cost and once beside hash-state cost. N/B restrictions, final-write convention and skew qualification are necessary and should remain visible.
- **SQL/schema audit:** `sales(region,amount)` matches the North/South example. `DISTINCT customer_id` and `DISTINCT customer_id ORDER BY customer_id` in l11-s4 are query requirements/fragments, not complete runnable SQL; label them as requirements or provide a table schema and full SELECT. No nonexistent-column SQL occurs.

**Fresh exercise:** Sort 23 pages with 4 frames, materialising every pass. Find the run counts, pass count and I/O. Then omit only the final write by streaming to a consumer.

**Reasoning:** Initial runs are `ceil(23/4)=6`; fan-in is 3, so runs go `6→2→1`. Three passes read/write 23 pages each: `2×23×3=138`. Omitting final write saves 23, leaving 115 I/Os for this operator. **Verdict: yes.** The core transfer requires no memorised logarithm. It does not independently teach a complete recursive hash-spill implementation; that is named and bounded rather than fully traced.

### Lecture 12 — Joins

- **Motivation:** The same input pages and buffers make algorithm comparisons fair.
- **Prerequisites and definitions:** Outer/inner, block/page/tuple iteration, M/N/m/B, lookup cost, build/probe and Grace partitions are introduced. Define “equijoin” explicitly as equality on join keys when first contrasting hash with general inequalities.
- **Intuition and steps:** **l12-s1** computes blocks before its formula and calculates both orientations. **l12-s2** separates tuple probes from outer page reads. **l12-s3** enumerates every duplicate pair before discussing skew.
- **Transition and chunking:** l12-s3 combines merge, hash, collision, duplicate spilling, recursion and output bandwidth. Split its main algorithm explanations from exceptional-memory extensions. Move the final-pass fusion example in **l12-s4** before the final self-check and include fusion in that check.
- **Repetition/caveats:** Duplicate-memory/output qualifications are technically meaningful but recur across two adjacent passages. Keep one central duplicate-group example and state which cost model it qualifies. The hypothetical 2,500 probes at fixed 2 outer pages is labelled a controlled model, but a fresh learner may mistake it for a physical row-capacity claim; a simple 25-versus-50 comparison or a short stated projection/tuple-size model is less distracting.
- **SQL/schema audit:** No executable SQL. R/S are generic join inputs, not undeclared columns used by code. The hash formula is correctly restricted to equality matching in the final exercise, but that restriction belongs in its introduction too.

**Fresh exercise:** R has 11 pages, S 12, B=7. Compare both BNLJ orientations with a valid two-phase Grace hash join, excluding output writes. Then suppose both inputs are sorted and duplicate groups need no rereads. Finally test whether final-sort-pass fusion fits if these inputs start unsorted.

**Reasoning:** B−2=5. R outer costs `11+ceil(11/5)×12=47`; S outer costs `12+ceil(12/5)×11=45`. Grace costs `3×23=69`, so BNLJ wins this input-I/O comparison. Already sorted merge needs 23 reads. For unsorted inputs, pass zero makes 2 R-runs and 2 S-runs; `2+2≤B−1=6`, so fusion fits under the duplicate assumptions. Its cost is pass-zero read/write 46 plus final read 23, totaling 69; fully materialised sorts plus join read cost `4×23+23=115`. **Verdict: yes after reading the whole section, including the post-answer appendix.** This fresh example also shows why “choose the smaller outer” is insufficient and why fusion teaching should precede its assessment.

## Representative before/after edits

These are suggested teaching edits, not changes to the canonical files.

### l2-3/l2-4: preserve one runnable schema

**Before:** “...where the first field is member_id... Join on Member.member_id = Borrow.member_id.”

**After:** “Keep the same schema: `Member(mid,name)` and `Borrow(mid,book)`. Add Borrow `(4,D)` without enforcing a foreign key. Join on `M.mid = B.mid`. Three pairs match, Member 3 is unmatched, and Borrow 4 is unmatched.” Follow with the LEFT/RIGHT/FULL counts and a full negative query:

```sql
SELECT M.name
FROM Member AS M
WHERE NOT EXISTS (
  SELECT 1 FROM Borrow AS B WHERE B.mid = M.mid
)
ORDER BY M.mid;
```

This query uses only the shown schema and is runnable in SQLite/PostgreSQL. The added orphan does not make a Member 4 exist.

### l2-4: teach NULL before quantified exceptions

**Before:** A supplementary-reading disclaimer followed by dense NOT IN/ANY/ALL rules.

**After:** “NULL marks a missing or unknown value. `2 = NULL` is UNKNOWN. WHERE keeps only TRUE. For `2 NOT IN (1,NULL)`, `2 <> 1` is TRUE but `2 <> NULL` is UNKNOWN; together they cannot establish that 2 differs from every list value. A correlated NOT EXISTS instead asks whether a matching row exists.” Give one check before optional PostgreSQL ANY/ALL and empty-set rules. Clearly label those forms as unavailable in the SQLite lab.

### l6-4: make growth a complete metadata operation

**Before:** “Propose compacting the page and updating the slot offset.”

**After:** “The name grows to 20 bytes, so the record grows from 13 to 29 bytes. Compact if enough total usable space exists. Store the 20 new name bytes; set name length to 20; keep name offset 9 and NULL bit 0. If the record moves, update the slot's page-relative offset; set its length to 29. Keep the page/slot RID unchanged.” A two-row before/after table would expose the two offset origins clearly.

### l3-4: define the division schema and remove contradictory scope text

**Before:** “EXCEPT ALL ... multiplicity ... is not developed here.” Later: formula and `π_person(Skill)` without declared field names.

**After:** “For bag difference, subtract matching multiplicities and stop at zero.” Then give the 3-minus-1 example once. Start division with `Skill(person,skill)` and `Required(skill)`; list each person's observed skills against Required before writing the division symbol or empty-required-set rule.

### l9-3/l10-s3: draw state before generalising

**Before:** Internal redistribution moves an unnamed rightmost child; extendible splitting leaves unaffected directory aliases implicit.

**After:** Label each child with its key interval. Show the parent separator, the moved child, and the resulting intervals in one three-state tree diagram. For hashing, list directory suffix → bucket before and after; annotate g once at the directory and d once per bucket. A learner can then verify routing instead of treating key movement as a memorised string manipulation.

### l12-s4: teach, transfer, then reveal

**Before:** The final exercise and answer precede “Fuse the last sort pass only when its buffers fit.”

**After:** Put the run-count/buffer-budget example first, then ask for BNLJ orientation, Grace validity, sorted merge, and fusion feasibility on one fresh small dataset. Keep the worked answer last. This aligns the assessment with the stated fusion outcome.

## Consolidated SQL and notation audit

- **Runnable full SQL:** All four full statements in Lecture 2 use the declared Sale or Member/Borrow schema. No schema error appears in their existing code blocks. The GROUP BY/HAVING, aliases, EXISTS, ORDER BY alias, and LIMIT examples are consistent with SQLite/PostgreSQL for the shown non-NULL fixtures.
- **Broken schema-dependent instruction:** `member_id` in l2-3/l2-4 is absent from the declared Member/Borrow schema. This would make a literal learner-written query fail and needs correction even though the surrounding row counts are mathematically correct.
- **Dialect-specific semantics:** The Lecture 2 ANY/ALL discussion is labelled PostgreSQL, unavailable in SQLite. Lecture 3 EXCEPT ALL is explicitly unavailable in the SQLite lab; its multiplicity example is semantic reasoning, not runnable SQLite SQL.
- **Fragments/notation:** `SELECT category`/`SELECT DISTINCT category` in l3-2, `DISTINCT customer_id ...` in l11-s4, RA symbols, pin/unpin calls, hash functions, and page-cost formulas are explanatory notation or query requirements. Format/label them accordingly; do not imply they can all be pasted into the SQL lab.
- **No additional executable SQL:** Lectures 1 and 4–10/12 contain schemas, fixtures, generic operators or mathematical models, but no complete SQL statements with undeclared columns.

## Remaining work

This completes the initial immutable-baseline review. A later independent cross-review must inspect the revised rendered output, check that edits repair the identified teaching gaps without removing necessary model assumptions, and work new transfer inputs rather than replaying only the original examples. No actual learner-participant evidence or revised-output approval is claimed here.
