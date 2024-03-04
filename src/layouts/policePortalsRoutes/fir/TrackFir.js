import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";

function TrackFir() {
  const [firData, setFirData] = useState([]);
  useEffect(() => {
    // Fetch EFIR data when the component mounts
    const fetchFirData = async () => {
      try {
        const response = await fetch("https://raj-police-backend-test.onrender.com/api/efir/allFir");
        const data = await response.json();
        setFirData(data);
      } catch (error) {
        console.error("Error fetching EFIR data:", error);
      }
    };

    fetchFirData();
  }, []);
  return (
    <div className="">
      <Container>
        <Typography variant="h1" sx={{ mb: 4 }}>
          EFIR List
        </Typography>
        {firData.map((efir, index) => (
          <Card
            key={efir.firNumber}
            variant="outlined"
            sx={{
              mb: 3,
              backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff", // alternate colors
            }}
          >
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="h5" component="div">
                    FIR Number: {efir.firNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography color="textSecondary" textAlign="right">
                    Status: {efir.status}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default TrackFir;
