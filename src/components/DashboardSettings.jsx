import React from "react";
import filter from "../assets/icons/filter.png";
import filterList from "../assets/icons/list.png";
import search from "../assets/icons/search.png";

import "swiper/css/pagination";

import ItemSettings from "./ItemSettings";
import ShopSettings from "./ShopSettings";

const DashboardSettings = ({
  type,
  setType,
  option,
  setOption,
  searchValue,
  setSearchValue,
  options,
  isSorting,
  setIsSorting,
  avgSLA,
  setShowInputs
}) => {
  let subSettings = null;

  if (options && type === "By item") {
    subSettings = (
      <ItemSettings setOption={setOption} option={option} options={options} />
    );
  }

  if (options && type === "By shop") {
    subSettings = (
      <ShopSettings
        avgSLA={avgSLA}
        option={option}
        setOption={setOption}
        options={options}
      />
    );
  }

  return (
    <header className="settings">
      <div className="settings__top">
        <h1>SPAR Service Level Report</h1>

        <div className="settings__filters">
          <button>
            <img src={filter} />
          </button>
          <button
            style={{
              background: isSorting ? "#1ed8b9" : "",
              padding: "0.4rem",
              borderRadius: "5px",
            }}
            onClick={() => setIsSorting(!isSorting)}
          >
            <img src={filterList} />
          </button>
          <button onClick={() => setShowInputs(curr => !curr)}>
            <img src={search} />
          </button>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="settings__bottom">
        {/* Carousel or select */}
        <div className="">{subSettings}</div>

        <div className="options-container">
          <div className="input-group">
            <input
              type="radio"
              id="By item"
              name="type"
              checked={type === "By item"}
              onChange={(e) => {
                setType("By item");
                setOption("Snacks");
              }}
            />
            <label htmlFor="By item">By item</label>
          </div>
          <div className="input-group">
            <input
              type="radio"
              id="By shop"
              name="type"
              checked={type === "By shop"}
              onChange={(e) => {
                setType("By shop");
                setOption("N.Ramishvili 33");
              }}
            />
            <label htmlFor="By shop">By shop</label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardSettings;
