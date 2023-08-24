import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/logo.svg";
import icon_main_acc from "../../images/profile-auth-header.svg";
import icon_menu from "../../images/icon_menu_open.svg"
import Menu from "../Menu/Menu";
import icon_header_acc from "../../images/profile.svg"

function Header({ isAuth }) {
    const location = useLocation();
    const [isClicked, setIsClicked] = useState(false)

    // Временные переменные и функции для разного отображения элементов в зависимости от авторизации и путей

    const headerSecond = () => {
        const { pathname } = location
        return (
            pathname === "/movies" ||
            pathname === "/saved-movies" ||
            pathname === "/profile"
        )
    }

    function handleOpenMenu() {
        setIsClicked(true)
    }

    function handleCloseMenu() {
        setIsClicked(false)
    }

    const backgroundColorStyle = {
        backgroundColor: headerSecond() ? '#202020' : '#073042'
    };

    return (<> {!isAuth && (<header className="header" style={backgroundColorStyle}>
        <Link className="header__logo header__button" to="/">
            <img src={headerLogo} alt="Логотип" />
        </Link>
        <div className="header__button-container">
            <Link className="header__link-reg header__button" to="/signup">
                Регистрация
            </Link>

            <Link className="header__link-signin header__button" to="/signin">
                Войти
            </Link>
        </div>
    </ header >)}
        {isAuth && (<header className="header" style={backgroundColorStyle}>
            <Link className="header__button-container" to="/">
                <img src={headerLogo} alt="Логотип" />
            </Link>
            <div className="header__button-container--active">
                <NavLink className={location.pathname === "/movies" ? "header__button-active" : "header__link"}
                    to="/movies">Фильмы</NavLink>
                <NavLink className={location.pathname === "/saved-movies" ? "header__button-active" : "header__link"}
                    to="/saved-movies">Сoхранённые фильмы</NavLink>
            </div>
            <Link className="header__button-account header__button" to="/profile">
                <img className="header__account-image" src={location.pathname === "/" ? icon_main_acc : icon_header_acc} alt="Кнопка аккаунт" style={backgroundColorStyle} />
            </Link>
            <button className="header__menu" onClick={handleOpenMenu} type="button"><img className="header__button" src={icon_menu} alt="Mеню" /></button>
            {isClicked ? <Menu handleClose={handleCloseMenu} /> : ""}
        </header>)}

    </>
    )
}


export default Header;
