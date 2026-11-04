import { expect, test } from "@playwright/test";

test("homepage content, destinations, images, and runtime are healthy", async ({
  page,
}) => {
  const failures: string[] = [];
  page.on("pageerror", (error) => failures.push(error.message));
  page.on("response", (response) => {
    if (response.url().includes("/home/") && !response.ok())
      failures.push(response.url());
  });
  page.on("requestfailed", (request) => {
    if (request.url().includes("/home/")) failures.push(request.url());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Factory — Your next chapter, built with technology",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  for (const id of [
    "work",
    "services",
    "approach",
    "faq",
    "contact",
    "community",
  ]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter(
          (href) => href !== "#" && !document.getElementById(href.slice(1)),
        ),
    );
  expect(brokenAnchors).toEqual([]);
  await page.getByRole("link", { name: "Let’s build what’s next" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("heading", {
      name: "Big ambition? You’re in good company.",
    }),
  ).toBeInViewport();
  await page.getByRole("link", { name: "Find your starting point" }).click();
  await expect(page).toHaveURL(/#services$/);
  await expect(
    page.getByRole("heading", {
      name: "Built for your business. Ready for what’s next.",
    }),
  ).toBeInViewport();
  const images = page.locator('img[src^="/home/"]');
  await expect(images).toHaveCount(3);
  for (const image of await images.all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toHaveJSProperty("complete", true);
    expect(
      await image.evaluate(
        (element) => (element as HTMLImageElement).naturalWidth,
      ),
    ).toBeGreaterThan(0);
    await expect(image).toHaveAttribute("alt", /Concept/);
  }
  expect(failures).toEqual([]);
});

test("FAQ can be operated with the keyboard", async ({ page }) => {
  await page.goto("/");
  const disclosure = page.locator("details").first();
  const summary = disclosure.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(disclosure).toHaveAttribute("open", "");
  await expect(disclosure.locator("p")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(disclosure).not.toHaveAttribute("open", "");
});

test("navigation adapts to the viewport and supports keyboard dismissal", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /navigation/ });
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  if (testInfo.project.name === "desktop") {
    await expect(nav).toBeVisible();
    await expect(toggle).toBeHidden();
    return;
  }
  await expect(nav).toBeHidden();
  await toggle.focus();
  await page.keyboard.press("Enter");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(nav.getByRole("link", { name: "Our work" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await nav.getByRole("link", { name: "Our work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(nav).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("layout fits narrow phones, tablets, and desktop", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const size = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }));
    expect(
      size.content,
      `horizontal overflow at ${width}px`,
    ).toBeLessThanOrEqual(size.width);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

// Capture review artifacts until desktop/mobile baselines can be visually approved.
test("capture homepage for visual review", async ({ page }, testInfo) => {
  await page.clock.setFixedTime(new Date("2026-11-04T12:00:00Z"));
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    images.forEach((image) => (image.loading = "eager"));
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.addStyleTag({
    content: "nextjs-portal { display: none !important; }",
  });
  const widths = testInfo.project.name === "desktop" ? [1440, 768] : [390];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    const screenshot = await page.screenshot({
      fullPage: true,
      animations: "disabled",
    });
    await testInfo.attach(`homepage-${width}px`, {
      body: screenshot,
      contentType: "image/png",
    });
  }
});
