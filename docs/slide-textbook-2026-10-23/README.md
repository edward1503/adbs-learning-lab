# Slide-based textbook revision — 23 October 2026

Version 3.4.0 replaces the narrative teaching sequence of the 27 core lectures with direct English and Vietnamese notes in the source topic order. The reference for presentation is [Agentic Software Engineering](https://book.agentic-swe.dev/); the content source remains the [Edinburgh ADBS schedule and its PDFs](https://opencourse.inf.ed.ac.uk/adbs/schedule).

## Content

- All 27 public lecture PDFs were downloaded afresh and their text inspected. The [mapping](mapping.json) records their URLs, SHA256 digests, page counts and the physical-page interval associated with each of the 117 bilingual sections.
- Definitions precede mechanisms and formulas. The original library, warehouse, Orders/Customers and four-page Students stories have been removed from the core notes. Source examples include Reserves/Sailors, the Age/Salary composite index and Flight/Airport.
- Each section links to its current PDF interval. Repeated slide animation states, title pages and administrative material are grouped. These are explanatory notes, not a verbatim transcript or a reproduction of every figure. The contiguous intervals are navigation metadata, not a claim that every slide line has been reproduced.
- Physical PDF pages are distinguished from printed slide numbers, particularly the four-up Lecture 14 PDF. Selected visual checks covered B+ tree copy-up/push-up, Lecture 14's four-up layout and the Boolean Yannakakis result.
- Technical qualifications remain: bag versus set semantics, NULL/UNKNOWN, clustered versus unclustered data-page costs, hash-table overhead, prepared 2PC participants, CAP definitions and Boolean versus full-output CQ evaluation.

## Reader

The reader uses a white background, restrained typography, a left contents list and a section contents list on wide screens. It removes the motivational card, reading-time estimates and objective/source banners before the lesson. Sources, labs and questions are separate expandable sections. Existing quiz and lab deep links open their enclosing section before scrolling.

Resource and section IDs, original subsection anchors, progress namespaces, all quiz IDs/options/answer keys, SQL grading, lab algorithms and hosting configuration remain intact. Ten supplemental resources retain their original content and are labelled as supplements.

## Local acceptance

- Production build and all 126 automated checks passed on Windows. Historical tests that required narrative examples or exact takeaway boxes were updated to test the requested direct notes and current source mapping instead. Compatibility checks for protected metadata, quiz answers, SQL and algorithms remain active.
- Chromium rendered all 37 resources in EN and VI at widths 320, 390, 768 and 1440: 296 resource/locale/viewport combinations. No horizontal overflow or application script errors were observed.
- Browser checks exercised direct quiz URLs and reload, same-lesson lab links, quiz-answer persistence, completion persistence, mobile drawer/Escape, search and an actual SQLite worker query.
- Sampled text/link contrast on Lecture 15 met WCAG AA thresholds; the minimum sampled ratio was 4.61:1. This is a scoped check, not a full accessibility certification.
- Screenshots: [desktop](desktop-vi.png), [mobile](mobile-vi.png), [contents](overview-vi.png).

PDFs and extracted text remain ignored local inspection files and are not included in the static site. Build/CI/deployment states must be verified separately for the final source commit.
