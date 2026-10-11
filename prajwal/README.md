# Prajwal — Personal Site & CV

A static, dependency-free personal website and CV for a cyber security student.
No frameworks, no build step, no npm — plain HTML, CSS, and JavaScript that works
on GitHub Pages (or any static host) out of the box.

## What's here

```
prajwal/
├── cv/
│   └── PRAJWAL-CV.txt        # plain-text CV (paste-ready for applications)
└── site/                     # ← deploy THIS folder
    ├── index.html            # home — hero, selected work, CTF, open-to
    ├── projects.html         # three course projects, end to end
    ├── writeups.html         # CTF write-up index
    ├── writeups/             # one page per write-up (3 skeletons)
    ├── cv.html               # full CV page with print-to-PDF
    ├── about.html            # education, skills, languages
    ├── contact.html          # contact links (auto-hides empty ones)
    ├── 404.html
    ├── js/
    │   ├── content.js        # ← the ONLY file you edit
    │   └── main.js           # renders content, hides empty fields
    ├── css/style.css         # theme + print styles
    ├── assets/fonts/         # Space Grotesk, self-hosted (22 KB woff2)
    ├── assets/favicon.svg
    ├── robots.txt
    └── sitemap.xml
```

## Fill in your details (5 minutes)

Open `site/js/content.js`. Every empty string (`""`) is hidden automatically on
the site — email, GitHub, phone, GPA, certificates, languages, and so on appear
only once you fill them in. Nothing else needs editing.

The write-up pages are honest skeletons: headings, tools, and structure are real,
and the steps/results sections are left for you to complete from your notes.
Do not invent steps or flags — keep them accurate or leave them empty.

## Preview locally

```bash
cd site
python -m http.server 8765
# open http://127.0.0.1:8765
```

## Save the CV as PDF

Open `cv.html` in a browser → click **Save CV as PDF** → choose A4, background
graphics ON. The print stylesheet produces a clean 3-page A4 CV (black text,
no dark background, page breaks between sections).

## Deploy

See [DEPLOY.md](DEPLOY.md) for GitHub Pages steps (replace `YOUR-DOMAIN` first).

## Design notes

- Blue-black base `#0a0f16` with a single signal-amber accent `#e8a34c`
- Space Grotesk for display, system fonts for body and mono
- One load animation on the home hero; reduced-motion is respected
- WCAG AA contrast, skip link, keyboard-visible focus, semantic headings
- Zero external requests — fonts are self-hosted, no CDNs, no trackers
