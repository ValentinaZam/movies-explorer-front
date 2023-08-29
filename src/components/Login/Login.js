import React, { useState } from "react"
import "../Form/Form.css"
import Form from "../Form/Form"

function Login({ onSubmit }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
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
          title="Рады видеть!"
          buttonText="Войти"
          question="Еще не зарегистрированы?"
          linkText=" Регистрация"
          link="/signup"
          onSubmit={handleSubmit}
        >
          <label className="form__label">
            E-mail
            <input
              name="email"
              className="form__input"
              type="email"
              required
              placeholder="Почта"
              minLength="4"
              maxLength="40"
              onChange={handleChangeLogged}
            />
            {/* <span className="form__input-error">Адрес электронной почты введён не верно.</span> */}
          </label>
          <label className="form__label">
            Пароль
            <input
              name="password"
              className="form__input"
              type="password"
              required
              placeholder="Пароль"
              minLength="6"
              maxLength="20"
              onChange={handleChangeLogged}
            />
            {/* <span className="form__input-error">Введите пароль</span> */}
          </label>
        </Form>
      </section>
    </main>
  )
}

export default Login
