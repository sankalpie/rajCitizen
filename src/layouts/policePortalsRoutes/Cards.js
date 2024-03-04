import React from "react";

function Cards(props) {
  return (
    <>
    {/* <Link to={props.link}> */}

      <div className="cardie 1">
        <div className="card_image">
          {" "}
          <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="Img"/>{" "}
        </div>
        <div className="card_title title-white">
          <p>{props.title}</p>
        </div>
      </div>
      
    {/* </Link> */}
    </>
  );
}

export default Cards;
