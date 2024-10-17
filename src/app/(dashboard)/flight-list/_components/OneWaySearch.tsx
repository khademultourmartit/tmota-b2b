"use client";

import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import AirlinesSlider from "./AirlinesSlider";
import { projectConfig } from "@/config";

const OnewaySearch = () => {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [airlineData, setAirLineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        `${projectConfig.apiBaseUrl}/api/flight/flight-search`,
        secureLocalStorage.getItem("onewaybody"),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("Search Error:", error);
      });
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
