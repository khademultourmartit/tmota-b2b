"use client";
import Header from "@/components/global/Header/Header";
import Sidebar from "@/components/global/Sidebar/Sidebar";
import { Container } from "@mui/material";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Header />
        <main className="content">{children}</main>
      </Container>
    </>
  );
};

export default MainLayout;
