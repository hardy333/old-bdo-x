import React from "react";
import ItemsCarousel from "./ItemsCarousel";

const ItemSettings = ({ option, options, setOption }) => {
  return (
    <ItemsCarousel option={option} setOption={setOption} options={options} />
  );
};

export default ItemSettings;
