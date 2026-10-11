# Deploying to GitHub Pages

The site is fully static — no build, no dependencies. GitHub Pages serves the
`site/` folder as-is.

## 1. Replace the placeholder domain

Two files contain `YOUR-DOMAIN`:

- `site/robots.txt` — sitemap URL
- `site/sitemap.xml` — all page URLs

If you'll use `https://<username>.github.io`, replace `YOUR-DOMAIN` with
`<username>.github.io`. If you skip this step the sitemap/robots URLs will be
wrong (the site itself still works fine).

## 2. Create the repository and push

```bash
# from the prajwal/ folder (the parent of site/)
git init
git add .
git commit -m "Personal site and CV"

# create an empty repo on github.com named e.g. "prajwal", then:
git remote add origin https://github.com/<username>/prajwal.git
git branch -M main
git push -u origin main
```

## 3. Enable Pages

1. On GitHub: repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main`, folder: **/ (root)** — but the site files live in `site/`,
   so pick one of these instead:

**Option A — repo root is the site (simplest):** move the contents of `site/`
to the repository root before pushing (the `site/` wrapper is only for local
organization).

**Option B — keep `site/` as a folder:** not directly supported by Pages'
branch deploy. Use a GitHub Actions workflow that publishes `site/`, or use
Option A.

Option A is recommended. After pushing the contents of `site/` at the repo root:

4. Pages publishes at `https://<username>.github.io/prajwal/` (project site) or
   `https://<username>.github.io/` (if the repo is named `<username>.github.io`).

## 4. Custom domain (optional)

1. Buy/point a domain, add a `CNAME` file at the site root containing the domain
2. Repo → Settings → Pages → **Custom domain** → enter it → Save
3. Wait for the DNS check to pass, then enable **Enforce HTTPS**
4. Update `robots.txt` and `sitemap.xml` to the final domain, and set the
   canonical/OG URLs if you added them

## 5. Post-deploy checklist

- [ ] Home page loads with the hero animation
- [ ] Nav links work on every page; 404 page shows on a bad URL
- [ ] CV page: **Save CV as PDF** produces a clean A4 PDF (enable background graphics)
- [ ] Filled-in contact links appear; empty ones stay hidden
- [ ] Mobile: hamburger menu opens/closes
- [ ] `https://<domain>/robots.txt` and `/sitemap.xml` resolve

## Notes

- No `og:image` yet — add one (1200×630 PNG) and reference it in each page's
  Open Graph tags if you want rich link previews.
- No canonical URLs were added because the final domain isn't known; add
  `<link rel="canonical" href="https://DOMAIN/page.html">` to each page after
  the domain is set.
