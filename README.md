<p align="center">
  <img src="docs/assets/banner.svg" alt="ADBS Learning Lab — explore, practice, understand" width="100%">
</p>

<p align="center">
  <a href="https://adbs-learning-lab.bot-keep.xyz/"><strong>Open the live learning lab ↗</strong></a>
  &nbsp; · &nbsp; English v3.0.0
  &nbsp; · &nbsp; Advanced Database Systems
</p>

ADBS Learning Lab brings Advanced Database Systems study material into an English browser application, combining lessons, topic exploration, practice questions, and concise key takeaways.

| Lessons | Topics | Practice questions | Key takeaways |
| :---: | :---: | :---: | :---: |
| **27** | **217** | **1,100** | **56** |

These figures describe the existing English v3 application supplied for this project.

## Repository status

The live application is available at **[adbs-learning-lab.bot-keep.xyz](https://adbs-learning-lab.bot-keep.xyz/)**. This new repository currently contains project documentation. Import of the existing application source is pending; build instructions and GitHub Actions will be enabled after the source is checked locally. No application source or active CI workflow has been published yet.

## Learn with the lab

- **Explore lessons and topics** to work through the database curriculum.
- **Practice with questions** to check understanding.
- **Review key takeaways** to revisit the main ideas.
- **Use the English interface** throughout the existing v3 application.

## Architecture and data

The supplied application is static HTML and JavaScript with a vendored SQLite worker and WebAssembly runtime. It can be served by a static web host; there is no application server to deploy.

Browser-local study state uses `localStorage`. It belongs to a browser profile and origin, does not automatically sync between devices, and may be lost when site data is cleared. Private browsing and storage restrictions can also affect persistence. Treat browser-local progress as convenience data, rather than a durable backup.

## Build and deployment plan

The intended checks are `npm ci`, `npm run build`, and `npm test`. They have not yet been run in this repository because the source import is pending.

The production host remains **Botkeep** at the live URL above. Once verified, pull requests and `main` will run read-only build/test CI and retain the `dist` output as an artifact. A separate job on successful `main` builds will publish only those output files to a `deploy` branch, placing `index.html` at the branch root. Botkeep repository linking and automatic update behavior still require separate verification.

## Attribution and license boundaries

This is a personal study application for Advanced Database Systems. It is not presented as an official university product. Course material and referenced teaching resources retain their original authors' rights; original course PDFs are excluded from this repository.

No project-wide open-source license has been assigned. Public availability is not a blanket permission to reuse the application or course content. Third-party dependencies retain their own licenses; their notices will be preserved when the source is imported. Any later project license must explicitly distinguish application code, course content, and third-party components.
