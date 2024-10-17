import { Box, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider() {
  
  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5]);
  const slideWidth = 420;
  const slideGap = 20;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(slideLoad.length, 3),
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slideLoad.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(slideLoad.length, 1),
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
    <div
      style={{
        maxWidth: `${slideWidth * 3 + slideGap * 2}px`,
        margin: "0 auto",
      }}
    >
      <Box>
        <Slider {...settings}>
          {slideLoad?.map(function (slide) {
            return (
              <div key={slide}>
                <Box
                  sx={{
                    bgcolor: "var(--white)",
                    borderRadius: "10px",
                    width: `${slideWidth}px`,
                    margin: `0 ${slideGap / 2}px`,
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "230px",
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
      </Box>
    </div>
  );
}

export default HomeSlider;
