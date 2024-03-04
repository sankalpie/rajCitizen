import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;

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

  const [feedbackData, setFeedbackData] = useState([]);
  useEffect(() => {
    // Fetch EFIR data when the component mounts
    const fetchFeedbackData = async () => {
      try {
        const response = await fetch("https://raj-police-backend-test.onrender.com/api/feedback/allFeedback");
        const data = await response.json();
        setFeedbackData(data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  const [caseSolvedfeedbackData, setcaseSolvedFeedbackData] = useState([]);
  useEffect(() => {
    // Fetch EFIR data when the component mounts
    const fetchcaseSolvedFeedbackData = async () => {
      try {
        const response = await fetch("https://raj-police-backend-test.onrender.com/api/feedback/allPostFirFeedback");
        const data = await response.json();
        setcaseSolvedFeedbackData(data);
      } catch (error) {
        console.error("Error fetching caseSolvedfeedback data:", error);
      }
    };

    fetchcaseSolvedFeedbackData();
  }, []);

  const [stationfeedbackData, setstationFeedbackData] = useState([]);
  useEffect(() => {
    // Fetch EFIR data when the component mounts
    const fetchstationFeedbackData = async () => {
      try {
        const response = await fetch("https://raj-police-backend-test.onrender.com/api/feedback/allStationFeedback");
        const data = await response.json();
        setstationFeedbackData(data);
      } catch (error) {
        console.error("Error fetching stationfeedback data:", error);
      }
    };

    fetchstationFeedbackData();
  }, []);


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Registered FIR's"
                count={firData.length}
                percentage={{
                  // color: "success",
                  // amount: "+55%",
                  // label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Total FIR feedbacks submitted"
                count={feedbackData.length}
                percentage={{
                  // color: "success",
                  // amount: "+3%",
                  // label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Post FIR feedbacks submitted"
                count={caseSolvedfeedbackData.length}
                percentage={{
                  // color: "success",
                  // amount: "+1%",
                  // label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Station Feedbacks Submitted"
                count={stationfeedbackData.length}
                percentage={{
                  // color: "success",
                  // amount: "",
                  // label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              {/*<MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
              />
              </MDBox>*/}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                {/*<ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />*/}
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/*<MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
              />
              </MDBox>*/}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              {/*<Projects />*/}
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/*<OrdersOverview />*/}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
