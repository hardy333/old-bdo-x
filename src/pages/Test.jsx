import "../styles/switch.css";
import "../styles/pag-test.css";
import "../styles/status-component.css";
import "../styles/categories.css";
import "../styles/test.css";
import ColumnCHart from "../components/ColumnCHart";
export const items = Array.from({ length: 1000 }).map((_, index) => index);

export const items1 = [
  "Chips",
  "Chips",
  "Chips",
  "Popcorn",
  "Popcorn",
  "Popcorn",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Tortillas",
  "Tortillas",
  "Nachos",
  "Nachos",
  "Nachos",
  "Chips",
  "Chips",
  "Chips",
  "Popcorn",
  "Popcorn",
  "Popcorn",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Crackers",
  "Crackers",
  "Crackers",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sunflower Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Sesame Seeds",
  "Wallnut",
  "Wallnut",
  "Wallnut",
  "Tortillas",
  "Tortillas",
  "Tortillas",
];

export const parentCategories = [
  "Chips",
  "Nacho",
  "Tortia",
  "sunflower Seeds",
  "Popcorn",
  "Crackers",
];

const Test = () => {
  return (
    <>
      <ColumnCHart />
    </>
  );
};

export default Test;
