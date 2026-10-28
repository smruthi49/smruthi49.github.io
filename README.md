# smruthi49.github.io — Personal Portfolio

A VSCode-inspired personal portfolio website, built for GitHub Pages.

## 🗂 Structure

```
portfolio/
├── index.html              # Entry point
├── css/
│   ├── themes.css          # All color themes (dark, light, monokai, solarized, nord)
│   ├── layout.css          # App chrome & grid
│   ├── components.css      # Tabs, file tree, modal, theme switcher
│   └── markdown.css        # Page content styles
├── js/
│   ├── pages.js            # All static page content
│   ├── blog.js             # Blog loading & rendering
│   └── app.js              # Main app: nav, tabs, theme, search
├── assets/
├── blog/
│   ├── index.json          # Register blog posts here ← EDIT THIS
│   └── posts/
│       └── *.md            # Your posts go here
└── README.md
```

## ✏️ Customizing Your Content

### Update personal info
Edit `js/pages.js` — each page is a function returning HTML. Find and replace:
- `Your Name`
- `your-city`
- `smruthi49`
- `you@email.com`
- Job titles, company names, skills, projects, etc.

### Add your photo
Replace the avatar placeholder in `pages.js` → `about()`:
```html
<!-- Change this: -->
<div class="profile-avatar-placeholder">👤</div>

<!-- To this: -->
<img src="assets/avatar.jpg" alt="Your Name" class="profile-avatar" />
```
Then add your photo to `assets/avatar.jpg`.

### Add a blog post
1. Create `blog/posts/your-post-slug.md` with frontmatter:
```markdown
---
title: "Your Post Title"
date: "2024-01-15"
tags: tag1, tag2
description: One line about what this post is about.
---

Your post content here...
```

2. Register it in `blog/index.json`:
```json
{
  "slug": "your-post-slug",
  "title": "Your Post Title",
  "date": "2024-01-15",
  "description": "One line about what this post is about.",
  "tags": ["tag1", "tag2"],
  "readTime": 4
}
```

## 🚀 Deploying to GitHub Pages

1. Create a GitHub repo named `smruthi49.github.io` (or any repo)
2. Push this folder contents to the repo
3. Go to **Settings → Pages → Source → Deploy from branch → main / root**
4. Your site will be live at `https://smruthi49.github.io`

> **Note:** Blog post loading uses `fetch()`. GitHub Pages serves static files, so this works out of the box. If testing locally, run a local server: `python3 -m http.server 8000`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl/Cmd + B` | Toggle sidebar |
| `Esc` | Close settings modal |

## 🎨 Themes

Switch via the dots in the title bar or Settings (gear icon):
- **Dark** — VSCode Default Dark
- **Light** — VSCode Light
- **Monokai** — Classic Monokai
- **Solarized** — Solarized Dark
- **Nord** — Nord

Theme preference is saved to `localStorage`.
