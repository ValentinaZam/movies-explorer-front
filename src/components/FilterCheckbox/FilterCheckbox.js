import React from "react";
import "./FilterCheckbox.css";


function FilterCheckbox({ onChange, value }) {
  return (
    <div className="filter">
      <button
        className={!value ? "filter__checkbox" : "filter__checkbox_active"}
        type="submit"
        onClick={onChange}
        name="isShortMovie"
      >
      </button>
      <span className="filter__title" >Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
