import React from "react";
import { useState } from "react";
import "../styles/employees.css";
import EmployeeCard from "../components/EmployeeCard";
import PlusSvg from "../components/svgs/PlusSvg";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/employees-modal-x.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeesCompirmationModal from "../components/svgs/EmployeesCompirmationModal";
import EmployeesMainModal from "../components/EmployeesMainModal";
import { LayoutGroup } from "framer-motion";

const namesArr = [
  {
    access: "ყველა ობიექტი",
    status: "ადმინისტრატორი",
    name: "დანიელ პატარაია",
  },
  {
    access: "ყველა ობიექტი",
    status: "ბიზნეს ანალიტიკოსი",
    name: "დანიელ ალასანია",
  },
  { access: "მაღაზია #1", status: "მაღაზიის მენეჯერი", name: "პეტრე ბოლქვაძე" },
  { access: "ყველა ობიექტი", status: "ადმინისტრატორი", name: "ლიკა ბექაური" },
  { access: "ყველა ობიექტი", status: "ადმინისტრატორი", name: "ანა წერეთელი" },
  {
    access: "ყველა ობიექტი",
    status: "ბიზნეს ანალიტიკოსი",
    name: "ბიძინა თორელი",
  },
  { access: "მაღაზია #2", status: "მაღაზიის მენეჯერი", name: "მანანა მელია" },
  {
    access: "ყველა ობიექტი",
    status: "ადმინისტრატორი",
    name: "ზვიადი ჭავჭავაძე",
  },
  {
    access: "ყველა ობიექტი",
    status: "ბიზნეს ანალიტიკოსი",
    name: "რამაზი თავდგერიძე",
  },
  { access: "ყველა ობიექტი", status: "ადმინისტრატორი", name: "ნიკა ჩადუნელი" },
  { access: "ყველა ობიექტი", status: "ადმინისტრატორი", name: "ოთარ ხუჯაძე" },
  {
    access: "ყველა ობიექტი",
    status: "ბიზნეს ანალიტიკოსი",
    name: "დავით საგინაშვილი",
  },
  { access: "მაღაზია #3", status: "მაღაზიის მენეჯერი", name: "ზაალ მხეიძე" },
  {
    access: "ყველა ობიექტი",
    status: "ადმინისტრატორი",
    name: "სტეფანე ოჩიაშვილი",
  },
  {
    access: "მაღაზია #4",
    status: "მაღაზიის მენეჯერი",
    name: "ანდრია ზვიადაძე",
  },
  { access: "ყველა ობიექტი", status: "ადმინისტრატორი", name: "იონა გახარია" },
];

const Employees = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [compirmationModalOpen, setCompirmationModalOpen] = useState(false);
  const [employeesArr, setEmployeesArr] = useState(namesArr);
  const [activeEmployee, setAactiveEmployee] = useState(null);

  const notify = () => toast.success("New Employee was added !");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const delteEmployee = (name) => {
    console.log(name);
    setEmployeesArr(employeesArr.filter((c) => c.name !== name));
  };

  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar={true} />
      <EmployeesCompirmationModal
        compirmationModalOpen={compirmationModalOpen}
        setCompirmationModalOpen={setCompirmationModalOpen}
        activeEmployee={activeEmployee}
        delteEmployee={delteEmployee}
      />
      <EmployeesMainModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        setIsOpen={setIsOpen}
      />

      <header className="employees-header">
        <div className="employees-settings">
          <h1>თანამშრომლები</h1>
          <button onClick={openModal} className="btn btn-outlined btn-black ">
            <PlusSvg fill="#211543" />
            დამატება
          </button>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </div>
      </header>

      <div className="employees-card-container">
        <LayoutGroup>
          {employeesArr.map((employee) => {
            return (
              <EmployeeCard
                openModal={openModal}
                key={employee.name}
                name={employee.name}
                status={employee.status}
                access={employee.access}
                setAactiveEmployee={setAactiveEmployee}
                setCompirmationModalOpen={setCompirmationModalOpen}
                delteEmployee={delteEmployee}
              />
            );
          })}
        </LayoutGroup>
      </div>
      <div className="employee-pag-container">
        <button>&larr;</button>
        <button className="active">1</button>
        <button>&rarr;</button>

        <div className="employees-page-info">
          <p>
            1-{employeesArr.length} of {employeesArr.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default Employees;
