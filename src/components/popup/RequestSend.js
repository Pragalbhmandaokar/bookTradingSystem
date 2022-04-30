import Modal from "react-modal";
import PropTypes from "prop-types";
import CloseButton from "../../Image/creatorProfile/close.png";
import Success from "../../Image/creatorProfile/success.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    width: "556px",
    height: "456px",
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    zindex:"100",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#27272a",
  },
};

const RequestSend = ({ isModal, onToggleModal }) => {
  const userDetails = useSelector((state) => state.user);
  const [closeModal, setCloseModal] = useState(false);
  const CloseButtonFunc = () => {
    setCloseModal(!closeModal);
  };
  useEffect(()=>{
      onToggleModal();
  })
  return (
    <div>

      <Modal
        isOpen={isModal}
        onRequestClose={onToggleModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="mx-4">
          <img
            onClick={CloseButtonFunc}
            className="w-4 float-right -mt-4 mb-8 cursor-pointer"
            src={CloseButton}
            alt="close"
          />
          <img className="mt-8" src={Success} alt="done" />

          <h2 className=" mt-8 text-lg">
            Hey,{" "}
            {userDetails.user && userDetails.user.name
              ? userDetails.user.name
              : "username"}
          </h2>
          <h1 className=" mt-8 text-4xl ">Thanks for your purchase</h1>
          <h4 className=" mt-8 text-base ">
            By this purchase you've unlocked 6 benefits!
          </h4>
          <div className="flex items-center justify-center w-56 text-base mt-12 h-12 float-right rounded-3xl border-2 border-pink-500  cursor-pointer">
            Checkout benefits
          </div>
        </div>
      </Modal>
    </div>
  );
};

RequestSend.propTypes = {
  isModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default RequestSend;
