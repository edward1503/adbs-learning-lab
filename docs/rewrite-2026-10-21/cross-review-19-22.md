# Independent cross-review: transactions, locking, recovery, distributed commit

**Result: accepted within the scope below; no content correctness blocker found.** Reviewed all 20 rewritten English sections and all 20 matching Vietnamese sections for L19–22. The reviewer authored L7–12, not these transaction lessons. No canonical transaction file was edited during this review.

The new material gives the reader observable states before abstractions: the 95-box read before serializability, permissions before the 2PL phase rule, durable pages versus durable log evidence before WAL, and identical local PREPARE evidence beside different remote outcomes before 2PC blocking. Both languages retain the same intermediate numbers, operations, distinctions and explained transfer exercises. In particular, Vietnamese has the actual state tables rather than compressing them into a general summary.

## Fresh problems solved independently

The following examples use different schedules or values from the teaching fixtures. They test whether the rules transfer beyond repeating a supplied answer. The graph and value calculations were independently recomputed in a short scratch Node script without calling the site's graph/recovery implementation.

| Topic | Fresh case | Independently checked conclusion |
| --- | --- | --- |
| Acyclic precedence | `R1(A), R2(B), W1(A), W3(B), W2(A), R3(A)` | Edges are T1→T2, T1→T3 and T2→T3. Serial order T1,T2,T3 satisfies all constraints; the R/R pair on A adds no edge. |
| Three-way conflict cycle | `R1(A), W2(A), R2(B), W3(B), R3(C), W1(C)` | T1→T2 on A, T2→T3 on B, T3→T1 on C. No conflict-equivalent serial order exists. These are precedence edges, not current lock waits. |
| View criterion | `W1(X), W2(X), W1(X), R3(X)` | Conflict edges include T1↔T2. Serial order T2,T1,T3 nevertheless preserves R3's source T1 and final writer T1. Thus a cycle alone does not reject view serializability. |
| Upgrade deadlock | T1 and T2 both hold S(A); each requests X(A). Timestamps T1=4,T2=9. | Both upgrades cannot be granted together. Under wait-die, older T1 waits and younger T2 aborts when it requests the older holder's lock. Under wound-wait, T1's request wounds T2; T2's request alone would wait. Requester and holder roles are distinct. |
| Phase legality | Acquire S(A), acquire S(B), release A, request X(B). | The upgrade follows the first release, so it is not basic 2PL even though B was already held. Compatibility with other transactions is a second independent question. |
| Crash recovery | Durable updates T1:P 20→26, T2:Q 9→3 and T1 COMMIT; disk P=20,Q=3. | History redo gives P=26,Q=3; undo ordinary unfinished T2 gives final P=26,Q=9. The old disk page is committed work; the new disk page is unfinished work. Disk freshness does not classify the transaction. |
| WAL boundaries | An update's recovery record is durable, but its COMMIT is not. | A page flush can be legal under STEAL; acknowledging commit is not. A durable COMMIT without the required preceding log prefix would also be insufficient. |
| Prepared uncertainty | E has only durable PREPARE. In one remote history W rejects; in another C has durably committed and W has completed. | E's identical local evidence permits neither an independent COMMIT guess nor an ABORT guess. A timeout changes neither argument. |
| Lost acknowledgement | C has durable COMMIT, no END; W committed but its ACK was lost. | C repeats the same decision; W acknowledges idempotently rather than applying the transfer again. Missing completion knowledge cannot reopen the decision. |

Scratch checks passed for all graph-edge sets, the blind-write view comparison, the two timestamp policies and the fresh recovery final state. These checks substantiate the reasoning; they are not a claim that a complete production lock manager or ARIES implementation was tested.

## Source and scope checks

- Freshly opened the official L19 PDF (48 physical pages), L21 PDF (27), and L22 PDF (57). Targeted source text confirms view-equivalence conditions at L19 physical p.43, ARIES history redo including eventual losers at L21 pp.25–26, and 2PC durable-message/restart/ordering cases at L22 pp.47,49–55. Printed numbers differ: L19 physical p.43 is printed slide 48; L21 physical p.25 is printed slide 26; L22 physical p.54 is printed slide 57. Lesson references correctly say physical PDF pages.
- The web reader could not open L20, so used the author's existing local official download `adbs-lecture20-locking.pdf`. Parsed and independently inspected its 28-page document. Read physical pp.7–8,12–14,23–27; rendered physical p.13 with PyMuPDF and visually confirmed “Release all locks at end of txn.” The lesson's explicit course convention retaining both S/X locks is therefore supported, rather than accidentally confusing conventional strict and rigorous terminology.
- Official L22 physical pp.49–54 support the protocol-specific presumed-abort cases. The text correctly distinguishes “no more commit-protocol work” from “no local redo/undo,” and excludes PREPARE-only participants from ordinary single-node loser reasoning.
- Optional checkpoint/pageLSN/CLR and decision-replication explanations remain labelled extensions. Their linked primary-source audit records were read, but this reviewer did not repeat an exhaustive fresh review of those complete primary papers. No unsupported claim of teaching complete ARIES, Paxos Commit or 3PC was found.
- No accidental scope loss found against the existing L19–22 coverage lists: transaction boundaries/ACID and control families; conflict/view/anomalies; compatibility/2PL/cascades/detection/prevention; buffer policies/failures/WAL/ARIES; distributed lock placement/deadlock/2PC/restart/blocking/integration all remain.

## Specific quality checks

The view example retains read sources and final writers rather than comparing only final numbers. The lost-update example shows both cycle directions. The locking text separately checks phase legality and lock compatibility; it does not claim strict retention prevents deadlock. The recovery text distinguishes a durable log update from an acknowledged durable commit, and history redo from final undo. The distributed text distinguishes participant readiness from decision-replica quorums, and 2PL from 2PC. These are the main places a shortened explanation could have become misleading; no such error was found in either language.

Ran `node --test tests/execution-transactions-audit.test.mjs tests/quiz-language.test.mjs`: **8 passed, 0 failed**. This includes translated question grading and canonical option identity. It does not replace rendered mobile/desktop review or the coordinator's whole-site build and CI.

**Remaining limits:** no live deployment verification or learner usability study was performed by this reviewer. Only the selected L20 source slide was visually rendered here; the other fresh source checks were extracted-text checks. Full site rendering, deployment and final integration remain coordinator-owned.
