import Header from "@/app/(dashboard)/dashboard/_components/Header";
import Sidebar from "@/app/(dashboard)/dashboard/_components/Sidebar";
import { Box, Container, Grid } from "@mui/material";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box sx={{ padding: "0px 25px" }}>
        <Header />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} md={1.5} lg={1.5}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} sm={9} md={10.5} lg={10.5}>
            <main className="content">{children}</main>
          </Grid>
        </Grid>

        {/* <div className="layout">
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
      `}</style> */}

      </Box>
    </>
  );
};

export default DashboardLayout;
