"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Bot, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  completeOnboarding as completeOnboardingRequest,
  confirmTelegramLink,
  createFinanceLog,
  createGoal,
  createHealthLog,
  fetchTelegramLinkToken,
  saveProfile as saveProfileRequest,
} from "@/lib/api";
import { appState, expenses, manualEntrySpecs, meals } from "@/lib/dummy-data";
import { chatMessageSchema, manualEntrySchema, profileSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { ListItem, SetupRow } from "@/components/dashboard/shared";

function goalFields(domain: "health" | "finance", useSuggestion = false) {
  if (domain === "health") {
    return [
      ["Calories target", useSuggestion ? "2,050" : "2,000"],
      ["Protein target", useSuggestion ? "105g" : "100g"],
      ["Hydration target", useSuggestion ? "3.0L" : "2.8L"],
      ["Streak target", "6 days"]
    ] as const;
  }

  return [
    ["Monthly budget", "25,000"],
    ["Savings target", useSuggestion ? "22,000" : "20,000"],
    ["Food cap", "8,000"],
    ["Alert threshold", "80%"]
  ] as const;
}

export function DashboardDialogs() {
  const dialog = useAppStore((state) => state.dialog);
  const closeDialog = useAppStore((state) => state.closeDialog);

  return (
    <>
      <AgentDialog open={dialog === "agent"} onClose={closeDialog} />
      <DetailDialog open={dialog === "detail"} onClose={closeDialog} />
      <GoalDialog open={dialog === "goal"} onClose={closeDialog} />
      <TelegramDialog open={dialog === "telegram"} onClose={closeDialog} />
      <OnboardingDialog open={dialog === "onboarding"} onClose={closeDialog} />
      <EntryDialog open={dialog === "entry"} onClose={closeDialog} />
      <ProfileDialog open={dialog === "profile"} onClose={closeDialog} />
    </>
  );
}

function AgentDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const chatMessages = useAppStore((state) => state.chatMessages);
  const sendAgentMessage = useAppStore((state) => state.sendAgentMessage);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = chatMessageSchema.safeParse(value);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid message");
      return;
    }

    setIsSending(true);
    try {
      await sendAgentMessage(parsed.data);
      setValue("");
      setError(null);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="Ask apnaPA" kicker="Dashboard Agent">
      <div className="grid gap-3">
        <div className="grid max-h-80 min-h-72 content-start gap-3 overflow-auto rounded-lg border bg-secondary p-3">
          {chatMessages.map((message) => (
            <article className={cn("max-w-[82%] rounded-lg border bg-card p-3 text-sm", message.role === "user" && "justify-self-end border-primary bg-primary text-primary-foreground")} key={message.id}>
              {message.text}
              {message.meta ? <small className={cn("mt-2 block text-muted-foreground", message.role === "user" && "text-white/75")}>{message.meta}</small> : null}
            </article>
          ))}
        </div>
        <form className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]" onSubmit={onSubmit}>
          <Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Ask about meals, expenses, goals, or reminders" />
          <Button type="submit" variant="primary" disabled={isSending}><Send className="h-4 w-4" />{isSending ? "Sending..." : "Send"}</Button>
        </form>
        {error ? <p className="text-sm font-bold text-coral">{error}</p> : null}
      </div>
    </Dialog>
  );
}

function DetailDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const detailTarget = useAppStore((state) => state.detailTarget);
  const isHealth = detailTarget?.domain === "health";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`${isHealth ? "Health" : "Finance"} summary for ${detailTarget?.date ?? ""}`}
      kicker={isHealth ? "Health daily detail" : "Finance daily detail"}
      description="Review summarized data first, then inspect detailed logs for the selected date."
      className="max-w-4xl"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-none">
          <CardTitle>{isHealth ? "Meals" : "Transactions"}</CardTitle>
          <div className="mt-3 grid gap-3">
            {isHealth
              ? meals.map((meal) => <ListItem key={meal.meal} title={meal.meal} meta={`${meal.items} - ${meal.calories} kcal - ${meal.protein}g protein`} tone="green" />)
              : expenses.map((expense) => <ListItem key={expense.note} title={expense.category} meta={`${expense.note} - Rs. ${expense.amount} - ${expense.time}`} tone="amber" />)}
          </div>
        </Card>
        <Card className="shadow-none">
          <CardTitle>Goal progress</CardTitle>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {isHealth
              ? "Calories are 74% complete and protein is 82% complete. Dinner is still missing."
              : "Spending is within today's budget. The Agent should verify cash expenses before closing the day."}
          </p>
        </Card>
      </div>
    </Dialog>
  );
}

function GoalDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const domain = useAppStore((state) => state.activeGoalDomain);
  const showToast = useAppStore((state) => state.showToast);
  const [useSuggestion, setUseSuggestion] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isHealth = domain === "health";
  const fields = goalFields(domain, useSuggestion);

  useEffect(() => {
    if (open) setUseSuggestion(false);
  }, [open, domain]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const target = fields.map(([label]) => `${label}: ${String(values[label] ?? "").trim()}`).join(", ");

    setIsSaving(true);
    try {
      const payload = await createGoal({
        title: isHealth ? "Health goal" : "Finance goal",
        target,
      });
      onClose();
      showToast({ tone: "success", title: "Goal saved", message: payload.message });
    } catch (error) {
      showToast({
        tone: "error",
        title: "Goal error",
        message: error instanceof Error ? error.message : "Goal could not be saved.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={isHealth ? "Set health goal" : "Set finance goal"}
      kicker={isHealth ? "Health goal" : "Finance goal"}
      description="AI suggestions are optional. The user chooses what gets saved."
      className="max-w-4xl"
    >
      <form className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          {fields.map(([label, value]) => (
            <label className="grid gap-1 text-xs font-bold text-muted-foreground" key={label}>
              {label}
              <Input name={label} defaultValue={value} />
            </label>
          ))}
        </div>
        <aside className="grid content-start gap-3 rounded-lg border bg-secondary p-3">
          <span className="small-label">AI suggestion</span>
          <h3 className="font-extrabold">{isHealth ? "Raise protein after consistency" : "Confirm income before raising savings"}</h3>
          <p className="text-sm leading-6 text-muted-foreground">
            {isHealth
              ? "Suggested: 105g protein and 3.0L hydration after five consistent days."
              : "Suggested: keep the food cap stable and raise savings only after fixed expenses are confirmed."}
          </p>
          <Button
            type="button"
            onClick={() => {
              setUseSuggestion(true);
              showToast({ tone: "info", title: "Suggestion applied", message: "The suggested values were copied into the goal form." });
            }}
          >
            <Bot className="h-4 w-4" />
            Use suggestion
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}><Save className="h-4 w-4" />{isSaving ? "Saving..." : "Save user goal"}</Button>
        </aside>
      </form>
    </Dialog>
  );
}

function TelegramDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const setTelegramLinked = useAppStore((state) => state.setTelegramLinked);
  const showToast = useAppStore((state) => state.showToast);
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [expiresInMinutes, setExpiresInMinutes] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    async function loadToken() {
      setIsLoading(true);
      try {
        const payload = await fetchTelegramLinkToken();
        if (cancelled) return;
        setLinkToken(payload.linkToken ?? null);
        setExpiresInMinutes(payload.expiresInMinutes ?? null);
      } catch (error) {
        if (cancelled) return;
        showToast({
          tone: "error",
          title: "Telegram error",
          message: error instanceof Error ? error.message : "Telegram link token could not be generated.",
        });
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadToken();
    return () => {
      cancelled = true;
    };
  }, [open, showToast]);

  async function handleConfirm() {
    setIsLinking(true);
    try {
      const payload = await confirmTelegramLink();
      setTelegramLinked(true);
      showToast({ tone: "success", title: "Telegram connected", message: payload.message });
    } catch (error) {
      showToast({
        tone: "error",
        title: "Telegram error",
        message: error instanceof Error ? error.message : "Telegram could not be connected.",
      });
    } finally {
      setIsLinking(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="Connect Telegram" kicker="Telegram">
      <div className="grid gap-4">
        <p className="text-sm leading-6 text-muted-foreground">
          The backend now generates the session-scoped link token for this flow. Telegram confirmation is still a placeholder, but the success and error states are coming from the API.
        </p>
        <div className="grid gap-3">
          <SetupRow label="Dashboard generates token" tone="green" value={isLoading ? "Loading" : "Ready"} />
          <SetupRow label="User opens Telegram bot" tone="amber" value={linkToken ? "Next" : "Pending"} />
          <SetupRow label="Backend validates telegram_id" tone="teal" value="Placeholder" />
        </div>
        <div className="rounded-lg border bg-secondary p-3 text-sm">
          <p className="font-extrabold">Link token</p>
          <p className="mt-2 break-all text-muted-foreground">{linkToken ?? "Generating..."}</p>
          {expiresInMinutes ? <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Expires in {expiresInMinutes} minutes</p> : null}
        </div>
        <Button type="button" variant="primary" disabled={isLoading || isLinking || !linkToken} onClick={handleConfirm}>
          {isLinking ? "Connecting..." : "Confirm Telegram connection"}
        </Button>
      </div>
    </Dialog>
  );
}

function OnboardingDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const setOnboardingDone = useAppStore((state) => state.setOnboardingDone);
  const profile = useAppStore((state) => state.profile);
  const showToast = useAppStore((state) => state.showToast);
  const [isSaving, setIsSaving] = useState(false);

  async function handleComplete() {
    setIsSaving(true);
    try {
      const payload = await completeOnboardingRequest();
      setOnboardingDone(true);
      showToast({ tone: "success", title: "Onboarding complete", message: payload.message });
    } catch (error) {
      showToast({
        tone: "error",
        title: "Onboarding error",
        message: error instanceof Error ? error.message : "Onboarding could not be completed.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title="Complete profile setup" kicker="Onboarding">
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">Timezone<Input defaultValue={profile.timezone} /></label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">Daily calories<Input defaultValue="2000" /></label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">Protein goal<Input defaultValue="100g" /></label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">Monthly savings<Input defaultValue="15000" /></label>
        </div>
        <Button type="button" variant="primary" disabled={isSaving} onClick={handleComplete}>{isSaving ? "Saving..." : "Mark onboarding complete"}</Button>
      </div>
    </Dialog>
  );
}

function EntryDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const type = useAppStore((state) => state.activeEntryType);
  const showToast = useAppStore((state) => state.showToast);
  const openAgent = useAppStore((state) => state.openAgent);
  const spec = manualEntrySpecs[type];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) setErrors({});
  }, [open, type]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const parsed = manualEntrySchema(spec.fields).safeParse(values);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }

    setErrors({});
    setIsSaving(true);

    try {
      if (type === "meal") {
        const calories = Number(values["Calories"]);
        const protein = Number(values["Protein"]);
        if (Number.isNaN(calories) || Number.isNaN(protein)) {
          setErrors({
            Calories: "Calories must be a number",
            Protein: "Protein must be a number",
          });
          return;
        }
        const payload = await createHealthLog({
          meal: `${values["Meal type"]}: ${values["Food items"]}`,
          calories,
          proteinGrams: protein,
        });
        onClose();
        showToast({ tone: "success", title: "Meal logged", message: payload.message });
        return;
      }

      const amount = Number(values["Amount"]);
      if (Number.isNaN(amount)) {
        setErrors({ Amount: "Amount must be a number" });
        return;
      }
      const payload = await createFinanceLog({
        category: String(values["Category"]),
        amount,
        note: String(values["Note"]),
      });
      onClose();
      showToast({ tone: "success", title: "Expense saved", message: payload.message });
    } catch (error) {
      showToast({
        tone: "error",
        title: type === "meal" ? "Meal error" : "Expense error",
        message: error instanceof Error ? error.message : "The entry could not be saved.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function askAgent() {
    onClose();
    openAgent(type === "meal" ? "Help me log my meal" : "Help me log an expense");
  }

  return (
    <Dialog open={open} onClose={onClose} title={spec.title} kicker={type === "meal" ? "Health manual entry" : "Finance manual entry"} description="Manual entries now validate in the UI and then submit to the FastAPI backend.">
      <form className="grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          {spec.fields.map((field) => (
            <label className="grid gap-1 text-xs font-bold text-muted-foreground" key={field}>
              {field}
              <Input name={field} placeholder={field} />
              {errors[field] ? <span className="text-coral">{errors[field]}</span> : null}
            </label>
          ))}
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" onClick={askAgent}>Use Agent instead</Button>
          <Button type="submit" variant="primary" disabled={isSaving}>{isSaving ? "Saving..." : "Save entry"}</Button>
        </div>
      </form>
    </Dialog>
  );
}

function ProfileDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const profile = useAppStore((state) => state.profile);
  const saveProfile = useAppStore((state) => state.saveProfile);
  const showToast = useAppStore((state) => state.showToast);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) setErrors({});
  }, [open]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
    const parsed = profileSchema.safeParse(formData);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message])));
      return;
    }

    setIsSaving(true);
    try {
      const payload = await saveProfileRequest({
        timezone: parsed.data.timezone,
        aiStyle: parsed.data.aiStyle,
      });
      saveProfile(payload.user);
      showToast({ tone: "success", title: "Profile updated", message: payload.message });
    } catch (error) {
      showToast({
        tone: "error",
        title: "Profile error",
        message: error instanceof Error ? error.message : "Profile update failed.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Edit profile details"
      kicker="Profile"
      description="Update the core details the dashboard uses to personalize the experience."
    >
      <form className="grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">
            Name
            <Input name="name" defaultValue={profile.name} placeholder="Your name" readOnly />
            <span className="text-xs font-medium text-muted-foreground">Managed by your Google account for now.</span>
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">
            Provider
            <Input name="authProvider" defaultValue={profile.authProvider} placeholder="Google" readOnly />
            <span className="text-xs font-medium text-muted-foreground">Managed by the authenticated provider.</span>
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">
            Timezone
            <Input name="timezone" defaultValue={profile.timezone} placeholder="Asia/Kolkata" />
            {errors.timezone ? <span className="text-coral">{errors.timezone}</span> : null}
          </label>
          <label className="grid gap-1 text-xs font-bold text-muted-foreground">
            AI style
            <Input name="aiStyle" defaultValue={profile.aiStyle} placeholder="Clear, practical, and proactive" />
            {errors.aiStyle ? <span className="text-coral">{errors.aiStyle}</span> : null}
          </label>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save profile"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
