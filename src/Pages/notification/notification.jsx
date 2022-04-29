import axios from "axios";
import React,{useEffect, useState} from "react";
import "./notification.css";

export default function Notification({ setNotificationPanel,userDetails}) {
  const [seeAllNotification,SetSeeAll] = useState(false);
  const [notification,setNotification] = useState([]);
  const [notificationCount,setNotificationCount] = useState(2);
  const [userRequest,setUserRequest] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get("http://localhost:4000/getNotification/" + userId)
      .then((response) => {
        const getData = async () => {
           setNotification(response.data.message);
          };
          getData();
        });
  }, []);

  function SeeAllNotificationPanel(){
    SetSeeAll(!seeAllNotification);
  }

  const updateBookRequestStatus = (transactionId) =>{
    console.log(transactionId);
    axios
      .post("http://localhost:4000/updateRequestNotification/" + transactionId)
      .then((response) => {
        console.log(response.data.message);
        console.log("request successfull" );

      });
  }
  
  const removeBookRequestStatus = (transactionId)=>{
    axios.post("http://localhost:4000/removeBookRequestStatus/"+transactionId)
    .then((response)=>{
      SeeAllNotificationPanel();
    });
  }
  return (
    <div className="relative flex justify-end w-screen delay-75 transition-all">
      <div className="relative my-2">
        <div
          x-show="dropdownOpen"
          className="fixed inset-0 h-84 top-24 w-full z-10 bg-neutral-800/50"
        ></div>
       
        <div
          x-show="dropdownOpen"
          className="absolute right-64 top-10 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
        >
          {notification.slice(0, notificationCount).map((val, index) => {
            return (
              <div className="flex w-96 h-auto py-2" id={val.TransactionId}>
                <div className="">
                  {" "}
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 border-b hover:bg-gray-100 -mx-2"
                  >
                    <img
                      className="h-8 w-10 object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                      alt="avatar"
                    />
                    <p className="text-gray-600 text-sm mx-2">
                      <span className="font-bold" href="#">
                        <p>{val && val.username ? val.username : "username"}</p>
                      </span>
                      Requested on the
                      <span className="font-bold text-blue-500" href="#">
                        <p>
                          {val && val.booksName ? val.booksName : "book name"}
                        </p>
                      </span>
                    </p>
                  </a>
                </div>

                <div className="flex flex-col w-full">
                  <div
                    className="flex justify-center items-center h-10 my-2 bg-teal-300"
                    onClick={updateBookRequestStatus(val.TransactionId)}
                  >
                    accept
                  </div>
                  <div
                    className="flex justify-center items-center h-10 my-2 bg-red-200"
                    onClick={removeBookRequestStatus(val.TransactionId)}
                  >
                    reject
                  </div>
                </div>
              </div>
            );
          })}
          <div
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-4"
          >
            See all notifications
          </div>
        </div>
      </div>
    </div>
  );
}
