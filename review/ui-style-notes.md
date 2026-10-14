# Textbook overlay — author notes

Created `textbook.css` only as a presentation overlay; root owns linking it after existing styles and copying it into the build. No runtime, content, metrics, diagrams, fonts or assets changed. These notes are the only other written file in this batch.

## Design intent

- Warm paper and dark ink with deep teal for reading/navigation and limited ochre for labels, focus and explanatory callouts.
- Existing self-hosted ADBS Noto Serif is used for headings. Body text retains the system font with generous Vietnamese line height; there is no external font or asset request.
- Readable lesson lines, separated paragraphs and headings, restrained source/objective panels and clear worked-answer disclosures establish a textbook rhythm.
- A quiet sidebar keeps its existing progress and active-item semantics. Catalog cards, truthful course statistics and root-provided module map cards provide orientation without inventing milestones or data.
- Quiz, lab and SQL surfaces share the palette; correct/wrong states stay visibly distinct. Existing diagram geometry is untouched; only existing semantic surface colors are refined.

## Baseline inspected

Read `styles.css`, `editorial.css`, `language.css`, plus existing app markup/state hooks. Viewed `output/playwright/v31-vi-main-mobile.png` and `v31-vi-main-desktop.png`. They show the pre-overlay Vietnamese relational-algebra reading view, not an after screenshot.

## Preservation and checks

- Existing 760px drawer breakpoint, `drawer-open`, `sidebar-collapsed`, `.open`, overlay hidden state and all runtime hooks retained. This CSS never makes an inert region interactive or overrides drawer display state. A hidden attribute remains hidden.
- Layout rules target desktop, 1250px, 1000px, 760px and 360px. At narrow widths, catalog/maps/labs use single-column or fitting grids; main and grid tracks use nonoverflowing dimensions. These are authored rules, not a claim of measured 320–1440px QA.
- Code and data tables keep horizontal scrolling; preformatted SQL retains line breaks. Tables are restored to printable table layout for paper output.
- Clear keyboard focus, retained disabled quiz semantics, reduced-motion rules and print treatment included.
- Root's `.course-map`, `.course-map-link`, `.map-number`, `.map-title`, `.map-meta` and `.is-complete` are styled without generating labels or completion claims through CSS.

## Remaining verification

Root must integrate the stylesheet, rebuild, and capture before/after overview, reading, quiz, SQL and open/closed drawer views. Verify EN/VI text wrapping and Vietnamese diacritics at 320, 360, 390, 760, 1024 and 1440px; tables/editor overflow; tab focus; hidden/inert behavior; state color contrast; reduced motion and print. No after-overlay browser, measured contrast or visual acceptance claim is made by this author batch.
