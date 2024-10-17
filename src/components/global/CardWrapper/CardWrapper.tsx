import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

const defaultStyles: SxProps<Theme> = { bgcolor: "white", mt: 3, borderRadius: "4px", p: "15px 20px" };

const CardWrapper = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box
      sx={{
        ...defaultStyles,   // Default styles
        ...sx,          // Override with custom styles
      }}
    >
      {children}
    </Box>
  );
};

export default CardWrapper;
