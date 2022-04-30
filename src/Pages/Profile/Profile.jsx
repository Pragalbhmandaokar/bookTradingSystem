import React, { useState, useEffect } from "react";
import "./profile.css";
import Cards from "../../components/Body/Cards/Cards";
import Axios from "axios";
import Header from "../../components/Header/Header/Header";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const [dbCheck, GetDbCheck] = useState([]);
  const userDetails = useSelector((state) => state.user);
  const [loggedUser,setLoggedUser] = useState([]);
   useEffect(() => {
     const loggedInUser = localStorage.getItem("userId");
     if (loggedInUser && loggedInUser > 0) {
       const foundUser = loggedInUser;
       setLoggedUser(foundUser);
     } else {
       navigate("/");
     }

     let userId = loggedInUser;
     if (userDetails.user != null) {
       userId = userDetails.user.userId;
     }
     Axios.get(`http://localhost:4000/selectBookByUserId/${userId}`).then(
       (Response) => {
         console.log(Response.data.message);
         GetDbCheck(Response.data.message);
       }
     );
   }, []);

    return (
        <div className="App">
          <Header />
          <div className="bg-gray-100">
            <div className="flex w-full text-white bg-main-color">
              <div className="flex flex-col max-w-screen-xl px-4 mx-auto items-center justify-between">
                <div className="p-4 flex items-center justify-center">
                  <a
                    href="#"
                    className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
                  >
                    {userDetails && userDetails.user
                      ? userDetails.user.name
                      : "profile name"}
                  </a>
                  <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      className="w-6 h-6"
                    >
                      <path
                        x-show="!open"
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                      ></path>
                      <path
                        x-show="open"
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="container w-full mx-auto my-5 p-5">
              <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-[20vw] md:mx-2">
                  <div className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100 w-[20vw] p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden">
                      <img
                        className="h-auto w-full mx-auto rounded-full"
                        src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                        alt=""
                      />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                      Jane Doe
                    </h1>
                    <h3 className="text-gray-600 font-lg text-semibold leading-6">
                      Owner at Her Company Inc.
                    </h3>
                    <div className="text-sm text-gray-500 hover:text-gray-600 leading-6">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Reprehenderit, eligendi dolorum sequi illum qui unde
                      aspernatur non deserunt
                    </div>
                    <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                      <li className="flex items-center py-3">
                        <span>Status</span>
                        <span className="ml-auto">
                          <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                            Active
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center py-3">
                        <span>Member since</span>
                        <span className="ml-auto">Nov 07, 2016</span>
                      </li>
                    </ul>
                  </div>

                  <div className="my-4"></div>

                  <div className="bg-white p-3 hover:shadow">
                    <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                      <span className="text-green-500">
                        <svg
                          className="h-5 fill-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </span>
                      <span>Similar Profiles</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="text-center my-2">
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                          alt=""
                        />
                        <a href="#" className="text-main-color">
                          Kojstantin
                        </a>
                      </div>
                      <div className="text-center my-2">
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src="https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                          alt=""
                        />
                        <a href="#" className="text-main-color">
                          James
                        </a>
                      </div>
                      <div className="text-center my-2">
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                          alt=""
                        />
                        <a href="#" className="text-main-color">
                          Natie
                        </a>
                      </div>
                      <div className="text-center my-2">
                        <img
                          className="h-16 w-16 rounded-full mx-auto"
                          src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                          alt=""
                        />
                        <a href="#" className="text-main-color">
                          Casey
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[84vw] h-64">
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center font-semibold text-gray-900 leading-8">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                      <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            First Name
                          </div>
                          <div className="px-4 py-2">Jane</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Last Name
                          </div>
                          <div className="px-4 py-2">Doe</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Gender</div>
                          <div className="px-4 py-2">Female</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Contact No.
                          </div>
                          <div className="px-4 py-2">+11 998001001</div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Current Address
                          </div>
                          <div className="px-4 py-2">
                            Beech Creek, PA, Pennsylvania
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Permanant Address
                          </div>
                          <div className="px-4 py-2">
                            Arlington Heights, IL, Illinois
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">Email.</div>
                          <div className="px-4 py-2">
                            <a
                              className="text-blue-800"
                              href="mailto:jane@example.com"
                            >
                              jane@example.com
                            </a>
                          </div>
                        </div>
                        <div className="grid grid-cols-2">
                          <div className="px-4 py-2 font-semibold">
                            Birthday
                          </div>
                          <div className="px-4 py-2">Feb 06, 1998</div>
                        </div>
                      </div>
                    </div>
                    <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                      Show Full Information
                    </button>
                  </div>

                  <div className="my-4 "></div>
                  <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="grid grid-cols-1">
                      <div>
                        <div className="flex flex-col items-center font-semibold text-gray-900 leading-8 mb-3">
                          <span clas="text-green-500">
                            <svg
                              className="h-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </span>
                          <span className="tracking-wide">Book Reads</span>
                        </div>
                        <div className="flex flex-wrap h-full mt-10">
                          {dbCheck.map((val, index) => {
                            return (
                              <Cards
                                key={index}
                                PageBehaviour={true}
                                username={val.booksName}
                                collectionId={val.collectionId}
                                bookId={val.id}
                                bookCoverLink={val.links}
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
              </div>
            </div>
          </div>
        </div>
      );
}
