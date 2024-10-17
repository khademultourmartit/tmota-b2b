import { Box, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AirlinesSlider = ({ airlineData }: any) => {
  const slideWidth = 420;
  const slideGap = 15;

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <div
        onClick={onClick}
        style={{
          backgroundColor: "var(--primary-color)",
          width: "25px",
          position: "absolute",
          height: "100%",
          right: "-20px",
          top: "0",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            fontSize: "40px",
            margin: "0",
            color: "var(--secondary-color)",
          }}
        >
          &#8250;
        </p>
      </div>
    );
  };
  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;

    return (
      <div
        onClick={onClick}
        style={{
          backgroundColor: "var(--primary-color)",
          width: "25px",
          position: "absolute",
          height: "100%",
          left: "-20px",
          top: "0",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            fontSize: "40px",
            margin: "0",
            color: "var(--secondary-color)",
          }}
        >
          &#8249;
        </p>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(airlineData.length, 6),
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    autoplay: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(airlineData.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(airlineData.length, 1),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      style={{
        maxWidth: `${slideWidth * 3 + slideGap * 2}px`,
        margin: "0 auto",
      }}
    >
      <Slider {...settings}>
        {airlineData.map((res: any, i: any) => (
          <Box
            key={i}
            sx={{
              height: {
                xs: "65px",
                sm: "65px",
                md: "48px",
                lg: "48px",
              },
              borderRadius: "10px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{
                width: {
                  xs: "100%",
                  sm: "100%",
                  md: "90%",
                  lg: "95%",
                },
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                },
                margin: "0 auto",
                // background: "red",
                cursor: "pointer",
                ":hover": {
                  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  bgcolor: "rgba(99, 99, 99, 0.2)",
                },
                border: "2px solid #7C8DB0",
                borderRadius: "10px",
                transition: "all .2s ease-in-out",
                height: "100%",
              }}
            >
              <Box>
                <img
                  style={{ width: "30px" }}
                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${res.career}.png`}
                  alt=""
                />
              </Box>
              <Box
                sx={{
                  ".MuiTypography-body1": {
                    fontSize: "13px",
                    color: "var(--dark-grey)",
                  },
                  ".MuiTypography-body2": {
                    fontSize: {
                      xs: "7px",
                      sm: "8px",
                      md: "13px",
                      lg: "13px",
                    },

                    color: "var(--primary-color)",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "5px",
                      sm: "8px",
                      md: "13px",
                      lg: "13px",
                    },
                  }}
                >
                  {res?.validatingCarrier}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "5px",
                      sm: "8px",
                      md: "13px",
                      lg: "13px",
                    },
                  }}
                >
                  {res?.totalFare} BDT
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default AirlinesSlider;
