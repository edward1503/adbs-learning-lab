# Independent review of lectures 1–6

Reviewer: transactions-group author, independent of the L1–6 rewrite. Status: full EN/VI reading and independent transfer checks complete; accepted for integration. Minor schema clarification fixed and verified. Root's integrated browser QA remains separate.

Read main teaching prose for all 24 EN/VI section pairs with details/answers removed, then read only question summaries. The following predictions were written before opening the answers:

| Section / changed input | Independent prediction |
| --- | --- |
| l1-1, add B19 | Instance changes; model and schema stay. |
| l1-2, simultaneous lending | Protect one-open-loan-per-physical-copy invariant with coordinated checks/updates; individually complete writes are insufficient. |
| l1-3, add email / hide / move bytes | Logical schema / view / physical layout respectively. |
| l1-4, Loan empty | B17 and B18 both available in stated model. |
| l2-1, Hue and amount≥30 | IDs 3,4. |
| l2-2, WHERE amount>50 | Hanoi contributes 70, Hue 90; HAVING total>100 removes both. Hue is not 120. |
| l2-3, An borrows E | LEFT JOIN grows from four to five rows; An has three rows. EXISTS still emits An,Binh once each. |
| l2-4, remove NULL loan | NOT IN returns Member3 (Chi), same as NOT EXISTS on this non-NULL fixture. |
| l3-1, project pid | All three distinct IDs survive; not two. |
| l3-2, add S(12,25) | Join gains (12,tea,12,25), three equal-ID pairs total before filtering. |
| l3-3, project R to category before pid join | Invalid as written: pid was removed. |
| l3-4, add Binh/RA then require Python | First An and Binh pass; after new requirement neither passes. |
| l4-1, two records on page7 | One read suffices if initially absent and retained between accesses. |
| l4-2, ten pages | Random: 10×7.1=71ms; uninterrupted run: 7+10×0.1=8ms. |
| l4-3, page12 | 12×4096=49152 without header; +512=49664 with header. |
| l4-4, fewer page reads yet longer | Possible because page counts alone omit latency, placement, cache state, CPU and concurrency. |
| l5-1, all frames pinned | No eligible victim; LRU cannot violate pin safety. |
| l5-2, C pins resident P | Hit; pin becomes1; dirty remains true. |
| l5-3, repeated ABCD with four frames | First four requests miss, later requests hit while all remain resident. |
| l5-4, C pinned at D request | C cannot be victim; choose the most recent eligible unpinned page (B if A/B remain eligible with the stated order), or wait if none. |
| l6-1, two45-byte gaps | No contiguous60-byte placement before compaction; total free bytes alone insufficient. |
| l6-2,60-byte records plus4-byte slots | floor(1000/64)=15 records; 1000−15×64=40 bytes left. |
| l6-3, index stores790 | Compaction moves payload to850; raw790 becomes stale. RID(page9,slot2) still resolves via updated slot. |
| l6-4, empty string | Present: length0 and NULL bit0, distinct from NULL bit1 and deleted slot. |

Additional unseen-input predictions (also before answers): change the SQL threshold to amount≥40: qualifying IDs1,2,4; totals Hanoi110, Hue90; HAVING>100 leaves Hanoi110. With two LRU frames and immediate unpin on 1,2,1,3,1,2, predict four misses, two hits, and one write if page2 is dirty when evicted. With page2048/header32/record64/slot4, capacity floor(2016/68)=29, remainder44. These will be executed/checked separately rather than inferred from the teaching answers.

Comparison after opening worked-answer bodies: all 24 author exercises agree with the predictions above. These rows are an independent answer check of the author's exercises; the three extra inputs below provide separate transfer evidence beyond those questions.

Executed the fresh SQL≥40 variant through the repository's actual vendored SQLite WASM engine: result `[["Hanoi",110]]`, matching the prediction. Executed the fresh two-frame sequence through the lab's `bufferTrace`: four misses, two hits, victims2 then3. Adding explicit dirty-page bookkeeping for page2 gives one write, separate from misses. The core lab itself intentionally models clean pages; this extension was not represented as a built-in dirty simulation. Computed the fresh2048-byte slotted budget independently: 29 records,44 bytes left, matching the pre-answer prediction.

Quality findings: L2 now starts with SELECT/WHERE, then uses surviving rows to motivate groups, joins, existence and NULL behavior. L5 gives an eight-row trace in VI as well as EN and specifies oldest→newest order, immediate unpin and lab scope. L6 distinguishes page-directory, slot-directory and record-relative offsets with visible states. The six lessons expose enough assumptions to transfer these three problems to new inputs. No mathematical or semantic release blocker found in this content review. This is not a claim of browser accessibility, full-source slide re-audit, or final integrated release acceptance.

Minor clarity issue sent to the foundations author and fixed: l1-3 originally said the librarian view included “due date,” while the initial Loan schema contains only book_id/member_id. Re-read the current EN/VI source and verified that the view now says only borrower / người mượn. The unshown field is gone without changing the availability calculation. No remaining content blocker from this review.
