import React, { useState } from "react"
import "../Form/Form.css"
import Form from "../Form/Form"

function Register({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleChangeLogged = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formValue)
  }


  return (
    <main>
      <section>
        <Form
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          question="Уже зарегистрированы?"
          linkText=" Войти"
          link="/signin"
          onSubmit={handleSubmit}
        >
          <label className="form__label">
            Имя
            <input
              name="name"
              className="form__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="Имя"
              onChange={handleChangeLogged}
            />
          </label>
          <label className="form__label">
            E-mail
            <input
              name="email"
              className="form__input"
              id="email-input"
              type="email"
              required
              placeholder="Почта"
              minLength="4"
              maxLength="40"
              onChange={handleChangeLogged}
            />
          </label>
          <label className="form__label">
            Пароль
            <input
              name="password"
              className="form__input"
              style={{ color: '#EE3465' }}
              id="password-input"
              type="password"
              required
              placeholder="Пароль"
              minLength="6"
              maxLength="20"
              onChange={handleChangeLogged}
            />
            <span className="form__input-error">Что-то пошло не так...</span>
          </label>
          <span className="form__input-error form__input-error_general">При регистрации пользователя произошла ошибка.</span>
        </Form>
      </section>
    </main>
  )
}

export default Register
