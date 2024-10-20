"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Box, Container, Grid } from "@mui/material";
import { sidebarMenu } from "../../../../../public/data-source/sidebar-menu";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const pathname = usePathname();
  const toggle = () => setIsOpen(!isOpen);
  const toggleVendor = () => setIsVendorOpen(!isVendorOpen);

  type MenuItem = {
    path: string;
    name: string;
    icon: string;
    subMenu?: MenuItem[];
  };

  const menuItem: MenuItem[] = sidebarMenu;

  const linkStyle = (path: string) => ({
    display: "flex",
    alignItems: "center",
    color: pathname === path ? "#FFFFFF" : "#B4B4CD",
    backgroundColor: pathname === path ? "#A56EB4" : "transparent",
    fontSize: "15px",
    padding: "8px 10px",
    gap: "10px",
    textDecoration: "none",
    justifyContent: isOpen ? "flex-start" : "center",
    fontFamily: "OutFit",
    borderRadius: "2px",
    margin: "10px 10px",
  });

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box
        sx={{
          background: "#FFFFFF",
          color: "#B4B4CD",
          borderRadius: "5px",
          height: "100%",
          // width: isOpen ? "195px" : "84px",
          boxShadow: "rgba(234, 232, 244, 0.95) 0px 0px 25px 0px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          paddingTop: "40px",
          minHeight: "85vh",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "-25px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: "10",
            width: "auto",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            padding: "5px",
          }}
        ></Box>

        <Box>
          {menuItem.map((item, index) => (
            <React.Fragment key={index}>
              <Link href={item.path} passHref>
                <span style={linkStyle(item.path)}>
                  <Box>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={12}
                      height={12}
                      style={{
                        filter:
                          pathname === item.path
                            ? "brightness(0) invert(1)"
                            : "none",
                      }}
                    />
                  </Box>
                  {isOpen && (
                    <span style={{ fontFamily: "Outfit", fontWeight: 400 }}>
                      {item.name}
                    </span>
                  )}
                </span>
              </Link>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
