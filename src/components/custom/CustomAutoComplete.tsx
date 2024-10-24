import { Autocomplete, styled } from "@mui/material";

export const CustomAutocomplete = styled(Autocomplete)(({}) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: "35px",
    borderRadius: "4px",
    borderColor: "#EAE8F4",
    color: "#413755",
    fontSize: "15px",
    fontFamily: "Outfit",
    backgroundColor: "#ffffff",
    transition: "background-color 0.3s ease, border-color 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C3A0CD",
    },
    "&.Mui-focused": {
      backgroundColor: "#F2F0F9",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#C3A0CD",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EAE8F4",
    },
    "& .MuiAutocomplete-endAdornment": {
      display: "none",  
    },
  },
  "& .MuiInputBase-input": {
    fontWeight: 500,
  },
}));
