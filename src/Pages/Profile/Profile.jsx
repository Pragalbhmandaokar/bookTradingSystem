import React, { useState, useEffect } from "react";
import "./profile.css";
import Cards from "../../components/Body/Cards/Cards";
import Axios from "axios";
import Header from "../../components/Header/Header/Header";

export default function Profile() {
  const [dbCheck, GetDbCheck] = useState([]);
  const userVisit = false;
  const index = 10;
  useEffect(() => {
    Axios.get("http://localhost:4000/product").then((Response) => {
      async function getData() {
        GetDbCheck(Response.data.message);
      }
      getData();
    });
  }, []);

  {
    if (userVisit) {
      return (
        <div className="App">
          <Header />
          <div className="ProfileBody">
            <div className="username_holder">
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
            </div>
            <div className="ProfileContainer">
              <div className="menuHolder">
                <div className="menu">
                  <ul>
                    <li></li>
                  </ul>
                </div>
              </div>
              <div className="Profile_information">
                <div className="left_pannel_profile"></div>
                <div className="item_holder">
                  {dbCheck.map((val, index) => {
                    return (
                      <Cards
                        PageBehaviour={true}
                        username={val.booksName}
                        bookCoverLink={val.Links}
                        key={index}
                      ></Cards>
                    );
                  })}
                  <div className="AdditemCard"></div>
                  salfjas alsjf laskj
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Header />
          <div className="ProfileBody">
            <div className="username_holder">
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
              <div className="square"></div>
            </div>
            <div className="ProfileContainer">
              <div className="menuHolder">
                <div className="profile_banner">Username</div>
                <div className="menu">
                  <ul>
                    {/* 
                                                    <li>
                                                            Blogs
                                                    </li>
                                                    
                                                    <li>
                                                            Explore
                                                    </li> */}
                  </ul>
                </div>
              </div>

              {/* Main section starts from here */}
              <div className="Profile_information">
                <div className="left_pannel_profile"></div>
                <div className="item_holder">
                  {dbCheck.map((val) => {
                    return (
                      <Cards
                        setToggleState={false}
                        username={val.username}
                        PageBehaviour={true}
                      ></Cards>
                    );
                  })}
                  <div className="AdditemCard">
                    <div className="AdditemCard_header">Add Item</div>
                    <div className="circleholder">
                      <div className="circle">
                        <div className="cross"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
