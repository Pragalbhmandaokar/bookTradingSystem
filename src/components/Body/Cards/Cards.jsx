import React, { useEffect, useState } from "react";
import "./cards.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addBookFromTrade} from "../../../redux/bookManagement";
import RequestSend from "../../popup/RequestSend";

function Cards({
  PageBehaviour,
  setToggleState,
  username,
  bookCoverLink,
  collectionId,
  bookId,
  getReferesh,
  getExploreReferesh,
}) {
  const bookDetails = useSelector((state) => state.bookDetails);
  const dispatch = useDispatch();
  const Explore = PageBehaviour;
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onButtonClick = (mode) => {
    setToggleState(mode);
  };

  const SwapBook = (bookId) => {
    Axios.post("http://localhost:4000/BookTransaction", {
      lid: bookDetails.bookDetails.bookTradeLenderId,
      rid: collectionId,
      lbookid: bookDetails.bookDetails.bookTradeId,
      rbookid: bookId,
      transactionStatus: 1,
    }).then((Response) => {
      console.log(Response.data.message);
      setIsOpen(true);
    });
  };
  async function refreshPage(mode) {
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
      <div className="cardContainer" id={`${bookId}`}>
        <div className="cardInsider">
          <div className="cardImage">
            <img src={bookCoverLink}></img>
          </div>

          <div className="CardNameHolder p-2">
            <div className="body-1">{username}</div>

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
          <div className="w-full h-full">
            <p>In Offer</p>
            {/* <h4  >{username}</h4> */}

            <div
              onClick={() => {
                SwapBook(bookId);
                refreshPage(true);
              }}
              className="bg-gray-600 rounded-sm"
            >
              Trade
            </div>
          </div>
        </div>
        <div>
          {isOpen && (
            <RequestSend
              isModal={isOpen}
              onToggleModal={onToggleModal}
              key={bookId}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Cards;
