import React from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, onClick, isLike }) {
  const location = useLocation();
  const isMoviesSavedPage = location.pathname === "/saved-movies";
  const handleClick = () => {
    console.log(movie)
    // Здесь приходит id (НЕ _id)
    // if (isMoviesSavedPage) {
    //   onClick(movie.id)
    // } else {
    //   onClick(movie);
    // }
    onClick(movie)
  };

  function convertTime(number) {
    return `${Math.floor(number / 60)}ч ${number % 60}м`;
  }

  const movieImage = isMoviesSavedPage
    ? movie.image
    : `https://api.nomoreparties.co/${movie.image.url}`;

  const buttonImages = () => {
    if (location.pathname === "/movies") return (isLike ? "card__like-button--active" : "card__like-button");
    if (location.pathname === "/saved-movies") return "card__delete-button";
  }

  return (
    <>
      <li className="card">
        <a href={movie.trailerLink} target="_blank"
          rel="noreferrer">
          <img src={movieImage} alt={movie.nameRU} className="card__image" />
        </a>
        <div className="card__container">
          <div className="card__title-block">
            <h2 className="card__title">{movie.nameRU}</h2>
            <span className="card__time">{convertTime(movie.duration)}</span>
          </div>
          <button type="button" className={buttonImages()} onClick={handleClick}></button>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
