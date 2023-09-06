import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ loggedIn, filterShortMovies, filterMoviesByName, handleChange }) {
  // const [movies, setMovies] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isShortMovie, setIsShortMovie] = useState();
  const allMovies = JSON.parse(localStorage.getItem("allMovies")) ?? [];
  const [filterMovies, setFilterMovies] = useState([]);


  const handleFilterMovies = (movies, request, isShort) => {
    const filteredFilms = filterMoviesByName(movies, request);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredFilms));
    if (!filteredFilms.length) {
      setSearchText("Ничего не найдено");
    }
    setFilterMovies(
      isShort ? filterShortMovies(filteredFilms) : filteredFilms
    );
  };

  const handleCheckBox = () => {
    setIsShortMovie(!isShortMovie);
  };


  const findMovie = (req, isShort) => {

    setIsLoading(true);
    setSearchText("");
    if (!allMovies.length) {
      moviesApi
        .getInitialMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          handleFilterMovies(movies, req, isShort);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(`Ошибка: ${error}`);
          setIsLoading(false);
          setSearchText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        });
    } else {
      handleFilterMovies(allMovies, req, isShort);
      setIsLoading(false);
    }

    // localStorage.setItem("request", req);
    // localStorage.setItem("isShortMovie", isShort);
  };

  useEffect(() => {
    // setIsLoading(true);
    const defaultMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    if (defaultMovies) {
      if (defaultMovies.length !== 0) {
        // setIsShortMovie(JSON.parse(localStorage.getItem("isShortMovie")));
        setFilterMovies(
          isShortMovie ? filterShortMovies(defaultMovies) : defaultMovies
        );
      } else {
        setSearchText("Ничего не найдено");
      }
    }
    setIsLoading(false);
  }, [filterShortMovies, isShortMovie]);

  return (<div className="movies">
    {/* {!isLoading && <Preloader />} */}
    <Header isAuth={loggedIn} />
    <main>
      <SearchForm onSubmit={findMovie} handleChange={handleChange} isShortMovie={isShortMovie} />
      <MoviesCardList movies={filterMovies}

        searchText={searchText}

      />
    </main>
    <Footer />
  </div>
  );
}

export default Movies;
