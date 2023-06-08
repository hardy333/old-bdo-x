import React, { useState } from "react";
import SearchSvg from "../components/svgs/SearchSvg";
import "../styles/discounts-cards.css";

import Select from "react-select";
import ExcelExportSvg from "../components/svgs/service-level-svgs/ExcelExportSvg";
import DiscountCard from "../components/DiscountCard";

const options = [
  { value: "Orbita", label: "Orbita" },
  { value: "Kant", label: "Kant" },
  { value: "Ready Meals", label: "Ready Meals" },
  { value: "Diplomat", label: "Diplomat" },
  { value: "Orbita5", label: "Orbita5" },
  { value: "Magako", label: "Magako" },
  { value: "Vest Inv", label: "Vest Inv." },
  { value: "Svaneti", label: "Svaneti" },
  { value: "Orbita1", label: "Orbita1" },
  { value: "Ready Meals1", label: "Ready Meals1" },
  { value: "Orbita2", label: "Orbita2" },
  { value: "Diplomat1", label: "Diplomat1" },
  { value: "Orbita3", label: "Orbita3" },
  { value: "Vest Inv1", label: "Vest Inv1." },
  { value: "Orbita4", label: "Orbita4" },
  { value: "Orbita6", label: "Orbita6" },
  { value: "Kant1", label: "Kant1" },
  { value: "Orbita7", label: "Orbita7" },
  { value: "Magako1", label: "Magako1" },
  { value: "Svaneti1", label: "Svaneti1" },
];

const DiscountsCards = () => {
  const [vendorArr, setVendorArr] = useState([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ]);

  const [isChecked, setISChecked] = useState(false);

  return (
    <>
      <section className="discounts">
        <header className="discounts-header">
          {/* 1 */}
          <h1>ფასდაკლება</h1>

          <Select
            className="react-select-container"
            classNamePrefix="react-select"
            options={options}
            defaultValue={{ value: "GDM", label: "GDM" }}
          />
          <button
            className="all-orders__btn excel-export-btn"
            style={{ marginLeft: "auto", marginRight: "30px" }}
          >
            <ExcelExportSvg />
          </button>
          <div className="input-wrapper">
            <input type="text" className="input" />
            <SearchSvg />
          </div>
        </header>

        <div className="discount-cards-container">
          {vendorArr
            .filter((num, index) => (isChecked ? true : num === 1 || num === 0))
            .map((num, index) => {
              return <DiscountCard index={index} />;
            })}
        </div>
        <div className="employee-pag-container">
          <button>&larr;</button>
          <button className="active">1</button>
          <button>&rarr;</button>

          <div className="employees-page-info">
            <p>
              1-{vendorArr.length} of {vendorArr.length}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiscountsCards;
