import type { Metadata } from "next";
import { ToastViewport } from "@/components/ui/toast-viewport";
import "./globals.css";

export const metadata: Metadata = {
  title: "apnaPA",
  description: "Personal AI operating system frontend prototype"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastViewport />
      </body>
    </html>
  );
}
