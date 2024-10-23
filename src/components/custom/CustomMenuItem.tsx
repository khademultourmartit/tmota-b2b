import { styled } from "@mui/material/styles";
import { MenuItem } from "@mui/material";

export const CustomMenuItem = styled(MenuItem)(({}) => ({
  backgroundColor: "transparent",
  borderRadius: "10px",
  fontWeight: 300,
  padding: "6px 10px",
  margin: "4px 10px",
  "&:hover": {
    backgroundColor: "#F2F0F9",
  },
  "&.Mui-selected": {
    backgroundColor: "#F2F0F9 !important",
  },
}));
