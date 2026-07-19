# AI Process and Implementation Notes

## Purpose

This document records how AI tools were used during development, what was done manually, and the practical lessons learned about effective human+AI collaboration.

It is written as a practitioner-facing diary and a guide for reviewers who want to understand where automation helped and where human judgment was required.

## High-level workflow

1. Read and understand the requirements thoroughly.
2. Draft prioritized work into P0 / P1 / P2 phases (see below).
3. Use AI agents to propose architecture options, generate scaffolding, and accelerate boilerplate creation.
4. Manually validate, adjust, and own all final design and correctness decisions.
5. Iterate on UI, tests, and deployment with continuous manual review of AI-produced diffs.

## Prioritized plan (what I implemented)

### P0 — Core requirements (minimum pass)

1. Scaffold Vite + React + TypeScript + Tailwind + TanStack Query provider
2. `.env` / `.env.example` for API base URL and key
3. API client: `getAllLeagues()`, `getSeasonBadge(id)`, typed error handling
4. `useLeagues()` hook — fetch on load, render `strLeague`, `strSport`, `strLeagueAlternate`
5. Search bar — client-side filtering by league name
6. Sport-type control — options derived from fetched data
7. Click a league → call badge endpoint, display the image
8. Cache badge responses per league ID so repeat clicks don't refetch
9. Responsive layout (mobile-first, no horizontal scroll)
10. `README.md` + docs in `docs/` with setup and architecture

### P1 — Going beyond expectations

1. Extract filter/sort logic into pure functions (`filterLeagues`, `sortLeagues`) for unit testing
2. Debounced search (`useDebouncedValue`, ~250ms)
3. Sort control (name / sport / id, asc/desc)
4. Set `refetchOnWindowFocus: false` as a QueryClient default
5. Distinguish and handle three failure states: initial fetch error, per-badge error, per-badge empty-result
6. 429 rate-limit detection surfaced as a dedicated banner
7. Skeleton loading state for the grid
8. Explicit empty state message for no-match results
9. `ErrorBoundary` scoped around the grid
10. Optional: Flip-reveal UX with `prefers-reduced-motion`

### P2 — Polish

1. Match-highlighting in search results
2. Visual design pass and consistent button copy
3. Accessibility improvements (keyboard, aria-live, focus management)
4. Tests: unit tests for pure logic, hook tests with MSW, one integration test, one error-boundary test
5. Final trade-offs section in the docs

## How I used AI (tools & roles)

- Tools used: VS Code Copilot (Auto mode), ChatGPT, Claude, Gemini. I also used the agent interface inside VS Code for faster scaffolding.
- Roles assigned to AI:
  - Mechanical synthesis and scaffolding: wiring up Vite, basic directory structure, initial component and hook files
  - Test scaffolding suggestions: proposed test file layouts and typical assertions
  - Secondary review: found small, plausible mistakes (e.g., regex/typo issues, missing mock configuration)

## What I did manually (important decisions)

- Architecture selection and final folder layout
- UX decisions: when to lazy-load, when to cache, and how the reveal UX should work
- Security and input-sanitization choices (escape regex for highlight; don't build unsafe regexes from raw input)
- Correcting over-engineered or unsafe AI proposals
- Final test selection and verification of flaky tests or dependency mismatches

## Detailed narrative and lessons learned

The first thing I did was read the requirements carefully and translate them into a prioritized plan (P0/P1/P2 above). I then used AI to validate that plan, propose missing items, and suggest bonus polish tasks. The AI produced three different architecture strategies; I reviewed them, adopted the parts that matched my constraints, and rejected the rest.

Working on the P0 items went quickly (the scaffold and core features were straightforward). I chose to go beyond P0 and implemented several P1 and P2 items over a couple of days of intermittent work.

I used AI heavily for bootstrapping: Copilot generated initial files and test scaffolding which I then inspected and improved. However, I kept a strict manual review boundary: every change that touched production semantics or types was reviewed by me before accepting.

Where AI helped most:

- Scaffolding and boilerplate (fast wins when exploring unfamiliar tooling)
- A second reviewer for catching small mistakes and omissions
- Translating intent into a structured plan that could be executed incrementally

Where AI was weakest and required human intervention:

- Architecture choices that looked good but produced UX/state bugs (example: storing reveal state inside a card component)
- Getting stuck on dependency/version issues when given too much autonomy — the agent would dig into `node_modules` rather than consult authoritative docs
- Making broad production changes to make tests pass (a human must enforce the boundary between test-only edits and production code changes)

## Example bug and reproducible payload

This is a real request/response snapshot used during development:

```
Request URL

https://www.thesportsdb.com//api/v1/json/123/all_leagues.php

Request Method: GET
Status Code: 200 OK (from disk cache)

Response:

{
	"leagues": [
		{ "idLeague": "4328", "strLeague": "English Premier League", "strSport": "Soccer" },
		{ "idLeague": "4329", "strLeague": "English League Championship", "strSport": "Soccer" },
		{ "idLeague": "4330", "strLeague": "Scottish Premier League", "strSport": "Soccer" },
		{ "idLeague": "4331", "strLeague": "German Bundesliga", "strSport": "Soccer" },
		{ "idLeague": "4332", "strLeague": "Italian Serie A", "strSport": "Soccer" }
	]
}
```

Observed bug (reveal progress inconsistency):

1. Search for "italian" → header shows 1 league found, 0% revealed.
2. Reveal Italian badge → header shows 100% revealed.
3. Change search to "premier" → header shows "1 badge revealed · 1 to reveal — 50%" but _none_ of the premier cards are revealed in the current filtered view, which is confusing.

Diagnosis and rule:

- There are two distinct notions of "revealed":
  - Global revealed set (absolute count across the entire dataset)
  - Local revealed subset (revealed count within the current filtered result)

- The UI should show the progress relative to the _current filtered subset_ to avoid confusing the user. The global revealed set can still be persisted for bookmarking/history, but the header and progress bar must reflect the filtered subset.

Suggested fix:

- Keep `revealedLeagueIds` as a collection at the `App` level (or persisted in a stable store). When computing header progress, compute intersection of `revealedLeagueIds` with the current filtered result set and show percentage relative to the filtered count.

## Testing notes and difficulties

Setting up tests was one of the harder parts, primarily because of dependency mismatches and the AI agent being given too much autonomy during setup. Key points:

- Test layers:
  - Pure logic/unit tests for `src/lib` utilities
  - Hook tests for `useLeagues` and `useLeagueBadge` using `renderHook` and MSW
  - Integration test for the main flow (search → reveal → header progress)
  - Error-boundary test ensuring the grid is isolated

- Important MSW decisions:
  - Use `onUnhandledRequest: 'warn'` during local iteration, but switch to `'error'` in CI to avoid silent missing mocks

- Pitfalls encountered with AI-driven setup:
  - Agent modified production files while trying to make tests pass
  - Agent dug into `node_modules` to discover API changes instead of checking the release notes
  - The correct mitigation is to scope the agent: create small, reviewable diffs and stop frequently for human review

## Where AI provides real leverage vs. where to retain human ownership

Where AI helps:

- Scaffolding and mechanical synthesis
- Fast second-pass review for small issues
- Organizational tasks (priority conversion to P0/P1/P2, mapping tests to files)

Where humans must stay in control:

- Production semantics and irreversible architectural decisions
- Security and input-validation edge cases
- Critical debugging choices that require external documentation or domain knowledge
- Long-run autonomous operations without checkpoints

## Suggested workflow when using AI agents

1. Draft a short, prioritized plan (P0/P1/P2). Keep P0 small and shippable.
2. Use an AI agent to scaffold and propose options for P0 tasks only.
3. Review changes file-by-file, run tests locally, and only then approve the next batch.
4. For P1 and P2, iterate with the agent but keep human checkpoints after every 1–3 files.

## Suggested AI-agent prompt for test planning

Below is a concise prompt you can paste into your VS Code Copilot/AI agent to generate a prioritized test plan for the repository. It instructs the agent to read the codebase, map tests to files, and output a runnable plan with example test cases.

```
Read the codebase in this repository and produce a prioritized, file-mapped test implementation plan for a React + Vite + TypeScript project that uses TanStack Query, MSW, and Vitest. Focus on good coverage, not 100% completeness. Produce:

- A list of test files to add, with a 1-2 sentence rationale for each.
- For each test file, list 4–8 concrete test cases (described as steps/assertions) and which layers they belong to (unit / hook / integration / e2e).
- Example MSW handlers (success/error/empty) for the main API endpoints used here (`/all_leagues.php`, badge endpoint).
- Any necessary test-setup changes (test-utils exports, msw setup, vitest config tweaks) but do not modify production code unless strictly necessary; when you recommend changes to production files, include a short justification and mark them as optional.
- Prioritize tests in this order: pure logic (lib), hooks (useLeagues/useLeagueBadge), integration (search → reveal → header), error-boundary, edge cases (rate-limit, empty results).

Constraints:

- Do not change production code by default. If a production change is absolutely required to enable a reliable test, explain why and make it minimal.
- Keep test fixtures small and deterministic.
- Use MSW for all network interactions and provide sample fixture data in the plan.

Return the plan as a markdown document with file paths and sample test code snippets for at least two representative tests (one unit test, one integration test).
```

## Final notes

AI agents accelerated scaffolding and review, but human judgment was required for all final architecture, UX, security, and testing decisions. Treat AI output like a reviewed junior engineer's PR: inspect diffs, run tests, and validate that the suggested changes are inside the intended scope.
