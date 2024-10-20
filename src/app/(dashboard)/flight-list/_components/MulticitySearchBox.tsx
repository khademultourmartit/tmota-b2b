import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import FlightClassNamesBox from "./FlightClassNamesBox";
import TravelerBox from "./TravelerBox";
import { Calendar, DateRange, DateRangePicker } from "react-date-range";
import moment from "moment";
import Plan from "../../../../../public/assests/searchIcon/plan.svg";
import ToPlane from "../../../../../public/assests/searchIcon/ToPlane.svg";
import calender from "../../../../../public/assests/searchIcon/calender.svg";
import reverse from "../../../../../public/assests/searchIcon/reverse.svg";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import Image from "next/image";
import AirportListsCard from "./AirportListsCard";
import SamePlaceError from "./SamePlaceError";
import Link from "next/link";
import zIndex from "@mui/material/styles/zIndex";

const MulticitySearchBox = ({
  openFrom,
  openTo,
  setOpenFrom,
  setOpenTo,
  setTravelerBoxOpen,
  setClassBoxOpen,
  setSearchKeyword,
  setOpenJourneyDate,
  fromSearchText,
  toSearchText,
  handleReverseDestination,
  journeyDate,
  openJourneyDate,
  today,
  handleSelect,
  className,
  totalPassenger,
  travelerBoxOpen,
  classBoxOpen,
  handleClassName,
  handleSearch,
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
  airportData,
  fromSuggestedText,
  toSuggestedText,
  returnDate,
  setOpenReturnDate,
  setCurrentMenu,
  searchData,
  setSearchData,
}: any) => {
  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto #003566",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "var(--primary-color)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "var(--secondary-color)",
    },
  });

  function BpRadio(props: any) {
    return (
      <Radio
        sx={{
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }

  const fromGetSuggetion = () => {
    return (
      <>
        <AirportListsCard
          airportData={airportData}
          getSuggestedText={fromSuggestedText}
        />
      </>
    );
  };

  const toGetSuggetion = () => {
    return (
      <>
        <AirportListsCard
          airportData={airportData}
          getSuggestedText={toSuggestedText}
        />
      </>
    );
  };

  console.log("searchData", searchData);

  return (
    <Box>
      <Grid
        sx={{
          height: "fit-content",
          width: "100%",
        }}
        container
        rowSpacing={{ lg: 0, md: 1, sm: 1, xs: 1 }}
        columnSpacing={0.1}
      >
        {searchData?.segments?.map((segment: any, index: any) => (
          <>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={5.4}
              style={{
                border: "1px solid #D9D5EC",
                padding: "10px",
              }}
              mb={1}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  position: "relative",
                }}
                onClick={(e) => {
                  const tempSegment = [...searchData.segments];
                  tempSegment[index] = {
                    ...tempSegment[index],
                    openFrom: !segment.openFrom,
                    openTo: false,
                    openJourneyDate: false,
                  };
                  setSearchData({
                    ...searchData,
                    segments: tempSegment,
                  });
                  e.stopPropagation();
                  setOpenFrom((prev: boolean) => !prev);
                  setOpenTo(false);
                  setTravelerBoxOpen(false);
                  setClassBoxOpen(false);
                  setOpenReturnDate(false);
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Image src={Plan} alt="plan Icon" />
                    <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                      From
                    </Typography>
                  </Box>
                  {segment?.openFrom ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#003566",
                        backgroundColor: "#fff",
                      }}
                    >
                      <input
                        autoComplete="off"
                        autoFocus
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search an airport..."
                        style={{
                          color: "#9493BD",
                          fontWeight: 500,
                          width: "100%",
                          height: "40px",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          paddingTop: "10px",
                        }}
                      />
                    </Box>
                  ) : segment?.fromSearchText?.airportCode ===
                    segment?.toSearchText?.airportCode ? (
                    <Box pt={5.5}>
                      <SamePlaceError />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", gap: "10px" }} mt={1}>
                      <Box
                        sx={{
                          height: "36px",
                          bgcolor: "#F2F0F9",
                          width: "55px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
                          {segment?.fromSearchText?.airportCode}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#2D233C",
                            fontSize: "14px",
                          }}
                        >
                          {segment?.fromSearchText?.cityName},
                          {segment?.fromSearchText?.countryName}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {segment?.fromSearchText?.airportName}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {segment?.openFrom && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "120%",
                        left: "0",
                        right: "0",
                        width: "100%",
                        backgroundColor: "#ffffff",
                        height: "fit-content",
                        zIndex: 100,
                        border: "1px solid #6E0A82",
                      }}
                    >
                      <Box>{fromGetSuggetion()}</Box>
                    </Box>
                  )}

                  <Image
                    onClick={handleReverseDestination}
                    className="switch-image-btn"
                    width={25}
                    src={reverse}
                    alt="reverse icon"
                  />
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  position: "relative",
                }}
                onClick={() => {
                  const tempSegment = [...searchData.segments];
                  tempSegment[index] = {
                    ...tempSegment[index],
                    openFrom: false,
                    openTo: !segment.openTo,
                    openJourneyDate: false,
                  };
                  setSearchData({
                    ...searchData,
                    segments: tempSegment,
                  });

                  setOpenTo((prev: boolean) => !prev);
                  setOpenFrom(false);
                  setTravelerBoxOpen(false);
                  setClassBoxOpen(false);
                  setOpenReturnDate(false);
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Image src={ToPlane} alt="plan Icon" />
                    <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                      To
                    </Typography>
                  </Box>

                  {segment?.openTo ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#003566",
                        backgroundColor: "#fff",
                      }}
                    >
                      <input
                        autoComplete="off"
                        autoFocus
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        placeholder="Search an airport..."
                        style={{
                          color: "#9493BD",
                          fontWeight: 500,
                          width: "100%",
                          height: "40px",
                          backgroundColor: "transparent",
                          border: "none",
                          outline: "none",
                          paddingTop: "10px",
                        }}
                      />
                    </Box>
                  ) : segment?.fromSearchText?.airportCode ===
                    segment?.toSearchText?.airportCode ? (
                    <SamePlaceError />
                  ) : (
                    <Box sx={{ display: "flex", gap: "10px" }} mt={1}>
                      <Box
                        sx={{
                          height: "36px",
                          bgcolor: "#F2F0F9",
                          width: "55px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
                          {segment?.toSearchText?.airportCode}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#2D233C",
                            fontSize: "14px",
                            textWrap: "nowrap",
                          }}
                        >
                          {segment?.toSearchText?.cityName},
                          {segment?.toSearchText?.countryName}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {toSearchText?.airportName}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {segment?.openTo && (
                    <Box
                      style={{
                        position: "absolute",
                        top: "120%",
                        left: "0",
                        right: "0",
                        width: "100%",
                        backgroundColor: "#ffffff",
                        height: "fit-content",
                        zIndex: 100,
                        border: "1px solid #6E0A82",
                      }}
                    >
                      <Box>{toGetSuggetion()}</Box>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={12}
              md={12}
              lg={3.6}
              style={{
                border: "1px solid #D9D5EC",
                padding: "10px",
                position: "relative",
              }}
              mb={1}
              ml={{
                md: 0,
                lg: 1.5,
                xs: 0,
              }}
              mt={{
                xs: 1,
                sm: 0,
                md: 1,
                lg: 0,
              }}
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: { md: "column", lg: "row" },
                  }}
                >
                  <Box
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpenJourneyDate((prev: boolean) => !prev);
                      setOpenReturnDate(false);
                      setOpenFrom(false);
                      setOpenTo(false);
                      setTravelerBoxOpen(false);
                      setClassBoxOpen(false);
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image src={calender} alt="plan Icon" />
                      <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                        Departure
                      </Typography>
                    </Box>

                    <Box mt={1} sx={{ display: "flex", gap: "10px" }}>
                      <Box
                        sx={{
                          height: "36px",
                          bgcolor: "#F2F0F9",
                          width: "55px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
                          {moment(journeyDate).format("DD")}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                          {moment(journeyDate).format("MMMM")}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {moment(journeyDate).format("dddd")},{" "}
                          {moment(journeyDate).format("YYYY")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "1px",
                      border: "1px solid #D9D5EC",
                    }}
                  ></Box>
                  <Box
                    sx={{ cursor: "pointer" }}

                    // onClick={() => {
                    //   setCurrentMenu("Round Trip");
                    // }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Image src={calender} alt="plan Icon" />
                      <Typography sx={{ fontSize: "12px", color: "#9493BD" }}>
                        Add City
                      </Typography>
                    </Box>

                    <Box
                    onClick={()=>{
                    
                      const newSegment = {
                        id: 1,
                        fromSearchText: toSearchText,
                        toSearchText: {
                          airportCode: "DXB",
                          airportName: "Dubai Airport",
                          cityName: "Dubai Test",
                          countryName: "Dubai",
                        },
                        openFrom: openFrom,
                        openTo: openTo,
                        journeyDate: journeyDate,
                        openJourneyDate: openJourneyDate,
                      }
                      const updatedSearchData = {
                        ...searchData,
                        segments: [...searchData.segments, newSegment],
                      };
                      setSearchData(updatedSearchData);
                    }}
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <AddIcon
                        sx={{
                          fontSize: "40px",
                          color: "#9493BD",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {openJourneyDate && (
                  <Box>
                    <Calendar
                      className={"dashboard-calendar"}
                      color="#A56EB4"
                      date={new Date(journeyDate)}
                      direction="horizontal"
                      minDate={today}
                      onChange={handleSelect}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>

            {index === 0 ? (
              <>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={1.8}
                  sx={{
                    position: "relative",
                  }}
                  ml={{
                    md: 0,
                    lg: 1.5,
                    xs: 0,
                  }}
                  mt={{
                    xs: 1,
                    sm: 0,
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid #D9D5EC",
                      padding: "10px",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setClassBoxOpen((prev: boolean) => !prev);
                          setOpenFrom(false);
                          setOpenTo(false);
                          setTravelerBoxOpen(false);
                          setOpenReturnDate(false);
                        }}
                      >
                        <Image src={calender} alt="plan Icon" />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#2D233C",
                            fontWeight: 500,
                          }}
                        >
                          {className}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          border: "1px solid #D9D5EC",
                          width: "100%",
                        }}
                        my={1.5}
                      ></Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setTravelerBoxOpen((prev: boolean) => !prev);
                          setOpenFrom(false);
                          setOpenTo(false);
                          setClassBoxOpen(false);
                          setOpenReturnDate(false);
                        }}
                      >
                        <Image src={calender} alt="plan Icon" />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#2D233C",
                            fontWeight: 500,
                          }}
                        >
                          {totalPassenger} Traveler
                        </Typography>
                      </Box>

                      {travelerBoxOpen && (
                        <TravelerBox
                          {...{
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
                          }}
                        />
                      )}

                      {classBoxOpen && (
                        <FlightClassNamesBox
                          {...{ className, handleClassName }}
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  lg={0.7}
                  ml={{
                    sm: 1.5,
                    md: 0,
                    lg: 1.5,
                    xs: 0,
                  }}
                  mt={{
                    xs: 1,
                    sm: 0,
                  }}
                  onClick={handleSearch}
                >
                  <button
                    style={{
                      border: "none",
                      background: "#A56EB4",
                      color: "#fff",
                      cursor: "pointer",
                      width: "100%",
                      height: "100%",
                      borderRadius: "3px",
                    }}
                  >
                    Search
                  </button>
                </Grid>
              </>
            ) : (
              ""
            )}
          </>
        ))}

        {/*  //todo: Passenger info */}
      </Grid>
    </Box>
  );
};

export default MulticitySearchBox;
