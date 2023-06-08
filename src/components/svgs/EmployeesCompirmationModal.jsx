import React from "react";
import Modal from "react-modal";
import CloseModalSvg from "./CloseModalSvg";
import "../../styles/employee-delete-modal.css";

const EmployeesCompirmationModal = ({
  compirmationModalOpen,
  setCompirmationModalOpen,
  activeEmployee,
  delteEmployee,
}) => {
  return (
    <Modal
      isOpen={compirmationModalOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setCompirmationModalOpen(false)}
      className="employees-modal  employee-delete-modal"
      overlayClassName="employees-modal-overlay employee-delete-modal-overlay"
      closeTimeoutMS={300}
    >
      <button
        onClick={() => setCompirmationModalOpen(false)}
        className="vendors-modal__btn btn-close"
      >
        <CloseModalSvg fill="#1c1238" />
      </button>
      <div>
        <p>დარწმუნებული ხართ რომ გინდათ {activeEmployee} - ის წაშლა ?</p>
        <footer>
          <button
            className="btn btn-no"
            onClick={() => setCompirmationModalOpen(false)}
          >
            არა
          </button>
          <button
            className="btn btn-yes"
            onClick={() => {
              delteEmployee(activeEmployee);
              setCompirmationModalOpen(false);
            }}
          >
            კი
          </button>
        </footer>
      </div>
    </Modal>
  );
};

export default EmployeesCompirmationModal;
