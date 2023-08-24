import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Menu.css";
import icon_main_acc from "../../images/profile.svg";

function Menu({ handleClose }) {
    return (
        <div className="menu">
            <div className="menu__overlay-container"></div>
            <div className="menu__menu">
                <button
                    className="menu__close-button"
                    onClick={handleClose}
                    type="button"
                ></button>
                <nav className="menu__links">
                    <NavLink
                        exact
                        to="/"
                        className="menu__link"
                        activeClassName="menu__link_active"
                    >
                        Главная
                    </NavLink>
                    <NavLink
                        to="/movies"
                        className="menu__link"
                        activeClassName="menu__link_active"
                    >
                        Фильмы
                    </NavLink>
                    <NavLink
                        to="/saved-movies"
                        className="menu__link"
                        activeClassName="menu__link_active"
                    >
                        Сохранённые фильмы
                    </NavLink>
                </nav>
                <Link to="/profile" className="menu__account-button">
                    <img src={icon_main_acc} alt="Кнопка аккаунт" />
                </Link>
            </div>
        </div>
    );
}

export default Menu;