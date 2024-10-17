import Header from "@/app/(dashboard)/dashboard/_components/Header";
import Sidebar from "@/app/(dashboard)/dashboard/_components/Sidebar";
import { Container } from "@mui/material";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        <Container maxWidth="xl">
          <main className="content">{children}</main>
        </Container>
      </div>

      <style jsx>{`
        .layout {
          display: flex;
        }
        .content {
          padding: 0px 0px 0px 20px;
          flex-grow: 1;
          // min-height: 100vh;
        }
      `}</style>
    </>
  );
};

export default DashboardLayout;
