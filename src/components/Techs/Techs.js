import React from "react";
import "./Techs.css";

function Techs() {
  const stackTechs = ["HTML", "CSS", "JS", "React", "Git", "Express.js", "mongoDB"];
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__list">
          {stackTechs.map((element, index) => (<li key={index} className="techs__list-item">{element}</li>))}
        </ul>
      </div>
    </section>
  );
}

export default Techs;
