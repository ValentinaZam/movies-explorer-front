import React, { useEffect, useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import { moviesApi } from "../../utils/MoviesApi";

function Movies({ loggedIn, filterShortMovies, filterMoviesByName, savedMovies, onSaveMovies, onDeleteMovie }) {

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const checkIsShotMovies =
    JSON.parse(localStorage.getItem("isShortMovie")) ?? false;
  const [isShortMovie, setIsShortMovie] = useState(checkIsShotMovies);
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
    localStorage.setItem("isShortMovie", JSON.stringify(!isShortMovie));
  };


  const findMovie = (req, isShortCheck) => {
    setIsLoading(true);
    setSearchText("");
    if (!allMovies.length) {
      moviesApi
        .getInitialMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          handleFilterMovies(movies, req, isShortCheck);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setIsLoading(false);
          setSearchText("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
        });
    } else {
      handleFilterMovies(allMovies, req, isShortCheck);
      setIsLoading(false);
    }
    localStorage.setItem("request", req);
    localStorage.setItem("isShortMovie", isShortCheck);
  };

  useEffect(() => {
    setIsLoading(true);
    const defaultMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    if (defaultMovies) {
      if (defaultMovies.length !== 0) {
        setIsShortMovie(JSON.parse(localStorage.getItem("isShortMovie")));
        setFilterMovies(
          isShortMovie ? filterShortMovies(defaultMovies) : defaultMovies
        );
      } else {
        setSearchText("Ничего не найдено");
      }
    }
    setIsLoading(false);
  }, [filterShortMovies, isShortMovie]);


  const handleClickMovie = (movie) => {
    const movieDelete = savedMovies.find(
      (savedFilm) => savedFilm.movieId === movie.id
    );
    if (movieDelete) {
      onDeleteMovie(movieDelete._id);
      return;
    }
    onSaveMovies(movie);
  };

  return (<div className="movies">
    <Header isAuth={loggedIn} />
    <main>
      <SearchForm onSubmit={findMovie} onChange={handleCheckBox} isShortMovie={isShortMovie} />
      {isLoading && <Preloader />}
      <MoviesCardList movies={filterMovies}
        searchText={searchText} savedMovies={savedMovies} onClick={handleClickMovie} />
    </main>
    <Footer />
  </div>
  );
}

export default Movies;
