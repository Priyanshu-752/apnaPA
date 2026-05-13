import { z } from "zod";

export const toneSchema = z.enum(["teal", "green", "amber", "blue", "coral"]);
export type Tone = z.infer<typeof toneSchema>;

export const navItemSchema = z.object({
  id: z.enum(["dashboard", "health", "finance", "reminders", "memory", "settings"]),
  label: z.string(),
  icon: z.string(),
  count: z.number().optional()
});

export const metricSchema = z.object({
  label: z.string(),
  value: z.string(),
  badge: z.string(),
  tone: toneSchema,
  progress: z.number().min(0).max(100),
  note: z.string()
});

export const manualEntrySpecsSchema = z.object({
  meal: z.object({
    title: z.string(),
    fields: z.array(z.string()).min(1)
  }),
  expense: z.object({
    title: z.string(),
    fields: z.array(z.string()).min(1)
  })
});

export const appDataSchema = z.object({
  appState: z.object({
    user: z.object({
      name: z.string(),
      authProvider: z.string(),
      timezone: z.string(),
      aiStyle: z.string()
    }),
    onboardingDone: z.boolean(),
    telegramLinked: z.boolean(),
    todayLabel: z.string()
  }),
  navItems: z.array(navItemSchema).min(6),
  metrics: z.array(metricSchema).min(4),
  meals: z.array(
    z.object({
      meal: z.string(),
      items: z.string(),
      calories: z.number(),
      protein: z.number(),
      time: z.string()
    })
  ),
  expenses: z.array(
    z.object({
      category: z.string(),
      note: z.string(),
      amount: z.number(),
      time: z.string()
    })
  ),
  reminders: z.array(z.object({ title: z.string(), time: z.string(), status: z.string(), tone: toneSchema })),
  memories: z.array(z.object({ type: z.string(), summary: z.string() })),
  activity: z.array(z.object({ title: z.string(), meta: z.string(), tone: toneSchema })),
  healthSummaries: z.array(
    z.object({
      date: z.string(),
      iso: z.string(),
      calories: z.number(),
      protein: z.string(),
      meals: z.number(),
      goal: z.string(),
      summary: z.string(),
      tone: toneSchema
    })
  ),
  financeSummaries: z.array(
    z.object({
      date: z.string(),
      iso: z.string(),
      spent: z.string(),
      saved: z.string(),
      top: z.string(),
      transactions: z.number(),
      summary: z.string()
    })
  ),
  weeklyTrend: z.array(z.object({ day: z.string(), height: z.number(), tone: toneSchema })).length(7),
  dashboardReminders: z.array(z.object({ title: z.string(), meta: z.string() })),
  healthProgress: z.array(z.object({ title: z.string(), meta: z.string(), value: z.string() })),
  healthStreaks: z.array(z.object({ title: z.string(), meta: z.string(), badge: z.string(), tone: toneSchema })),
  healthSuggestions: z.array(z.object({ title: z.string(), meta: z.string(), tone: toneSchema })),
  financeMetrics: z.array(metricSchema).min(3),
  categoryBreakdown: z.array(z.object({ category: z.string(), value: z.string(), tone: toneSchema, progress: z.number().min(0).max(100) })),
  financeSuggestions: z.array(z.object({ title: z.string(), meta: z.string(), tone: toneSchema })),
  automationRules: z.array(z.object({ title: z.string(), meta: z.string(), tone: toneSchema })),
  settings: z.array(z.object({ label: z.string(), value: z.string() })),
  manualEntrySpecs: manualEntrySpecsSchema
});

export const chatMessageSchema = z.string().trim().min(1, "Message cannot be empty").max(600, "Message is too long");

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  authProvider: z.string().trim().min(2, "Provider is required"),
  timezone: z.string().trim().min(3, "Timezone is required"),
  aiStyle: z.string().trim().min(8, "AI style is required")
});

export function manualEntrySchema(fields: string[]) {
  const shape = Object.fromEntries(fields.map((field) => [field, z.string().trim().min(1, `${field} is required`)]));
  return z.object(shape);
}

export type AppData = z.infer<typeof appDataSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type ManualEntryType = keyof z.infer<typeof manualEntrySpecsSchema>;
