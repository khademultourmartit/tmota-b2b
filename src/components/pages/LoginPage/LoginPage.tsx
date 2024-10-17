import CardWrapper from "@/components/global/CardWrapper/CardWrapper";
import { Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

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
          "http://82.112.238.135:112/auth/login",
          values
        );
        router.push("/dashboard");
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
