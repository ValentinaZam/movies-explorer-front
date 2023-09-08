import React from "react";
import "./FilterCheckbox.css";


function FilterCheckbox({ onChange, value }) {
  return (
    <div className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={onChange}
        value={value}
        checked={value}
      ></input>
      <span className="filter__title">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
