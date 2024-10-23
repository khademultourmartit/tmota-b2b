import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomPaginationSelect = styled(Select)(({}) => ({
  width: "70px",
  height: "25px",
  borderRadius: "4px",
  padding: "0 10px",
  fontSize: "14px",
  fontFamily: "Outfit",
  backgroundColor: "#FFFFFF",
  color: "#B4B4CD",
  "&:focus": {
    backgroundColor: "#F2F0F9",
    borderColor: "#C3A0CD",
    outline: "none",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "#EAE8F4",
  },
}));
