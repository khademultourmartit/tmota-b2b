import { Box, Button } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import Flight from "../../../../public/assests/searchIcon/airplan.svg";
const FlightSearchBar = () => {
    type MenuItem = {
        name: string;
        icon: string;
      };
      
      const searchBars: MenuItem[] = [
        {
          name: "Flight",
          icon: Flight,
        },
      ];
  return (
  <>
  
  <Box>
          {searchBars.map((bar, i) => (
            <Button
              key={i}
              sx={{
                bgcolor: "#6E0A82",
                width: "120px",
                textTransform: "capitalize",
                color: "white",
                display: "flex",
                gap: "5px",
                fontSize: "13px",
              }}
            >
              <Image src={bar.icon} alt={bar.name} width={20} height={20} />{" "}
              {bar?.name}
            </Button>
          ))}
        </Box>
  
  
  
  
  </>
  )
}

export default FlightSearchBar