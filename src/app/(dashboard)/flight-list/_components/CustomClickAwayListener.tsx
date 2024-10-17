import { ClickAwayListener } from "@mui/material";
import { ReactElement } from "react";

const CustomClickAwayListener = ({
  children,
  handleClickAway,
}: {
  children: ReactElement; // Ensure it's a ReactElement, not ReactNode
  handleClickAway: () => void;
}) => {
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {children}
    </ClickAwayListener>
  );
};

export default CustomClickAwayListener;
