"use client";

import { Box, Modal, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGetPopupQuery } from "@/features/banner/apis/queries";
import Slider from "react-slick";
import Image from "next/image";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "65vw", sm: "80vw", xs: "100vw" },
  px: { md: 4, sm: 4, xs: 4 },
  py: { md: 4, sm: 4, xs: 5 },
  borderRadius: "4px",
  outline: "none",
  //   height: { md: "90vh", sm: "50vh", xs: "50vh" },
};

const PopupSlider = () => {
  const params = {
    page: "1",
    limit: "20",
    type: "PopUp",
  };

  const { data, isLoading, isError } = useGetPopupQuery(params);
  const [openPopup, setPopup] = useState(false);

  useEffect(() => {
    if (data?.payload?.data?.length > 0) {
      setPopup(true);
    }
  }, [data]);

  const handlePouUpClose = () => {
    setPopup(false);
  };

  const closeModal = () => {
    setPopup(false);
  };

  const settings = {
    arrows: false,
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box>
      <Modal
        open={openPopup}
        onClose={handlePouUpClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ position: "relative" }}>
          <CloseIcon
            sx={{
              position: "absolute",
              right: { md: "60px", sm: "50px", xs: "38px" },
              top: { md: "45px", sm: "45px", xs: "42px" },
              zIndex: "999",
              color: "#fff",
              cursor: "pointer",
              background: "#882C41",
              borderRadius: "50%",
            }}
            onClick={closeModal}
          />

          <Box>
            <Slider {...settings}>
              {data?.payload?.data?.map((item: any, index: any) => (
                <Box key={index}>
                  <Box
                    sx={{
                      backgroundImage: `url(${item?.imgUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "100%",
                      aspectRatio: "16/9",
                    }}
                  ></Box>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PopupSlider;
