import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__container">
        <p className="footer__author">
          {" "}
          © 2023
        </p>
        <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">
          Яндекс.Практикум
        </a>
        <a
          href="https://github.com/ValentinaZam"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  );
}

export default Footer;
