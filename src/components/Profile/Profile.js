import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import { validator } from "../Validator/validator"

function Profile({ signOut, loggedIn, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [errors, setErrors] = useState({});
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const isValidate = Object.keys(errors).length === 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && value !== currentUser.name) {
      setIsProfileChanged(true);
    } else if (name === "email" && value !== currentUser.email) {
      setIsProfileChanged(true);
    } else if (name === "name" && value === currentUser.name) {
      setIsProfileChanged(false); // Пользователь вернулся к первоначальному имени
    } else if (name === "email" && value === currentUser.email) {
      setIsProfileChanged(false); // Пользователь вернулся к первоначальной почте
    }
    if (name === "name") {
      setName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
  };


  const handleEditClick = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) return;
    onSubmit({ name: name, email: email });
    // setIsProfileChanged(false);
  };

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [currentUser])

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      isName: {
        message: "Допустимы: латиница, кириллица, пробел, дефис"
      },
      min: {
        message: "Имя должно содержать минимум 2 символа",
        value: 2
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    }
  };

  const validate = () => {
    const errors = validator({ name: name, email: email }, validatorConfig)
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [name, email]);


  return (
    <div className="profile">
      <Header isAuth={loggedIn} />
      <main>
        <section className="profile__container">
          <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
          <form id="form" className="profile__form">
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
                autoComplete="off"
                onChange={handleInputChange}
                value={name}

              />
              <span className="profile__input-error">{errors.name}</span>
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
                autoComplete="off"
                value={email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <span className="profile__input-error">{errors.email}</span>
            </label>
            <button type="button" className={isValidate && isProfileChanged ? "profile__button-save" : "profile__button-save_active"} onClick={handleEditClick}>
              Редактировать
            </button>
            <Link className="profile__exit" to="/" onClick={signOut}>
              Выйти из аккаунта
            </Link>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Profile;
