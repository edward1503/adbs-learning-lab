# Independent cross-review: lessons 07–12

Reviewed all 24 rewritten English sections and all 24 matching Vietnamese sections, including worked states, stated assumptions, exercises and solutions. Fresh changed-input computations below were made independently rather than counting words or accepting a green build as evidence of teaching quality.

Result: no mathematical or algorithmic blocker found. One minor schema-continuity correction was requested: L7-1 says a cashier changes an order's address although the declared schema is Orders(id,city,amount). Change that to its city in both languages, or add an explicit address field. This report records the request; the owning author/root confirms its resolution.

## Learner reasoning and coverage

| Lesson | What the rewrite makes visible | Review conclusion |
| --- | --- | --- |
| 07 | Aligned row/column positions before naming workload; physical bytes separate from speedup; reconstructable RLE/delta/dictionary encodings; min/max candidates distinct from proven matches | Same examples and depth in VI. Keeps PAX, Parquet hierarchy/footer, compression tradeoffs and format limitations. Minor address/city wording above. |
| 08 | Unique-key stopping versus all-match scan; costs derived from actual reads/writes; matching row count separate from matching page count; entry variants A/B/C followed through to RID fetch | Correct declared approximations and boundaries. The unusual primary/secondary/unique definitions are explicitly course conventions and match the official slide. |
| 09 | A root/leaf lookup before fanout; leaf copy-up separate from internal push-up; deletion checks routing as well as occupancy; pointers carried through internal repair | Sound example continuity and equal EN/VI depth. ISAM, byte occupancy and compression remain in scope rather than being dropped for the simple opening. |
| 10 | Home bucket versus equality check; overflow reads; explicit suffix bits/global-local depth; pointers rather than all data duplicated; merge/shrink conditions | Correct trace with duplicate/collision termination limitation. Nonunique lookup does not stop after one hit. |
| 11 | Merge-head states before I/O formula; 15→3→1 runs; output materialisation assumption; per-group (sum,count) states; overhead/skew rather than raw-input size alone | Formula boundary N>0,B≥3 stated; empty/small inputs handled; hashing not promised to order results. |
| 12 | Every duplicate matching pair; tuple→page→block repeated scan counts; index lookup includes all matches; final-sort fusion checks both run budgets together | Correct accounting under explicit exclusions and feasibility conditions. Inequality transfer task prevents applying equality hash cost blindly. |

## Fresh independently calculated tasks

- B+ tree, d=2: begin [2,6,8,12], insert 10 → leaves [2,6] and [8,10,12], root separator 8. Delete 2, borrow 8 → [6,8] and [10,12], separator 10. Delete 6, merge → root leaf [8,10,12]. Checked that every surviving key routes to the correct leaf after redistribution, not merely that leaf counts fit.
- Extendible hashing: original full suffix-01 bucket [1,5], insert 13. With g=3, suffix 001 holds [1] and 101 holds [5,13]. With g=4,d=2 there are four incoming pointers; after local split to d=3 each result has two, without global doubling. This differs from the lesson's inserted 9 and verifies the suffix rule transfers.
- External sorting, N=91: B=6 gives 16→4→1 runs and 546 I/Os; B=10 gives 10→2→1 and also 546; B=11 gives 9→1 and 364. Independently iterated ceilings rather than using the lesson's logarithm. The changed input reveals why crossing a whole-pass threshold matters.
- Join, M=121,N=41,B=12: R outer BNL costs 121+13×41=654; S outer costs 41+5×121=646. Two-phase Grace is 486 only if partition/build constraints fit. At B=16 the initial-run sum 8+3=11 fits the 15-frame fused-input budget; fused input processing is 486 versus 810 with materialised two-pass sorts and reread, excluding result writes.
- Duplicate join: two R occurrences and four S occurrences of the key produce eight distinct occurrence-pairs. Collapsing duplicate build tuples changes the answer.
- Delta roundtrip: [8,12,10,15] → deltas [4,−2,5], minimum −2, residuals [6,0,7], width 3 bits. Adding minimum then prefix summing reconstructs the exact input. This checks signed deltas and unsigned residuals beyond the positive-only worked example.

The computations were executed in a separate Python check; all assertions passed. Structural check also passed for all 24 EN/VI section IDs and exact literal `<pre>` blocks after the author's parity correction.

## Source spot-checks

Retrieved the current official PDFs through the course materials links. Counts verified: L7 28 physical pages, L8 34, L9 30, L10 26, L11 32, L12 43. Focused comparisons checked L8 physical p26/printed29 for index classification; L9 physical pp13–14 for order bounds and pp17–25 for split/deletion/repair; L10 suffix/local-global addressing and directory split; L11 two-way versus general B-frame sorting, hash state/overhead; L12 physical p32/printed34 for the final-merge combined-run condition (the neighbouring materialised-cost slide is physical p30/printed32). Linked physical pages must not be read as printed slide numbers: several decks skip printed numbers.

L9 direct opens initially failed; following the official Week 3 `1 per page` link succeeded and returned the same canonical URL. This was a retrieval issue, not evidence of a missing source. The cross-review is a focused conceptual and source check, not a claim to inspect every official slide image or every topic-bank question afresh.

Remaining integration checks: root's complete automated suite, browser desktop/mobile render and interaction QA, and deployment/live-version verification. This review does not claim any live publication.

Integration closure: the owning author changed address→city and địa chỉ→thành phố in L7-1. Root checked the final EN/VI canonical bodies and retained the same Orders(id,city,amount) schema. This minor review request is resolved; no content blocker remains.
