# Syllabus and content audit — English v3.1.0

The integrated companion contains **13 modules, 15 weeks and 30 timetabled syllabus sessions**. Its **37 learning resources** comprise 27 slide-based resources and ten original supplements; they do not create additional scheduled sessions. The release has 227 quiz topics, 1,167 bank questions, 76 Key takeaways, ten interactive labs and 15 SQL exercises.

The independent baseline found the original 1,100 bank answers and 27 embedded answer keys correct. All their option strings, canonical answer indexes and explanations are preserved. Two L16 question prompts now state their I/O assumptions explicitly without changing the question meaning. The release adds 17 core questions and 50 supplemental questions, plus 60 reviewed additions to core explanations. It fixes two actual L2 physical-page errors and refines 118 other question citations. Citation precision changes are not 120 incorrect answers.

## Read the evidence

| Evidence | Purpose |
| --- | --- |
| [Syllabus target](syllabus-target.json) | The supplied module/week/session contract, textbook identities and distinct resource classification |
| [Coverage matrix](coverage-matrix.json) | All 40 supplied syllabus topic rows, preserved baseline dispositions, stable lesson/section targets, source evidence and 60 final finding dispositions |
| [Foundation baseline](foundation-baseline.md), [advanced baseline](advanced-baseline.md) | Public condensation of the independent pre-change audits; unavailable per-item details remain explicit |
| [L1–6 resolutions](foundation12-resolutions.json), [L7–12 resolutions](foundation34-resolutions.json) | F01–F20: foundations, storage, indexing, sorting and joins |
| [L13–22 resolutions](execution-transactions-resolutions.json) | Ten execution and 14 transaction/recovery/distributed findings, arithmetic checks and source errata |
| [L23–27 resolutions](cq-nosql-resolutions.json) | Sixteen findings on conjunctive queries, parallelism and NoSQL/CAP |
| [Foundation review](foundation-integrated-review.md), [execution/transaction review](execution-transactions-integrated-review.md), [CQ/NoSQL review](cq-nosql-integrated-review.md) | Independent reviews of the actual integrated prose and answers; all accepted |
| [Supplemental evidence](supplemental-evidence.md), [supplemental review](supplemental-independent-review.md) | Primary-paper bibliography/status and independent review of all 50 supplemental answers |
| [Technical review](technical-integrated-review.md) | Independent compiler/runtime, saved-answer compatibility, complete-packet, source-mapping and public-file acceptance |
| [Validation](../../VALIDATION.md) | Automated contracts, browser acceptance checks and deployment verification scope |

The 60 teaching findings are F01–F20, ten EX findings, P19-A through P22-E (14 total), and G23-1 through G27-7 (16 total). Some findings span multiple stable sections. Resolution records separately retain auxiliary citation and source-erratum work, so a record count is not a finding count. Original canonical quiz identities remain in `course/quiz*.json`; [the compatibility fixture](../../tests/audit-question-compatibility.json) records the exact approved differences instead of replacing historical golden baselines.

## Scope and boundaries

Core additions use source-audit evidence supplied by independent coordinators. Integrated reviewers checked explanations, arithmetic, finite relational examples, answer semantics and page bounds. Only L2/L5 raw PDFs were fetched and hashed on this executor for scoped physical-page visual checks; other raw hashes remain absent. This is not a fresh exhaustive reread of all official PDFs or an audit of textbook chapters. Physical PDF pages are distinct from printed slide numbers.

Modules 11–13 contain the full independently authored supplemental packets: explanations, worked examples, exercises, answers and research references. Their `kind` is `supplemental`, `lecture` is null, and official-course verification remains false. References to assigned Canvas papers, consultation arrangements, talk duration, grading rules and deadlines remain unverified. RG is Ramakrishnan and Gehrke, *Database Management Systems*, third edition (2003). DBT identifies *Database Theory* by Arenas, Barceló, Libkin, Martens and Pieris; edition/year and exact chapter coverage were not verified here.

The sorted canonical supplemental records have SHA256 `722f98721436e1d00486056b4374b886248a8d37bd16da009d7e1d350fb63163`. Public evidence excludes raw course PDFs, private worksheets, source-workspace notes, credentials and deployment secrets. Source authors and third-party dependencies retain their existing rights; no project-wide open-source license is assigned.
