import React, { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import logo from "../../../../public/assests/image/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Image from "next/image";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const Header = () => {
  const [viewClicked, setViewClicked] = useState(false);

  const handleViewClick = () => {
    setViewClicked(!viewClicked);
  };

  return (
    <Box mb={5} mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={1.5}>
          <Box
            sx={{
              boxShadow: "rgba(234, 232, 244, 0.95) 0px 0px 25px 0px",
              backgroundColor: "#FFFFFF",
              textAlign: "center",
              cursor: "pointer",
            }}
            py={1.5}
          >
            <Image width={120} src={logo} alt="logo" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={10.5}>
          <Box
            sx={{
              boxShadow: "rgba(234, 232, 244, 0.95) 0px 0px 25px 0px",
              backgroundColor: "#FFFFFF",
              cursor: "pointer",
            }}
            py={1}
            px={1.1}
          >
            <Grid container spacing={2} display={"flex"} alignItems={"center"}>
              <Grid item xs={12} sm={6} md={2.5}>
                <Box
                  sx={{
                    position: "relative",
                  }}
                  className={"placeholderColor"}
                >
                  <SearchIcon
                    sx={{
                      color: "#B4B4CD",
                      position: "absolute",
                      top: "50%",
                      left: "7px",
                      transform: "translateY(-50%)",
                      fontSize: 20,
                    }}
                  />
                  <input
                    style={{
                      background: "#F2F0F9",
                      borderRadius: "3px",
                      border: "none",
                      outline: "none",
                      width: "100%",
                      height: "30px",
                      paddingLeft: "25px",
                      boxSizing: "border-box",
                      color: "#6E6996",
                      fontSize: "14px",
                      fontFamily: "Outfit",
                    }}
                    placeholder="Quick Search"
                    type="text"
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <button
                      style={{
                        backgroundColor: "#F2F0F9",
                        color: "#6E6996",
                        fontSize: "13px",
                        border: "none",
                        height: "23px",
                        padding: "0px 8px",
                        borderRadius: "2px",
                        fontFamily: "Outfit",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Reservation
                      <ErrorOutlineIcon
                        sx={{
                          fontSize: "15px",
                          marginLeft: "4px",
                        }}
                      />
                    </button>
                  </Box>
                  <Box>
                    <button
                      style={{
                        backgroundColor: "#F2F0F9",
                        color: "#6E6996",
                        fontSize: "13px",
                        border: "none",
                        height: "23px",
                        padding: "0px 8px",
                        borderRadius: "2px",
                        fontFamily: "Outfit",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      Accounts
                      <ErrorOutlineIcon
                        sx={{
                          fontSize: "15px",
                          marginLeft: "4px",
                        }}
                      />
                    </button>
                  </Box>
                  <Box>
                    <button
                      style={{
                        backgroundColor: "#F2F0F9",
                        color: "#6E6996",
                        fontSize: "13px",
                        border: "none",
                        height: "23px",
                        padding: "0px 8px",
                        borderRadius: "2px",
                        fontFamily: "Outfit",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      KAM
                      <ErrorOutlineIcon
                        sx={{
                          fontSize: "15px",
                          marginLeft: "4px",
                        }}
                      />
                    </button>
                  </Box>
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={6.5}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <Box>
                    <button
                      style={{
                        backgroundColor: "#B4B4CD",
                        color: "#FFFFFF",
                        fontSize: "14px",
                        border: "none",
                        height: "30px",
                        padding: "0px 8px",
                        borderRadius: "2px",
                        fontFamily: "Outfit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        width: "130px",
                      }}
                    >
                      Cash{" "}
                      <span
                        style={{
                          backgroundColor: "#CBC7DF",
                          marginLeft: "5px",
                          width: "20px",
                          height: "20px",
                          fontSize: "14px",
                          borderRadius: "50px",
                        }}
                      >
                        {" "}
                        &#2547;{" "}
                      </span>
                    </button>
                  </Box>
                  <Box>
                    <button
                      style={{
                        backgroundColor: "#B4B4CD",
                        color: "#FFFFFF",
                        fontSize: "14px",
                        border: "none",
                        height: "30px",
                        padding: "0px 8px",
                        borderRadius: "2px",
                        fontFamily: "Outfit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        width: "130px",
                      }}
                    >
                      Credit{" "}
                      <span
                        style={{
                          backgroundColor: "#CBC7DF",
                          marginLeft: "5px",
                          width: "20px",
                          height: "20px",
                          fontSize: "14px",
                          borderRadius: "50px",
                        }}
                      >
                        {" "}
                        &#2547;{" "}
                      </span>
                    </button>
                  </Box>
                  <Box>
                    <button
                      style={{
                        backgroundColor: "#6E0A82",
                        color: "#FFFFFF",
                        border: "none",
                        height: "30px",
                        padding: "0px 5px",
                        borderRadius: "3px",
                        fontFamily: "Outfit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                    >
                      <PermIdentityIcon sx={{ fontSize: 25 }} />
                    </button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
