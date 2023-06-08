import React, { useMemo, useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/ag-table-scrollbar.css";

// import "ag-grid-community/styles/ag-theme-alpine-dark.css";
// import "ag-grid-community/styles/ag-theme-balham.css";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../styles/all-orders.css";
import "../styles/global-filter-input.css";
import "../styles/order-details.css";
import "../styles/pending-status-menu.css";

import Select from "react-select";
import classNames from "classnames";

// css
import "../styles/ag-grid.css";
import "../styles/sla-graphics.css";

import { addDays } from "date-fns";
import { items1 } from "./Test";
import SlaChart from "../components/SlaChart";
import DatePickerBtn2 from "../components/DatePickerBtn2";

const options = [
  { value: "Orbita", label: "Orbita" },
  { value: "Kant", label: "Kant" },
  { value: "Ready Meals", label: "Ready Meals" },
  { value: "Diplomat", label: "Diplomat" },
  { value: "Vest Inv", label: "Vest Inv." },
  { value: "Magako", label: "Magako" },
  { value: "Svaneti", label: "Svaneti" },
];

const SlaGraphicsTest = () => {
  const [dateState, setDateState] = useState({
    selection: {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "compare",
    },
  });

  const [isHover, setIsHover] = useState(false);
  const [isSectionHover, setIsSectionHover] = useState(false);

  const c = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      return items1[Math.floor(Math.random() * items1.length)];
    });
  }, []);

  const disableHoverAsync = () => {
    setIsHover(false);
  };

  return (
    <>
      <header className="all-orders__header">
        <div className="all-orders__settings">
          {/* Left */}
          <div
            className="order-details-left"
            style={{ paddingLeft: "0", marginLeft: 10 }}
          >
            <h4>Service Level Report</h4>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              defaultValue={{ value: "GDM", label: "GDM" }}
            />
          </div>
          {/* Right */}
          <div className="all-orders__settings__options"></div>
        </div>
      </header>
      <div className=" flex gap-2">
        <div className="categories">
          <section className="section-first">
            <header className="categories__header">
              <div className="input-wrapper">
                <input type="text" className="input" />
                <SearchSvg />
              </div>
            </header>
            <div className="categories__list-container">
              <ul className="categories__list">
                {c.map((item, index) => (
                  <li
                    key={index}
                    onMouseOut={disableHoverAsync}
                    onMouseOver={() => setIsHover(true)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="categories__footer">
              <p>View full structure </p>
            </div>
          </section>

          <section
            className={classNames({
              "section-2": true,
              open: isHover || isSectionHover,
            })}
            onMouseOut={() => setIsSectionHover(false)}
            onMouseOver={() => setIsSectionHover(true)}
          >
            <header>
              <div className="input-wrapper">
                <input type="text" className="input" />
                <SearchSvg />
              </div>
            </header>
            <div className={`section-2__container ${isHover ? "open" : ""}`}>
              <ul className="section-2__list">
                {items1.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
        {/* Graphics */}
        <div className="sla-chart-container placeholder pl-5 h-100">
          <header className="sla-graphics-header">
            <h1>Avarage Service Level</h1>
            <div className="flex gap-10 mt-10">
              <div className="sla-percent-container">
                <span>78%</span>
                <small>Demand Met</small>
              </div>
              <div className="sla-percent-container">
                <span>89%</span>
                <small>Demand In Time</small>
              </div>
              <div className="self-end justify-end justify-self-end ml-auto">
                <DatePickerBtn2
                  dateState={dateState}
                  setDateState={setDateState}
                />
              </div>
            </div>
          </header>
          <div className="sla-chart-wrapper">
            <SlaChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlaGraphicsTest;
