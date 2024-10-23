import { styled } from "@mui/material/styles";
import { InputBase } from "@mui/material";

export const CustomSearchInput = styled(InputBase)(({}) => ({
  width: "100%",
  height: "35px",
  padding: "0 5px",
  borderRadius: "4px",
  backgroundColor: "#F2F0F9",
  color: "#6E6996",
  fontFamily: "Outfit",
  fontSize: "14px",
  fontWeight: 400,
  boxSizing: "border-box",
  transition: "all 0.3s ease-in-out",
  "& .MuiInputBase-input": {
    paddingLeft: "32px",
  },
  "&:focus": {
    borderColor: "#C3A0CD",
    backgroundColor: "#FFFFFF",
    outline: "none",
  },
}));
