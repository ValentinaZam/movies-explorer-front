import React, { useState } from "react"
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
  onSubmit
}) {

  // const [formValue, setFormValue] = useState({
  //   name: "",
  //   email: "",
  //   password: ""
  // })
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(formValue)
  //   onSubmit(formValue)
  // }


  return (
    <div className="form">
      <Link to="/" className="form__logo">
        <img src={logo} alt="логотип cайта" />
      </Link>
      <h1 className="form__title">{title}</h1>
      <form className="form__container" noValidate onSubmit={onSubmit}>
        <div>{children}</div>
        <button
          type="submit"
          className="form__button-save"
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
