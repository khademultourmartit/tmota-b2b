"use client";

import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format } from "date-fns";
import moment from "moment";
import { useRouter } from "next/navigation";
import CustomClickAwayListener from "@/app/(dashboard)/flight-list/_components/CustomClickAwayListener";
import FlightMenu from "@/app/(dashboard)/flight-list/_components/FlightMenu";
import FlightSearchBar from "@/app/(dashboard)/flight-list/_components/FlightSearchBar";
import CardWrapper from "@/app/(dashboard)/flight-list/_components/CardWrapper";
import Marquee from "react-fast-marquee";
import OnewayAndRoundway from "./OnewayAndRoundway";
import secureLocalStorage from "react-secure-storage";
import HomeSlider from "../../dashboard/_components/HomeSlider";
import MulticitySearchBox from "./MulticitySearchBox";
import { useGetAirportSearchQuery } from "@/features/airport-search/apis/queries";
import { airportSearch } from "@/features/airport-search/apis/service";
import axios from "axios";
import { getNoticeData } from "@/features/notice/apis/service";

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

const SearchBox = () => {
  const token = secureLocalStorage.getItem("accessToken");
  const [tabs, setTabs] = useState("Flight");
  const [currentMenu, setCurrentMenu] = useState("Oneway");
  const [travelerBoxOpen, setTravelerBoxOpen] = useState(false);
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [classBoxOpen, setClassBoxOpen] = useState(false);
  const [openJourneyDate, setOpenJourneyDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [infantWithSeatCount, setInfantWithSeatCount] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(1);
  const [airportData, setAirportData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("bangladesh");
  const [className, setClassName] = useState("Economy");
  const now = useRef(new Date());
  const router = useRouter();
  const [journeyDate, setJourneyDate] = useState(addDays(now.current, 0));
  const [returnDate, setReturnDate] = useState(addDays(now.current, 0));
  const [notice, setNotice] = useState([]);
  const [open, setOpen] = useState(false);
  const today = new Date();
  const maxDate = new Date();

  const [fromSearchText, setFromSearchText] = useState({
    airportCode: "DAC",
    airportName: "Hazrat Shahjalal Intl Arpt",
    cityName: "Dhaka",
    countryName: "Bangladesh",
  });

  const [toSearchText, setToSearchText] = useState({
    airportCode: "CXB",
    airportName: "Coxs Bazar Airport",
    cityName: "Coxs Bazar",
    countryName: "Bangladesh",
  });

  // query
  useEffect(() => {
    (async () => {
      const { data } = await airportSearch(searchKeyword);
      setAirportData(data.payload || []);
    })();
  }, [searchKeyword]);

  const handleClose = () => {
    setTotalPassenger(
      adultCount + childCount + kidCount + infantCount + infantWithSeatCount
    );
    setTravelerBoxOpen(false);
  };

  const handleSelect = (date: any) => {
    setJourneyDate(date);
    setOpenJourneyDate(false);
    if (currentMenu === "Round Trip") {
      setOpenReturnDate(true);
    }
  };

  const handleSelectReturn = (date: any) => {
    setReturnDate(date);
    setOpenReturnDate(false);
  };

  function canIncrementMorethanNine(
    adultCount: any,
    childCount: any,
    kidCount: any,
    infantWithSeatCount: any
  ) {
    const totalCount = adultCount + childCount + kidCount + infantWithSeatCount;

    if (totalCount < 9) {
      return true;
    } else {
      return false;
    }
  }

  function canIncrementInfant(
    adultCount: any,
    infantCount: any,
    infantWithSeatCount: any
  ) {
    if (adultCount > infantCount + infantWithSeatCount) {
      return true;
    } else {
      return false;
    }
  }

  function adultInclement(e: React.FormEvent) {
    e.preventDefault();

    if (
      canIncrementMorethanNine(
        adultCount,
        childCount,
        kidCount,
        infantWithSeatCount
      )
    ) {
      setAdultCount(adultCount + 1);
    }
  }

  // adult decrement
  function adultDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
      if (infantCount + infantWithSeatCount === adultCount) {
        if (infantCount > 1) {
          setInfantCount(infantCount - 1);
        }
        if (infantWithSeatCount >= 1) {
          setInfantWithSeatCount(infantWithSeatCount - 1);
        }
      }
    }
  }
  //  child incerement
  function childIncrement(e: React.FormEvent) {
    e.preventDefault();
    if (
      canIncrementMorethanNine(
        adultCount,
        childCount,
        kidCount,
        infantWithSeatCount
      )
    ) {
      setChildCount(childCount + 1);
    }
  }
  // child decrement
  function childDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  }
  //  kid increment
  function kidInclement(e: React.FormEvent) {
    e.preventDefault();
    if (
      canIncrementMorethanNine(
        adultCount,
        childCount,
        kidCount,
        infantWithSeatCount
      )
    ) {
      setKidCount(kidCount + 1);
    }
  }
  // kid decrement
  function kidDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (kidCount > 0) {
      setKidCount(kidCount - 1);
    }
  }
  // Increment the default value if the value is not a child.

  function infantIncrement(e: React.FormEvent) {
    e.preventDefault();
    if (canIncrementInfant(adultCount, infantCount, infantWithSeatCount)) {
      setInfantCount(infantCount + 1);
    }
  }

  // Decrement the infant by 1.
  function infantDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (infantCount > 0) {
      setInfantCount(infantCount - 1);
    }
  }

  function infantWithSeatIncrement(e: React.FormEvent) {
    e.preventDefault();
    if (
      canIncrementInfant(adultCount, infantCount, infantWithSeatCount) &&
      canIncrementMorethanNine(
        adultCount,
        childCount,
        kidCount,
        infantWithSeatCount
      )
    ) {
      setInfantWithSeatCount(infantWithSeatCount + 1);
    }
  }

  function infantWithSeatDecrement(e: React.FormEvent) {
    e.preventDefault();
    if (infantWithSeatCount > 0) {
      setInfantWithSeatCount(infantWithSeatCount - 1);
    }
  }

  const fromSuggestedText = (data: any) => {
    setFromSearchText(data);
  };

  const toSuggestedText = (data: any) => {
    setToSearchText(data);
  };

  const handleClassName = (event: any) => {
    setClassName(event.target.value);
    setClassBoxOpen(false);
  };

  const handleClickAway = () => {
    setTravelerBoxOpen(false);
    setOpenFrom(false);
    setOpenTo(false);
    setClassBoxOpen(false);
    setOpenJourneyDate(false);
    setOpenReturnDate(false);
  };

  const handleReverseDestination = (e: any) => {
    e.stopPropagation();
    setFromSearchText(toSearchText);
    setToSearchText(fromSearchText);
  };

  const oneWaySearch = [
    {
      departure: {
        locationCode: fromSearchText?.airportCode,
        date: moment(journeyDate).format("YYYY-MM-DD"),
      },
      arrival: {
        locationCode: toSearchText?.airportCode,
      },
    },
  ];

  const returnSearch = [
    {
      departure: {
        locationCode: fromSearchText?.airportCode,
        date: moment(journeyDate).format("YYYY-MM-DD"),
      },
      arrival: {
        locationCode: toSearchText?.airportCode,
      },
    },
    {
      departure: {
        locationCode: fromSearchText?.airportCode,
        date: moment(returnDate).format("YYYY-MM-DD"),
      },
      arrival: {
        locationCode: toSearchText?.airportCode,
      },
    },
  ];

  // interface fromSearchText {
  //   airportCode: any;
  //   airportName: any;
  //   cityName: any;
  //   countryName: any;
  // }

  interface Segment {
    id: any;
    fromAirportCode: any;
    fromCityName: any;
    fromCountryName: any;
    fromAirportName: any;
    toAirportCode: any;
    toCityName: any;
    toCountryName: any;
    toAirportName: any;
    openFrom: any;
    openTo: any;
    openJourneyDate: any;
    journeyDate: any;
  }

  interface SearchData {
    segments: Segment[];
  }

  const [searchData, setSearchData] = useState<SearchData>({
    segments: [
      {
        id: 0,
        fromAirportCode: fromSearchText?.airportCode,
        fromCityName: fromSearchText?.cityName,
        fromCountryName: fromSearchText?.countryName,
        fromAirportName: fromSearchText?.airportName,
        toAirportCode: toSearchText?.airportCode,
        toCityName: toSearchText?.cityName,
        toCountryName: toSearchText?.countryName,
        toAirportName: toSearchText?.airportName,
        openFrom: openFrom,
        openTo: openTo,
        journeyDate: journeyDate,
        openJourneyDate: openJourneyDate,
      },
      {
        id: 1,
        fromAirportCode: toSearchText?.airportCode,
        fromCityName: toSearchText?.cityName,
        fromCountryName: toSearchText?.countryName,
        fromAirportName: toSearchText?.airportName,
        toAirportCode: "DXB",
        toCityName: "Dubai",
        toCountryName: "United Arab Emirates",
        toAirportName: "Dubai Intl Arpt",
        openFrom: openFrom,
        openTo: openTo,
        journeyDate: journeyDate,
        openJourneyDate: openJourneyDate,
      },
    ],
  });

  // useEffect(() => {
  //   setSearchData({
  //     segments: [
  //       {
  //         id: 0,
  //         fromAirportCode: fromSearchText?.airportCode,
  //         fromCityName: fromSearchText?.cityName,
  //         fromCountryName: fromSearchText?.countryName,
  //         fromAirportName: fromSearchText?.airportName,
  //         toAirportCode: toSearchText?.airportCode,
  //         toCityName: toSearchText?.cityName,
  //         toCountryName: toSearchText?.countryName,
  //         toAirportName: toSearchText?.airportName,
  //         openFrom: openFrom,
  //         openTo: openTo,
  //         journeyDate: journeyDate,
  //         openJourneyDate: openJourneyDate,
  //       },
  //       {
  //         id: 1,
  //         fromAirportCode: toSearchText?.airportCode,
  //         fromCityName: toSearchText?.cityName,
  //         fromCountryName: toSearchText?.countryName,
  //         fromAirportName: toSearchText?.airportName,
  //         toAirportCode: "DXB",
  //         toCityName: "Dubai",
  //         toCountryName: "United Arab Emirates",
  //         toAirportName: "Dubai Intl Arpt",
  //         openFrom: openFrom,
  //         openTo: openTo,
  //         journeyDate: journeyDate,
  //         openJourneyDate: openJourneyDate,
  //       },
  //     ],
  //   });
  // }, [
  //   fromSearchText,
  //   toSearchText,
  //   openFrom,
  //   openTo,
  //   journeyDate,
  //   openJourneyDate,
  // ]);

  const handleSearch = () => {
    const destinationData = {
      searchCriteria: {
        tripType: currentMenu,
        originDestination:
          currentMenu === "Oneway"
            ? oneWaySearch
            : currentMenu === "Round Trip"
            ? returnSearch
            : [],
      },
    };
    const urlSegments = destinationData.searchCriteria?.originDestination
      ?.map((leg: any) => {
        const { locationCode: depCode } = leg.departure;
        const { date } = leg.departure;
        const { locationCode: arrCode } = leg.arrival;
        const formattedDate = date.replace(/-/g, "");
        return `${depCode}-${arrCode}-${formattedDate}`;
      })
      .join("/");
    const conversationId = "A" + Math.floor(Math.random() * 1000000000);
    const destination = `/${urlSegments}/`;
    const queryParams = `?destination=${destination}&num-adults=${adultCount}&num-children=${childCount}&num-kid=${kidCount}&num-infant=${infantCount}&num-infantwithseat=${infantWithSeatCount}&cabin-class=${className}&trip-type=${currentMenu}&direct-flight=${false}&conversationId=${conversationId}`;
    router.push(`/flight-list${queryParams}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNoticeData();
        setNotice(response.data?.payload?.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchData();
  }, []);

  return (
    <CustomClickAwayListener handleClickAway={handleClickAway}>
      <Box>
        <FlightSearchBar />
        <CardWrapper>
          <FlightMenu
            {...{
              setCurrentMenu,
              currentMenu,
              setOpenReturnDate,
            }}
          />
          <Box mt={2}>
            {currentMenu === "Oneway" || currentMenu === "Round Trip" ? (
              <OnewayAndRoundway
                {...{
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
                  setJourneyDate,
                  openJourneyDate,
                  openReturnDate,
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
                }}
              />
            ) : (
              <>
                <MulticitySearchBox
                  {...{
                    fromSearchText,
                    setFromSearchText,
                    setSearchKeyword,
                    handleReverseDestination,
                    searchData,
                    setSearchData,
                    handleSearch,
                    airportData,
                  }}
                />
              </>
            )}
          </Box>
        </CardWrapper>
        <Box mt={3}>
          <Typography
            style={{
              backgroundColor: "#B4B4CD",
              color: "#fff",
              padding: "5px 10px",
              display: "flex",
              fontSize: "12px",
            }}
          >
            <Marquee>
              {notice?.map((data: any) => (
                <span style={{ marginRight: "16px" }} key={data?.id}>
                  {data?.description}
                </span>
              ))}
            </Marquee>
          </Typography>
        </Box>
        <Box mt={3}>
          <HomeSlider />
        </Box>
      </Box>
    </CustomClickAwayListener>
  );
};
export default SearchBox;
