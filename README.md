# Static site — emmanuelpineau.net (HTML version, no WordPress)

## Structure

```
site/
├── index.html         # Home: hero + portfolio catalogue grid
├── video.html          # Director of photography
├── photography.html    # Personal work
├── about.html          # Biography
├── contact.html         # Contact form + details
├── blog.html            # Article list (duplicate per post)
└── assets/
    ├── style.css
    └── script.js
```

No dependencies: no build step, no Node, no database. Open `index.html` in a
browser and it works — or host the folder as-is.

## 1. Replace the images

Each portfolio tile (`.frame`) contains a `.placeholder-art` block (the
grey/gradient background) and a `.placeholder-label` (the "Replace with:
xxx.jpg" text). To drop in a real photo:

```html
<a class="frame reveal" href="project-page.html" role="listitem">
  <span class="frame-media">
    <img class="placeholder-art" src="images/girls-and-roses.jpg" alt="Girls and Roses">
  </span>
  <span class="caption">
    <span class="index-num"></span>
    <span class="title-group">
      <span class="title">Girls and Roses</span>
      <span class="tag">Beauty</span>
    </span>
  </span>
</a>
```

Simply replace `<span class="placeholder-art"></span>` with an
`<img class="placeholder-art" src="..." alt="...">` tag and remove the
`<span class="placeholder-label">`. Use square (1:1) images compressed as
JPEG/WebP (~150–300 KB) for fast loading.

Create an `images/` folder at the root to hold the photos.

## 2. Create a project page

Duplicate `photography.html`, drop the grid, and put a single large image
plus a short write-up of the project, keeping the same header/footer for
consistent navigation.

## 3. Contact form

The form in `contact.html` looks and behaves right (JS in
`assets/script.js`) but doesn't actually send anything yet — a plain HTML
file has no server behind it. Two simple, free options with no backend to host:

- **Formspree** (https://formspree.io): change `action="#"` to
  `action="https://formspree.io/f/YOUR_ID"` and keep `method="post"`.
- **Netlify Forms**: if hosting on Netlify, add the attribute
  `data-netlify="true"` to the `<form>` tag.

## 4. Deployment (free, no WordPress)

- **Netlify / Vercel / Cloudflare Pages**: drag and drop the `site/` folder
  onto their interface, or connect a Git repo. Live in seconds.
- **GitHub Pages**: push the folder to a GitHub repo, enable Pages in the
  repo settings, pointing to the branch/root.
- **Classic shared hosting (OVH, o2switch, etc.)**: upload the contents of
  `site/` via FTP to the web directory (often `www/` or `public_html/`).
  No database or PHP required.

## 5. Customize the style

All colors, fonts and spacing are centralized as CSS variables at the top
of `assets/style.css` (the `:root` block). Change them in one place to
retheme the whole site.

## 6. Basic SEO

Remember to adapt the `<title>` and `<meta name="description">` tags on
each page, and add Open Graph tags (`og:title`, `og:image`, etc.) once the
real images are in place.
