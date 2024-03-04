import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import axios from "axios";
import { Alert, Checkbox, FormGroup, Rating, Snackbar, Stack, Typography } from "@mui/material";

// it will add data to the model "postFirFeedback"

function CaseSolvedFeedback() {
    const [firNumber, setFirNumber] = useState("");
    //timestamp 
    //date 
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [email, setEmail] = useState("");
    const [policeDistrict, setPoliceDistrict] = useState("");
    const [policeStation, setPoliceStation] = useState("");
    const [details, setDetails] = useState("");
    const [timelyResolved, setTimelyResolved] = useState(true);
    const handleCheckboxChange = (event) => {
        setTimelyResolved(event.target.checked);
    };
    const [satisfactionLevel, setSatisfactionLevel] = useState("3");
    const [comments, setComments] = useState("");
    const [externalFill, setExternalFill] = useState(false);
    //
    const [policeStationRating, setPoliceStationRating] = useState({
        higenic: "3",
        behavior: "3",
        easeOfProcess: "3",
        overall: "3",
    });
    // the fields that were extra in FeedbackForm1 are all used here
    const [responseTimeRating, setResponseTimeRating] = useState("3");
    const [problemResolutionRating, setProblemResolutionRating] = useState("3");
    const [accessibilityRating, setAccessibilityRating] = useState("3");
    const [followUpProcessRating, setFollowUpProcessRating] = useState("3");
    const [suggestionsImprovements, setSuggestionsImprovements] = useState("");
    const [safetyPerception, setSafetyPerception] = useState("3");

    //resetting the form after submission
    const resetForm= ()=>{
        setFirNumber("");
        setName("");
        setAddress("");
        setCity("");
        setPinCode("");
        setEmail("");
        setPoliceDistrict("");
        setPoliceStation("");
        setDetails("");
        setTimelyResolved(true);
        setSatisfactionLevel(3);
        setComments("");
        setProblemResolutionRating("3");
        setAccessibilityRating("3");
        setFollowUpProcessRating("3");
        setSuggestionsImprovements("");
        setSafetyPerception("3");
    };
    //

    const handleSubmit = async () => {
        try {
            // Your backend API endpoint for feedback submission
            const apiUrl = "https://raj-police-backend-test.onrender.com/api/feedback/fillPostFirFeedback";

            // Construct the feedback object to be sent
            const feedbackData = {
                firNumber,
                name,
                address,
                pinCode,
                city,
                email,
                policeDistrict,
                policeStation,
                details,
                timelyResolved,
                satisfactionLevel,
                externalFill,
                comments,
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
                // Display error message
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
                {/* text fields  */}
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
                        <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%', padding: '15px', backgroundColor: '#76CE7C', color: 'black', fontWeight: 'bold' }}>
                                Feedback submitted successfully!
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openOtherError} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', padding: '15px', backgroundColor: '#D22966', fontWeight: 'bold' }} style={{ color: 'white' }}>
                                Error submitting form! Try again.
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openServerError} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }} >
                            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', padding: '15px', backgroundColor: '#D22966', fontWeight: 'bold' }} style={{ color: 'white' }}>
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
                        label="Pin Code"
                        placeholder="Enter Your Pincode"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
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
                    <TextField
                        required
                        id="outlined-required"
                        label="FIR details"
                        placeholder="Enter FIR detail in short"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Comments"
                        placeholder="Comments on authorities/FIR resolution"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox checked={timelyResolved} onChange={handleCheckboxChange} style={{ float: 'right' }} />}
                            label={<Typography variant="body3">Timely Resolved?</Typography>}
                            style={{ justifyContent: "space-between", width: "100%", marginLeft: '10px' }}
                        />
                    </FormGroup>

                    {/* text fields */}

                    {/*  radio groups  */}
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

                        <div>
                            <Typography component="legend">Satisfaction Level</Typography>
                            <Rating
                                name="simple-controlled"
                                value={satisfactionLevel}
                                onChange={(e) => setSatisfactionLevel(e.target.value)}
                            />

                            <Typography component="legend">Problem Resolution Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={problemResolutionRating}
                                onChange={(e) => setProblemResolutionRating(e.target.value)}
                            />

                            <Typography component="legend">Accessibility Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={accessibilityRating}
                                onChange={(e) => setAccessibilityRating(e.target.value)}
                            />

                            <Typography component="legend">Follow-up Process Rating</Typography>
                            <Rating
                                name="simple-controlled"
                                value={followUpProcessRating}
                                onChange={(e) => setFollowUpProcessRating(e.target.value)}
                            />

                            <Typography component="legend">Safety Perception</Typography>
                            <Rating
                                name="simple-controlled"
                                value={safetyPerception}
                                onChange={(e) => setSafetyPerception(e.target.value)}
                            />
                        </div>



                    </Box>

                    {/* Radio groups ends here */}

                    <TextField style={{ flexBasis: "100%" }}
                        required
                        id="outlined-required"
                        label="Suggestions/Improvements"
                        placeholder="Enter Suggestions/Improvements"
                        multiline
                        rows={4}
                        value={suggestionsImprovements}
                        onChange={(e) => setSuggestionsImprovements(e.target.value)}
                        sx={{ width: "100%" }}
                    />

                    <div style={{ flexBasis: "100%", marginTop: 2 }}>
                        <Button variant="contained" onClick={handleSubmit} style={{ color: 'white' }}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default CaseSolvedFeedback