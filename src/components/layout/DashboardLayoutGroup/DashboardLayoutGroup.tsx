import Header from "@/components/global/Header/Header";
import Sidebar from "@/components/global/Sidebar/Sidebar";
import { Container } from "@mui/material";
import React from "react";

const  DashboardLayoutGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container maxWidth="xl">
        <Header />
        <div className="layout">
          <Sidebar />
          <main className="content">{children}</main>
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
      </Container>
    </>
  );
};

export default  DashboardLayoutGroup;
