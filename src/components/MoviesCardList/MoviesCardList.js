import React, { useCallback, useEffect, useState } from "react"
import "./MoviesCardList.css"
import MoviesCard from "../MoviesCard/MoviesCard"
import { useLocation } from "react-router";

function MoviesCardList({ movies, searchText, onClick, savedMovies }) {
  const location = useLocation();
  const [visibleCards, setVisibleCards] = useState(4);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isMoviesSavedPage = location.pathname === "/saved-movies";

  const displayElements = () => {
    switch (true) {
      case windowWidth > 1023:
        setVisibleCards((prev) => prev + 4);
        break;
      case windowWidth >= 320 && windowWidth <= 1023:
        setVisibleCards((prev) => prev + 2);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    switch (true) {
      case windowWidth > 1023:
        setVisibleCards(16);
        break;
      case windowWidth <= 1023 && windowWidth > 750:
        setVisibleCards(8);
        break;
      case windowWidth >= 320 && windowWidth <= 1023:
        setVisibleCards(5);
        break;
      default:
        break;
    }
  }, [windowWidth])

  const handleResize = useCallback(() => {
    if (windowWidth !== window.innerWidth) {
      setWindowWidth(window.innerWidth);
    }
  }, [windowWidth]);

  useEffect(() => {
    let timer;
    const handleResizeWithDelay = () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        handleResize();
      }, 500);
    };

    window.addEventListener("resize", handleResizeWithDelay);

    return () => {
      window.removeEventListener("resize", handleResizeWithDelay);
    };
  }, [handleResize]);

  const handleIsLike = (movie) => {
    if (!isMoviesSavedPage) {
      const savedMovie = savedMovies.find((film) => film.movieId === movie.id);
      return !!savedMovie;
    }
    return true;
  };

  // const searchTextPage = () => {
  //   if (!searchText && isMoviesSavedPage) {
  //     return "Нет сохранённых фильмов"
  //   } else if (!searchText && !isMoviesSavedPage) {
  //     return "Нужно ввести ключевое слово"
  //   }else{
  //     return searchText
  //   }
  // }

  return (
    <section className="cards">
      {movies.length === 0 ? (<p className="cards__message">{searchText ? searchText : "Нужно ввести ключевое слово"}</p>) : (
        <>
          <ul className="cards__list">
            {movies.slice(0, visibleCards).map(movie => (
              <MoviesCard movie={movie}
                key={isMoviesSavedPage ? movie._id : movie.id}
                onClick={onClick}
                isLike={handleIsLike(movie)}
              />))}

          </ul>
          <div className="cards__button-container">
            {visibleCards < movies.length && <button className="cards__button" type="button" onClick={displayElements}>Ещё</button>}
          </div>
        </>
      )}


    </section>
  )
}

export default MoviesCardList;
