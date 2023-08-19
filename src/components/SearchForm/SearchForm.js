import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../images/find.svg"

function SearchForm() {
  return (
    <section className="search">
      <form className="search__form" id="form">
        <input
          name="query"
          className="search__input"
          id="search-input"
          type="text"
          placeholder="Фильм"
        ></input>
        <button className="search__button" type="submit">
          <img src={find} alt="Стрелка для поиска" className="search__button search__button_image" />
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
