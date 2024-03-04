import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Route, Routes } from "react-router-dom";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import PolicePortal from "layouts/policePortalsRoutes/PolicePortal";
import FirPortal from "layouts/policePortalsRoutes/fir/FirPortal";
import RaiseFir from "layouts/policePortalsRoutes/fir/RaiseFir";
import TrackFir from "layouts/policePortalsRoutes/fir/TrackFir";
import Cards from "layouts/policePortalsRoutes/Cards";
import { useState } from "react";
import FeedbackPortal from "layouts/policePortalsRoutes/feedback/FeedbackPortal";
import FeedbackForm from "layouts/policePortalsRoutes/feedback/FeedbackForm1";
import CaseSolvedFeedback from "layouts/policePortalsRoutes/feedback/CaseSolvedFeedback";
import PoliceStationFeedback from "layouts/policePortalsRoutes/feedback/PoliceStationFeedback";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [openCard, setopenCard] = useState("");

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Feedback Options
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}

                {/* <PolicePortal/>    */}

                <div className="cards-list">
                  <div onClick={() => setopenCard("FIR Feedback")}>
                    <Cards title="FIR Feedback" />
                  </div>
                  <div onClick={() => setopenCard("Case Solved Feedback")}>
                    <Cards title="Case Solved Feedback" />
                  </div>
                  <div onClick={() => setopenCard("Police Station Feedback")}>
                    <Cards title="Police Station Feedback" />
                  </div>
                </div>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12}>
            {openCard !== "" && (
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    {openCard}
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  {openCard === "FIR Feedback" && <FeedbackForm />}{" "}
                </MDBox>
                <MDBox pt={3}>
                  {openCard === "Case Solved Feedback" && (
                    <CaseSolvedFeedback />
                  )}{" "}
                </MDBox>
                <MDBox pt={3}>
                  {openCard === "Police Station Feedback" && (
                    <PoliceStationFeedback />
                  )}{" "}
                </MDBox>
              </Card>
            )}
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
