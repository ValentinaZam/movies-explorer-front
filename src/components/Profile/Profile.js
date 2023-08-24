import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Profile() {

  return (
    <div className="profile">
      <Header isAuth={true} />
      <main>
        <section className="profile__container">
          <h1 className="profile__title">Привет, Валентина!</h1>
          <form id="form" className="profile__form" noValidate>
            <label className="profile__label">
              Имя
              <input
                name="name"
                className="profile__input"
                id="name-input"
                type="text"
                minLength="2"
                maxLength="40"
                required
                placeholder="Имя"
              />
              <span className="profile__input-error"></span>
            </label>

            <div className="profile__border"></div>
            <label className="profile__label">
              E-mail
              <input
                name="email"
                className="profile__input"
                id="email-input"
                type="email"
                required
                placeholder="Почта"
                minLength="4"
                maxLength="40"
              />
              <span className="profile__input-error"></span>
            </label>
            <button type="submit" className="profile__button-save">
              Редактировать
            </button>
            <Link className="profile__exit" to="/">
              Выйти из аккаунта
            </Link>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
