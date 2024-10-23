import { styled } from "@mui/material/styles";
import { MenuItem as MuiMenuItem } from "@mui/material";

export const CustomInputWithFlag = styled(MuiMenuItem)(({}) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    height: "35px",
    borderRadius: "4px",
    borderColor: "#EAE8F4",
    color: "#413755",
    boxSizing: "border-box",
    transition: "all 0.3s ease-in-out",
    fontFamily: "Outfit",
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
}));
