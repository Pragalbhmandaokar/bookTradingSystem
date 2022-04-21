import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Header.css";
import { Link } from "react-router-dom";
import Trade from "../../../Pages/Trade/Trade";

export default function Header({ toggleState, setToggleState }) {
  const [dbCheck, GetDbCheck] = useState([]);
  const onButtonClick = (mode) => {
    setToggleState(mode);
  };

  useEffect(() => {
    Axios.get("http://localhost:4000/product").then((Response) => {
      async function getData() {
        GetDbCheck(Response.data);
      }
      getData();
    });
  }, []);

  return (
    <div className="containerHeader">
      <ul className="Header">
        <li>
          <div className="logo">
            <span className="website-name">Connectpage</span>
          </div>
        </li>
      </ul>
      <ul className="SearchBar_container">
        <li>
          {/* <input className="SearchBar" placeholder="Search" ></input><button>S</button> */}
        </li>
      </ul>

      <ul className="nav link">
        <Link to="/">
          <li>
            <p>HOME</p>
          </li>
        </Link>

        <Link to="/signup">
          <li>
            <p>TRADE</p>
          </li>
        </Link>
        <Link to="/profile">
          <li>
            <p>PROFILE</p>
          </li>
        </Link>
      </ul>

      <Trade toggleState={toggleState} setToggleState={setToggleState}></Trade>
    </div>
  );
}
