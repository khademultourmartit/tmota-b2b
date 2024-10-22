"use client";

import CardWrapper from "@/app/(dashboard)/flight-list/_components/CardWrapper";
import { login } from "@/features/auth/apis/service";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const LoginForm = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const result = await login(values);
        if (result) router.push("/dashboard");
      } catch (err) {
        console.log(err);
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

export default LoginForm;
