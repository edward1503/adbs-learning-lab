# Readability candidate — review pending

This editorial pass starts from English v3.1.0, commit [`0a1fb0363d2c44a0ca8f508f4e964a01af128720`](https://github.com/edward1503/adbs-learning-lab/commit/0a1fb0363d2c44a0ca8f508f4e964a01af128720). It asks whether the companion teaches its stated goals in a usable order. The prior [syllabus/content audit](../audit/README.md) remains historical evidence for that release.

The candidate integrates extensions into worked examples, defines notation before using it, and supplies small starting tasks for research exercises. It preserves lesson, section, subsection and question identities; stored-progress keys; all quiz objects and answer meanings; the module/week/session contract; third-party attribution; and original source URLs. It does not redesign the application or change hosting.

## Evidence and review method

- [Independent parent baseline review](baseline-parent-review.md): eleven concrete fixes, positive patterns and the acceptance rubric, recorded before editing.
- Ordered baseline walkthroughs: [L1–12](baseline-foundations-review.md), [L13–27](baseline-systems-review.md), and [supplements 28–37](baseline-supplements-review.md), with fresh solved transfer tasks and explicit gaps.
- Three baseline readers read all 37 resources in numerical order from Chromium-rendered text, including expanded answers. Separate editors own L1–12, L13–27 and supplements 28–37.
- Candidate cross-review rotates the scopes: baseline foundation reader reviews candidate L13–27; baseline systems reader reviews candidate supplements; baseline supplement reader reviews candidate L1–12. Reviewers receive rendered candidate text and try fresh tasks before consulting author notes.
- Each primary goal is assessed for explanation, intermediate-state tracing, changed-input transfer and assumptions. Scores are 0 (missing reasoning), 1 (worked answer can be copied), or 2 (a nearby variant can be solved and explained). An editorial score is not a measured learner success rate.
- Automated preservation checks compare all 37 packets to the original commit while allowing only the named prose fields. The [fixture](../../tests/readability-preservation-baseline.json) records the original supplemental packet SHA256 rather than replacing that historical identity with a new hash.

## Completed candidate evidence

- [Whole-course checklist](whole-course-checklist.md): 37 resources, 181 sections and all 120 displayed goals, linked to concrete task records.
- Final independent rotated reviews: [L1–12](candidate-foundations-review.md), [L13–27](candidate-systems-review.md), [supplements 28–37](candidate-supplements-review.md). Readers found no remaining blocker for their documented nearby tasks; their judgments do not authorize a release or establish human learning.
- [Actual before/after excerpts](before-after.md): eleven targeted repairs and three independently discovered follow-ups.
- Editor decisions and preserved strengths: [foundations](editor-foundations.md), [systems](editor-systems.md), [supplements](editor-supplements.md), plus [follow-up closure](editor-followups.md).
- [Current teaching locations](current-locations.md): moved blocks mapped separately from the historical audit.
- [Technical/browser validation and genuine screenshots](validation.md), with [file hashes and structured results](validation.json).

The candidate is **undeployed and pending parent review**. Passing technical tests or an editorial walkthrough does not establish human comprehension. Reading-time labels are unchanged; real learner testing should record relevant prerequisites, unassisted explanations and solutions, and where help was needed.
