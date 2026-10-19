# aidendenden.com — maintenance guide for agents

Aiden's personal site: an indie game developer's portfolio + guestbook. Chinese-first, with English accents.
Read this before changing anything. The owner's design intent is in `BLOG_DESIGN.md` (§6 = visual taste).

> This repo is served publicly by GitHub Pages, so every file here (including this one) is public.
> Never write passwords, connection strings or tokens into the repo.

## How the site is built and deployed

- **Everything is one file: `index.html`.** It has inline CSS and JS, no build step, no framework and no npm.
  Images are in `image/`.
- **Hosting**: GitHub Pages, repo `aidendenden/aiden.github.io`, custom domain `aidendenden.com` (`CNAME` file).
  Pushing to `main` publishes the site.
- **Leftovers**: `index_files/` and `CHECKLIST.md` are from the old Weebly site and nothing uses them now.
  Several images in `image/` are unreferenced originals: `*.gif`, `img-01/02/04/05/09`, and the PNGs that
  have WebP versions. Don't delete them unless the owner asks.
- **Required in `<head>`**: the two Google AdSense tags (`ca-pub-4499471582629917`). The owner's AdSense
  account depends on them, so keep them byte-for-byte.

### Committing and pushing
Work on a feature branch, commit, then try `GIT_TERMINAL_PROMPT=0 git push -u origin <branch>`.
At the time of writing this Mac had no GitHub credentials and no `gh` CLI, so pushes failed.
When a push fails, give the owner two things: the push command, and
`https://github.com/aidendenden/aiden.github.io/compare/main...<branch>?expand=1` so they can open a PR.

## Design system (in `index.html` → `<style>`)

- **Tokens**: section 0 (`:root`) holds every colour, type size, space and radius as CSS custom properties.
  Dark mode overrides them twice: once in `@media (prefers-color-scheme: dark)` and once in
  `:root[data-theme="dark"]` (the manual toggle). **Keep those two blocks identical.**
- **Look**: cream paper `#F3EEE4`, warm ink `#1C1915`, and one rust accent (`#A8421A` light / `#EE8A55` dark),
  on a 12-column grid. The owner asked for "温和、留白、不太商业". Avoid flashy effects, startup/SaaS layouts
  and heavy motion.
- **Fonts and mainland China**: most visitors are in mainland China, where Google Fonts is often blocked.
  - Instrument Serif and IBM Plex Mono load from Google Fonts without blocking rendering.
  - The `"Instrument Serif Fallback"` face is local fonts with `size-adjust: 76%`, so line breaks stay the
    same when the webfont is blocked.
  - Noto Serif SC is requested by the script at the bottom, with `&text=` set to exactly the glyphs found in
    `.hero-role, .sec-title, .work-title`. New titles are picked up automatically. Don't
    replace this with a full CJK font load.
- **Fallbacks for old browsers**: domestic Chinese browsers often run older Chromium, so there are physical
  properties instead of `margin-inline`/`inset`, and `@supports` fallbacks for `aspect-ratio` and
  `color-mix`. Keep these when you edit.
- **Hover and motion**: hover styles live in `@media (hover: hover)`. Scroll reveals (`.reveal`) only apply
  when the `js` class is present, and a 3 s `reveal-all` timer is the fail-safe.
  `prefers-reduced-motion` is respected; it also swaps 维度漂流's animation for `img-07-still.webp`.

## Common tasks

### Add a game to 作品 (Selected Work)
Follow the HTML comment just above `<ol class="works">`:
1. Copy one `<li class="work reveal">…</li>` and change the link (its 机核 Gcores page), title, one-liner,
   image `src` with its **real** `width`/`height`, and alt text.
   - Alt text describes the art without repeating the title, e.g. `标题画面：…`.
   - Keep the text-first order inside `<a>`: h3 → p → sr-only span → `.media` → `.work-meta`.
     CSS moves the cover to the top visually.
2. Optional, in the `style` attribute of `.media`:
   - `--tint:#rrggbb` is the cover's average colour, shown while the image loads.
   - `--pos:X% Y%` shifts the crop when a centred 16:10 crop would cut the cover's lettering.
3. Numbers update themselves (CSS counter). **Also bump `13 Works` in the masthead.**
4. Images: prefer WebP about 800–960 px wide. Python + Pillow can convert:
   `Image.open(src).convert('RGB').save('x.webp', quality=82, method=6)`.
   Keep the original next to it.

### Edit copy
- Don't invent biography, dates, awards or stats.
- The approved copy comes from the owner or `BLOG_DESIGN.md`.

### Change sections or the nav
- Nav links point to `#about`, `#work`, `#guestbook`, `#contact`.
- If you add or remove a section, also update the `['about', 'work', 'guestbook', 'contact']` scroll-spy
  list in the script and renumber the `.sec-no` labels.
- With 4 nav links, the header wordmark hides below 430 px (`.site-header .brand-name`) so the nav fits.

## Guestbook (留言板) — Twikoo

| Piece | Where |
|---|---|
| Frontend config | `index.html` → `var TWIKOO = { envId, version }` (near the top of the bottom `<script>`) |
| Server URL (`envId`) | `https://twikoo.aidendenden.com`. Opening it should return `{"code":100,…,"version":"x.y.z"}` |
| Server hosting | Vercel, team `aiden-aed9`, project `twikoo`; source repo `aidendenden/twikoo` (Twikoo's `templates/vercel-min`) |
| Database | MongoDB Atlas free cluster `aiden`, database **`test`** (collections `comment` = messages, `config` = Twikoo settings incl. hashed `ADMIN_PASS`), user `twikoo` (readWriteAnyDatabase); IP access list `0.0.0.0/0` (Vercel has no fixed IPs) |
| Secret | Vercel project env var `MONGODB_URI` (Production). The password lives only there; it is not in this repo |
| DNS | Tencent Cloud DNSPod, zone `aidendenden.com`: CNAME `twikoo` → `493c82622a1c0a87.vercel-dns-017.com`. Don't use the `*.vercel.app` URL: it's blocked in mainland China |
| Admin panel | The gear icon in the guestbook. The owner sets the admin password there (moderation, spam filter, email notifications) |

How the frontend loads:
- The script is lazy-loaded when the section nears the viewport.
- It tries npmmirror first (fast in China), then jsDelivr, then unpkg.
- If the script can't load, the guestbook shows an "email me instead" note.
- Comments are stored under `path: '/guestbook'`. Changing that value starts a new, empty thread.
- Twikoo injects its own CSS after the page's, so the colour overrides are scoped under `#tcomment .twikoo …`
  to win.

### Upgrade Twikoo
1. **Server**: in Vercel → project `twikoo` → Deployments → latest → ⋯ → **Redeploy**. The template follows
   the `twikoo-vercel` npm `latest` tag, so a redeploy is the upgrade.
2. Open `https://twikoo.aidendenden.com` and read `"version"`.
3. **Frontend**: set `TWIKOO.version` in `index.html` to that same version. Check it exists on npmmirror:
   `curl -sI https://registry.npmmirror.com/twikoo/<version>/files/dist/twikoo.min.js` should return 200.
4. Test locally: run `python3 -m http.server` in the repo, open `/index.html`, and scroll to 留言板.
   You should see the comment box and a "Powered by Twikoo vX" footer, with no red error box.
   Don't post test comments on the live board.
5. Commit and push as described above.

### Reset the admin password
Twikoo has no "change password" screen. The steps are:
1. In Atlas → Data Explorer → `aiden` → `test` → `config`, delete the `ADMIN_PASS` field.
   - Delete only that field, not the whole document. Deleting the document also wipes every other Twikoo setting.
2. Right away, open the guestbook's gear icon and set a new password.
   - Until a new password is set, anyone who opens the admin panel can claim it.
   - The owner types the new password themselves.

### What needs the owner (agents can't do these)
- Logging in to Vercel, Atlas or Tencent Cloud.
- Typing passwords or connection strings.
- GitHub OAuth grants.
- Tencent Cloud MFA codes: DNSPod asks for one when adding a record.
- Widening security settings, such as Atlas network access.

You can drive the browser, but hand those specific clicks and fields to the owner.

## Verifying a change
After any visual change, render the page at 1440 px and 390 px, in light and dark mode. Check also:
- with `fonts.googleapis.com` blocked;
- that there is no horizontal scroll;
- that the browser console is clean.

The built-in browser pane works for this: serve the folder with `python3 -m http.server` (`file://` URLs
render as static snapshots). Headless Chrome via the DevTools protocol also works.
