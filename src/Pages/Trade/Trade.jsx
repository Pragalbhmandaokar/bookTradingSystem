import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cards from "../../components/Body/Cards/Cards";
import "./Trade.css";
import { useSelector } from "react-redux";

export default function Trade({ toggleState, setToggleState, bookDetails }) {
  const [dbCheck, GetDbCheck] = useState([]);
  const [tradeCheck, GetTradeCheck] = useState(true);
  const [TradeBookPrice, getTradeBookPrice] = useState([]);
  const userDetails = useSelector((state) => state.user);
  console.log(userDetails);
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
      let userId = 2;
      if(userDetails.user){
        userId = userDetails.user.userId;
      }
      Axios.get(`http://localhost:4000/selectBookByUserId/${userId}`).then((Response) => {
        console.log(Response.data);
        async function getData() {
          console.log(Response.data.message);
          GetDbCheck(Response.data.message);
        }
        getData();
      });
    }, []);

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
                <button onClick={ToggleTrade}>Trade</button>
              </li>
              <li>
                <button onClick={TogglePayment}>Offer money</button>
              </li>
            </ul>
          </div>
          {tradeCheck && (
            <div className="service-trade-panel__container">
              <p>Your Inventory</p>
              <div className="Container-space">
                {dbCheck.map((val) => {
                  return (
                    <Cards
                      PageBehaviour={false}
                      setToggleState={setToggleState}
                      username={val.booksName}
                      bookCoverLink={val.links}
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
            {" "}
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