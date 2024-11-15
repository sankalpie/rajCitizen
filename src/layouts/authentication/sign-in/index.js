import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import MuiLink from "@mui/material/Link";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import PropTypes from "prop-types";

function Basic({ setIsLoggedIn, isLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleSignIn = async () => {
    setLoading(true); // Start loading
    setError(""); // Clear previous errors
    try {
      const apiUrl = "https://raj-police-backend-test.onrender.com/api/users/login"; // Replace with your actual login API endpoint
      const signInData = {
        userName: username,
        password,
      };
      const response = await axios.post(apiUrl, signInData);
      console.log(response.data);

      if (response.status === 200) {
        // Login successful
        alert("Login successful!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", response.data.role);
        setIsLoggedIn(true);
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("Internal Server Error. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            {/* Omitted for brevity */}
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={handleSignIn}
                disabled={loading} // Disable the button when loading
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
              </MDButton>
            </MDBox>
            {error && (
              <MDTypography variant="caption" color="error" mt={1}>
                {error}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

Basic.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Basic;
