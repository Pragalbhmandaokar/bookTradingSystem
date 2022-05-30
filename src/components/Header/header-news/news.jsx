import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./news.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../../../Pages/notification/notification";
export default function News({ user }) {
  const userDetails = useSelector((state) => state.user);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const [notificationCount,setNotificationCount] = useState(0);
  const notificationController = () => {
    setNotificationPanel(!notificationPanel);
  };
  const navigate = useNavigate();
  async function LogoutAction(){
    localStorage.clear();
    navigate("/login");
  }
  useEffect(()=>{
     const userId = localStorage.getItem("userId");
     axios
       .get("http://localhost:4000/getNotification/" + userId)
       .then((response) => {
         const getData = async () => {
          setNotificationCount(response.data.message.length); 
         };
         getData();
       });
  })
  return (
    <div>
      <div className="NewsTitle fixed">
        <ul className="header-tool__services">
          <li className="h-full p-[1px] bg-gradient-to-r from-[#C537AE] via-[#8217DE] to-[#ff5800]">
            <span className="w-36 h-full mt-2 bg-[#eaeded] text-center">
              <Link to="/services" className="w-18 text-black">
                GHRCE
              </Link>
            </span>
          </li>
        </ul>

        <ul className="Header-tools-tools text-black">
          <Button
            type="button"
            className="btn btn-primary "
            onClick={notificationController}
          >
            Notifications{" "}
            <span className="badge badge-light font-sans text-[#ee2533] ">
              {notificationCount}
            </span>
          </Button>

          {userDetails.user && userDetails.user.loggedIn ? (
            <>
              <div className="flex justify-center items-center px-2 bg-white h-8 w-auto rounded-sm mx-2 ">
                {userDetails && userDetails.user
                  ? userDetails.user.name
                  : "profile name"}
              </div>
              <div
                className="flex justify-center items-center px-2 bg-white h-8 w-auto rounded-sm mx-2 btn" onClick={LogoutAction}>
                log out
              </div>
            </>
          ) : (
            <Link to="/signup">
              <Button
                type="button"
                className="btn btn-Basecolor text-black long"
              >
                signup
              </Button>
            </Link>
          )}
        </ul>
      </div>
      {notificationPanel && (
        <Notification userDetails={userDetails} notificationCount ={notificationCount}/>
      )}
    </div>
  );
}
