import React, { useMemo, useState } from "react";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

// css
import "../styles/all-orders.css";
import "../styles/global-filter-input.css";
import "../styles/order-details.css";
import "../styles/pending-status-menu.css";

import Select from "react-select";

// css
import "../styles/ag-grid.css";
import "../styles/sla-graphics.css";

import { addDays } from "date-fns";
import { items1 } from "./Test";
import SlaChart from "../components/SlaChart";
import DatePickerBtn2 from "../components/DatePickerBtn2";
import CatalogueMenu from "../components/CatalogueMenu";

const options = [
  { value: "Orbita", label: "Orbita" },
  { value: "Kant", label: "Kant" },
  { value: "Ready Meals", label: "Ready Meals" },
  { value: "Diplomat", label: "Diplomat" },
  { value: "Vest Inv", label: "Vest Inv." },
  { value: "Magako", label: "Magako" },
  { value: "Svaneti", label: "Svaneti" },
];

// "#6E0FF5", "#F55364",
const SlaGraphics = () => {
  const [dateState, setDateState] = useState({
    selection: {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
      color: "#F55364",
    },
    compare: {
      // startDate: null,
      // endDate: null,
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      // disabled: true,
      key: "compare",
      color: "#6E0FF5",
    },
  });
  // a1 or a2 |  b1 or b2
  const [dataA, setDataA] = useState("a1");
  const [dataB, setDataB] = useState("b1");

  const [demandMet, setDemandMet] = useState(80);
  const [demandInTime, setDemandInTime] = useState(95);

  const c = useMemo(() => {
    return Array.from({ length: 30 }).map((_, index) => {
      return items1[Math.floor(Math.random() * items1.length)];
    });
  }, []);

  const changeDemands = () => {
    setDemandInTime(Math.floor(Math.random() * 30 + 70));
    setDemandMet(Math.floor(Math.random() * 30 + 70));
  };

  const changeDataA = () => {
    setDataA((curr) => {
      if (curr === "a1") {
        return "a2";
      }
      return "a1";
    });
  };

  const changeDataB = () => {
    setDataB((curr) => {
      if (curr === "b1") {
        return "b2";
      }
      return "b1";
    });
  };

  const changeAllData = () => {
    changeDemands();
    changeDataB();
    changeDataA();
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
              onChange={changeAllData}
            />
          </div>
          {/* Right */}
          <div className="all-orders__settings__options"></div>
        </div>
      </header>
      <div className=" flex gap-2">
        {/* Categoris menu */}
        <div className="catalogue-menu-container">
          <CatalogueMenu changeAllData={changeAllData} />
        </div>
        {/* Categories menu end */}
        {/* Graphics */}
        <div className="sla-chart-container placeholder pl-5 h-100">
          <header className="sla-graphics-header">
            <h1>Avarage Service Level</h1>
            <div className="flex gap-10 mt-10">
              <div className="sla-percent-container">
                <span>{demandMet}%</span>
                <small>Demand Met</small>
              </div>
              <div className="sla-percent-container">
                <span>{demandInTime}%</span>
                <small>Demand In Time</small>
              </div>
              <div className="self-end justify-end justify-self-end ml-auto">
                <DatePickerBtn2
                  changeDataA={changeDataA}
                  changeDataB={changeDataB}
                  changeDemands={changeDemands}
                  dateState={dateState}
                  setDateState={setDateState}
                  changeAllData={changeAllData}
                />
              </div>
            </div>
          </header>
          <div className="sla-chart-wrapper">
            <SlaChart dataA={dataA} dataB={dataB} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SlaGraphics;
