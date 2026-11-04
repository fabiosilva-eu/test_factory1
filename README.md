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

The `Homepage checks` GitHub Actions workflow runs these checks on Ubuntu with Node.js 22 and installs Chromium plus its system dependencies. It runs on pushes, pull requests, and manual dispatches, and uploads browser traces and full-page review captures as the `homepage-browser-results` artifact. Browser assertion failures fail the job.

TypeScript, the production build, and HTTP smoke checks for the root metadata, single primary heading, section links, and all 11 local assets passed. Local browser tests were retried, but macOS sandbox restrictions still prevented all 10 tests from reaching assertions (`MachPortRendezvousServer: Permission denied`). The Linux workflow has been added for verification outside that local restriction; it has not been executed in this workspace. Interactive browser access to the reference was also declined. Consequently, visual review and browser runtime assertions remain unverified. The neutral/violet styling is an interpretation of the inspected content, not a verified pixel match. No screenshot baselines were accepted without review. After a successful workflow run, review the desktop/mobile/tablet attachments before introducing screenshot comparison baselines.
