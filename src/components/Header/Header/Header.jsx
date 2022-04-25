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
    <div className="containerHeader fixed flex items-center">
      <ul className="Header">
        <li>
          <div className="logo">
            <span className="website-name">Connectpage</span>
          </div>
        </li>
      </ul>
    
      <div class="relative hidden md:block">
          <input type="search" class="pl-10 w-80 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none" placeholder="Search" />
          <svg class="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      <ul className="nav link">
        <Link to="/">
          <li>
            <p>HOME</p>
          </li>
        </Link>

        <Link to="/trade">
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
