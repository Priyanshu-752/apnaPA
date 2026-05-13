import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const dashboardPage = readFileSync(new URL("../src/app/(dashboard)/dashboard/page.tsx", import.meta.url), "utf8");
const shell = readFileSync(new URL("../src/components/dashboard/dashboard-shell.tsx", import.meta.url), "utf8");
const dashboardScreen = readFileSync(new URL("../src/components/dashboard/screens/dashboard-screen.tsx", import.meta.url), "utf8");
const shared = readFileSync(new URL("../src/components/dashboard/shared.tsx", import.meta.url), "utf8");
const healthScreen = readFileSync(new URL("../src/components/dashboard/screens/health-screen.tsx", import.meta.url), "utf8");
const financeScreen = readFileSync(new URL("../src/components/dashboard/screens/finance-screen.tsx", import.meta.url), "utf8");
const remindersScreen = readFileSync(new URL("../src/components/dashboard/screens/reminders-screen.tsx", import.meta.url), "utf8");
const settingsScreen = readFileSync(new URL("../src/components/dashboard/screens/settings-screen.tsx", import.meta.url), "utf8");
const dialogs = readFileSync(new URL("../src/components/dashboard/dialogs.tsx", import.meta.url), "utf8");
const middleware = readFileSync(new URL("../src/middleware.ts", import.meta.url), "utf8");
const rootPage = readFileSync(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("next app router renders the dashboard component", () => {
  assert.match(dashboardPage, /DashboardScreen/);
});

test("dashboard keeps the main prototype sections after route migration", () => {
  const routeSurface = [dashboardScreen, shared, healthScreen, financeScreen, remindersScreen, settingsScreen, shell, dialogs].join("\n");
  for (const text of [
    "Daily state engine",
    "Weekly trend",
    "Pending reminders",
    "Nutrition progress",
    "Streaks",
    "Active health goal",
    "Finance tracking",
    "Category breakdown",
    "Reminder queue",
    "Automation rules",
    "Edit profile details",
    "Edit details"
  ]) {
    assert.match(routeSurface, new RegExp(text));
  }
});

test("migration uses requested frontend libraries", () => {
  for (const dependency of ["next", "typescript", "tailwindcss", "motion", "zustand", "zod"]) {
    assert.ok(packageJson.dependencies[dependency] || packageJson.devDependencies[dependency], `${dependency} is missing`);
  }
  assert.match(shell, /DashboardShell/);
});

test("frontend is split into guarded auth and dashboard flows", () => {
  assert.match(middleware, /callbackUrl/);
  assert.match(middleware, /PROTECTED_ROUTES/);
  assert.match(rootPage, /redirect/);
});

test("frontend still avoids API integration in the dummy pass", () => {
  assert.doesNotMatch(dashboardScreen, /fetch\(/);
  assert.doesNotMatch(dashboardScreen, /\/api\//);
});
