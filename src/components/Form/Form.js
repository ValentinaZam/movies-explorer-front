import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"
import logo from "../../images/logo.svg"

function Form({
  linkText,
  link,
  children,
  title,
  buttonText,
  question,
  onSubmit,
  isValid
}) {

  return (
    <div className="form">
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип cайта" />
      </Link>
      <h1 className="form__title">{title}</h1>
      <form className="form__container" noValidate onSubmit={onSubmit}>
        <div className="form__labels">{children}</div>
        <button
          type="submit"
          className={isValid ? "form__button-save" : "form__button-save_active"}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link">
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default Form
