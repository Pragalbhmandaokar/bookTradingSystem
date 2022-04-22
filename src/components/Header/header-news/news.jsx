import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./news.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Notification from "../../../Pages/notification/notification";
export default function News() {
  const userDetails = useSelector((state) => state.user);
   const [notificationPanel, setNotificationPanel] = useState(false);
   const notificationController = () => {
     setNotificationPanel(!notificationPanel);
   };
  return (
    <div>
      <div className="NewsTitle fixed">
        <ul className="header-tool__services">
          <li></li>
          <li>
            <span className="header-tool__helpService">
              <Link to="/services">Nagpur</Link>
            </span>
          </li>
          <li>
            <span className="header-tool__helpService">
              <Link to="/services">Wardha</Link>
            </span>
          </li>
          <li>
            <span className="header-tool__helpService text-black">
              <Link to="/services">GHRCE</Link>
            </span>
          </li>
          <li>
            <span className="header-tool__helpService">
              <Link to="/services">Pheniox</Link>
            </span>
          </li>
        </ul>

        <ul className="Header-tools-tools text-black">
         
            <Button type="button" className="btn btn-primary " onClick={notificationController}>
              Notifications <span className="badge badge-light ">0</span>
            </Button>
         
          {userDetails ? (
            <Link to="/signup">
              <Button
                type="button"
                className="btn btn-Basecolor text-black long"
              >
                signup
              </Button>
            </Link>
          ) : (
            <Button type="button" className="btn btn-Basecolor  long">
              profile name
            </Button>
          )}
        </ul>
      </div>
      {notificationPanel && <Notification />}
    </div>
  );
}
