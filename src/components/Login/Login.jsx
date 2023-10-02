import { useState } from 'react';
import { Link } from 'react-router-dom';

import useFormValidation from '../../hooks/useFormValidation.jsx';
import InfoTooltip from "../InfoTooltip/InfiTooltip.jsx";

import headerLogo from '../../images/header__logo.svg';

function Login({ isSuccess = false }) {
  const {values, errors, handleChangeForm} = useFormValidation();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);


  /*function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }*/

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  return (
    <section className="login">
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
      </ Link>
      <h2 className="register__title">
        Рады видеть!
      </h2>
      <form className="register__form">
        <fieldset className="register__fieldset">
          <label className="register-form-signature">
            E-mail
          </label>
          <input
            className="register__input"
            type="email"
            id="email"
            name="email"
            value={values.email || ''}
            onChange={handleChangeForm}
            required
          />
          <label className="register-form-signature">
            Пароль
          </label>
          <input
            className="register__input register__password"
            type="password"
            id="password"
            name="password"
            minLength="8"
            value={values.password || ''}
            onChange={handleChangeForm}
            required
          />
          <span className="register__error-active">
            {errors.email}
          </span>
          <span className="register__error-active">
            {errors.password}
          </span>
        </fieldset>
      </form>
      <button
        className="register__button login__button"
        type="submit"
        aria-label="login">
        Войти
      </button>
      <p className="register__text">
        Ещё не зарегистрированы?
        <Link to='/signup' className="register__link">
          <span className="register__signature">
            Регистрация
          </span>
        </ Link>
      </p>
    </section>
  )
}

export default Login;
