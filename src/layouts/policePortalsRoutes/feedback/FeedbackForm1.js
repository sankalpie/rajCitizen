import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { Alert, Rating, Snackbar, Stack, Typography } from "@mui/material";

export default function FeedbackForm() {
  const [firNumber, setFirNumber] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [policeDistrict, setPoliceDistrict] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [rating, setRating] = useState("3");
  const [details, setDetails] = useState("");
  const [externalFill, setExternalFill] = useState(false);
  const [policeStationRating, setPoliceStationRating] = useState({
    higenic: "3",
    behavior: "3",
    easeOfProcess: "3",
    overall: "3",
  });
  const [responseTimeRating, setResponseTimeRating] = useState("1");
  const [problemResolutionRating, setProblemResolutionRating] = useState("1");
  const [accessibilityRating, setAccessibilityRating] = useState("1");
  const [followUpProcessRating, setFollowUpProcessRating] = useState("1");
  const [suggestionsImprovements, setSuggestionsImprovements] = useState("");
  const [safetyPerception, setSafetyPerception] = useState("");

  //resetting the form fields after submission
  const resetForm = ()=>{
    setFirNumber("");
    setMobile("");
    setName("");
    setAddress("");
    setCity("");
    setPinCode("");
    setEmail("");
    setPoliceDistrict("");
    setPoliceStation("");
    setRating("3");
    setDetails("");
    setPoliceStationRating({
      higenic:"3",
      behavior:"3",
      easeOfProcess:"3",
      overall:"3",
    })
  };
  //

  const handleSubmit = async () => {
    try {
      // Your backend API endpoint for feedback submission
      const apiUrl = "https://raj-police-backend-test.onrender.com/api/feedback/fillFeedback";

      // Construct the feedback object to be sent
      const feedbackData = {
        firNumber,
        mobile,
        name,
        address,
        city,
        pinCode,
        email,
        policeDistrict,
        policeStation,
        rating,
        details,
        externalFill,
        policeStationRating,
        responseTimeRating,
        problemResolutionRating,
        accessibilityRating,
        followUpProcessRating,
        suggestionsImprovements,
        safetyPerception,
      };

      // Make a POST request to submit the feedback
      const response = await axios.post(apiUrl, feedbackData);

      // Check if the request was successful
      if (response.status === 201) {
        // Display success message
        // alert("Form successfully submitted!");
        setOpenSuccess(true);
        resetForm();
      } else {
        // Display error message if any other status code is there
        // alert("Error submitting form. Please try again.");
        setOpenOtherError(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("Internal Server Error. Please try again later.");
      setOpenServerError(true);
    }
  };

  //trying the alert snackbar thing
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openOtherError, setOpenOtherError] = useState(false);
  const [openServerError, setOpenServerError] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
    setOpenOtherError(false);
    setOpenServerError(false);
  };

  //alert snackbar trial ends here

  

  return (
    <div className="feedback-form homepage-main-areaa-form">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: 3, flexBasis: "48%" },
          boxShadow: 3,
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          p: 4,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 1050,
          mx: "auto",
        }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{
            "& .MuiTextField-root": { mb: 3, flexBasis: "48%" },
            boxShadow: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",

            p: 4,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          {/* Snakbar thing */}
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:"top",horizontal:"center"}} >
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' , padding:'15px', backgroundColor: '#76CE7C', color:'black', fontWeight:'bold'}}>
                Feedback submitted successfully!
              </Alert>
            </Snackbar>
            <Snackbar open={openOtherError} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:"top",horizontal:"center"}} >
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' , padding:'15px', backgroundColor: '#D22966',  fontWeight:'bold' }} style={{color:'white'}}>
                Error submitting form! Try again.
              </Alert>
            </Snackbar>
            <Snackbar open={openServerError} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:"top",horizontal:"center"}} >
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' , padding:'15px', backgroundColor: '#D22966',  fontWeight:'bold'}} style={{color:'white'}}>
                Internal Server Error! Please try again later.
              </Alert>
            </Snackbar>
          </Stack>
          {/* Snakbar thing */}
          <TextField
            required
            id="outlined-required"
            label="FIR Number"
            placeholder="Enter FIR Number"
            value={firNumber}
            onChange={(e) => setFirNumber(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Mobile"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Address"
            placeholder="Enter Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="City"
            placeholder="Enter Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Pin Code"
            placeholder="Enter Pin Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Police District"
            placeholder="Enter Police District"
            value={policeDistrict}
            onChange={(e) => setPoliceDistrict(e.target.value)}
          />

          <TextField
            required
            id="outlined-required"
            label="Police Station"
            placeholder="Enter Police Station"
            value={policeStation}
            onChange={(e) => setPoliceStation(e.target.value)}
          />

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "42ch", flexBasis: "48%" },
              boxShadow: 3, // Adding a shadow for a bordered look
              padding: 4, // Adding padding for better spacing
              borderRadius: 3,
              textAlign: "center", // Center-aligning text
              margin: 2,
              maxWidth: 1200,
              flexBasis: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            {/*
            <div>
              <FormControl component="fieldset" sx={{ mb: 2 }}>
                <FormLabel component="legend">Overall Rating</FormLabel>

                <RadioGroup
                  row
                  aria-label="rating"
                  name="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <FormControlLabel value="1" control={<Radio />} label="1" />
                  <FormControlLabel value="2" control={<Radio />} label="2" />
                  <FormControlLabel value="3" control={<Radio />} label="3" />
                  <FormControlLabel value="4" control={<Radio />} label="4" />
                  <FormControlLabel value="5" control={<Radio />} label="5" />
                </RadioGroup>
              </FormControl>
            </div>
            */}

            {/* now trying rating thing */}
            <div>
              <Typography component="legend">Overall Rating</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />

              <Typography component="legend">Hygiene rating</Typography>
              <Rating
                name="simple-controlled"
                value={policeStationRating.higenic}
                onChange={(e) =>
                  setPoliceStationRating((prevRating) => ({
                    ...prevRating,
                    higenic: e.target.value,
                  }))
                }
              />

              <Typography component="legend">Behavior rating</Typography>
              <Rating
                name="simple-controlled"
                value={policeStationRating.behavior}
                onChange={(e) =>
                  setPoliceStationRating((prevRating) => ({
                    ...prevRating,
                    behavior: e.target.value,
                  }))
                }
              />

              <Typography component="legend">Ease Of Process rating</Typography>
              <Rating
                name="simple-controlled"
                value={policeStationRating.easeOfProcess}
                onChange={(e) =>
                    setPoliceStationRating((prevRating) => ({
                    ...prevRating,
                    easeOfProcess: e.target.value,
                  }))
                }
              />

              <Typography component="legend">overall rating</Typography>
              <Rating
                name="simple-controlled"
                value={policeStationRating.overall}
                onChange={(e) =>
                  setPoliceStationRating((prevRating) => ({
                    ...prevRating,
                    overall: e.target.value,
                  }))
                }
              />
            </div>
            {/*rating thing ends here*/}


          </Box>
          {/* <FormControl component="fieldset">
          <FormLabel component="legend">External Fill</FormLabel>
          <RadioGroup
            row
            aria-label="externalFill"
            name="externalFill"
            value={externalFill.toString()}
            onChange={(e) => setExternalFill(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      */}
        </div>


        <TextField style={{ flexBasis: '100%' }}
          required
          id="outlined-required"
          label="Details"
          placeholder="Enter Details"
          multiline
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          sx={{ width: "80%" }}
        />

        <div>
          <Button variant="contained" onClick={handleSubmit} style={{ color: 'white' }}>
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}








