# Temple SASE website

Static website for the Society of Asian Scientists & Engineers (SASE) at Temple University, plus a page for the chapter's SASE Summit: AAPI Awards Gala. Hosted on GitHub Pages at https://sase-temple.github.io (the repo is named sase-temple.github.io, which is what gives it the short address). No build step, no framework: plain HTML, CSS and JavaScript.

## Files

- `index.html`: chapter homepage. Sections in order: hero (photo of the fall social mixer, captioned), Upcoming events (a big featured card for the AAPI Awards Gala plus a dated event list), What we do (the three SASE pillars with photos), Join us (Discord, Instagram, GroupMe, Suitable, email), Common questions (FAQ), E-board, Sponsor, footer.
- `summit.html`: gala page. Sections: hero, Key dates (timeline), The awards (10 student + 6 club, each with eligibility, criteria and proof in a collapsible list), Nominate, Venue (with map), footer.
- The awards content comes from the "Awards and Criteria" Google Sheet. If the criteria change, edit the award cards in `summit.html` directly; each card is an `<article class="award">`.
- `assets/css/styles.css`: all styles for both pages. Colors and fonts are CSS variables in `:root`.
- `assets/js/main.js`: header turns solid after the hero, mobile menu, copy-email button (`data-copy`), "Expand all criteria" button on the awards (`data-expand-all`), hides past events (`.event[data-date]`) and fills in deadline countdowns (`data-countdown`), footer year.
- `assets/img/`: web-sized photos. `assets/img/eboard/` holds one 800×1000 portrait per officer, named `first-last.jpg`.
- `.claude/launch.json`: local preview config (`python -m http.server 8080`).
- `WEBSITE photos/` (not in the repo): original photos, including Canon RAW (.CR2) files. The site never references it.

All links are relative, so the site works at any address without changes.

## Design decisions (keep these unless the chapter asks otherwise)

- **Hierarchy (Nov 2026 redesign):** each page has exactly one giant title, the hero. Every other heading uses `.h2` (sentence case, about 3rem max). No all-caps section titles, no 01/02/03 section numbers (only the gala timeline is numbered, because it's a real sequence), no scroll-reveal or drifting photos. Most sections sit on linen/paper; the navy "Join us" band and cherry venue band are the only color breaks. This was done because the earlier version felt chaotic: everything was big, so nothing stood out.
- **Join flow:** the homepage has no button that jumps straight to Discord. "Join us" scrolls to the Join us section, where Discord is the large primary card and the other socials sit below it.
- **Palette:** deep cherry `--cherry #5c1420`, Temple cherry `--cherry-bright #9d2235`, SASE logo navy `--navy #141b4d`, warm linen background `--linen #f1ebe0`, and a small ember-orange accent `--ember #e8743b` used only for the sparkle, the hero glow and keyboard focus.
- **Type:** headings in DM Serif Display (`--font-display`), body in Jost (`--font-body`), loaded from Google Fonts in each page's `<head>`. Bodoni Moda was tried first and dropped because its thin strokes were hard to read.
- **Pan-Asian phrases:** each section title pairs English with a short phrase in another Asian language (Chinese, Korean, Vietnamese, Hindi, Tagalog, Thai, Japanese), styled with the `.cjk` class. The chapter asked for these to stay **subtle**: small and faded (opacity about 0.5). Every phrase has a `lang` attribute; keep it when adding new ones.
- **Inspiration:** originally Monarque Événements, a "Future Archive" editorial layout and warm slide decks. The ✦ sparkle (`.spark`) and soft orange glow survive from that; the drifting photos and numbered sections were removed in the redesign.
- Respects `prefers-reduced-motion` (the only motion is the hero fade-in). Mobile layout checked at 375px wide with no horizontal scroll.

## Upcoming events (homepage)

- To add an event, copy the commented `<li class="event">` template in `index.html` into the `events__list`, soonest first. Set `data-date` and `datetime` to `YYYY-MM-DD`. Each event hides itself the day after its date, so nothing needs deleting.
- If every event has passed, a "Nothing on the calendar" line appears instead.
- The featured card (`.feature`) is the gala. After the gala, swap it for the next big event or remove it.
- The gala was moved out of the hero (Nov 2026 feedback): the old notice sat right under the social mixer photo, so the photo read as a gala photo and the gala didn't stand out.

## Content facts

- Gala: **SASE Summit: AAPI Awards Gala**, Friday, April 16, 2027, Temple Performing Arts Center (1837 N Broad St, Philadelphia, PA 19122).
- Nominations close Dec 31, 2026. Finalists announced April 1, 2027.
- Nomination forms: students https://forms.gle/zGwrtAh7cPeC5Cx79, clubs https://forms.gle/AzSv1RMtpjcy8vsPA
- Links: Discord https://discord.gg/sXgfzkeyc9 (note: the Linktree uses a different invite, https://discord.gg/3wzbmw68aR; confirm which is current), GroupMe https://groupme.com/join_group/100924297/vODMyRft, Linktree https://linktr.ee/sasetemple, Instagram https://www.instagram.com/sasetemple/, Suitable https://app.suitable.co/student-organizations/rLonS6oS8V3z?tab=profile, email temple@saseconnect.org. The chapter no longer uses Owl Connect.
- The chapter has no sponsors yet. The Sponsors section is about how to sponsor (email the chapter), with no logo wall.
- E-board 2026–27 (role, name, major, class year) is in the roster in `index.html`.

## Still open

- Gala start time is TBD (search `TODO` in `summit.html`).
- FAQ answers about meetings and cost are deliberately general ("times are posted on Discord", "joining the Discord is free"). Add specifics (GBM day/room, any dues) once confirmed.
- More event photos (from the chapter's Teams files) could replace the hero and pillar photos. A real community service photo would let the third pillar go back to just "Community service" (it's "Community and service" now because its photo is a study session).
- The events list only has gala dates so far. Add GBMs, socials and workshops as they're scheduled.
- Add sponsor logos once the chapter has sponsors.
- Update the e-board roster and photos each year.

## Updating e-board photos

Officer portraits came from Canon RAW files. Each was cropped to 4:5 with the face centered about a third of the way down, exported as JPEG quality 80 at 800×1000. Keep new portraits the same size and ratio so the grid stays even; name them `first-last.jpg` and update the matching `src` and `alt` in `index.html`.

## Previewing locally

From this folder, run `python -m http.server 8080` and open http://localhost:8080. Opening `index.html` directly in a browser also works.
