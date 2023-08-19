import React, { useState } from "react";
import imageFilm from "../../images/image-movies.jpg"
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

// Временная карточка

function MoviesCard() {
  const location = useLocation();
  // Временная функция по установке лайка
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const buttonImages = () => {
    if (location.pathname === "/movies") return (liked ? "card__like-button_active" : "card__like-button");
    if (location.pathname === "/saved-movies") return "card__delete-button";
  }

  return (
    <>
      <li className="card">
        <img src={imageFilm} alt="" className="card__image" />
        <div className="card__container">
          <div className="card__title-block">
            <h2 className="card__title">33 слова о дизайне</h2>
            <span className="card__time">120</span>
          </div>
          <button type="button" className={buttonImages()} onClick={toggleLike}></button>
        </div>
      </li>
    </>
  );
}

export default MoviesCard;
