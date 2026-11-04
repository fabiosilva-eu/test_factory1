# test_factory1

A Next.js App Router application. The root homepage is a responsive technology-partner landing page inspired by the content hierarchy at [Naviu](https://www.naviu.tech/). It includes a hero, concept projects, services, approach, partnership principles, FAQ, closing CTA, community section, and footer.

## Development

```sh
npm ci
npm run dev
```

Homepage components and content live in `app/components/home/`. CSS Modules scope styling to this page; the shared layout and Next.js configuration are unchanged. The only body margin adjustment applies while the homepage is present. Product previews are original local SVG illustrations in `public/home/`; there are no remote fonts, scripts, or images.

The Factory name, projects, and metrics in illustrations are demonstration content. They do not represent Naviu's clients, delivered projects, or testimonials. CTAs lead to existing page sections; there is no booking backend. The community link opens Builders Klub in a new tab.

## Verification

```sh
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts the production build on port 3103. Build before running it. The desktop (1440px) and mobile (390px) projects cover metadata, section and CTA destinations, local image loading, browser errors, keyboard FAQ disclosure, navigation behavior, and overflow at 320, 390, 768, and 1440px. Each project attaches a full-page PNG with animations disabled and images/fonts loaded for visual review.

TypeScript and the production build passed during implementation. Browser tests were attempted, but macOS sandbox restrictions prevented Chromium from launching (`MachPortRendezvousServer: Permission denied`). Interactive browser access to the reference and local preview was also declined. Consequently, visual review and runtime assertions remain unverified. The neutral/violet styling is an interpretation of the inspected content, not a verified pixel match. No screenshot baselines were accepted without review. After running the suite on a machine with browser access, review the desktop/mobile attachments and the 768px layout before introducing screenshot comparison baselines.
