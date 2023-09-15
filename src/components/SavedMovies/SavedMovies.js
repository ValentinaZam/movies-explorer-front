import React, { useEffect, useState } from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"

function SavedMovies({ loggedIn, filterShortMovies, filterMoviesByName, savedMovies, onDeleteMovie }) {
  const [searchText, setSearchText] = useState("");
  const [filterMovies, setFilterMovies] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [text, setText] = useState("");

  const handleCheckbox = () => {
    if (savedMovies) {
      setIsShortMovie(!isShortMovie);
    }
  };

  const handleSearchMovies = async (req) => {
    if (savedMovies) {
      setSearchText("");
      setFilterMovies(filterMoviesByName(savedMovies, req));
      setText(req);
    }
  };

  const handleDelete = ({ _id: id }) => {
    onDeleteMovie(id)
  }

  useEffect(() => {
    if (savedMovies) {
      const moviesVisible = filterMoviesByName(savedMovies, text);
      if (moviesVisible.length === 0) {
        setSearchText("Ничего не найдено");
      }
      setFilterMovies(

        isShortMovie ? filterShortMovies(moviesVisible) : moviesVisible
      );
      return;
    }
    setSearchText("И тут");
  }, [filterMoviesByName, filterShortMovies, isShortMovie, savedMovies, text]);

  return (
    <div className="movies">
      <Header isAuth={loggedIn} />
      <main>
        <SearchForm onChange={handleCheckbox} onSubmit={handleSearchMovies} isShortMovie={isShortMovie} />
        <MoviesCardList movies={filterMovies}
          searchText={searchText} onClick={handleDelete} />
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;
