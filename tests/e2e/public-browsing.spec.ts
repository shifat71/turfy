import { expect, test } from "@playwright/test";

test("public visitors can browse turfs before login", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Turfy Sports Arena" })).toBeVisible();
  await expect(page.getByText("Bashundhara 5v5 Turf")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Open slots ready to book" })).toBeVisible();
  await expect(page.getByRole("link", { name: /View more turfs/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Search" })).toHaveCount(0);

  await page.getByRole("link", { name: "View slots" }).first().click();
  await expect(page.getByRole("heading", { name: "Bashundhara 5v5 Turf" })).toBeVisible();
  await expect(page.getByText("Available slots")).toBeVisible();
});
