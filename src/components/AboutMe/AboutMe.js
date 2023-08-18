import React from "react";
import avatar from "../../images/photo-me.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text-block">
          <h3 className="about-me__subtitle">Валентина</h3>
          <h4 className="about-me__info">Фронтенд-разработчик, 41 год</h4>
          <p className="about-me__description">
            Я живу в городе Пскове. У меня есть семья, дети, муж. Больше года занимаюсь разработкой сайтов и приложений,
            и это не просто работа, но и в том числе моё увлечение. И на данный момент ищу работодателя,
            который по заслугам оценит мои возможности, а я смогу воплощать свои идеи для развития его бизнеса.
          </p>
          <a
            href="https://github.com/ValentinaZam"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img src={avatar} alt="мое фото" className="about-me__photo" />
      </div>
    </section>
  );
}

export default AboutMe;
