import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../images/find.svg"

function SearchForm() {
  return (
    <section className="search">
      <form >
        <div className="search__form">
          <input
            name="query"
            className="search__input"
            id="search-input"
            type="text"
            placeholder="Фильм"
            required
          ></input>
          <button className="search__form-button" type="submit">
            <img src={find} alt="Стрелка для поиска" className="search__button search__button-image" />
          </button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
