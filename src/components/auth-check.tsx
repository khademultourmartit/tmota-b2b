"use client";  

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getJWT } from "@/features/auth/apis/service";

const AuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getJWT();
    if (!token) {
      router.push("/");  
    }
  }, [router]);

  return null;  
};

export default AuthCheck;
