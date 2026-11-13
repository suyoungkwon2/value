# myvalue

A minimal English/Korean values reflection, built for a phone-sized screen on every device. Nickname → Short or Detailed survey on one continuous page → values profile → shareable result. No account, server-side database, or external fonts. Vercel Web Analytics collects aggregated page-view statistics.

## Run

```sh
npm run dev
```

Open http://localhost:3000. Requires Python 3 for the server. Node.js 22+ runs verification and creates the production `dist/` directory:

```sh
npm test
npm run build
```

## Survey versions

**Short:** ten broad value items from the supplied Short Schwartz’s Value Survey (SSVS), Lindeman & Verkasalo (2005), *Journal of Personality Assessment*, 85(2), 170–178. One rating per value. Uses the PDF’s printed 0–8 options: 0 opposed, 1 not important, 4 important, 8 supreme. The PDF describes this as “8-point” despite showing nine positions; the app follows the printed options and does not use weighted higher-order aggregate formulas.

**Detailed (recommended):** all 57 original value items from `source/230417089-Schwartz-Value-Survey.pdf`, in two lists of 30 and 27, with the original −1 through 7 scale: −1 opposed, 0 not important, 3 important, 6 very important, 7 supreme. Both lists appear as sections on one continuous survey page. A brief instruction asks users to scan each list and rate its most important and least important/opposed value first, as in the original guidance; the web presentation lets users scroll freely rather than enforcing a page-by-page order. Demographic questions are omitted because only a nickname is requested.

The detailed score for each of the ten values is the arithmetic mean of its items in the supplied individual-level key. That key uses 46 markers, with 3–8 items per value. All 57 responses, including unindexed items, contribute to the respondent's overall mean. The relative priority is the domain mean minus that overall mean. Raw and centered scores are available in the optional results table. Scores from different survey versions should not be interpreted as directly interchangeable measurements.

All equal maxima and minima are retained, with a numerical tolerance for floating-point averages. Equal domain averages produce no distinct highest or lowest priority, even if some individual answers differ.

## Chart research and implementation

Schwartz’s theoretical circle describes motivational compatibility and conflict. It is not a pie chart of a person’s score or a percentage composition. The original 2012 diagram places tradition and conformity in one wedge, with conformity toward the center and tradition outside. Those radii are theoretical positioning, not measured individual scores.

The result chart follows the supplied fixed circular diagram, including **tradition outside conformity in the same wedge**, the surrounding four higher-order groups, and the reference’s relative region arrangement. Region geometry stays fixed and does not encode scores. Stars mark the three displayed higher-priority values; X icons mark three displayed lower-priority values. These overlays are a site feature, not an official scoring diagram. Raw and centered scores remain in the accessible table.

The display selects exactly three values at each end, without overlap. If a score cutoff is tied, fixed diagram order resolves which three receive symbols; the result explicitly says equal scores remain tied. This is a display rule, not a psychological difference between tied values. If all ten domain scores are equal, no icons or invented highest/lowest groups are shown.

Primary research:

- Schwartz (2012), [An Overview of the Schwartz Theory of Basic Values](https://scholarworks.gvsu.edu/orpc/vol2/iss1/11/), especially Figure 1 and the sections on structure and measurement. DOI: 10.9707/2307-0919.1116.
- Schwartz (2021), [A Repository of Schwartz Value Scales with Instructions and an Introduction](https://scholarworks.gvsu.edu/orpc/vol2/iss2/9/), including authorized instruments and coding instructions. DOI: 10.9707/2307-0919.1173.

Interpretations and reflection prompts are original editorial text. They describe possibilities, not validated individual predictions, clinical findings, or fixed personality types. Lower priority is not a weakness or a moral failing.

## Appearance

The page uses a very pale sky-blue background. The circle uses cool pastel yellow for openness to change, blue for self-transcendence, pink for conservation, and mint for self-enhancement. Hedonism blends yellow and mint because it spans those two groups. A yellow star marks the displayed higher priorities, whose regions use full pastel group color. Unmarked regions keep the same group color at 20% fill opacity; lower-priority regions use solid cool gray with X icons. Borders and labels stay fully opaque. Home time estimates are 2 minutes for Short and 5 minutes for Detailed. Directly below the home eyebrow, a clearly labeled example diagram shows the user-supplied higher priorities (Self-direction, Benevolence, Achievement) and lower priorities (Hedonism, Power). This illustration uses no invented numerical scores and does not add a third lower priority. Its labels and caption follow the selected language.

The top-left header uses `assets/value-logo.svg`, a tightly cropped, transparent code-native vector logo inspired by the supplied house-shaped sign reference: blue roof, gold and coral sides, green base, cream face, and the word VALUE alone. The blue backdrop and separate home-page hero logo are removed. The lettering stays sans-serif, consistent with the requested typography. Assets are copied into the production build.

## Privacy and sharing

All nine response options fit in a single connected numeric bar without horizontal scrolling, including the endpoints on narrow phone screens. Only the two endpoints are described beside each bar; the original intermediate scale anchors remain available in Method & privacy. No value is preselected. Missing responses are identified before results are calculated.

The synchronized language selectors in the header and directly below the nickname field switch the interface, questions, result explanations, chart labels, and method/privacy text between English and Korean. The chosen language is stored locally. Switching languages preserves current answers, survey version, nickname, and survey scroll position. Korean question wording is a web translation of the supplied English material; it is not presented as an authorized or independently validated Korean questionnaire. Scoring and item IDs remain identical in both languages.

Drafts are stored in this browser. Shared links contain a nickname, survey version, and raw answers in their URL fragment. Anyone with the full link can view and edit the data. Links are not encrypted or authenticated. Fragments are normally not sent in HTTP requests, but history, clipboard, extensions, and recipient software may retain them. Social previews remain generic. Older v1 short-result links remain readable. New links explicitly identify the survey version.

## Deploy

`vercel.json` supplies the static build settings: Other framework, `npm run build`, `dist`, no dependency installation. Research PDFs and reference images are excluded from the production build.

```sh
npm i -g vercel
vercel login
vercel link
vercel project inspect --non-interactive
vercel deploy
vercel deploy --prod
```

Choose the intended Vercel account and project. Alternatively, import `suyoungkwon2/value` into Vercel for Git-triggered deployments.

The current agent environment previously blocked `.git` writes, external DNS, and local server ports; its GitHub authentication check failed and Vercel CLI was unavailable. Local tests and builds can pass without proving a commit, deployment, browser screenshot, or full browser interaction test succeeded.
