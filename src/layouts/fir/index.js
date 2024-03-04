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
                  Fir Options
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
                  <div onClick={() => setopenCard("Raise a Fir")}>
                    <Cards title="Raise a New FIR" />
                  </div>
                  <div onClick={() => setopenCard("Track Fir")}>
                    <Cards title="Track Fir" />
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
                  {openCard === "Raise a Fir" && <RaiseFir />}{" "}
                </MDBox>
                <MDBox pt={3}>
                  {openCard === "Track Fir" && <TrackFir />}{" "}
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
