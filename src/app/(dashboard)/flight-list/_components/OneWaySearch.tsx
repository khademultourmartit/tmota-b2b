"use client";

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import AirlinesSlider from "./AirlinesSlider";
import { flightSearch } from "@/features/flight-search/apis/service";
import { useSearchParams } from "next/navigation";

const OnewaySearch = () => {
  const searchParams = useSearchParams();
  const adultCount = Number(searchParams.get("num-adults"));
  const childCount = Number(searchParams.get("num-children"));
  const kidCount = Number(searchParams.get("num-kid"));
  const infantCount = Number(searchParams.get("num-infant"));
  const infantWithSeatCount = Number(searchParams.get("num-infantwithseat"));
  const cabinClass = searchParams.get("cabin-class");
  const tripType = searchParams.get("trip-type");
  const directFlightsOnly = searchParams.get("direct-flight");
  const conversationId = searchParams.get("conversationId");
  const originDestinationStr = searchParams.get("destination") as string;
  const segments = originDestinationStr.slice(1, -1).split("/");

  const originDestinationData = segments.map((segment) => {
    const [departureCode, arrivalCode, date] = segment.split("-");
    return {
      departure: {
        locationCode: departureCode,
        date: date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6),
      },
      arrival: {
        locationCode: arrivalCode,
      },
    };
  });

  const body = {
    pointOfSale: "BD",
    searchCriteria: {
      tripType: tripType,
      originDestination: originDestinationData,
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
      ...[...new Array(infantWithSeatCount)].map((_, i) => ({
        passengerType: "INS",
        passengerID: "INS" + (i + 1),
      })),
    ],
    preferences: {
      cabinClass: cabinClass,
      maxStops: "All",
      carrierPreference: [],
      directFlightsOnly: directFlightsOnly,
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
      conversationId: conversationId,
      target: "Test",
    },
  };

  console.log("body", body);

  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [airlineData, setAirLineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await flightSearch(
        secureLocalStorage.getItem("onewaybody")
      );
      const data: any = response.data?.payload?.pricedItineraries;
      secureLocalStorage.setItem("flightSearchResults", JSON.stringify(data));
      const parsedResults = data;
      const airLinesData = parsedResults.map((data: any) => ({
        validatingCarrier: data?.flightOffer?.validatingCarrier,
        totalFare: data?.flightOffer?.pricingInfo?.price?.totalFare,
      }));
      setAirLineData(airLinesData);
      setSearchResults(parsedResults);
      setIsLoading(false);
    })();
  }, [secureLocalStorage.getItem("onewaybody")]);

  return (
    <Box>
      <Typography>One Way search Result</Typography>
      <AirlinesSlider {...{ airlineData }} />

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Typography sx={{ ml: 2 }}>Loading search results...</Typography>
        </Box>
      ) : searchResults && searchResults.length > 0 ? (
        <Box>
          {searchResults?.map((data) => (
            <h1 key={data?.flightOffer?.offerId}>
              {data?.flightOffer?.offerId}
            </h1>
          ))}
        </Box>
      ) : (
        <Typography>No search results available.</Typography>
      )}
    </Box>
  );
};

export default OnewaySearch;
