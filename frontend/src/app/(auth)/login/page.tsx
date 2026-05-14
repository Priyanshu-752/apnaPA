import { LoginScreen } from "@/components/auth/login-screen";

type LoginPageProps = {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = params?.callbackUrl?.startsWith("/") ? params.callbackUrl : "/dashboard";
  return <LoginScreen callbackUrl={callbackUrl} />;
}
