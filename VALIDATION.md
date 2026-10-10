# Validation scope — English v3.0.0

The publication copy was imported from the supplied local English application without changing lesson/quiz content, runtime behavior, styles, or vendored engine/font bytes. Original course PDFs and private deployment notes are excluded.

## Verified content

The source contains 27 English lessons, 27 quiz banks, 217 topic groups, 1,100 questions, 56 accessible Key takeaway callouts, 10 interactive labs, and 15 graded SQL exercises. Tests check generated bundles against all 54 lecture/quiz JSON source files, preserved route IDs, question/answer positions, source URLs, and page mappings.

The supplied coverage maps and source-review records are retained. This publication task did not repeat a fresh page-by-page audit of every official PDF or independently re-review every explanation for academic correctness.

## Automated checks

On Windows with Node.js 24, `npm ci` and `npm run build` passed. The existing 48-test suite passed with no failures or skips when local HTTP connections were allowed. The initial sandbox run blocked the HTTP test's loopback connection; that was an executor restriction rather than a server failure.

The test suite exercises content, English prose and markup contracts, stable routes, quizzes/retries/resets, browser-local progress handling, rendering hooks, algorithms, real SQLite grading, worker lifecycle, and HTTP asset serving. A portable test runner expands filenames without relying on shell globbing. Git attributes keep text files at LF and mark font/WASM assets binary so baseline hashes remain consistent across platforms.

GitHub Actions independently verifies dependency installation, build, and tests on Linux and Windows for each PR and `main` push. Consult the [current workflow runs](https://github.com/edward1503/adbs-learning-lab/actions/workflows/ci.yml) for the exact commit and outcome. Only a successful `main` run publishes the checked artifact to `deploy`.

## Browser and hosting limits

The publication checks above do not establish desktop/mobile visual correctness or a new hosted deployment. The optional Playwright browser suites require separately installed browser tooling and are outside `npm test`.

The live English application predates this repository import. Botkeep repository linking and push-trigger behavior are configured and verified separately. Confirm the intended source commit through hosted release metadata and perform live navigation, quiz, storage, and SQL/WASM checks after a hosting update.
