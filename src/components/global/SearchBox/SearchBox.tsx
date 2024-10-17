import {
  Box,
  Button,
  ClickAwayListener,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { addDays, format } from "date-fns";
import moment from "moment";
import { useRouter } from "next/navigation";
import axios from "axios";

import CustomClickAwayListener from "@/components/global/CustomClickAwayListener/CustomClickAwayListener";
import FlightMenu from "@/components/global/FlightMenu/FlightMenu";
import FlightSearchBar from "@/components/global/FlightSearchBar/FlightSearchBar";
import CardWrapper from "@/components/global/CardWrapper/CardWrapper";
import Marquee from "react-fast-marquee";
import OnewayAndRoundway from "./OnewayAndRoundway";
import HomeSlider from "../HomeSlider/HomeSlider";
import { storeSearchResults } from "@/redux/slices/onewaySlice";
import { useDispatch } from "react-redux";
import secureLocalStorage from "react-secure-storage";
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
  const dispatch = useDispatch();
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
  const [airportData, setAirportData] = useState<AirportPayload[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("bangladesh");
  const [className, setClassName] = useState("Economy");
  const now = useRef(new Date());
  const router = useRouter();
  const [journeyDate, setJourneyDate] = useState(addDays(now.current, 0));
  const [returnDate, setReturnDate] = useState(addDays(now.current, 0));

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

  useEffect(() => {
    const url = `http://82.112.238.135:88/airports/search?searchInput=${searchKeyword}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAirportData(data?.payload);
      });
  }, [searchKeyword]);

  const handleClose = () => {
    setTotalPassenger(
      adultCount + childCount + kidCount + infantCount + infantWithSeatCount
    );
    setTravelerBoxOpen(false);
  };

  //todo: end of form Submit section
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
  //  adult Increment

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
    // if (adultCount < 9 - (childCount + kidCount + infantWithSeatCount)) {
    //   setAdultCount(adultCount + 1);
    // }
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

  const handleSearch = () => {
    const body = {
      pointOfSale: "BD",
      searchCriteria: {
        tripType: currentMenu,
        originDestination: [
          {
            departure: {
              locationCode: fromSearchText?.airportCode,
              date: moment(journeyDate).format("YYYY-MM-DD"),
            },
            arrival: {
              locationCode: toSearchText?.airportCode,
            },
          },
        ],
      },
      passengerInfo: [
        ...[...new Array(adultCount)].map((_, i) => ({
          passengerType: "ADT",
          passengerID: "PAS" + (i + 1),
        })),
        ...[...new Array(childCount)].map((_, i) => ({
          passengerType: "CHD",
          passengerID: "CHD" + (i + 1),
        })),
        ...[...new Array(kidCount)].map((_, i) => ({
          passengerType: "KID",
          passengerID: "KID" + (i + 1),
        })),
        ...[...new Array(infantCount)].map((_, i) => ({
          passengerType: "INF",
          passengerID: "INF" + (i + 1),
        })),
        ...[...new Array(infantCount)].map((_, i) => ({
          passengerType: "INS",
          passengerID: "INS" + (i + 1),
        })),
      ],
      preferences: {
        cabinClass: className,
        maxStops: "All",
        carrierPreference: [],
        directFlightsOnly: false,
        nearbyAirports: true,
      },
      pricing: {
        currency: "BDT",
        isRefundableOnly: false,
        maxUpsells: 4,
      },
      responseOptions: {
        format: "JSON",
        version: "V4",
        includeUpsells: true,
        requestOptions: "TwoHundred",
        isMultiOneWayOffer: true,
      },
      additionalInfo: {
        conversationId: "A123456",
        target: "Test",
      },
    };
    const bodyString = JSON.stringify(body);
    secureLocalStorage.setItem("onewaybody", JSON.stringify(body));
    router.push(`/dashboard/OnewaySearchResults`);
    // axios
    //   .post("http://82.112.238.135:112/api/flight/flight-search", bodyString, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     const data: any = response.data?.payload?.pricedItineraries;
    //     localStorage.setItem("flightSearchResults", JSON.stringify(data));

    //     router.push(`/dashboard/OnewaySearchResults`);
    //   })
    //   .catch((error) => {
    //     console.error("Search Error:", error);
    //   });
  };

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
              Notice, news and offers will be scroll here | Notice, news and
              offers will be scroll here Notice, news and offers will be scroll
              here | Notice, news and offers will be scroll here
            </Marquee>
          </Typography>
        </Box>

        {/* <Box mt={3}>
          <HomeSlider />
        </Box> */}
      </Box>
    </CustomClickAwayListener>
  );
};
export default SearchBox;
