# Integration decisions and evidence

## Real starting state

Public release metadata read from the running site via Chromium on 21 October 2026:

```json
{"appVersion":"3.2.0","sourceCommit":"751115b15eede16c8f7408a1d9bdb96ae31cc681","workflowRun":"https://github.com/edward1503/adbs-learning-lab/actions/runs/38580473606","assets":24,"resources":37}
```

Source main matched that commit at the start. Baseline preview screenshot is `output/playwright/before-lecture16-en-1440.png` (local, excluded from Git); public favicon.ico returned 404, an existing cosmetic issue. Baseline build and all 121 existing checks passed with localhost/network execution access. Restricted execution alone caused the server test to fail with EACCES; no source fix was needed.

## Preserve meaning while changing teaching

The 14 October preservation test froze quiz prompts and explanations together with technical identities. The 21 October request explicitly authorizes rewriting teaching and affected quiz/hint explanations. The historical fixtures remain unchanged. `tests/rewrite-2026-10-21-baseline.json` is independently extracted from deployed commit `751115b` by `scripts/rewrite-contract.mjs`, protecting every inline and bank answer index and option text, plus all noneditorial lesson metadata. Source URLs, section anchors and ordered Key takeaway asides remain protected by the original preservation fixture. This allows explanations to improve without silently changing the meaning of saved answers.

Technical tests do not establish readability or learner understanding. Authored group reports and independent changed-input reviews record that separate assessment. Source access limitations are reported per group rather than relabeled as verified checks.
