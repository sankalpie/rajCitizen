// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import axios from "axios";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import BillingInformation from "layouts/billing/components/FirInformation";

import { useState, useEffect } from "react";
import BarChartShow2 from "./data/BarChartShow2";

function Billing() {
  const [totalFeedbacks, setTotalFeedbacks] = useState({
    feedbackCount: 3,
    postFeedbackCount: 3,
  });

  const [feedbackData, setFeedbackData] = useState([]);
  const [suggestionText, setSuggestionText] = useState([]);
  console.log(feedbackData);
  const [averageRatings, setAverageRatings] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: { label: "Average Ratings", data: [] },
  });

  console.log(chartData);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(
          "https://raj-police-backend-test.onrender.com/api/feedback/allPostFirFeedback"
        ); // Replace with your actual API endpoint
        setFeedbackData(response.data);
        const suggestionsImprovements = response.data.map((feedback) => {
          return feedback.suggestionsImprovements || null;
        });
        setSuggestionText(suggestionsImprovements);

        console.log(suggestionsImprovements);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  const calculateAverageRatings = () => {
    const totalFeedbacks = feedbackData.length;
    const averageHygienic =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.policeStationRating.higenic,
        0
      ) / totalFeedbacks;
    const averageBehavior =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.policeStationRating.behavior,
        0
      ) / totalFeedbacks;
    const averageEaseOfProcess =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.policeStationRating.easeOfProcess,
        0
      ) / totalFeedbacks;
    const averageOverall =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.policeStationRating.overall,
        0
      ) / totalFeedbacks;
    const responseRating =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.responseTimeRating,
        0
      ) / totalFeedbacks;
    const problemResolutionRating =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.problemResolutionRating,
        0
      ) / totalFeedbacks;
    const accessibilityRating =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.accessibilityRating,
        0
      ) / totalFeedbacks;
    const followUpProcessRating =
      feedbackData.reduce(
        (sum, feedback) => sum + feedback.followUpProcessRating,
        0
      ) / totalFeedbacks;

    setAverageRatings({
      hygienic: averageHygienic,
      behavior: averageBehavior,
      easeOfProcess: averageEaseOfProcess,
      overall: averageOverall,
      responseRating: responseRating,
      problemResolutionRating: problemResolutionRating,
      accessibilityRating: accessibilityRating,
      followUpProcessRating: followUpProcessRating,
    });
  };

  useEffect(() => {
    calculateAverageRatings();
  }, [feedbackData]);

  useEffect(() => {
    // Update chartData based on averageRatings
    setChartData({
      labels: Object.keys(averageRatings ?? {}),
      datasets: {
        label: "Average Ratings",
        data: Object.values(averageRatings ?? {}),
      },
    });
  }, [averageRatings]);

  useEffect(() => {
    const fetchTotalFeedbacks = async () => {
      try {
        const response = await axios.get(
          "https://raj-police-backend-test.onrender.com/api/feedback/totalFeedbacksCount"
        );
        setTotalFeedbacks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching total feedbacks:", error);
      }
    };

    fetchTotalFeedbacks();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {/* <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid> */}
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Total No of Feedbacks"
                    description="Overall Total Feedbacks Obtained online"
                    value={
                      totalFeedbacks.feedbackCount +
                      totalFeedbacks.postFeedbackCount
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Total FIR Feedbacks"
                    description="Feedbacks Recieved after registering FIR"
                    value={totalFeedbacks.feedbackCount}
                  />
                </Grid>

                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="Total Post-FIR Feedback"
                    description="Total Feedback recieved after FIR completion!"
                    value={totalFeedbacks.postFeedbackCount}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <PaymentMethod />
                </Grid> */}
              </Grid>
            </Grid>
            {/* <Grid item xs={10} lg={4}>
              <Invoices />
            </Grid> */}
          </Grid>
        </MDBox>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <BarChartShow2 />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Post FIR Feedbacks"
                  description="This is overall Rating of Rajasthan"
                  date="campaign sent 2 days ago"
                  // chart={reportsBarChartData}
                  chart={chartData}
                />
              </MDBox>
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>

        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation suggestionText={suggestionText} />
            </Grid>
            {/* <Grid item xs={12} md={5}>
              <div>
                <h2>Average Ratings</h2>
                {averageRatings ? (
                  <ul>
                    <li>Hygienic: {averageRatings.hygienic}</li>
                    <li>Behavior: {averageRatings.behavior}</li>
                    <li>Ease of Process: {averageRatings.easeOfProcess}</li>
                    <li>Overall: {averageRatings.overall}</li>
                  </ul>
                ) : (
                  <p>Loading...</p>
                )}

              </div>
            </Grid> */}
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Billing;
