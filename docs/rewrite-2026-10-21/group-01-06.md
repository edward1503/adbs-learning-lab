# Foundations 01–06: completed author pass

All 24 explanatory sections were rewritten in English and Vietnamese. Section IDs, routes, goal counts, source metadata, original Key takeaways and existing anchored checks remain. Ten quiz explanations were rewritten in both languages; no question ID, option order or keyed answer moved. No shared runtime or lab engine was edited by this group.

| Lesson | New learning progression | Source check | Review state |
| --- | --- | --- | --- |
| 01 | Two books and one loan → database/software distinction → interrupted two-file update with before/intermediate/after table → abstraction → minimal request preview | Official intro PDF, 36 physical pages; focused recheck pp. 10–19 and historical administration context pp. 21–35. Intro has no printed slide numbers. | Author reviewed, EN/VI fixtures matched |
| 02 | Five Sale rows → SELECT/WHERE → duplicates → groups/totals → join pairs versus existence → ordering → NULL negative-query variant | Official SQL PDF, 29 physical pages. Physical pp. 6–8 = printed 7–9; p. 10 = printed 11; p. 18 = printed 19; pp. 20–28 = printed 21–29. Early printed numbering skips 3. | Author reviewed; examples executed |
| 03 | One product table → selection/projection → all nine ID pairs → join and rename → two plans with every intermediate result → set/bag/division | Official RA PDF, 20 physical pages; physical/printed numbers agree on numbered content pp. 2–20. Focused recheck pp. 2–19. | Author reviewed; fresh transfer tasks included |
| 04 | Uncached page request → storage hierarchy → positioning versus transfer table → file/page offset → locality and limits of page counts | Official hardware PDF, 29 physical pages. Physical p. 24 = printed 25; p. 26 = printed 27; p. 28 = printed 30. Focused pp. 2–9, 11–22, 24–28. | Author reviewed; arithmetic checked |
| 05 | Shared page → pin/dirty independent state table → full eight-request LRU table → CLOCK sweep → changed workload/MRU → practical policies | Official buffer PDF, 35 physical pages. Physical p. 13 = printed 14; p. 15 = printed 16; p. 22 = printed 26. Focused pp. 3–15, 22–34. | Author reviewed; trace independently computed |
| 06 | Find enough space → heap-directory tradeoff → derive byte capacity → slot-indirection compaction table → record field/NULL layout | Official files/pages/records PDF, 29 physical pages, numbered content agrees with printed pp. 2–29. Focused pp. 5–9, 12–22, 24–28. | Author reviewed; capacity and address checked |

Canonical source URLs remain in each lesson's `coverage.pdfUrl` and linked section source locations. Official PDF page counts and differing printed-slide numbering were checked against retrieved official PDF text on 2026-10-21. This is a focused current-source recheck of the edited concepts, not a claim to independently re-audit every sentence of all six PDFs or all historical sources. All new fixtures, numbers and scenarios are original teaching examples. NULL/quantifier details in Lecture 2 and the simplified write-amplification calculation in Lecture 4 are explicitly marked as supplemental explanations.

## Before/after evidence

- L1 previously began with several definitions and ended by listing most of the system architecture and workloads. It now first answers whether B17 and B18 are available, then uses a three-state failed rename table to show the relationship that breaks. The machinery is a short preview after the data question is understood.
- L2 previously introduced FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT before a first executable example. It now runs SELECT over five rows, tests each WHERE value, then introduces groups only when the question changes to totals. The complete clause order appears after the reader has computed a total.
- VI L5 previously compressed much of the LRU reasoning into prose. Both languages now contain the same eight request states, exact victims B,C,D, accumulated misses and oldest→newest recency. CLOCK and shared pin/dirty state also have explicit tables.

## Verification performed

- Python SQLite executed the Sale aggregation: Hue 120, Hanoi 110; changing WHERE to amount>50 gives no groups. It executed four initial LEFT JOIN rows, five FULL OUTER JOIN rows with the orphan, and the NULL variant where NOT EXISTS keeps Chi but NOT IN keeps nobody.
- Independently recomputed LRU A,B,C,A,D,B,A,C: 6 misses, 2 hits, victims B,C,D, final order B,A,C. Existing repository mathematical tests independently validate eight LRU versus five MRU misses for repeated A,B,C,D.
- Checked 18 records with 4-byte slots leaves 28 bytes; seventh 50-byte record begins at 324; page 12 with 512-byte header begins at 49664; random/continuous HDD examples are 1420/27 ms.
- All 24 EN/VI section IDs and literal `<pre>` displays match. The existing `foundation-audit` tests passed after these edits. A full-suite integration run belongs to the root agent; at this group's check, remaining bilingual failure was in L7, outside this ownership.

## Quizzes and labs

Reviewed topic-bank prompts/keys/explanations for consistency with changed teaching fixtures. Updated explanations for l01-flat-files-q4, l01-models-q5, l02-select-q1, l02-group-q4, l03-algebra-q1, l04-disk-manager-q4, l05-pin-unpin-q2, l05-lru-q3, l06-slotted-q2, l06-record-layout-q4. These now show the intermediate reasoning rather than only restating the chosen label. Other quiz fixtures are independent examples and retain their valid keyed outcomes.

Read the related SQL, relational, buffer and slotted-page lab copy. Their fixtures intentionally differ from the lessons and their scopes remain valid. The lesson explicitly maps letters to numeric page IDs for the buffer lab and explains why its access-time LRU agrees with the lecture's last-unpin convention under immediate unpin. The lab supports LRU/FIFO only, clean unpinned pages; the lesson does not imply CLOCK or pin/dirty simulation exists. The slotted-page lab uses ASCII and does not reuse deleted slots, consistent with the lesson's explicit model boundaries. SQL lab seeds students/courses/enrollments; the lesson's Sale/Member fixtures are labeled original examples, not promised preinstalled lab tables.

Remaining: independent cross-review, browser desktop/mobile inspection and release/deployment are integration tasks. This author pass does not claim live publication.
