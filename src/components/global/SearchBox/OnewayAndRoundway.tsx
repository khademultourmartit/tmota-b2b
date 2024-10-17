import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import FlightClassNamesBox from "../FlightClassNamesBox/FlightClassNamesBox";
import TravelerBox from "../TravelerBox/TravelerBox";
import { Calendar, DateRange, DateRangePicker } from "react-date-range";
import moment from "moment";
import Plan from "../../../../public/assests/searchIcon/plan.svg";
import ToPlane from "../../../../public/assests/searchIcon/ToPlane.svg";
import calender from "../../../../public/assests/searchIcon/calender.svg";
import reverse from "../../../../public/assests/searchIcon/reverse.svg";
import AddIcon from "@mui/icons-material/Add";
import Radio from "@mui/material/Radio";
import Image from "next/image";
import AirportListsCard from "../AirportListsCard/AirportListsCard";
import SamePlaceError from "../SamePlaceError/SamePlaceError";
import Link from "next/link";
import zIndex from "@mui/material/styles/zIndex";
const OnewayAndRoundway = ({
  openFrom,
  openTo,
  setOpenFrom,
  setOpenTo,
  setTravelerBoxOpen,
  setClassBoxOpen,
  setSearchKeyword,
  setOpenJourneyDate,
  openReturnDate,
  fromSearchText,
  toSearchText,
  handleReverseDestination,
  journeyDate,
  setJourneyDate,
  openJourneyDate,
  today,
  handleSelect,
  handleSelectReturn,
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
  setAirportData,
  fromSuggestedText,
  toSuggestedText,
  currentMenu,
  returnDate,
  setReturnDate,
  setOpenReturnDate,
  setCurrentMenu,
}: any) => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelectReturnDate = (ranges: any) => {
    setDateRange([ranges.selection]);
    setJourneyDate(ranges.selection.startDate);
    setReturnDate(ranges.selection.endDate);
    // setOpenReturnDate(false);
  };

  const startDate = new Date(journeyDate);
  const endDate = new Date(returnDate);
  const differenceInTime = endDate.getTime() - startDate.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  type MenuItem = {
    name: string;
    icon: string;
  };

  type FlightMenu = {
    name: string;
  };

  interface Airport {
    id: number;
    airportCode: string;
    airportName: string;
    cityName: string;
    cityCode: string;
    countryName: string;
    countryCode: string;
    activeRunways: string;
    airportElevation: string;
  }
  interface AirportPayload {
    cityCode: string;
    airportCode: string;
    cityName: string;
    countryName: string;
    airportName: string;
    airports: Airport[];
  }

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

  return (
    <>
      <Grid
        sx={{
          height: "fit-content",
          width: "100%",
        }}
        container
        rowSpacing={{ lg: 0, md: 0, sm: 1, xs: 1 }}
        columnSpacing={0.1}
      >
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={5.5}
          lg={5.5}
          style={{
            border: "1px solid #D9D5EC",
            padding: "10px",
          }}
        >
          {/* From arrival  airport */}
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
              e.stopPropagation();
              setOpenFrom((prev: boolean) => !prev);
              setOpenTo(false);
              setTravelerBoxOpen(false);
              setClassBoxOpen(false);
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
              {openFrom ? (
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
              ) : fromSearchText?.airportCode === toSearchText?.airportCode ? (
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
                    <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
                      {fromSearchText?.airportCode}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#2D233C",
                        fontSize: "14px",
                      }}
                    >
                      {fromSearchText?.cityName},{fromSearchText?.countryName}
                    </Typography>
                    <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                      {fromSearchText?.airportName}
                    </Typography>
                  </Box>
                </Box>
              )}

              {openFrom && (
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
                  <Box>{fromGetSuggetion()}</Box>
                </Box>
              )}

              <Image
                onClick={handleReverseDestination}
                style={{
                  position: "absolute",
                  right: "22px",
                  top: "15px",
                  cursor: "pointer",
                }}
                width={40}
                src={reverse}
                alt="reverse icon"
              />
            </Box>
          </Grid>

          {/* To arrival airport */}
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
              setOpenTo((prev: boolean) => !prev);
              setOpenFrom(false);
              setTravelerBoxOpen(false);
              setClassBoxOpen(false);
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

              {openTo ? (
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
              ) : fromSearchText?.airportCode === toSearchText?.airportCode ? (
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
                    <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
                      {toSearchText?.airportCode}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: "#2D233C",
                        fontSize: "14px",
                      }}
                    >
                      {toSearchText?.cityName},{toSearchText?.countryName}
                    </Typography>
                    <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                      {toSearchText?.airportName}
                    </Typography>
                  </Box>
                </Box>
              )}

              {openTo && (
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

        {/*  date */}

        <Grid
          item
          container
          xs={12}
          sm={12}
          md={3.5}
          lg={3.5}
          style={{
            border: "1px solid #D9D5EC",
            padding: "10px",
            position: "relative",
          }}
          ml={{
            sm: 1.5,
            xs: 0,
          }}
          mt={{
            xs: 1,
            sm: 0,
          }}
        >
          {currentMenu === "Oneway" && (
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                      <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
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
                  onClick={() => {
                    setCurrentMenu("Round Trip");
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
                      Add Return
                    </Typography>
                  </Box>

                  <Box
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
                <Box className="DatePicker-style">
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
          )}

          {currentMenu === "Round Trip" && (
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
                sx={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => {
                  setOpenReturnDate((prev: boolean) => !prev);
                  setOpenJourneyDate(false);
                  setOpenFrom(false);
                  setOpenTo(false);
                  setTravelerBoxOpen(false);
                  setClassBoxOpen(false);
                }}
              >
                <Box
                  sx={{
                    cursor: "pointer",
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
                      <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
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
                  onClick={() => {
                    setCurrentMenu("Round Trip");
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
                      Add Return
                    </Typography>
                  </Box>

                  <Box mt={1} sx={{ display: "flex", gap: "10px" }}>
                    <Box
                      sx={{
                        height: "35px",
                        bgcolor: "#F2F0F9",
                        width: "55px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ color: "#6E0A82", fontWeight: "500" }}>
                        {moment(returnDate).format("DD")}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#2D233C", fontSize: "14px" }}>
                        {moment(returnDate).format("MMMM")}
                      </Typography>
                      <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                        {moment(returnDate).format("dddd")},{" "}
                        {moment(returnDate).format("YYYY")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {openReturnDate && (
                <Box>
                  <DateRangePicker
                    ranges={dateRange}
                    onChange={handleSelectReturnDate}
                    minDate={today}
                    months={2}
                    rangeColors={["#A56EB4"]}
                    direction="horizontal"
                    className={"return-calendar "}
                  />
                  <Box className={"return-date-count"}>
                    <Typography
                      sx={{
                        padding: "5px 0px",
                        textAlign: "center",
                        color: "#ffffff",
                        fontSize: "14px",
                      }}
                    >
                      {differenceInDays + 1} Days
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          )}
        </Grid>

        {/*  //todo: Passenger info */}
        <Grid
          item
          xs={12}
          sm={12}
          md={1.9}
          lg={1.9}
          sx={{
            position: "relative",
          }}
          ml={{
            sm: 1.5,
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
                }}
              >
                <Image src={calender} alt="plan Icon" />
                <Typography
                  sx={{
                    fontSize: "15px",
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
                my={1}
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
                }}
              >
                <Image src={calender} alt="plan Icon" />
                <Typography
                  sx={{
                    fontSize: "15px",
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
                <FlightClassNamesBox {...{ className, handleClassName }} />
              )}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          md={0.7}
          ml={{
            sm: 1.5,
            xs: 0,
          }}
          mt={{
            xs: 1,
            sm: 0,
          }}
          onClick={handleSearch}
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              background: "#A56EB4",
              borderRadius: "3px",
              cursor: "pointer",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <button
                style={{
                  border: "none",
                  background: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OnewayAndRoundway;
