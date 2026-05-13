import { z } from "zod";

export const intentSchema = z.enum(["health", "finance", "reminder", "goal", "general"]);
export type Intent = z.infer<typeof intentSchema>;

export const confirmationDraftSchema = z.object({
  intent: intentSchema,
  source: z.literal("dashboard-agent-mock"),
  requiresConfirmation: z.boolean(),
  originalMessage: z.string(),
  action: z.enum(["propose_health_log", "propose_finance_log", "propose_reminder", "propose_goal", "answer"]),
  summary: z.string()
});

export type ConfirmationDraft = z.infer<typeof confirmationDraftSchema>;

export function classifyIntent(message: string): Intent {
  const text = message.toLowerCase();
  if (text.includes("meal") || text.includes("protein") || text.includes("calorie")) return "health";
  if (text.includes("expense") || text.includes("spent") || text.includes("budget") || text.includes("saving")) return "finance";
  if (text.includes("remind") || text.includes("reminder")) return "reminder";
  if (text.includes("goal")) return "goal";
  return "general";
}

export function needsConfirmation(intent: Intent) {
  return ["health", "finance", "reminder", "goal"].includes(intent);
}

export function createConfirmationDraft(intent: Intent, message: string): ConfirmationDraft {
  const base = {
    intent,
    source: "dashboard-agent-mock" as const,
    requiresConfirmation: needsConfirmation(intent),
    originalMessage: message
  };

  if (intent === "health") {
    return confirmationDraftSchema.parse({
      ...base,
      action: "propose_health_log",
      summary: "I can turn that into a meal log after you confirm the calories and protein."
    });
  }

  if (intent === "finance") {
    return confirmationDraftSchema.parse({
      ...base,
      action: "propose_finance_log",
      summary: "I can save this as an expense after you confirm amount, category, and date."
    });
  }

  if (intent === "reminder") {
    return confirmationDraftSchema.parse({
      ...base,
      action: "propose_reminder",
      summary: "I can create this reminder after you confirm the time and channel."
    });
  }

  if (intent === "goal") {
    return confirmationDraftSchema.parse({
      ...base,
      action: "propose_goal",
      summary: "I can help set this goal after asking for any missing target values."
    });
  }

  return confirmationDraftSchema.parse({
    ...base,
    action: "answer",
    summary: "I can answer using the dummy dashboard state for now."
  });
}

export function replyForMessage(message: string) {
  const intent = classifyIntent(message);
  const draft = createConfirmationDraft(intent, message);

  if (intent === "health") {
    return {
      text: "Health mock: you have 1,450 kcal and 82g protein logged. Dinner is still missing. Before saving any new meal, I would show a confirmation card.",
      draft
    };
  }

  if (intent === "finance") {
    return {
      text: "Finance mock: today's spend is Rs. 540, mostly Food and Transport. Before saving an expense, I would ask you to confirm the amount and category.",
      draft
    };
  }

  if (intent === "reminder") {
    return {
      text: "Reminder mock: I can prepare a reminder proposal, but the real backend will save it only after confirmation.",
      draft
    };
  }

  if (intent === "goal") {
    return {
      text: "Goal mock: I would ask for target value, date range, and priority, then create a confirmation step before saving.",
      draft
    };
  }

  return {
    text: "I am using dummy local data right now. API integration comes after frontend, backend, and agent tests are stable.",
    draft
  };
}
