import React, { useEffect, useState } from "react";
import "./cards.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addBookFromTrade} from "../../../redux/bookManagement";

function Cards({
  PageBehaviour,
  setToggleState,
  username,
  bookCoverLink,
  collectionId,
  bookId,
  key,
  getReferesh
}) {
  const bookDetails = useSelector((state) => state.bookDetails);
  const dispatch = useDispatch();
  const Explore = PageBehaviour;
  const onButtonClick = (mode) => {
    setToggleState(mode);
  };

  const SwapBook = () => {
    Axios.post("http://localhost:4000/trade", {
      lid: bookDetails.bookDetails.bookTradeLenderId,
      rid: collectionId,
      lbookid: bookDetails.bookDetails.bookTradeId,
      rbookid: bookId,
    }).then((Response) => {
        getReferesh(true);
    });
  
  };
 function refreshPage(mode) {
   getReferesh(mode);
 }

  const AddBookExplore = (bookId) => {
    const bookIdToTrade = bookId;
    dispatch(
      addBookFromTrade({
        bookTradeId: bookIdToTrade,
        bookTradeLenderId: collectionId,
        bookTrade: true,
      })
    );
  };
  if (Explore) {
    return (
      <div className="cardContainer" id={`${key}`}>
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
                onClick={() => {
                  AddBookExplore(bookId);
                  onButtonClick(true);
                }}
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
            {/* <h4  >{username}</h4> */}

            <button
              onClick={() => {
                SwapBook(bookId);
                refreshPage(true);
              }}
            >
              Trade
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
