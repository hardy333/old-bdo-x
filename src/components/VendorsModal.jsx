import React from "react";
import CloseModalSvg from "../components/svgs/CloseModalSvg";
import Modal from "react-modal";
import CarDisabled from "./svgs/CarDisabled";
import cartImg from "../assets/cart-img.png";

const VendorsModal = ({ modalIsOpen, closeModal, setIsOpen }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={closeModal}
      className="employees-modal vendors-modal"
      overlayClassName="employees-modal-overlay"
      closeTimeoutMS={300}
    >
      <button onClick={() => setIsOpen(false)} className="vendors-modal__btn">
        <CloseModalSvg />
      </button>
      <header>
        <CarDisabled />
        <div>
          <p>მომწონდებელი 1</p>
          <small>30333244332</small>
        </div>
      </header>
      <p className="vendors-modal-p">
        დავინტეგრირდეთ და გავიმარტივოთ კომუნიკაცია
      </p>

      <footer>
        <img src={cartImg} width="324" height="129" alt="" />
        <button className="btn btn-success">მოითხოვე ინტეგრაცია</button>
      </footer>
    </Modal>
  );
};

export default VendorsModal;
