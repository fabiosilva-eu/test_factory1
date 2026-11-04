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
npm run test:health
npx playwright install chromium
npm run test:e2e
```

Playwright starts the production build on port 3103. Build before running it. The desktop (1440px) and mobile (390px) projects cover metadata, section and CTA destinations, local image loading, browser errors, keyboard FAQ disclosure, navigation behavior, and overflow at 320, 390, 768, and 1440px. Full-page screenshot assertions at 1440, 768, and 390px use visually reviewed Linux Chromium baselines in `tests/home.spec.ts-snapshots/`. Capture tests disable animations, wait for images/fonts, and freeze the displayed date. PNG captures are saved in `test-results/` as well as attached to the test report.

For repeatable Linux rendering, or when macOS prevents Chromium from launching, use a running Podman machine:

```sh
npm run test:e2e:container
```

The command uses the official Playwright Noble image matching the lockfile, installs dependencies, typechecks, builds, runs the health integration test, and runs all 10 browser tests in an isolated container. It copies only application/test inputs, without root `.env` files or credentials, and returns captures/traces to `test-results/`. It removes its temporary container afterward and propagates check failures. Docker is also supported with `CONTAINER_RUNTIME=docker npm run test:e2e:container`.

The `Homepage checks` GitHub Actions workflow runs the same health and browser checks with Node.js 22 inside `mcr.microsoft.com/playwright:v1.64.1-noble`, using its bundled Chromium and system dependencies. The workflow's `playwright-version` matrix value must match the installed `@playwright/test` version in `package-lock.json`; an early check fails if they differ. Update both together when upgrading Playwright. The local helper selects its image version directly from the lockfile. CI runs on pushes, pull requests, and manual dispatches, and uploads browser traces and full-page review captures as the `homepage-browser-results` artifact. Browser assertion failures fail the job.

Screenshot baselines depend on the rendering environment. Use the matching Noble container for comparisons rather than Chromium installed on the host. After an intentional design change, generate candidate baselines in that container, copy the three PNGs from `tests/home.spec.ts-snapshots/` back to the repository, and visually review the expected, actual, and diff captures before accepting changes. Run the container helper again without `--update-snapshots` to confirm strict comparisons pass. The helper returns test artifacts, not updated baseline files.

For this CI repair, clean `npm ci`, typechecking, `npm test`, and browser discovery (10 tests from `home.spec.ts` only) passed locally. The Podman container command also passed the health test and all 10 browser tests, including the three existing screenshot comparisons, without updating baselines. `actionlint` validated the workflow. The updated GitHub Actions job still needs its factory-triggered run after publication.

## Health endpoint

`GET /api/health` returns HTTP 200 with an `application/json` response:

```json
{"status":"ok"}
```

This checks that the application can serve requests. It does not depend on external
services or environment variables.

Install dependencies with `npm ci`, then start the local app with `npm run dev` and
check the endpoint:

```sh
curl -i http://localhost:3000/api/health
```

Run the type check and production HTTP integration test:

```sh
npm run typecheck
npm test
```

`npm test` builds the application, starts a production server on an available local
port, checks the health endpoint twice, and stops the server afterward.
Use `npm run test:health` to run the same integration test against an existing
production build. Playwright discovers only `*.spec.ts` files; the health test
uses Node's test runner separately in CI and the container helper.
