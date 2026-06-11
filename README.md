# cwangsanata.vercel.app

Personal portfolio and blog site for Christopher Wangsanata. Built on the Dante Astro theme by [JustGoodUI](https://justgoodui.com/), extended with custom features.

## Features

- Dark and light mode
- Hero section with Three.js wireframe globe
- Experience, projects, and blog sections
- Blog posts pulled from Medium via RSS at build time, with canonical URLs pointing back to Medium
- Astro content collections for experience and projects
- JetBrains Mono throughout
- Responsive, mobile-first layout
- SEO: sitemap, RSS feed, canonical URLs, OpenGraph
- View transitions

## Stack

- [Astro 4](https://astro.build/) — static site generator
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Three.js](https://threejs.org/) — WebGL globe
- [Marked](https://marked.js.org/) — Markdown rendering
- Deployed on [Vercel](https://vercel.com/)

## Project Structure

```
src/
  components/       Astro components (Hero, Globe, ExperiencePreview, etc.)
  content/
    experience/     Work history (Markdown)
    projects/       Projects (Markdown)
    pages/          Static pages — About, Contact, Terms
  data/             Site config
  layouts/          Base layout and page wrappers
  pages/            File-based routing
  styles/           Global CSS and Tailwind base
  utils/            Data utilities, Medium RSS feed parser
public/             Static assets (favicon, robots.txt)
```

## Development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # production build to ./dist/
npm run preview      # preview the production build locally
```

Vite caches dependency pre-bundles. If Three.js fails to load after install, restart the dev server with:

```bash
npm run dev -- --force
```

## Blog

Blog posts are sourced from [medium.com/@cwww](https://medium.com/@cwww) via RSS at build time. No local blog files are needed. New Medium posts appear after the next deployment. To automate rebuilds, set up a Vercel deploy hook triggered on a schedule.

## Character Animation (TODO)

See `CHARACTER_ANIMATION.md` for instructions on replacing the globe with an animated Mixamo character using `GLTFLoader` and `AnimationMixer`.

## Credits

Built on the [Dante Astro Theme](https://github.com/JustGoodUI/dante-astro-theme) by JustGoodUI, licensed under [GPL-3.0](https://github.com/JustGoodUI/dante-astro-theme/blob/main/LICENSE). Thank you to JustGoodUI for the solid foundation.

## License

GPL-3.0 — inherited from the upstream Dante theme.
