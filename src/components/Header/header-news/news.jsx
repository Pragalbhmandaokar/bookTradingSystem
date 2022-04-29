import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./news.css";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Notification from "../../../Pages/notification/notification";
import { logout } from "../../../redux/userSlice";
export default function News({ user }) {
  const userDetails = useSelector((state) => state.user);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const notificationController = () => {
    setNotificationPanel(!notificationPanel);
  };
  const navigate = useNavigate();
  async function LogoutAction(){
    localStorage.clear();
    navigate("/login");
  }
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
            Notifications <span className="badge badge-light ">0</span>
          </Button>

          {userDetails.user && userDetails.user.loggedIn ? (
            <>
              <div className="flex justify-center items-center px-2 bg-white h-8 w-auto rounded-sm mx-2 ">
                {userDetails && userDetails.user
                  ? userDetails.user.name
                  : "profile name"}
              </div>
              <div
                className="flex justify-center items-center px-2 bg-white h-8 w-auto rounded-sm mx-2 btn"
                onClick={LogoutAction}
              >
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
      {notificationPanel && <Notification userDetails={userDetails} />}
    </div>
  );
}
