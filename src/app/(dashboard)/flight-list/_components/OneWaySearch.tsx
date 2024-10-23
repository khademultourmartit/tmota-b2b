"use client"; // Ensures the component is rendered only on the client side

import { Box, Typography } from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import AirlinesSlider from "./AirlinesSlider";
import { flightSearch } from "@/features/flight-search/apis/service";
import { useSearchParams } from "next/navigation";

const OnewaySearchContent = () => {
  const searchParams = useSearchParams(); // Client-side only

  const adultCount = Number(searchParams.get("num-adults")) || 0;
  const childCount = Number(searchParams.get("num-children")) || 0;
  const kidCount = Number(searchParams.get("num-kid")) || 0;
  const infantCount = Number(searchParams.get("num-infant")) || 0;
  const infantWithSeatCount =
    Number(searchParams.get("num-infantwithseat")) || 0;
  const cabinClass = searchParams.get("cabin-class") || "Economy";
  const tripType = searchParams.get("trip-type") || "oneway";
  const directFlightsOnly = searchParams.get("direct-flight") === "true";
  const conversationId = searchParams.get("conversationId") || "";
  const originDestinationStr = searchParams.get("destination") || "";

  const segments = originDestinationStr
    ? originDestinationStr.slice(1, -1).split("/")
    : [];

  const originDestinationData = segments.map((segment) => {
    const [departureCode, arrivalCode, date] = segment.split("-");
    return {
      departure: {
        locationCode: departureCode,
        date: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}`,
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

  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [airlineData, setAirlineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await flightSearch(body);
        const data: any = response.data?.payload?.pricedItineraries || [];
        const airLinesData = data.map((item: any) => ({
          validatingCarrier: item?.flightOffer?.validatingCarrier,
          totalFare: item?.flightOffer?.pricingInfo?.price?.totalFare,
        }));
        setAirlineData(airLinesData);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching flight data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, []);

  return (
    <Box>
      <Typography variant="h5">One Way Search Result</Typography>
      <AirlinesSlider airlineData={airlineData} />

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <Typography>Loading search results...</Typography>
        </Box>
      ) : searchResults && searchResults.length > 0 ? (
        <Box>
          {searchResults.map((data) => (
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

// Wrap the OnewaySearchContent with Suspense
const OnewaySearch = () => (
  <Suspense fallback={<Typography>Loading...</Typography>}>
    <OnewaySearchContent />
  </Suspense>
);

export default OnewaySearch;
