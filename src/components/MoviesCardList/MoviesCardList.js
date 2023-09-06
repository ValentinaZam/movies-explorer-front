import React, { useCallback, useEffect, useState } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { useLocation } from "react-router";

function MoviesCardList({ movies, searchText }) {
  const location = useLocation();
  const [visibleCards, setVisibleCards] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [resize, setResize] = useState(null);

  const isMoviesSavedPage = location.pathname === "/saved-movies";

  const displayElements = () => {
    if (windowWidth >= 1280) {
      setVisibleCards((prev) => prev + 4);
    } else if (
      windowWidth >= 768 &&
      windowWidth < 1280
    ) {
      setVisibleCards((prev) => prev + 2);
    } else if (
      windowWidth >= 320 &&
      windowWidth < 768
    ) {
      setVisibleCards((prev) => prev + 2);
    }
  };

  const handleResize = useCallback(() => {
    clearTimeout(resize);

    const timer = setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 100);
    setResize(timer);
  }, [resize]);


  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <section className="cards">
      {movies.length === 0 ? (<p className="cards__message">{searchText || "Нужно ввести ключевое слово"}</p>) : (
        <>
          <ul className="cards__list">
            {movies.slice(0, visibleCards).map(movieInfo => (
              <MoviesCard movie={movieInfo}
                key={isMoviesSavedPage ? movieInfo._id : movieInfo.id}
                // onClick={onClick}
                // isSaved={handleIsSaved(movieInfo)}
                isMoviesSavedPage={isMoviesSavedPage} />))}

          </ul>
          <div className="cards__button-container">
            <button className="cards__button" type="button" onClick={displayElements}>Ещё</button>
          </div>
        </>
      )}


    </section>
  )
}

export default MoviesCardList;
