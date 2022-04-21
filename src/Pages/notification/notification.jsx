import React,{useState} from "react";
import "./notification.css";

export default function Notification({ setNotificationPanel }) {
  const [seeAllNotification,SetSeeAll] = useState(false);
  function closeNotificationPanel(){
    setNotificationPanel(false);
  }
  return (
    <div className="relative flex justify-end w-screen delay-75 transition-all">
      <div className="relative my-2">
        <div
          x-show="dropdownOpen"
          className="fixed inset-0 h-84 top-28 w-full z-10 bg-neutral-800/50"
        ></div>
        <div
          x-show="dropdownOpen"
          className="absolute right-64 top-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
        >
          <div className="py-2">
            <a
              href="#"
              className="flex items-center w-96 px-4 py-3 border-b hover:bg-gray-100 -mx-2"
            >
              <img
                className="h-8 w-8 rounded-full object-cover mx-1"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <p className="text-gray-600 text-sm mx-2">
                <span className="font-bold" href="#">
                  Sara Salah
                </span>{" "}
                replied on the{" "}
                <span className="font-bold text-blue-500" href="#">
                  Upload Image
                </span>{" "}
                artical . 2m
              </p>
            </a>
          </div>
          <a
            href="#"
            className="block bg-gray-800 text-white text-center font-bold py-4"
          >
            See all notifications
          </a>
        </div>
      </div>
    </div>
  );
}
