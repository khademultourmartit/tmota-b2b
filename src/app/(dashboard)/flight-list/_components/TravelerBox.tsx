import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

const TravelerBox = ({
  adultDecrement,
  adultCount,
  adultInclement,
  childDecrement,
  childCount,
  childIncrement,
  kidDecrement,
  kidCount,
  kidInclement,
  infantDecrement,
  infantCount,
  infantIncrement,
  infantWithSeatIncrement,
  infantWithSeatCount,
  infantWithSeatDecrement,
  handleClose,
}: any) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: {
          lg: "105%",
          md: "100%",
          sm: "100%",
          xs: "100%",
        },
        right: "0px",
        zIndex: 100,
        borderRadius: "5px",
        backgroundColor: "#FFFFFF",
        width: "260px",
        border: "1px solid #6E0A82",
      }}
    >
      <Box width="250px" p={2}>
        <Typography
          style={{
            textAlign: "left",
            marginBottom: "5px",
            color: "#2D233C",
            fontWeight: 400,
          }}
        >
          Passenger
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box width="60%">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#2D233C",
              }}
            >
              Adult
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#B4B4CD",
              }}
            >
              Aged 12y+
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            width="40%"
          >
            <button
              onClick={adultDecrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#2D233C",
              }}
            >
              {adultCount}
            </Typography>
            <button
              onClick={adultInclement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box width="60%">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#2D233C",
              }}
            >
              Child
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#B4B4CD",
              }}
            >
              Aged 5y - 12y
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            width="40%"
          >
            <button
              onClick={childDecrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#2D233C",
              }}
            >
              {childCount}
            </Typography>
            <button
              onClick={childIncrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box width="60%">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#2D233C",
              }}
            >
              Kids
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#B4B4CD",
              }}
            >
              Aged 2y - 5y
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            width="40%"
          >
            <button
              onClick={kidDecrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#2D233C",
              }}
            >
              {kidCount}
            </Typography>
            <button
              onClick={kidInclement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box width="60%">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#2D233C",
              }}
            >
              Infant
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#B4B4CD",
              }}
            >
              Below 24 m
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            width="40%"
          >
            <button
              onClick={infantDecrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#2D233C",
              }}
            >
              {infantCount}
            </Typography>
            <button
              onClick={infantIncrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Box width="60%">
            <Typography
              sx={{
                fontSize: "14px",
                color: "#2D233C",
              }}
            >
              Infant With Seat
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#B4B4CD",
              }}
            >
              Below 24 m
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            width="40%"
          >
            <button
              onClick={infantWithSeatDecrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              -
            </button>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#2D233C",
              }}
            >
              {infantWithSeatCount}
            </Typography>
            <button
              onClick={infantWithSeatIncrement}
              style={{
                backgroundColor: "#C3A0CD",
                color: "#ffffff",
                border: "none",
                width: "22px",
                height: "22px",
                fontSize: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </Stack>
        </Stack>

        <Box mt={2} style={{ textAlign: "right" }}>
          <Button
            size="small"
            onClick={handleClose}
            className="shine-effect"
            style={{
              backgroundColor: "#C3A0CD",
              color: "#fff",
            }}
          >
            DONE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelerBox;
