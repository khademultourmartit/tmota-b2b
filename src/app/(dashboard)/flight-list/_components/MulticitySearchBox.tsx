import { Box, Grid, Stack, Typography, styled } from "@mui/material";
import React, { useRef, useState } from "react";
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
import { addDays, format } from "date-fns";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

const MulticitySearchBox = ({
  setSearchKeyword,
  searchData,
  setSearchData,
  handleReverseDestination,
  handleSearch,
  airportData,
  fromSearchText,
  setFromSearchText,
}: any) => {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [openJourneyDate, setOpenJourneyDate] = useState(false);
  const now = useRef(new Date());
  const [journeyDate, setJourneyDate] = useState(addDays(now.current, 0));

  const [toSearchText, setToSearchText] = useState({
    airportCode: "CXB",
    airportName: "Coxs Bazar Airport",
    cityName: "Coxs Bazar",
    countryName: "Bangladesh",
  });

  console.log("toSearchText", fromSearchText);

  const getSuggestedText = (item: any) => {
    setFromSearchText(item);
  };

  const addCity = () => {
    const tempSearchData = [...searchData.segments];
    tempSearchData.push({
      id: tempSearchData.length,
      fromAirportCode:
        tempSearchData[tempSearchData.length - 1].fromAirportCode,
      fromCityName: tempSearchData[tempSearchData.length - 1].fromCityName,
      fromCountryName:
        tempSearchData[tempSearchData.length - 1].fromCountryName,
      fromAirportName:
        tempSearchData[tempSearchData.length - 1].fromAirportName,

      openFrom: openFrom,
      openTo: openTo,
      journeyDate: journeyDate,
      openJourneyDate: openJourneyDate,
    });
    setSearchData({
      ...searchData,
      segments: tempSearchData,
      CityCount: tempSearchData.length,
    });
  };

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
                  ) : segment?.fromAirportCode === segment?.toAirportCode ? (
                    <Box pt={5.5}>
                      <SamePlaceError />
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", gap: "10px" }} mt={1}>
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
                        <Typography
                          sx={{ color: "#6E0A82", fontWeight: "500" }}
                        >
                          {segment?.fromAirportCode}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            color: "#2D233C",
                            fontSize: "14px",
                          }}
                        >
                          {segment?.fromCityName},{segment?.fromCountryName}
                        </Typography>
                        <Typography sx={{ color: "#6E6996", fontSize: "11px" }}>
                          {segment?.fromAirportName}
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
                      <Box>
                        <Box
                          sx={{
                            height: "fit-content",
                            position: "relative",
                            width: "100%",
                            zIndex: 100,
                          }}
                        >
                          <Box
                            sx={{
                              maxHeight: "230px",
                              overflowY: "auto",
                              background: "#fff",
                              "&::-webkit-scrollbar": { width: "5px" },
                            }}
                          >
                            {airportData?.length > 0 ? (
                              airportData?.map((item: any) => (
                                <Box
                                  key={item?.id || item?.airportCode}
                                  sx={{
                                    padding: "10px",
                                    cursor: "pointer",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                    onClick={() => getSuggestedText(item)}
                                  >
                                    <Typography
                                      sx={{
                                        color: "#A56EB4",
                                        fontSize: "13px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                      }}
                                    >
                                      <LocationOnIcon
                                        sx={{
                                          color: "#A56EB4",
                                          fontSize: "20px",
                                        }}
                                      />
                                      {item?.cityName}
                                    </Typography>

                                    <Typography
                                      sx={{
                                        fontSize: "11px",
                                        color: "#6E6996",
                                      }}
                                    >
                                      All Airport
                                    </Typography>
                                  </Box>

                                  <Box my={1}>
                                    <hr
                                      style={{
                                        backgroundColor: "#F2F0F9",
                                        height: "2px",
                                        border: "none",
                                      }}
                                    />
                                  </Box>

                                  {item?.airports ? (
                                    item?.airports?.map((data: any) => (
                                      <Box
                                        key={data?.id || data?.airportCode}
                                        sx={{
                                          display: "flex",
                                          gap: "8px",
                                        }}
                                        p={0.5}
                                        mt={1}
                                        onClick={() => getSuggestedText(data)}
                                      >
                                        <Box
                                          sx={{
                                            height: "30px",
                                            bgcolor: "#F2F0F9",
                                            width: "45px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              color: "#6E0A82",
                                              fontWeight: "500",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {data?.airportCode}
                                          </Typography>
                                        </Box>
                                        <Box>
                                          <Typography
                                            sx={{
                                              color: "#2D233C",
                                              fontSize: "12px",
                                            }}
                                          >
                                            {data?.cityName},{" "}
                                            {data?.countryName}
                                          </Typography>
                                          <Typography
                                            sx={{
                                              color: "#6E6996",
                                              fontSize: "10px",
                                            }}
                                          >
                                            {data?.airportName}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    ))
                                  ) : (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        gap: "8px",
                                      }}
                                      p={0.5}
                                      mt={1}
                                      onClick={() => getSuggestedText(item)}
                                    >
                                      <Box
                                        sx={{
                                          height: "30px",
                                          bgcolor: "#F2F0F9",
                                          width: "45px",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            color: "#6E0A82",
                                            fontWeight: "500",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {item?.airportCode}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            color: "#2D233C",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {item?.cityName}, {item?.countryName}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            color: "#6E6996",
                                            fontSize: "10px",
                                          }}
                                        >
                                          {item?.airportName}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  )}
                                </Box>
                              ))
                            ) : (
                              <Box>
                                <Typography
                                  sx={{
                                    color: "#DC143C",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Not found
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
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
                    // onClick={() => {
                    //   setOpenJourneyDate((prev: boolean) => !prev);
                    //   setOpenReturnDate(false);
                    //   setOpenFrom(false);
                    //   setOpenTo(false);
                    //   setTravelerBoxOpen(false);
                    //   setClassBoxOpen(false);
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
                  <Box sx={{ cursor: "pointer" }}>
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
                      onClick={addCity}
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

                {/* {openJourneyDate && (
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
                )} */}
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
                      >
                        <Image src={calender} alt="plan Icon" />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#2D233C",
                            fontWeight: 500,
                          }}
                        >
                          Economy
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
                      >
                        <Image src={calender} alt="plan Icon" />
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#2D233C",
                            fontWeight: 500,
                          }}
                        >
                          Traveler
                        </Typography>
                      </Box>
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
      </Grid>
    </Box>
  );
};

export default MulticitySearchBox;
