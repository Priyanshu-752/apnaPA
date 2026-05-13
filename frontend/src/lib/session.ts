export const SESSION_COOKIE = "apnapa_session";

export function setDemoSession() {
  document.cookie = `${SESSION_COOKIE}=demo; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function clearDemoSession() {
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
