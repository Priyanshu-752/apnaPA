export type ToastTone = "success" | "error" | "info";

export type AppProfile = {
  userId: string;
  email: string;
  name: string;
  authProvider: string;
  timezone: string;
  aiStyle: string;
  onboardingComplete: boolean;
  telegramLinked: boolean;
};

export type DashboardOverview = {
  todayLabel: string;
  healthSummary: string;
  financeSummary: string;
  reminderSummary: string;
};

export type DashboardActivityItem = {
  title: string;
  meta: string;
};

export type DashboardBootstrap = {
  user: AppProfile;
  overview: DashboardOverview;
  activity: DashboardActivityItem[];
  insights: string[];
};

export type SessionPayload = {
  message?: string | null;
  user: AppProfile;
};

export type MessagePayload = {
  message: string;
};

export type TelegramLinkPayload = MessagePayload & {
  linkToken?: string;
  expiresInMinutes?: number;
};

export type ProfileUpdatePayload = MessagePayload & {
  user: AppProfile;
};

export type AgentChatPayload = {
  reply: {
    text: string;
    intent: string;
    requiresConfirmation: boolean;
    selectedAgent: string;
    missingFields: string[];
  };
};
