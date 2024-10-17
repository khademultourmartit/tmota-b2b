import { Box, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface AirportData {
  cityName: string;
  countryName?: string;
  airportName?: string;
  airportCode?: string;
  id?: string;
  airports?: AirportData[];
}

interface AirportListsCardProps {
  airportData: AirportData[];
  getSuggestedText: (item: AirportData) => void;
}

const AirportListsCard: React.FC<AirportListsCardProps> = ({ airportData, getSuggestedText }) => {
  return (
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
          airportData?.map((item) => (
            <Box
              key={item?.id || item?.airportCode} // Ensure unique key
              sx={{
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => getSuggestedText(item)}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
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

              {/* Display airports if available */}
              {item?.airports ? (
                item?.airports?.map((data) => (
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
                        {data?.cityName}, {data?.countryName}
                      </Typography>
                      <Typography
                        sx={{ color: "#6E6996", fontSize: "10px" }}
                      >
                        {data?.airportName}
                      </Typography>
                    </Box>
                  </Box>
                ))
              ) : (
                // Handle single airport case without nested airports
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
                      sx={{ color: "#6E6996", fontSize: "10px" }}
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
  );
};

export default AirportListsCard;
