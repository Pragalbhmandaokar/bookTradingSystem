import React, { useState } from "react";
import "./cards.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

var lid = 0;
var lbookid = "";
var rid = 0;
var rbookid = "";
function Cards({
  PageBehaviour,
  setToggleState,
  username,
  bookCoverLink,
  collectionId,
  bookId,
  getTradeBookPrice,
}) {
  const Explore = PageBehaviour;
  const onButtonClick = (mode) => {
    setToggleState(mode);
    if (collectionId == 1) {
      lid = collectionId;
      lbookid = bookId;
    }
    if (collectionId == 2 && lbookid!=bookId && lid==1) {
      rid = collectionId;
      rbookid = bookId;
      console.log(lid);
      console.log(rid);
      console.log(lbookid);
      console.log(rbookid);
      Axios.post("http://localhost:4000/trade", {
        lid: lid,
        rid: rid,
        lbookid: lbookid,
        rbookid: rbookid,
      }).then((Response) => {
        console.log(Response);
        // navigate("/");
      });
      window.location.reload(false);

    }
  };

  if (Explore) {
    return (
      <div className="cardContainer">
        <div className="cardInsider">
          <Link
            to={{
              pathname: "/:product",
              state: { id: 1, name: "Ford", color: "red" },
            }}
          >
            <div className="cardImage">
              <img src={bookCoverLink}></img>
            </div>
          </Link>
          <div className="CardNameHolder">
            <h4>{username}</h4>

            <div className="CardButtonHolder h-full">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold h-full border border-gray-400 rounded shadow"
                onClick={() => onButtonClick(true)}
              >
                Trade
              </button>
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow"
                onClick={() => onButtonClick(true)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cardContainer smallSize">
        <div className="cardInsider">
          <div className="cardImage">
            <img src={bookCoverLink}></img>
          </div>
          <div className="CardNameHolder">
            <p>In Offer</p>
            {/* <h4  >{username}</h4>
                       <h4>Product name</h4> */}
            <button onClick={() => onButtonClick(true)}>Trade</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
