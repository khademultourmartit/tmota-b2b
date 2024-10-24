"use client";

import { Box, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { getBannerData } from "@/features/banner/apis/service";
import { useGetBannerQuery } from "@/features/banner/apis/queries";

function DashboardBanner() {
  const token = secureLocalStorage.getItem("accessToken");
  const [slider, setSlider] = useState([]);
  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);

  const params = {
    page: "1",
    limit: "20",
    serviceType: "FLIGHT",
    type: "Banner",
  };

  const { data, isLoading, isError } = useGetBannerQuery(params);

  const len = data?.payload?.data?.length > 4 ? 4 : data?.payload?.data?.length;
  const laptopLen =
    data?.payload?.data?.length >= 3 ? 3 : data?.payload?.data?.length;
  const tabLen =
    data?.payload?.data?.length >= 2 ? 2 : data?.payload?.data?.length;

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
    dots: isLoading ? false : true,
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
      {!isLoading ? (
        <>
          <Slider {...settings}>
            {data?.payload?.data?.map((data: any, arr: any, index: any) => (
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
                    height: "210px",
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

export default DashboardBanner;
