import React from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"

function SavedMovies() {
  return (
    <div className="movies">
      <Header isAuth={true} />
      <main>
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;
