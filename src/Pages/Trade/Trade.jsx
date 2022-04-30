import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cards from "../../components/Body/Cards/Cards";
import "./Trade.css";
import { useSelector } from "react-redux";

export default function Trade({
  toggleState,
  setToggleState,
  bookDetails,
  getExploreReferesh,
}) {
  const [refresh, getReferesh] = useState(false);
  const [dbCheck, GetDbCheck] = useState([]);
  const [tradeCheck, GetTradeCheck] = useState(true);
  const [TradeBookPrice, getTradeBookPrice] = useState([]);
  const userDetails = useSelector((state) => state.user);

  function refreshPage() {
    getReferesh(!refresh);
  }
  const TradeBook = (data) => {
    getTradeBookPrice(data);
  };
  const onButtonClick = (mode) => {
    setToggleState(mode);
  };

  const ToggleTrade = () => {
    GetTradeCheck(true);
  };

  const TogglePayment = () => {
    GetTradeCheck(false);
  };

  useEffect(() => {
    console.log("called");
    let userId = 2;
    if (userDetails.user != null) {
      userId = userDetails.user.userId;
    }
    console.log(userId);
    Axios.get(`http://localhost:4000/selectBookByUserId/${userId}`).then(
      async (Response) => {
        GetDbCheck(Response.data.message);
      }
    );
    
  }, []);

  function refreshDb() {
    let userId = 2;
    if (userDetails.user != null) {
      userId = userDetails.user.userId;
    }
    Axios.get(`http://localhost:4000/selectBookByUserId/${userId}`).then(
      (Response) => {
        GetDbCheck(Response.data.message);
      }
    );
  }

  return (
    <div
      className={
        toggleState ? "service-trade-panel openPanel" : "service-trade-panel"
      }
    >
      {userDetails.user && userDetails.user.loggedIn ? (
        <div className="w-full h-full text-2xl">
          <div className="service-trade-panel-Header">
            <div className="logo" onClick={() => onButtonClick(false)}>
              Close
            </div>
            <ul>
              <li>
                <button
                  className={
                    "ml-2 p-2 pl-5 pr-5 border-2 hover:bg-yellow-500 hover:test-gray-100 focus:border-4 focus:border-yellow-300"
                  }
                  onClick={ToggleTrade}
                >
                  Trade
                </button>
              </li>
              <li>
                <button
                  className={
                    "ml-2 p-2 pl-5 pr-5 border-2 hover:bg-yellow-500 hover:test-gray-100 focus:border-4 focus:border-yellow-300"
                  }
                  onClick={TogglePayment}
                >
                  Offer money
                </button>
              </li>
            </ul>
          </div>
          {tradeCheck && (
            <div className="service-trade-panel__container">
              <p>Your Inventory</p>
              <div className="Container-space">
                {dbCheck.map((val, index) => {
                  return (
                    <Cards
                      key={index}
                      PageBehaviour={false}
                      setToggleState={setToggleState}
                      username={val.booksName}
                      collectionId={val.collectionId}
                      bookId={val.id}
                      bookCoverLink={val.links}
                      getReferesh={refreshPage}
                    ></Cards>
                  );
                })}
              </div>
            </div>
          )}
          {!tradeCheck && (
            <div className="service-trade-panel__container">
              <div className="Container-space">
                <div class="card">
                  <div class="card-header">
                    <img
                      src="https://rvs-order-summary-component.netlify.app/images/illustration-hero.svg"
                      alt=""
                    />
                  </div>
                  <div class="card-body">
                    <div class="card-title">Order</div>
                    <div class="card-text">Book description</div>
                    <div class="card-plan">
                      <div class="card-plan-img">
                        <img
                          src="https://rvs-order-summary-component.netlify.app/images/icon-music.svg"
                          alt=""
                        />
                      </div>
                      <div class="card-plan-text">
                        <div class="card-plan-title">price</div>
                        <div class="card-plan-price">ru. 130</div>
                      </div>
                      <div class="card-plan-link">
                        <a href="#!">Change</a>
                      </div>
                    </div>
                    <div class="card-payment-button">
                      <button>Proceed to Payment</button>
                    </div>
                    <div class="card-cancel-button">
                      <button>Cancel Order</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-3xl">
          <div>
            <div className="logo" onClick={() => onButtonClick(false)}>
              Close
            </div>
          </div>
          please login
        </div>
      )}
    </div>
  );
}
