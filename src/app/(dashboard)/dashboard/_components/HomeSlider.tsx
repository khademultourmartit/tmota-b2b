"use client";

import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

function HomeSlider() {
  const token = secureLocalStorage.getItem("accessToken");

  const [slider, setSlider] = useState([]);
  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://82.112.238.135:88/banners?page=1&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSlider(response.data?.payload?.data);
      } catch (err) {
        console.log("err", err);
      }
    };

    fetchData();
  }, []);

  const len = slider?.length > 4 ? 4 : slider?.length;
  const laptopLen = slider?.length >= 3 ? 3 : slider?.length;
  const tabLen = slider?.length >= 2 ? 2 : slider?.length;

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <Box
        onClick={onClick}
        style={{
          backgroundColor: "var(--primary-color)",
          width: "25px",
          position: "absolute",
          height: "100%",
          right: "-20px",
          top: "-100px",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          style={{
            fontSize: "40px",
            margin: "0",
            color: "#a56eb4",
          }}
        >
          &#8250;
        </Typography>
      </Box>
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;

    return (
      <Box
        onClick={onClick}
        style={{
          width: "25px",
          position: "absolute",
          height: "100%",
          left: "-20px",
          top: "-100px",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          style={{
            fontSize: "40px",
            margin: "0",
            color: "#a56eb4",
          }}
        >
          &#8249;
        </Typography>
      </Box>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: len,
    slidesToScroll: 1,
    initialSlide: 2,
    autoplay: true,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: laptopLen,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: tabLen,
          slidesToScroll: 2,
          initialSlide: len,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        display: { md: `${len > 3 ? "block" : "flex"}` },
        justifyContent: { md: `${len > 3 ? "start" : "center"}` },
      }}
    >
      {slider.length !== 0 ? (
        <>
          <Slider {...settings}>
            {slider?.map((data: any, arr: any, index: any) => (
              <div key={index}>
                <Box
                  sx={{
                    bgcolor: "var(--white)",
                    overflow: "hidden",
                    width: {
                      xs: "100%",
                      sm: `${arr.length < 4 ? "180px" : null}`,
                      md: `${arr.length < 4 ? "180px" : null}`,
                    },
                    height: "380px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box className="tours-box">
                    <Box
                      sx={{
                        backgroundImage: `url(${data?.imgUrl})`,
                        width: "95%",
                        height: "200px",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "bottom",
                      }}
                    ></Box>
                  </Box>
                </Box>
              </div>
            ))}
          </Slider>
        </>
      ) : (
        <>
          <Slider {...settings}>
            {slideLoad?.map(function (slide) {
              return (
                <div key={slide}>
                  <Box
                    sx={{
                      bgcolor: "var(--white)",
                      borderRadius: "10px",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          width: "95%",
                          height: "200px",
                          borderRadius: "5px",
                          overflow: "hidden",
                        }}
                      >
                        <Skeleton
                          sx={{ borderRadius: "5px" }}
                          variant="rectangular"
                          width={"100%"}
                          height={"100%"}
                        />
                      </Box>
                    </Box>
                  </Box>
                </div>
              );
            })}
          </Slider>
        </>
      )}
    </Box>
  );
}

export default HomeSlider;
