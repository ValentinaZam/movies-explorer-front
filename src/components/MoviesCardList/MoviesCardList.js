import React, { useState } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import SearchError from "../SearchError/SearchError"
import { useLocation } from "react-router";

function MoviesCardList({ movies, searchText }) {
  const location = useLocation();
  const [visibleCards, setVisibleCards] = useState();

  const isMoviesSavedPage = location.pathname === "/saved-movies";
  return (
    <section className="cards">
      <SearchError errorText={"Ничего не найдено"} />
      <SearchError
        errorText={
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        }
      />
      <ul className="cards__list">
        {movies.slice(0, visibleCards).map(movieInfo => (
          <MoviesCard movie={movieInfo}
            key={isMoviesSavedPage ? movieInfo._id : movieInfo.id}
            // onClick={onClick}
            // isSaved={handleIsSaved(movieInfo)}
            isMoviesSavedPage={isMoviesSavedPage} />))}

        {/* <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard /> */}
      </ul>
      <div className="cards__button-container">
        <button className="cards__button" type="button">Ещё</button>
      </div>
    </section>
  )
}

export default MoviesCardList;
