import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomInput = styled(TextField)(({}) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    height: "35px",
    borderRadius: "4px",
    backgroundColor: "#F2F0F9",
    color: "#413755",
    padding: "0 0px",
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
