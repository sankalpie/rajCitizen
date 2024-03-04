import React from "react";
import "./Portal.css";
import Cards from "./Cards";

function PortalOptions() {
  return (
    <>
      <div className="cards-list">
        <Cards title="Feedback" link="./feedback" />
        <Cards title="FIR" link="./fir" />
      </div>
    </>
  );
}

export default PortalOptions;
