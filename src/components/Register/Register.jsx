import React from 'react';

import { Link } from 'react-router-dom';

import useFormValidation from '../../hooks/useFormValidation.jsx';

import { mainApi } from '../../utils/MainApi.jsx';

import headerLogo from '../../images/header__logo.svg';
import imageInfoTooltipSuccess from '../../images/info-tooltip_successfully.svg';
import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

import {
  BASE_PAGE,
  SIGNIN,
  MOVIES_PAGE,
  IS_LOGGED_IN,
  SUCCESS_MESSAGE,
  UNSUCCESS_MESSAGE, SAVED_MOVIES,
} from '../../utils/constants.jsx';

function Register(
  {
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    setImage,
    setText,
    navigate,
    openInfoTooltip,
    savedMovies,
  }) {
  const {
    values,
    errors,
    isValid,
    handleChangeForm,
  } = useFormValidation();

  async function onRegister({name, email, password}) {
    try {
      const userRegistration = await mainApi.registration(name, email, password);
      if (userRegistration) {
        setCurrentUser(userRegistration);
        setIsLoggedIn(true);
        setImage(imageInfoTooltipSuccess);
        setText(SUCCESS_MESSAGE);
        navigate(MOVIES_PAGE, {replace: true});

        localStorage.setItem(IS_LOGGED_IN, JSON.stringify(isLoggedIn = true));
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies = []));
      }
    } catch (res) {
      setIsLoggedIn(false);
      setImage(imageInfoTooltipUnSuccess);
      setText(UNSUCCESS_MESSAGE);
      console.log(`ошибка: ${res}`);
    } finally {
      openInfoTooltip();
    }
  }

  function handleSubmitRegister(evt) {
    evt.preventDefault();

    return onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    })
  }

  return (
    <section className="register">
      <Link to={BASE_PAGE}>
        <img
          className="register__logo"
          src={headerLogo}
          alt="logo"
        />
      </ Link>
      <h2 className="register__title">
        Добро пожаловать!
      </h2>
      <form
        className="register__form"
        onSubmit={handleSubmitRegister}>
        <fieldset className="register__fieldset">
          <label className="register-form-signature">
            Имя
          </label>
          <input
            className="register__input"
            type="text"
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            value={values.name || ''}
            required
            onChange={handleChangeForm}
          />
          <span className="register__error-active">
            {errors.name}
          </span>
          <label className="register-form-signature">
            E-mail
          </label>
          <input
            className="register__input"
            type="email"
            id="email"
            name="email"
            value={values.email || ''}
            pattern="^[\w]+@[A-Za-z]+\.[A-Za-z]{2,30}$"
            required
            onChange={handleChangeForm}
          />
          <span className="register__error-active">
            {errors.email}
          </span>
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
            required
            onChange={handleChangeForm}
          />
          <span className="register__error-active">
            {errors.password}
          </span>
        </fieldset>
        <button
          className={`register__button ${isValid ? 'register__button_active' : ''}`}
          type="submit"
          aria-label="register"
          disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
      <p className="register__text">
        Уже зарегистрированы?
        <Link
          to={SIGNIN}
          className="register__link">
          <span className="register__signature">
            Войти
          </span>
        </ Link>
      </p>
    </section>
  )
}

export default Register;
