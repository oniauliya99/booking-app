import type { Metadata } from "next";
import { LoginGoogleButton } from "@/components/login-button";

export const metadata: Metadata = {
  title: "Sign In",
};

const SignInPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    redirect_url?: string;
  }>;
}) => {
  const params = await (await searchParams)?.redirect_url;
  const redirectUrl = !params ? "/" : `/${params}`;
  return (
    <div className="min-h-screen flex items-center">
      <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">
        <h1 className="text-4xl font-bold mb-1">Signin</h1>
        <p className="font-medium mb-5 text-gray-500">Signin to your account</p>
        <div className="py-4 text-center">
          <LoginGoogleButton redirectUrl={redirectUrl} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
