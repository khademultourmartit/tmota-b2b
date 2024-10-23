import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = (props: any) => {
  return (
    <TextField
      {...props}
      sx={{
        width: "100%",
        "& .MuiInputBase-root": {
          height: "35px",
          borderRadius: "4px",
          color: "#413755",
          boxSizing: "border-box",
          transition: "all 0.3s ease-in-out",
          fontFamily: "Outfit",
          padding: "0 10px",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#EAE8F4",
          },
          "&:hover fieldset": {
            borderColor: "#C3A0CD",
          },
          "&.Mui-focused": {
            backgroundColor: "#F2F0F9",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#C3A0CD",
          },
        },
        "& .MuiInputBase-input": {
          fontWeight: 500,
        },
        "& .MuiInputBase-input:focus": {
          fontWeight: 500,
        },
      }}
    />
  );
};

export default CustomTextField;
