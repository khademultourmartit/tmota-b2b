"use client";

import CardWrapper from "@/app/(dashboard)/flight-list/_components/CardWrapper";
import { projectConfig } from "@/config";
import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import secureLocalStorage from "react-secure-storage";

const LoginPage = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${projectConfig.apiBaseUrl}/agent/auth/login`,
          values
        );

        if (response?.status === 201) {
          secureLocalStorage.setItem(
            "token",
            response?.data?.payload?.access_token
          );
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CardWrapper sx={{ display: "flex", flexDirection: "column" }}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </CardWrapper>
    </form>
  );
};

export default LoginPage;
