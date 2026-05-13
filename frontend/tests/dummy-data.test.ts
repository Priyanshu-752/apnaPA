import test from "node:test";
import assert from "node:assert/strict";
import {
  appData,
  automationRules,
  categoryBreakdown,
  expenses,
  financeMetrics,
  financeSuggestions,
  financeSummaries,
  healthProgress,
  healthStreaks,
  healthSuggestions,
  healthSummaries,
  manualEntrySpecs,
  meals,
  metrics,
  navItems,
  reminders,
  weeklyTrend
} from "../src/lib/dummy-data";
import { appDataSchema, manualEntrySchema } from "../src/lib/schemas";

test("dummy data is validated through zod", () => {
  assert.doesNotThrow(() => appDataSchema.parse(appData));
});

test("dashboard has the expected primary navigation modules", () => {
  assert.deepEqual(
    navItems.map((item) => item.id),
    ["dashboard", "health", "finance", "reminders", "memory", "settings"]
  );
});

test("dummy dashboard data covers core MVP domains", () => {
  assert.ok(metrics.length >= 4);
  assert.ok(meals.length >= 3);
  assert.ok(expenses.length >= 3);
  assert.ok(reminders.length >= 5);
  assert.ok(healthSummaries.length >= 3);
  assert.ok(financeSummaries.length >= 3);
  assert.ok(weeklyTrend.length === 7);
  assert.ok(healthProgress.length >= 2);
  assert.ok(healthStreaks.length >= 3);
  assert.ok(healthSuggestions.length >= 2);
  assert.ok(financeMetrics.length >= 3);
  assert.ok(categoryBreakdown.length >= 4);
  assert.ok(financeSuggestions.length >= 2);
  assert.ok(automationRules.length >= 3);
});

test("manual entry specs exist for meal and expense forms", () => {
  assert.ok(manualEntrySpecs.meal.fields.includes("Food items"));
  assert.ok(manualEntrySpecs.meal.fields.includes("Protein"));
  assert.ok(manualEntrySpecs.expense.fields.includes("Amount"));
  assert.ok(manualEntrySpecs.expense.fields.includes("Category"));
});

test("manual entry zod schemas require form values", () => {
  const schema = manualEntrySchema(manualEntrySpecs.meal.fields);
  assert.equal(schema.safeParse({}).success, false);
});
