# Third-party components

The licenses below apply to their respective bundled components. They do not assign a license to the application or its learning content.

| Component | Bundled files | License and notice |
| --- | --- | --- |
| [sql.js 1.13.0](https://github.com/sql-js/sql.js) | `vendor/sql-wasm.js`, `vendor/sql-wasm.wasm` | [Upstream license and additional notices](vendor/sql-js-LICENSE.txt), retained from the official package |
| [Noto Serif](https://github.com/google/fonts/tree/main/ofl/notoserif) | `vendor/noto-serif-vietnamese.ttf` | [SIL Open Font License 1.1](vendor/noto-serif-LICENSE.txt); copyright 2022 The Noto Project Authors |

Both notice files are also copied into `dist/vendor/` for static hosting. The SQL engine and font are self-hosted; application asset loading does not depend on a third-party CDN.

The application currently has no npm runtime dependencies. GitHub Actions used for CI retain their upstream licenses; their workflow references are pinned to verified official release commits.

University teaching materials are referenced through official links, not redistributed as PDFs or slide images. See [SOURCES.md](SOURCES.md) for the teaching sources and page-reference convention.
