import { flightClasses } from '@/constants/flightClasses'
import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

const FlightClassNamesBox = ({
    className,
    handleClassName
}:any) => {
  return (
    <Box
    sx={{
      position: "absolute",
      top: {
        lg: "105%",
        md: "100%",
        sm: "100%",
        xs: "100%",
      },
      right: "0px",
      zIndex: 100,
      borderRadius: "5px",
      backgroundColor: "#FFFFFF",
      width: "260px",
      border: "1px solid #6E0A82",
      cursor: "pointer",
    }}
  >
    <Box p={2}>
      <Typography
        style={{
          textAlign: "left",
          marginBottom: "5px",
          color: "#2D233C",
          fontWeight: 400,
        }}
      >
        Class Name
      </Typography>
      <FormControl>
        <RadioGroup
          value={className}
          onChange={handleClassName}
        >
          <Grid container spacing={0}>
            {flightClasses.map((classes, i) => (
              <Grid key={i} item xs={12}>
                <FormControlLabel
                  value={classes}
                  control={
                    <Radio
                      sx={{
                        color: "#C3A0CD",
                        "&.Mui-checked": {
                          color: "#6E0A82",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: "#2D233C",
                        fontSize: "11px",
                      }}
                    >
                      {classes.replace(
                        /([a-z])([A-Z])/g,
                        "$1 $2"
                      )}
                    </Typography>
                  }
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </Box>
  </Box>
  )
}

export default FlightClassNamesBox