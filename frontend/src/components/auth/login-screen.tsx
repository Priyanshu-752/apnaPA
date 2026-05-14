"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Bot, Chrome, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { loginWithGoogle } from "@/lib/api";
import { useAppStore } from "@/stores/app-store";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function LoginScreen({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const showToast = useAppStore((state) => state.showToast);
  const initializeApp = useAppStore((state) => state.initializeApp);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const safeCallbackUrl = callbackUrl.startsWith("/") ? callbackUrl : "/dashboard";
  const isGoogleReady = scriptLoaded && Boolean(googleClientId);

  useEffect(() => {
    if (!isGoogleReady || !buttonRef.current || !window.google) return;

    const container = buttonRef.current;
    container.innerHTML = "";

    window.google.accounts.id.initialize({
      client_id: googleClientId!,
      callback: async ({ credential }) => {
        if (!credential) {
          showToast({ tone: "error", title: "Google sign-in", message: "Google did not return a credential." });
          return;
        }

        setIsLoading(true);
        try {
          const payload = await loginWithGoogle(credential);
          initializeApp({
            user: payload.user,
            overview: {
              todayLabel: "Today",
              healthSummary: "Loading your backend-backed health summary...",
              financeSummary: "Loading your backend-backed finance summary...",
              reminderSummary: "Loading your backend-backed reminders...",
            },
            activity: [],
            insights: [],
          });
          showToast({
            tone: "success",
            title: "Signed in",
            message: payload.message ?? `Signed in successfully as ${payload.user.name}.`,
          });
          router.replace(safeCallbackUrl);
        } catch (error) {
          showToast({
            tone: "error",
            title: "Sign-in failed",
            message: error instanceof Error ? error.message : "Google sign-in could not be completed.",
          });
        } finally {
          setIsLoading(false);
        }
      },
    });

    window.google.accounts.id.renderButton(container, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      logo_alignment: "left",
      width: 360,
    });
  }, [initializeApp, isGoogleReady, router, safeCallbackUrl, showToast]);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={() => setScriptLoaded(true)} />
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#d9efeb_0%,transparent_32%),radial-gradient(circle_at_bottom_right,#f8ddd7_0%,transparent_26%),#f6f3ee]">
        <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-6 px-4 py-10 lg:grid-cols-[minmax(0,1.15fr)_420px]">
          <section className="grid gap-8">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
              <span className="small-label">Personal AI operating system</span>
              <h1 className="mt-3 text-5xl font-black leading-none md:text-6xl">apnaPA keeps the whole day organized in one place.</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                Health, finance, reminders, memory, and agent conversations are split into proper screens now, with protected routes around the dashboard.
              </p>
            </motion.div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Bot, title: "Agent-first", copy: "Confirmation-style actions stay visible across the app." },
                { icon: ShieldCheck, title: "Protected", copy: "Dashboard routes sit behind middleware and secure session cookies." },
                { icon: Chrome, title: "Google sign-in", copy: "The login flow now exchanges a real Google credential with the backend." }
              ].map((item, index) => (
                <motion.article
                  key={item.title}
                  className="rounded-lg border bg-white/80 p-4 shadow-soft backdrop-blur"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <item.icon className="h-5 w-5 text-teal" />
                  <strong className="mt-3 block text-base">{item.title}</strong>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                </motion.article>
              ))}
            </div>
          </section>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="grid gap-5 p-6">
              <span className="small-label">Secure access</span>
              <CardTitle>Continue with Google</CardTitle>
              <CardDescription>
                Sign in with the standard Google flow, then apnaPA exchanges the Google credential for a backend session.
              </CardDescription>

              {googleClientId ? (
                <div className="grid gap-3">
                  <div className="min-h-[44px]" ref={buttonRef} />
                  <p className="text-xs leading-5 text-muted-foreground">
                    {isLoading
                      ? "Signing you in and syncing the session..."
                      : "Use the official Google button above to continue."}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-[#e1c4ba] bg-[#fff4ef] px-4 py-3 text-sm font-bold text-[#8b4a3f]">
                  Add `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in the frontend environment to enable Google sign-in.
                </div>
              )}

              <Button type="button" disabled={!isGoogleReady || isLoading} variant="primary">
                <Chrome className="h-4 w-4" />
                {isLoading ? "Signing in..." : "Google sign-in ready"}
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}
