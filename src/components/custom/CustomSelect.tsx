import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowUpDown from "../assets/image/arrorUpDown.svg";

export const CustomSelect = styled(Select)(({ open }) => ({
  width: "100%",
  height: "35px",
  borderRadius: "4px",
  borderColor: "#EAE8F4",
  color: "#413755",
  outline: "none",
  fontSize: "15px",
  fontFamily: "Outfit",
  backgroundColor: "#ffffff",
  transition: "background-color 0.3s ease, border-color 0.3s ease",
  "&.Mui-focused": {
    backgroundColor: "#F2F0F9",
    outline: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EAE8F4",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C3A0CD",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C3A0CD",
  },
  "& .MuiSelect-icon": {
    display: "none",
  },
  "&:after": {
    content: `url(${ArrowUpDown})`,
    position: "absolute",
    right: "10px",
    top: "calc(50% - 10px)",
    pointerEvents: "none",
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  },
  "& .MuiInputBase-input": {
    fontWeight: 500,
  },
  "& .MuiInputBase-input:focus": {
    fontWeight: 500,
  },
}));
