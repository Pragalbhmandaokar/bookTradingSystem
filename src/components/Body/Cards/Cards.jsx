import React, { useEffect, useState } from "react";
import "./cards.css";
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
  getReferesh
}) {
  const bookDetails = useSelector((state) => state.bookDetails);
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Explore = PageBehaviour;
  const [isOpen, setIsOpen] = useState(false);
  const [selectCard,setSelectCard] = useState(false);
  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };

  const onButtonClick = (mode) => {
    setSelectCard(true);
    setToggleState(mode);
  };

  const SwapBook = (bookId) => {
    if(!selectCard){
    Axios.post("http://localhost:4000/BookTransaction", {
      lid: bookDetails.bookDetails.bookTradeLenderId,
      rid: collectionId,
      lbookid: bookDetails.bookDetails.bookTradeId,
      rbookid: bookId,
      transactionStatus: 1,
    }).then((Response) => {
      console.log(Response.data.message);
      setIsOpen(true);
      
    });setSelectCard(true);}else{
      console.log("book transaction in process");
    }
     
  };
  async function refreshPage(mode) {
    getReferesh(mode);
  }

  const AddBookExplore = (bookId) => {
    if(!selectCard){
      const bookIdToTrade = bookId;
      dispatch(
        addBookFromTrade({
          bookTradeName: username,
          bookTradeId: bookIdToTrade,
          bookTradeLenderId: collectionId,
          bookTrade: true,
        })
      );
      onButtonClick(true);
    }else{
      console.log("already in swap");
    }
    
  };
  if (Explore) {
    return (
      <div
        className={selectCard ? "cardContainer bg-slate-500 cursor-pointer" : "cardContainer cursor-pointer bg-slate-300"}
        id={`${bookId}`}
        
      >
        <div className="cardInsider">
          <div className="cardImage">
            <img src={bookCoverLink}></img>
          </div>

          <div className="CardNameHolder p-2">
            <div className="body-2 font-bold">{username}</div>

            {userDetails.user && (userDetails.user.admin==0) && (
              <div className="CardButtonHolder h-full">
                <button
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold h-full border border-gray-400 rounded shadow"
                  onClick={() => {
                    AddBookExplore(bookId);
                   
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
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          selectCard
            ? "cardContainer smallSize bg-slate-500"
            : "cardContainer smallSize"
        }
      >
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
              bookname={bookDetails.bookDetails}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Cards;
