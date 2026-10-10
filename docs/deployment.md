# Static deployment

The source branch is `main`. The production build directory is `dist/`. The public demo remains https://adbs-learning-lab.bot-keep.xyz/.

## Branch layout

CI builds and tests the application on Linux and Windows. After both checks pass for a push to `main`, the publication job takes the checked Linux artifact and appends a commit to `deploy`.

`deploy` contains static output only: `index.html` at its root, runtime scripts/styles, `labs/`, `vendor/`, and `release.json`. It does not contain the course editing sources, npm manifests, tests, original PDFs, or source-branch documentation. The first publication creates the branch with independent history; later publications use normal fast-forward pushes. `main` history is preserved.

Publication is serialized. A job checks the current `main` commit before preparing and before pushing output, so an older build can be skipped when superseded. PR checks have read-only repository permissions and cannot run the publication job.

## Botkeep configuration

Use the public repository's `deploy` branch for the existing managed static site. Its static root must resolve `/index.html` from the branch root. Keep the existing domain and HTTPS configuration. The source `main` branch requires a build and should not be connected directly to this static-root profile.

The CI hosting job imports the checked branch into the existing workload. It does not create a workload, change the domain, migrate to GitHub Pages, or provision account access. The public repository is read without a PAT. A user-managed Botkeep key is stored only in the repository's `BOTKEEP_API_KEY` Actions Secret and passed only to the hosting step on `main` pushes.

The key needs authorized access to the existing ADBS workload and the documented `deploy:write`, `workloads:read`, and `settings:read` endpoints. Account policy can impose additional write restrictions; a 403 must be resolved through user-approved key configuration, never bypassed by another credential. Renew an expiring key through the same Actions Secret. No key creation, access grant, or automatic renewal is performed by CI.

The manual `Botkeep contract discovery` workflow remains available for sanitized response-shape diagnostics. It logs no keys, workload names, revision tokens, confirmations, raw response text, or authorization headers.

## Hosting deployment sequence

1. Check both current GitHub branch heads and the immutable `deploy` commit's `release.json`. Superseded source builds are skipped.
2. Fetch the previous live release and its 19 allowlisted public assets, verify every SHA-256, and upload a rollback artifact **before** any hosting sync.
3. Verify the fixed workload is static, source settings identify this public repository and branch, and no active operation or recovery exists. Obtain the revision from source settings and exact confirmation from the workload name in memory.
4. Preview `deploy` and require its commit to match the checked branch head. Recheck GitHub freshness before writing.
5. Submit one sync in **merge** mode, with restart enabled. Automatic pull-on-start is disabled because this workflow controls imports. Matching files are overwritten; unrelated server files remain. Botkeep stops/restarts the server and revokes active SFTP sessions during import.
6. Read the newly observed operation, require the verified `complete` / confirmed / queue `done` / runtime `running` state, then verify the exact live source commit and all asset hashes against the checked artifact.

The hosting job has read-only GitHub permissions. Its deployment target is fixed in code and jobs are serialized. API redirects are rejected, responses and polling are bounded, and transient read failures use limited backoff. Operation polling allows 15 minutes at 10-second intervals, including the confirmed import's `starting` state; the job allows 20 minutes overall. `BOTKEEP_OPERATION_TIMEOUT_SECONDS` accepts 120–900 seconds, with 900 as the default. The provider can take several minutes to dispatch and restart a static workload. Mutating requests are sent once with stable logical request identifiers; uncertain outcomes are not automatically resubmitted. A workflow retry verifies already-live output without another import. If a request remains uncertain, inspect Botkeep and its receipt/operation before retrying; do not create a new request merely to bypass uncertainty.

The request schema comes from [Botkeep's developer OpenAPI](https://api.botkeep.cloud/api/v1/developer/openapi.json). Revision and confirmation semantics were cross-checked against the [official GitHub tools client](https://botkeep.cloud/assets/BotToolsPages-BEMa_zC0.js) and successful developer source/operation reads. Unsupported or changed response states stop deployment instead of implying success.

## Serve every output asset

Preserve the `labs/` and `vendor/` paths, including the worker, WASM engine, and font. Serve `.wasm` as `application/wasm`. Lesson routes use hash fragments and need no server rewrite.

If the host adds a Content Security Policy, the SQL runtime needs `script-src 'self' 'wasm-unsafe-eval'`, `worker-src 'self'`, and `connect-src 'self'`. The included Node server supplies these directives. Relative asset paths also support subdirectory hosting.

## Verify a hosting update

After importing or updating the deployment branch, compare the hosted `/release.json` `sourceCommit` with the intended `main` commit. The same file gives the associated workflow URL and artifact file hashes. Then check lesson navigation, quiz feedback, browser-local progress, and SQL worker/WASM loading on the live site.

A green full CI run includes the hosting job's confirmed operation and exact live source/asset verification. Build and publication success alone do not establish hosting success. The metadata file is served by the static host; the included Node development server deliberately limits root asset routes and does not expose it.

## Rollback

Download `rollback-before-<source SHA>` from the failed or successful workflow run to recover the exact previous live files. Both rollback and checked build artifacts are retained for 14 days; `deploy` history also preserves prior output. Botkeep's temporary recovery copy may be removed after a successful import, so it is not the durable rollback record. The workflow does not automatically roll back after an uncertain outcome. Inspect hosting status before restoring the artifact through the hosting UI or API. Changing source to an earlier release should be reviewed as a new source change and built/tested again.
