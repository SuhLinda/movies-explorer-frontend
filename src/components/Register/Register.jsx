import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import InfoTooltip from "../InfoTooltip/InfiTooltip";

function Register({isSuccess}) {
  const {values, errors, handleChangeForm} = useFormValidation();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  return (
    <section className="register">
      {isSuccess ?
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
        /> :
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoTooltip}
        />
      }
      <Link to='/'>
        <img
          className="register__logo"
          src={headerLogo}
          alt="logo"/>
      </Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form">
        <fieldset className="register__form_fieldset">
          <label className="register__form_signature">Имя</label>
          <input
            className="register__form_input"
            type="text"
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            required
            onChange={handleChangeForm}
          />
          <label className="register__form_signature">E-mail</label>
          <input
            className="register__form_input"
            type="email"
            id="email"
            name="email"
            value={values.email || ''}
            required
            onChange={handleChangeForm}
          />
          <label className="register__form_signature">Пароль</label>
          <input
            className="register__form_input register__form_password"
            type="password"
            id="password"
            name="password"
            minLength="8"
            value={values.password || ''}
            required
            onChange={handleChangeForm}
          />
          <span className="register__form_error_active">{errors.name}</span>
          <span className="register__form_error_active">{errors.email}</span>
          <span className="register__form_error_active">{errors.password}</span>
        </fieldset>
      </form>
      <button
        className="register__button"
        type="submit"
        aria-label="register">
        Зарегистрироваться
      </button>
      <p className="register__text">
        Уже зарегистрированы?
        <Link to='/signin' className="register__link">
          <span className="register__signature">
            Войти
          </span>
        </Link>
      </p>
    </section>
  )
}

export default Register;
