import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | apnaPA",
    default: "Login | apnaPA"
  },
  description: "Authentication screens for apnaPA"
};

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
