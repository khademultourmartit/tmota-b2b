"use client";

import { Box, Modal, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGetPopupQuery } from "@/features/banner/apis/queries";
import Slider from "react-slick";
import Image from "next/image";
import "../../../../scss/dashboard/popup.scss";

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
};

const PopupSlider = () => {
  const url = window.location.pathname.replace(/^\/+/, "");
  const capitalizedUrl = url.charAt(0).toUpperCase() + url.slice(1);

  const params = {
    page: "1",
    limit: "20",
    type: "PopUp",
    location: capitalizedUrl,
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
    arrows: true,
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
          <CloseIcon className="close-icon" onClick={closeModal} />
          <Box className="popupSlider">
            <Slider {...settings}>
              {data?.payload?.data?.map((item: any, index: any) => (
                <Box key={index}>
                  <Box
                    className="popup-bg-image"
                    style={{ backgroundImage: `url(${item?.imgUrl})` }}
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
