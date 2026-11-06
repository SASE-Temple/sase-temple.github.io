# Temple SASE website

Static website for the Society of Asian Scientists & Engineers (SASE) at Temple University, plus a page for the chapter's SASE Summit: AAPI Awards Gala. Hosted on GitHub Pages. No build step, no framework: plain HTML, CSS and JavaScript.

## Files

- `index.html`: chapter homepage. Sections in order: hero, gala feature band, About (mission), Pillars, E-board, Sponsors, footer ("Join us").
- `summit.html`: gala page. Sections: hero, The Gala, Nominate, The Evening (schedule table), Venue, footer.
- `assets/css/styles.css`: all styles for both pages. Colors and fonts are CSS variables in `:root`.
- `assets/js/main.js`: header turns solid after the hero, mobile menu, scroll reveals (`.reveal`), hero photo drift (`data-drift`), copy-email button (`data-copy`), footer year.
- `assets/img/`: web-sized photos. `assets/img/eboard/` holds one 800×1000 portrait per officer, named `first-last.jpg`.
- `.claude/launch.json`: local preview config (`python -m http.server 8080`).
- `WEBSITE photos/` (not in the repo): original photos, including Canon RAW (.CR2) files. The site never references it.

All links are relative, so the site works at `https://<account>.github.io/<repo>/` without changes.

## Design decisions (keep these unless the chapter asks otherwise)

- **Palette:** deep cherry `--cherry #5c1420`, Temple cherry `--cherry-bright #9d2235`, SASE logo navy `--navy #141b4d`, warm linen background `--linen #f1ebe0`, and a small ember-orange accent `--ember #e8743b` used only for sparkles, glows and italic highlights. Sections alternate full-bleed cherry, navy and linen.
- **Type:** headings in DM Serif Display (`--font-display`), body in Jost (`--font-body`), loaded from Google Fonts in each page's `<head>`. Bodoni Moda was tried first and dropped because its thin strokes were hard to read.
- **Pan-Asian phrases:** each section title pairs English with a short phrase in another Asian language (Chinese, Korean, Vietnamese, Hindi, Tagalog, Thai, Japanese), styled with the `.cjk` class. The chapter asked for these to stay **subtle**: small and faded (opacity about 0.5). Every phrase has a `lang` attribute; keep it when adding new ones.
- **Inspiration:** Monarque Événements (giant title over drifting photos, full-bleed color sections), a "Future Archive" editorial layout (bilingual headings, numbered sections, schedule table), and warm slide decks (orange glows, ✦ sparkle shape via `.spark`).
- Respects `prefers-reduced-motion`. Mobile layout checked at 375px wide with no horizontal scroll.

## Content facts

- Gala: **SASE Summit: AAPI Awards Gala**, Friday, April 16, 2027, Temple Performing Arts Center (1837 N Broad St, Philadelphia, PA 19122).
- Nominations close Dec 31, 2026. Finalists announced April 1, 2027.
- Nomination forms: students https://forms.gle/zGwrtAh7cPeC5Cx79, clubs https://forms.gle/AzSv1RMtpjcy8vsPA
- Links: Discord https://discord.gg/sXgfzkeyc9, Instagram https://www.instagram.com/sasetemple/, Suitable https://app.suitable.co/student-organizations/rLonS6oS8V3z?tab=profile, email temple@saseconnect.org. The chapter no longer uses Owl Connect.
- The chapter has no sponsors yet. The Sponsors section is about how to sponsor (email the chapter), with no logo wall.
- E-board 2026–27 (role, name, major, class year) is in the roster in `index.html`.

## Still open

- Gala start time is TBD (search `TODO` in `summit.html`).
- Add sponsor logos once the chapter has sponsors.
- Update the e-board roster and photos each year.

## Updating e-board photos

Officer portraits came from Canon RAW files. Each was cropped to 4:5 with the face centered about a third of the way down, exported as JPEG quality 80 at 800×1000. Keep new portraits the same size and ratio so the grid stays even; name them `first-last.jpg` and update the matching `src` and `alt` in `index.html`.

## Previewing locally

From this folder, run `python -m http.server 8080` and open http://localhost:8080. Opening `index.html` directly in a browser also works.
