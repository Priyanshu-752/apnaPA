"use client";

import { create } from "zustand";
import { chatWithAgent } from "@/lib/api";
import { appState } from "@/lib/dummy-data";
import type { AppProfile, DashboardActivityItem, DashboardBootstrap, DashboardOverview, ToastTone } from "@/lib/api-types";
import type { ManualEntryType } from "@/lib/schemas";

export type DialogId = "agent" | "detail" | "goal" | "telegram" | "onboarding" | "entry" | "profile" | null;
export type RangeValue = "today" | "week" | "month" | "custom";
export type BootstrapStatus = "idle" | "loading" | "ready" | "error";

type ChatMessage = {
  id: string;
  role: "user" | "agent";
  text: string;
  meta?: string;
};

type DetailTarget = {
  domain: "health" | "finance";
  date: string;
} | null;

type Profile = AppProfile;

type ToastState = {
  id: string;
  tone: ToastTone;
  title?: string;
  message: string;
};

type ToastInput =
  | string
  | {
      tone?: ToastTone;
      title?: string;
      message: string;
    };

type AppStore = {
  dialog: DialogId;
  profile: Profile;
  onboardingDone: boolean;
  telegramLinked: boolean;
  todayLabel: string;
  overview: DashboardOverview;
  activityFeed: DashboardActivityItem[];
  insights: string[];
  bootstrapStatus: BootstrapStatus;
  activeEntryType: ManualEntryType;
  activeGoalDomain: "health" | "finance";
  detailTarget: DetailTarget;
  ranges: Record<"health" | "finance", RangeValue>;
  chatMessages: ChatMessage[];
  completedReminders: string[];
  toast: ToastState | null;
  openDialog: (dialog: Exclude<DialogId, null>) => void;
  closeDialog: () => void;
  openAgent: (seed?: string) => void;
  sendAgentMessage: (message: string) => Promise<void>;
  openEntry: (type: ManualEntryType) => void;
  openGoal: (domain: "health" | "finance") => void;
  openDetail: (target: DetailTarget) => void;
  saveProfile: (profile: Profile) => void;
  setOnboardingDone: (value: boolean) => void;
  setTelegramLinked: (value: boolean) => void;
  setRange: (domain: "health" | "finance", range: RangeValue) => void;
  completeReminder: (title: string) => void;
  showToast: (toast: ToastInput) => void;
  clearToast: () => void;
  setBootstrapStatus: (status: BootstrapStatus) => void;
  initializeApp: (payload: DashboardBootstrap) => void;
  resetLocalState: () => void;
};

const initialProfile: Profile = {
  userId: "demo-user",
  email: "demo@example.apnapa",
  name: appState.user.name,
  authProvider: appState.user.authProvider,
  timezone: appState.user.timezone,
  aiStyle: appState.user.aiStyle,
  onboardingComplete: appState.onboardingDone,
  telegramLinked: appState.telegramLinked,
};

const initialOverview: DashboardOverview = {
  todayLabel: appState.todayLabel,
  healthSummary: "Health dashboard placeholder for the signed-in user.",
  financeSummary: "Finance dashboard placeholder with budgets and trends later.",
  reminderSummary: "Reminder dashboard placeholder with upcoming queue later.",
};

const initialOnboardingDone = appState.onboardingDone;
const initialTelegramLinked = appState.telegramLinked;
const id = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

function toToastState(input: ToastInput): ToastState {
  if (typeof input === "string") {
    return { id: id(), tone: "info", message: input };
  }

  return {
    id: id(),
    tone: input.tone ?? "info",
    title: input.title,
    message: input.message,
  };
}

function formatAgentMeta(reply: {
  intent: string;
  requiresConfirmation: boolean;
  selectedAgent: string;
  missingFields: string[];
}) {
  if (reply.requiresConfirmation && reply.missingFields.length) {
    return `Needs confirmation. Missing: ${reply.missingFields.join(", ")}.`;
  }
  if (reply.requiresConfirmation) {
    return `Needs confirmation. Routed by ${reply.selectedAgent}.`;
  }
  return `Handled by ${reply.selectedAgent}. Intent: ${reply.intent}.`;
}

export const useAppStore = create<AppStore>((set, get) => ({
  dialog: null,
  profile: initialProfile,
  onboardingDone: initialOnboardingDone,
  telegramLinked: initialTelegramLinked,
  todayLabel: initialOverview.todayLabel,
  overview: initialOverview,
  activityFeed: [],
  insights: [],
  bootstrapStatus: "idle",
  activeEntryType: "meal",
  activeGoalDomain: "health",
  detailTarget: null,
  ranges: { health: "today", finance: "today" },
  chatMessages: [],
  completedReminders: [],
  toast: null,
  openDialog: (dialog) => set({ dialog }),
  closeDialog: () => set({ dialog: null }),
  openAgent: (seed = "") => {
    const current = get();
    if (!current.chatMessages.length) {
      set({
        chatMessages: [
          {
            id: id(),
            role: "agent",
            text: "Agent connected. Ask about meals, expenses, goals, reminders, or your day.",
            meta: "Responses are coming from the backend orchestrator."
          }
        ],
        dialog: "agent"
      });
    } else {
      set({ dialog: "agent" });
    }
    if (seed) {
      void get().sendAgentMessage(seed);
    }
  },
  sendAgentMessage: async (message) => {
    const text = message.trim();
    if (!text) return;

    set((state) => ({
      chatMessages: [...state.chatMessages, { id: id(), role: "user", text }]
    }));

    try {
      const payload = await chatWithAgent({ message: text, source: "dashboard" });
      set((state) => ({
        chatMessages: [
          ...state.chatMessages,
          {
            id: id(),
            role: "agent",
            text: payload.reply.text,
            meta: formatAgentMeta(payload.reply)
          }
        ]
      }));
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "The agent could not answer right now.";
      get().showToast({ tone: "error", title: "Agent error", message: messageText });
    }
  },
  openEntry: (activeEntryType) => set({ activeEntryType, dialog: "entry" }),
  openGoal: (activeGoalDomain) => set({ activeGoalDomain, dialog: "goal" }),
  openDetail: (detailTarget) => set({ detailTarget, dialog: "detail" }),
  saveProfile: (profile) =>
    set({
      profile,
      onboardingDone: profile.onboardingComplete,
      telegramLinked: profile.telegramLinked,
      dialog: null,
    }),
  setOnboardingDone: (value) =>
    set((state) => ({
      onboardingDone: value,
      profile: { ...state.profile, onboardingComplete: value },
      dialog: null,
    })),
  setTelegramLinked: (value) =>
    set((state) => ({
      telegramLinked: value,
      profile: { ...state.profile, telegramLinked: value },
      dialog: null,
    })),
  setRange: (domain, range) => set((state) => ({ ranges: { ...state.ranges, [domain]: range } })),
  completeReminder: (title) => {
    set((state) => ({ completedReminders: [...new Set([...state.completedReminders, title])] }));
    get().showToast({ tone: "success", message: "Reminder marked as done." });
  },
  showToast: (toast) => set({ toast: toToastState(toast) }),
  clearToast: () => set({ toast: null }),
  setBootstrapStatus: (bootstrapStatus) => set({ bootstrapStatus }),
  initializeApp: (payload) =>
    set({
      profile: payload.user,
      onboardingDone: payload.user.onboardingComplete,
      telegramLinked: payload.user.telegramLinked,
      todayLabel: payload.overview.todayLabel,
      overview: payload.overview,
      activityFeed: payload.activity,
      insights: payload.insights,
      bootstrapStatus: "ready",
    }),
  resetLocalState: () =>
    set({
      dialog: null,
      profile: initialProfile,
      onboardingDone: initialOnboardingDone,
      telegramLinked: initialTelegramLinked,
      todayLabel: initialOverview.todayLabel,
      overview: initialOverview,
      activityFeed: [],
      insights: [],
      bootstrapStatus: "idle",
      activeEntryType: "meal",
      activeGoalDomain: "health",
      detailTarget: null,
      ranges: { health: "today", finance: "today" },
      chatMessages: [],
      completedReminders: [],
      toast: null
    })
}));
