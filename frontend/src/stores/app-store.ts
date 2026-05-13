"use client";

import { create } from "zustand";
import { appState } from "@/lib/dummy-data";
import { replyForMessage } from "@/lib/agent";
import type { ManualEntryType } from "@/lib/schemas";

export type DialogId = "agent" | "detail" | "goal" | "telegram" | "onboarding" | "entry" | "profile" | null;
export type RangeValue = "today" | "week" | "month" | "custom";

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

type Profile = {
  name: string;
  authProvider: string;
  timezone: string;
  aiStyle: string;
};

type AppStore = {
  dialog: DialogId;
  profile: Profile;
  onboardingDone: boolean;
  telegramLinked: boolean;
  activeEntryType: ManualEntryType;
  activeGoalDomain: "health" | "finance";
  detailTarget: DetailTarget;
  ranges: Record<"health" | "finance", RangeValue>;
  chatMessages: ChatMessage[];
  completedReminders: string[];
  toast: string | null;
  openDialog: (dialog: Exclude<DialogId, null>) => void;
  closeDialog: () => void;
  openAgent: (seed?: string) => void;
  sendAgentMessage: (message: string) => void;
  openEntry: (type: ManualEntryType) => void;
  openGoal: (domain: "health" | "finance") => void;
  openDetail: (target: DetailTarget) => void;
  completeOnboarding: () => void;
  linkTelegram: () => void;
  saveProfile: (profile: Profile) => void;
  setRange: (domain: "health" | "finance", range: RangeValue) => void;
  completeReminder: (title: string) => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  resetLocalState: () => void;
};

const initialProfile = appState.user;
const initialOnboardingDone = appState.onboardingDone;
const initialTelegramLinked = appState.telegramLinked;
const id = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

export const useAppStore = create<AppStore>((set, get) => ({
  dialog: null,
  profile: initialProfile,
  onboardingDone: initialOnboardingDone,
  telegramLinked: initialTelegramLinked,
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
            text: "Hi, I am the dashboard Agent mock. Ask about meals, expenses, goals, or reminders.",
            meta: "No API calls yet"
          }
        ],
        dialog: "agent"
      });
    } else {
      set({ dialog: "agent" });
    }
    if (seed) get().sendAgentMessage(seed);
  },
  sendAgentMessage: (message) => {
    const text = message.trim();
    if (!text) return;
    const reply = replyForMessage(text);
    const meta = reply.draft.requiresConfirmation
      ? `Draft: ${reply.draft.action}. Confirmation required later.`
      : "Dummy answer only.";
    set((state) => ({
      chatMessages: [
        ...state.chatMessages,
        { id: id(), role: "user", text },
        { id: id(), role: "agent", text: reply.text, meta }
      ]
    }));
  },
  openEntry: (activeEntryType) => set({ activeEntryType, dialog: "entry" }),
  openGoal: (activeGoalDomain) => set({ activeGoalDomain, dialog: "goal" }),
  openDetail: (detailTarget) => set({ detailTarget, dialog: "detail" }),
  completeOnboarding: () => {
    set({ onboardingDone: true, dialog: null });
    get().showToast("Onboarding completed in dummy state.");
  },
  linkTelegram: () => {
    set({ telegramLinked: true, dialog: null });
    get().showToast("Telegram connected in dummy state.");
  },
  saveProfile: (profile) => {
    set({ profile, dialog: null, onboardingDone: true });
    get().showToast("Profile details updated in dummy state.");
  },
  setRange: (domain, range) => set((state) => ({ ranges: { ...state.ranges, [domain]: range } })),
  completeReminder: (title) => {
    set((state) => ({ completedReminders: [...new Set([...state.completedReminders, title])] }));
    get().showToast("Reminder completed in dummy state.");
  },
  showToast: (toast) => set({ toast }),
  clearToast: () => set({ toast: null }),
  resetLocalState: () =>
    set({
      dialog: null,
      profile: initialProfile,
      onboardingDone: initialOnboardingDone,
      telegramLinked: initialTelegramLinked,
      activeEntryType: "meal",
      activeGoalDomain: "health",
      detailTarget: null,
      ranges: { health: "today", finance: "today" },
      chatMessages: [],
      completedReminders: [],
      toast: null
    })
}));
