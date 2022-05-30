import React, { useState, useEffect,createRef } from "react";
import Axios from "axios";
import "./Header.css";
import { Link } from "react-router-dom";
import Trade from "../../../Pages/Trade/Trade";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Header({ toggleState, setToggleState,bookData }) {
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.user);
  const [dbCheck, GetDbCheck] = useState([]);
  const [bookSearch,setBookSearch] = useState("");
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

  function takeToBook(e){
    navigate("product/" + e.currentTarget.id);
  }
  return (
    <div className="containerHeader fixed flex items-center">
      <ul className="Header">
        <li>
          <div className="logo">
            <span className="px-4 text-white h4-thin">
              C
              <span className="hover:hidden transition ease-in-out delay-120 ">
                onnectpag
              </span>
              e
            </span>
          </div>
        </li>
      </ul>
      <div class="relative hidden md:block">
        <input
          type="search"
          class="pl-10 w-80 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
          placeholder="Search"
          value={bookSearch}
          onChange={(e) => setBookSearch(e.target.value)}
        />
        <svg
          class="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <div className="absolute top-16 left-[32%] bg-slate-400">
        {bookData && bookSearch &&
          bookData
            .filter((book) => book.booksName.includes(bookSearch))
            .map((book, index) => {
              return (
                <div
                  className="bg-white mb-[1px] rounded-sm p-2 cursor-pointer"
                  book={book}
                  id={book.id}
                  onClick={(e) => takeToBook(e)}
                >
                  {" "}
                  {book.booksName}
                </div>
              );
            })}
      </div>
      {userDetails && userDetails.admin ? (
        <>
          {" "}
          <ul className="nav link">
            <Link to="/">
              <li className="hover:border-[1px] rounded-lg px-4">
                <p className="font-bold">HOME</p>
              </li>
            </Link>

            <Link to="/trade">
              <li className="hover:border-[1px] rounded-lg px-4">
                <p className="font-bold">TRADE</p>
              </li>
            </Link>
            <Link to="/profile">
              <li className="hover:border-[1px] rounded-lg px-4">
                <p className="font-bold">PROFILE</p>
              </li>
            </Link>
          </ul>
        </>
      ) : (
        <>
          {" "}
          <ul className="nav link">
            <Link to="/">
              <li className="hover:border-[1px] rounded-lg px-4">
                <p className="font-bold">HOME</p>
              </li>
            </Link>

            <Link to="/trade">
              <li className="hover:border-[1px] rounded-lg px-4">
                <p className="font-bold ">RECENT EXCHANGE</p>
              </li>
            </Link>
            <Link to="/profile">
              <li className="hover:border-[1px] rounded-lg px-4">
                <p className="font-bold">PROFILE</p>
              </li>
            </Link>
          </ul>
        </>
      )}
      <Trade toggleState={toggleState} setToggleState={setToggleState}></Trade>
    </div>
  );
}
