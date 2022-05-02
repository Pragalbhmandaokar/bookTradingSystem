import axios from "axios";
import React,{useEffect, useState} from "react";
import "./notification.css";
import NotificationModal from './notificationModal';
export default function Notification({
  setNotificationPanel,
  userDetails,
  notificationCount,
}) {
  const [seeAllNotification, SetSeeAll] = useState(false);
  const [notification, setNotification] = useState([]);
  const [isModal, setIsModal] = useState(false);

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
  }, [notificationCount]);

  const onToggleModal = () => {
    setIsModal(!isModal);
  };
  function SeeAllNotificationPanel() {
    SetSeeAll(!seeAllNotification);
  }
  const updateBookRequestStatus = (e) => {
    const transactionId = e.currentTarget.id;
    axios
      .post("http://localhost:4000/updateRequestNotification/" + transactionId)
      .then((response) => {
        console.log(response.data.message);
        console.log("request successfull");
        setIsModal(true);
      });
  };

  const removeBookRequestStatus = (transactionId) => {
    axios
      .post("http://localhost:4000/removeBookRequestStatus/" + transactionId)
      .then((response) => {
        SeeAllNotificationPanel();
      });
  };
  return (
    <div className="relative flex justify-end w-screen delay-75 transition-all">
      <div className="relative mx-2">
        <div
          x-show="dropdownOpen"
          className="fixed inset-0 h-84 top-24 w-full z-10 bg-neutral-800/50"
        ></div>

        <div
          x-show="dropdownOpen"
          className="absolute right-64 top-10 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
        >
          {notification.slice(0, 3).map((val, index) => {
            return (
              <div className="flex w-96 h-auto py-2" id={val.TransactionId}>
                <div className="">
                  {" "}
                  <a className="flex items-center px-4 py-2 border-b hover:bg-gray-100 -mx-2">
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
                    id={val.TransactionId}
                    onClick={(e) => updateBookRequestStatus(e)}
                  >
                    accept
                  </div>
                  <div
                    className="flex justify-center items-center h-10 my-2 bg-red-200"
                    onClick={(val) =>
                      removeBookRequestStatus(val.TransactionId)
                    }
                  >
                    reject
                  </div>
                </div>
                <div>
                  {isModal && (
                    <NotificationModal
                      onToggleModal={onToggleModal}
                      isModal={isModal}
                      key={val.TransactionId}
                      val={val}
                    />
                  )}
                </div>
              </div>
            );
          })}
          {notification && notification.length > 0 ? (
            <div className="block  w-96 bg-gray-800 text-white text-center font-bold p-4">
              See all notifications
            </div>
          ) : (
            <div className="block  w-96 bg-gray-800 text-white text-center font-bold p-4">
              no notification
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
