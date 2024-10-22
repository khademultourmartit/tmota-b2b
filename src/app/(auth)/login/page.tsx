"use client";

import { useEffect } from "react";
import LoginForm from "./_components/Login";
import { useRouter } from "next/navigation";
import { getJWT } from "@/features/auth/apis/service";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getJWT();
    if (token) router.push("/dashboard");
  }, [router]);

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
