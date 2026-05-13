"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Bot, Chrome, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { setDemoSession } from "@/lib/session";

export function LoginScreen({ callbackUrl }: { callbackUrl: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
    setDemoSession();
    router.replace(callbackUrl);
  }

  return (
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
              { icon: ShieldCheck, title: "Protected", copy: "Dashboard routes sit behind middleware and session checks." },
              { icon: Chrome, title: "Organized", copy: "Auth and dashboard flows live in separate route groups." }
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
            <span className="small-label">Demo access</span>
            <CardTitle>Continue into the protected dashboard</CardTitle>
            <CardDescription>This mock login sets a local demo session cookie so middleware can guard the app routes.</CardDescription>
            <Button type="button" variant="primary" disabled={isLoading} onClick={handleLogin}>
              <Chrome className="h-4 w-4" />
              {isLoading ? "Opening dashboard..." : "Continue with Google mock"}
            </Button>
            <Button type="button" onClick={handleLogin}>
              <ArrowRight className="h-4 w-4" />
              Enter demo workspace
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
