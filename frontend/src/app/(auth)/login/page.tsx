import { LoginScreen } from "@/components/auth/login-screen";

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  return <LoginScreen callbackUrl={params?.callbackUrl || "/dashboard"} />;
}
