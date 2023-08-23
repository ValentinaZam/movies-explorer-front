import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";

function Movies() {
  const [movies, setMovies] = useState(true)
  return (<div className="movies">
    {!movies && <Preloader />}
    <Header isAuth={true} />
    <main>
      <SearchForm />
      <MoviesCardList />
    </main>
    <Footer />
  </div>
  );
}

export default Movies;
