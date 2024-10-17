import { flightMenu } from "@/constants/flightMenu";
import { Box, Button } from "@mui/material";
import React from "react";

const FlightMenu = ({
  setCurrentMenu,
  currentMenu,
  setOpenReturnDate,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {flightMenu?.map((menu, i) => (
        <Button
          onClick={() => {
            setCurrentMenu(menu?.name);
            setOpenReturnDate(false);
          }}
          key={i}
          sx={{
            bgcolor: currentMenu === menu?.name ? "#A56EB4" : "#F2F0F9",
            width: "100px",
            textTransform: "capitalize",
            color: currentMenu === menu?.name ? "white" : "#A56EB4",
            display: "flex",
            gap: "5px",
            fontSize: "13px",
            height: "28px",
          }}
        >
          {menu?.name}
        </Button>
      ))}
    </Box>
  );
};

export default FlightMenu;
