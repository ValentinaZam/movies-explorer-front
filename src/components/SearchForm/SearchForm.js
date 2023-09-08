import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import find from "../../images/find.svg"

function SearchForm({ onSubmit, isShortMovie, onChange }) {
  const [values, setValues] = useState({});
  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
  };
  const handleSearch = (evt) => {
    evt.preventDefault();
    onSubmit(values.query);
  };


  return (
    <section className="search">
      <form onSubmit={handleSearch}>
        <div className="search__form">
          <input
            name="query"
            className="search__input"
            id="search-input"
            type="text"
            placeholder="Фильм"
            required
            value={values.query ?? ""}
            onChange={handleChange}

          ></input>
          <button className="search__form-button" type="submit">
            <img src={find} alt="Стрелка для поиска" className="search__button search__button-image" />
          </button>
        </div>
        <FilterCheckbox onChange={onChange} value={isShortMovie} />
      </form>
    </section>
  );
}

export default SearchForm;
