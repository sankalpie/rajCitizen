import axios from "axios";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import React from "react";

import { useState, useEffect } from "react";

function BarChartShow2() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [averageRatings, setAverageRatings] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: { label: "Average Ratings", data: [] },
  });

  console.log(chartData);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get("https://raj-police-backend-test.onrender.com/api/feedback/allFeedback"); // Replace with your actual API endpoint
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback data:", error);
      }
    };

    fetchFeedbackData();
  }, []);

  const calculateAverageRatings = () => {
    const totalFeedbacks = feedbackData.length;
    const averageHygienic =
      feedbackData.reduce((sum, feedback) => sum + feedback.policeStationRating.higenic, 0) /
      totalFeedbacks;
    const averageBehavior =
      feedbackData.reduce((sum, feedback) => sum + feedback.policeStationRating.behavior, 0) /
      totalFeedbacks;
    const averageEaseOfProcess =
      feedbackData.reduce((sum, feedback) => sum + feedback.policeStationRating.easeOfProcess, 0) /
      totalFeedbacks;
    const averageOverall =
      feedbackData.reduce((sum, feedback) => sum + feedback.policeStationRating.overall, 0) /
      totalFeedbacks;

    setAverageRatings({
      hygienic: averageHygienic,
      behavior: averageBehavior,
      easeOfProcess: averageEaseOfProcess,
      overall: averageOverall,
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
  return (
    <>
      <ReportsBarChart
        color="info"
        title="FIR Feedbacks"
        description="This is overall Rating of Rajasthan"
        date="campaign sent 2 days ago"
        // chart={reportsBarChartData}
        chart={chartData}
      />
      <div></div>
    </>
  );
}

export default BarChartShow2;
