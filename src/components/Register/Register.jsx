import React from 'react';

import { Link } from 'react-router-dom';

import useFormValidation from '../../hooks/useFormValidation.jsx';

import { mainApi } from '../../utils/MainApi.jsx';

import headerLogo from '../../images/header__logo.svg';
import imageInfoTooltipSuccess from '../../images/info-tooltip_successfully.svg';
import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

function Register(
  {
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    setImage,
    setText,
    navigate,
    openInfoTooltip,
  }) {
  const {
    values,
    errors,
    isValid,
    handleChangeForm,
  } = useFormValidation();

  async function onRegister({ name, email, password, _id }) {
    try {
      const userRegistration = await mainApi.registration(name, email, password, _id);
      if (userRegistration) {
        setCurrentUser(userRegistration);
        setIsLoggedIn(true);
        setImage(imageInfoTooltipSuccess);
        setText('Вы успешно зарегистрировались!');
        navigate('/movies', {replace: true});
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn = true));
      }
    } catch (res) {
      setIsLoggedIn(false);
      setImage(imageInfoTooltipUnSuccess);
      setText('Что-то пошло не так! Попробуйте ещё раз!');
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
      _id: values._id,
    })
  }

  return (
    <section className="register">
      <Link to='/'>
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
          to='/signin'
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
