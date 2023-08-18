import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../images/logo_header.svg";
import icon_main_acc from "../../images/profile.svg";
import icon_menu from "../../images/icon_menu_open.svg"
import Menu from "../Menu/Menu";

function Header() {
    const location = useLocation();
    const [isClicked, setIsClicked] = useState(false)

    function handleOpenMenu() {
        setIsClicked(true)
    }

    function handleCloseMenu() {
        setIsClicked(false)
    }


    return (location.pathname === "/" ? (<header className="header" >
        <Link className="header__logo header__button" to="/">
            <img src={headerLogo} alt="Логотип" />
        </Link>
        <div className="header__button-container">
            <Link className="header__link-reg header__button" to="/sign-up">
                Регистрация
            </Link>

            <Link className="header__button-container" to="/sign-in">
                <button className="header__button-signin header__button">Войти</button>
            </Link>
        </div>
    </header>) : (<header className="header-main">
        <Link className="header__button-container" to="/">
            <img src={headerLogo} alt="Логотип" />
        </Link>
        <div className="header__button-container-active">
            <NavLink className={location.pathname === "/movies" ? "header__button_active" : "header__link"} to="/movies">Фильмы</NavLink>
            <NavLink className={location.pathname === "/saved-movies" ? "header__button_active" : "header__link"}
                to="/saved-movies">Сoхранённые фильмы</NavLink>
        </div>
        <Link className="header__button-account header__button" to="/profile">
            <img className="header__account-image" src={icon_main_acc} alt="Кнопка аккаунт" />
        </Link>
        <button className="header__menu" onClick={handleOpenMenu}><img className="header__button" src={icon_menu} alt="Mеню" /></button>
        {isClicked ? <Menu handleClose={handleCloseMenu} /> : ""}
    </header>)
    )
}


export default Header;
