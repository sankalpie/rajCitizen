import React from "react";
import "../Portal.css";
import Cards from "../Cards";

function FirOptions() {
  return (
    <>
      <div className="cards-list">
        <Cards title="Raise a New FIR" link="./RaiseFir" />
        <Cards title="Track Fir" link="/TrackFir" />
        {/*<Cards title="Police Station Complain" link="./fir" />*/}
      </div>
    </>
  );
}

export default FirOptions;
