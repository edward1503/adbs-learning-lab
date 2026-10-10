# Static deployment

The source branch is `main`. The production build directory is `dist/`. The public demo remains https://adbs-learning-lab.bot-keep.xyz/.

## Branch layout

CI builds and tests the application on Linux and Windows. After both checks pass for a push to `main`, the publication job takes the checked Linux artifact and appends a commit to `deploy`.

`deploy` contains static output only: `index.html` at its root, runtime scripts/styles, `labs/`, `vendor/`, and `release.json`. It does not contain the course editing sources, npm manifests, tests, original PDFs, or source-branch documentation. The first publication creates the branch with independent history; later publications use normal fast-forward pushes. `main` history is preserved.

Publication is serialized. A job checks the current `main` commit before preparing and before pushing output, so an older build can be skipped when superseded. PR checks have read-only repository permissions and cannot run the publication job.

## Botkeep configuration

Use the public repository's `deploy` branch for the existing managed static site. Its static root must resolve `/index.html` from the branch root. Keep the existing domain and HTTPS configuration. The source `main` branch requires a build and should not be connected directly to this static-root profile.

Repository linking, branch import, restart behavior, and automatic push-trigger behavior belong to the hosting configuration. They are not provisioned by this workflow. No hosting credential, PAT, or persistent API key is stored in this repository.

## Serve every output asset

Preserve the `labs/` and `vendor/` paths, including the worker, WASM engine, and font. Serve `.wasm` as `application/wasm`. Lesson routes use hash fragments and need no server rewrite.

If the host adds a Content Security Policy, the SQL runtime needs `script-src 'self' 'wasm-unsafe-eval'`, `worker-src 'self'`, and `connect-src 'self'`. The included Node server supplies these directives. Relative asset paths also support subdirectory hosting.

## Verify a hosting update

After importing or updating the deployment branch, compare the hosted `/release.json` `sourceCommit` with the intended `main` commit. The same file gives the associated workflow URL and artifact file hashes. Then check lesson navigation, quiz feedback, browser-local progress, and SQL worker/WASM loading on the live site.

A successful GitHub Actions run confirms the checks, artifact, and branch publication. End-to-end deployment is established only after the hosting update and live verification succeed. The metadata file is served by the static host; the included Node development server deliberately limits root asset routes and does not expose it.

## Rollback

Preserve the currently hosted assets or deployment revision before importing a new branch snapshot. Use the hosting platform's revision/restore mechanism to roll back when available. The `deploy` history and retained CI artifacts identify prior output and source commits. Changing the source branch to an earlier release should be reviewed as a new source change and built/tested again.
