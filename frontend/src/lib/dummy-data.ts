import { appDataSchema } from "@/lib/schemas";

const rawAppData = {
  appState: {
    user: {
      name: "Priyanshu",
      authProvider: "Google",
      timezone: "Asia/Kolkata",
      aiStyle: "Clear, practical, and proactive"
    },
    onboardingDone: false,
    telegramLinked: false,
    todayLabel: "Wednesday, May 13"
  },
  navItems: [
    { id: "dashboard", label: "Dashboard", icon: "D", count: 4 },
    { id: "health", label: "Health", icon: "H", count: 3 },
    { id: "finance", label: "Finance", icon: "F", count: 2 },
    { id: "reminders", label: "Reminders", icon: "R", count: 5 },
    { id: "memory", label: "Memory", icon: "M", count: 8 },
    { id: "settings", label: "Settings", icon: "S" }
  ],
  metrics: [
    { label: "Calories", value: "1,450", badge: "74%", tone: "teal", progress: 74, note: "550 kcal left against today's target." },
    { label: "Protein", value: "82g", badge: "On track", tone: "green", progress: 82, note: "18g left to reach the daily protein goal." },
    { label: "Expenses", value: "Rs. 540", badge: "Today", tone: "amber", progress: 44, note: "Food and transport are the main categories." },
    { label: "Goal progress", value: "68%", badge: "Daily", tone: "blue", progress: 68, note: "Health is strong; finance logging is incomplete." }
  ],
  meals: [
    { meal: "Breakfast", items: "Poha, tea", calories: 380, protein: 12, time: "08:20" },
    { meal: "Lunch", items: "Dal, rice, curd", calories: 720, protein: 34, time: "13:40" },
    { meal: "Snack", items: "Banana, peanuts", calories: 350, protein: 36, time: "17:15" }
  ],
  expenses: [
    { category: "Food", note: "Lunch outside", amount: 260, time: "13:45" },
    { category: "Transport", note: "Metro recharge", amount: 200, time: "10:05" },
    { category: "Utilities", note: "Mobile data add-on", amount: 80, time: "18:30" }
  ],
  reminders: [
    { title: "Dinner log", time: "21:00", status: "Pending", tone: "coral" },
    { title: "Water check", time: "19:30", status: "Due soon", tone: "teal" },
    { title: "Expense review", time: "22:00", status: "Scheduled", tone: "amber" },
    { title: "Plan tomorrow", time: "22:30", status: "Scheduled", tone: "blue" },
    { title: "Sleep wind-down", time: "23:00", status: "Scheduled", tone: "green" }
  ],
  memories: [
    { type: "Preference", summary: "Prefers concise daily summaries at night." },
    { type: "Goal", summary: "Wants high-protein meals while staying near 2,000 kcal." },
    { type: "Routine", summary: "Usually logs lunch around 2 PM and expenses in the evening." },
    { type: "Finance pattern", summary: "Food and transport are the most frequent daily categories." }
  ],
  activity: [
    { title: "Lunch logged", meta: "720 kcal, 34g protein", tone: "green" },
    { title: "Expense added", meta: "Rs. 260 in Food", tone: "amber" },
    { title: "Memory updated", meta: "Night summary preference", tone: "blue" },
    { title: "Reminder pending", meta: "Dinner log at 9 PM", tone: "coral" }
  ],
  healthSummaries: [
    { date: "May 12", iso: "2026-05-12", calories: 1450, protein: "82g", meals: 3, goal: "Dinner missing", summary: "Strong protein progress, calories available.", tone: "amber" },
    { date: "May 11", iso: "2026-05-11", calories: 1920, protein: "104g", meals: 4, goal: "Met", summary: "Balanced day with complete logs.", tone: "green" },
    { date: "May 10", iso: "2026-05-10", calories: 1760, protein: "91g", meals: 3, goal: "Close", summary: "Protein slightly under target.", tone: "teal" }
  ],
  financeSummaries: [
    { date: "May 12", iso: "2026-05-12", spent: "Rs. 540", saved: "Rs. 1,200", top: "Food", transactions: 3, summary: "Good control, verify cash expenses." },
    { date: "May 11", iso: "2026-05-11", spent: "Rs. 1,180", saved: "Rs. 600", top: "Travel", transactions: 5, summary: "Travel spend was above usual." },
    { date: "May 10", iso: "2026-05-10", spent: "Rs. 420", saved: "Rs. 1,500", top: "Food", transactions: 2, summary: "Low-spend day with healthy savings." }
  ],
  weeklyTrend: [
    { day: "Mon", height: 118, tone: "teal" },
    { day: "Tue", height: 86, tone: "amber" },
    { day: "Wed", height: 132, tone: "teal" },
    { day: "Thu", height: 64, tone: "coral" },
    { day: "Fri", height: 146, tone: "teal" },
    { day: "Sat", height: 102, tone: "amber" },
    { day: "Sun", height: 124, tone: "teal" }
  ],
  dashboardReminders: [
    { title: "Log dinner", meta: "Due 8:30 PM via Telegram" },
    { title: "Finance check", meta: "Ask if there were cash expenses" }
  ],
  healthProgress: [
    { title: "Calories", meta: "1,450 of 2,000 kcal", value: "550 left" },
    { title: "Protein", meta: "82 of 100 grams", value: "18g left" }
  ],
  healthStreaks: [
    { title: "Meal logs", meta: "Logged 6 days in a row", badge: "6d", tone: "green" },
    { title: "Hydration", meta: "2.1L recorded today", badge: "70%", tone: "teal" },
    { title: "Sleep target", meta: "Wake time aligned", badge: "Good", tone: "blue" }
  ],
  healthSuggestions: [
    { title: "Protein", meta: "Raise to 105g after 5 consistent days", tone: "green" },
    { title: "Hydration", meta: "Move from 2.8L to 3.0L slowly", tone: "teal" }
  ],
  financeMetrics: [
    { label: "Today spent", value: "Rs. 540", badge: "44%", tone: "amber", progress: 44, note: "Within daily budget, but food spending is higher than usual." },
    { label: "Monthly spend", value: "Rs. 18,420", badge: "72%", tone: "coral", progress: 72, note: "Eight days left in the budget cycle." },
    { label: "Savings goal", value: "62%", badge: "On track", tone: "green", progress: 62, note: "Needs Rs. 7,600 more this month." }
  ],
  categoryBreakdown: [
    { category: "Food", value: "Rs. 7,200", tone: "coral", progress: 76 },
    { category: "Travel", value: "Rs. 3,800", tone: "amber", progress: 48 },
    { category: "Bills", value: "Rs. 5,600", tone: "teal", progress: 64 },
    { category: "Other", value: "Rs. 1,820", tone: "green", progress: 28 }
  ],
  financeSuggestions: [
    { title: "Food cap", meta: "Keep this month under Rs. 8,000", tone: "amber" },
    { title: "Savings", meta: "Increase target after income confirmation", tone: "green" }
  ],
  automationRules: [
    { title: "Meal missing", meta: "Check lunch and dinner logs", tone: "teal" },
    { title: "Inactive user", meta: "No activity for 24 hours", tone: "amber" },
    { title: "Weekly summary", meta: "Generate every Sunday", tone: "green" }
  ],
  settings: [
    { label: "Timezone", value: "Asia/Kolkata" },
    { label: "AI style", value: "Clear, practical, proactive" },
    { label: "Refresh tokens", value: "Backend-owned later" },
    { label: "Data mode", value: "Dummy local state" }
  ],
  manualEntrySpecs: {
    meal: {
      title: "Log meal",
      fields: ["Date", "Time", "Meal type", "Food items", "Calories", "Protein", "Notes"]
    },
    expense: {
      title: "Add expense",
      fields: ["Date", "Amount", "Currency", "Category", "Payment method", "Note"]
    }
  }
} as const;

export const appData = appDataSchema.parse(rawAppData);

export const {
  activity,
  appState,
  automationRules,
  categoryBreakdown,
  dashboardReminders,
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
  memories,
  metrics,
  navItems,
  reminders,
  settings,
  weeklyTrend
} = appData;
