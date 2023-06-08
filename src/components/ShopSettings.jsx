import React from "react";
import Select from "react-select";

const ShopSettings = ({ options, option, setOption, avgSLA }) => {
  const selectOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  return (
    <div className="shop-settings">
      <label htmlFor="shop">Shop</label>
      <Select
        id="shop"
        name="shop"
        value={{ value: option, label: option }}
        options={selectOptions}
        onChange={(value) => {
          setOption(value.value);
        }}
      />
      <p className="sla-container">
        Avarage SLA: <span className="sla-num">{avgSLA} %</span>{" "}
      </p>
    </div>
  );
};

export default ShopSettings;
