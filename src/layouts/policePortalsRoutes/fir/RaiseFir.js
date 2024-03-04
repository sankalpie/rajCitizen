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
import { Alert, Snackbar, Stack } from "@mui/material";
import { setSidenavColor } from "context";

function RaiseFir() {
    const [complainant, setComplainant] = useState({
        name: "",
        contactNumber: "",
        email: "",
        address: ""
    });
    const [incidentDetails, setIncidentDetails] = useState({
        location: "",
        description: "",
        category: ""
    });
    const [accused, setAccused] = useState({
        name: "",
        address: "",
        contactNumber: "",
        description: "",
    });

    const resetForm = () => {
        setComplainant({
            name: "",
            contactNumber: "",
            email: "",
            address: ""
        });
        setIncidentDetails({
            location: "",
            description: "",
            category: "",
        });
        setAccused({
            name: "",
            address: "",
            contactNumber: "",
            description: "",
        })
    };

    const handleSubmit = async () => {
        try {
            const apiUrl = "https://raj-police-backend-test.onrender.com/api/efir/createEFIR";

            //constructing object to be sent
            const firData = {
                complainant,
                incidentDetails,
                accused,
            };

            // Make a POST request to submit the feedback
            const response = await axios.post(apiUrl, firData);

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

    // handling submit2 //createChatbotFeedback is definitely working CONFIRMED!
    const handleSubmit2 = async () => {
        try {
            const apiUrl = "https://raj-police-backend-test.onrender.com/api/chatbot/createChatbotFeedback";

            //constructing object to be sent
            const feedbackData = {
                name: "sankalp",
                firNo: 123,
                email: "sank@lp.com",
                contactNo: 99776,
                overallRating: "Good",
            }

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
    // handled submit2

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
        <div style={{ display: 'flex', alignItems: 'center', alignContent: "center" }}>
            <div className="feedback-form homepage-main-areaa-form" >
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

                        justifySelf: 'center',
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
                            label="Name"
                            placeholder="Enter your name"
                            value={complainant.name}
                            onChange={(e) => setComplainant((prevValue) => ({
                                ...prevValue,
                                name: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Mobile"
                            placeholder="Enter your mobile"
                            value={complainant.contactNumber}
                            onChange={(e) => setComplainant((prevValue) => ({
                                ...prevValue,
                                contactNumber: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            placeholder="Enter your email"
                            value={complainant.email}
                            onChange={(e) => setComplainant((prevValue) => ({
                                ...prevValue,
                                email: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Address"
                            placeholder="Enter your address"
                            value={complainant.address}
                            onChange={(e) => setComplainant((prevValue) => ({
                                ...prevValue,
                                address: e.target.value,
                            }))}
                        />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select incident category</FormLabel>
                            <RadioGroup
                                row
                                aria-label="incident category"
                                name="incident category"
                                value={incidentDetails.category}
                                onChange={(e) => setIncidentDetails((prevValue) => ({
                                    ...prevValue,
                                    category: e.target.value,
                                }))}
                            >
                                <FormControlLabel value="assault" control={<Radio />} label="Assault" />
                                <FormControlLabel value="theft" control={<Radio />} label="Theft" />
                                <FormControlLabel value="fraud" control={<Radio />} label="Fraud" />
                                <FormControlLabel value="cybercrime" control={<Radio />} label="Cybercrime" />
                                <FormControlLabel value="violence" control={<Radio />} label="Violence" />
                                <FormControlLabel value="missing" control={<Radio />} label="Missing" />
                                <FormControlLabel value="substance abuse" control={<Radio />} label="Substance Abuse" />

                            </RadioGroup>
                        </FormControl>
                        <TextField
                            required
                            id="outlined-required"
                            label="Incident Location"
                            placeholder="Enter Location of Incident"
                            value={incidentDetails.location}
                            onChange={(e) => setIncidentDetails((prevValue) => ({
                                ...prevValue,
                                location: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Incident Description"
                            placeholder="Describe the Incident"
                            value={incidentDetails.description}
                            onChange={(e) => setIncidentDetails((prevValue) => ({
                                ...prevValue,
                                description: e.target.value,
                            }))}
                        />

                        <TextField
                            required
                            id="outlined-required"
                            label="Accused Name"
                            placeholder="Name of accused"
                            value={accused.name}
                            onChange={(e) => setAccused((prevValue) => ({
                                ...prevValue,
                                name: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Accused Address"
                            placeholder="Address of accused"
                            value={accused.address}
                            onChange={(e) => setAccused((prevValue) => ({
                                ...prevValue,
                                address: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Accused Mobile"
                            placeholder="Mobile of accused"
                            value={accused.contactNumber}
                            onChange={(e) => setAccused((prevValue) => ({
                                ...prevValue,
                                contactNumber: e.target.value,
                            }))}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Accused Description"
                            placeholder="Description of accused"
                            value={accused.description}
                            onChange={(e) => setAccused((prevValue) => ({
                                ...prevValue,
                                description: e.target.value,
                            }))}
                        />

                    </div>
                    {/* Submit button */}
                    <div>
                        <Button variant="contained" onClick={handleSubmit} style={{ color: 'white' }}>
                            Submit
                        </Button>
                    </div>

                    {/*<div>
                        <Button variant="contained" onClick={handleSubmit2} style={{ color: 'white' }}>
                            Submit
                        </Button>
                        </div>*/}
                </Box>
            </div>
        </div>
    )
}

export default RaiseFir