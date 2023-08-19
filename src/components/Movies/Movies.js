import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const [movies, setMovies] = useState(false)
  return (<section className="movies">
    {movies && <Preloader />}
    <SearchForm />
    <MoviesCardList />
    <Footer />
  </section>
  );
}

export default Movies;
