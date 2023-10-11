import { Link } from 'react-router-dom';

import useFormValidation from '../../hooks/useFormValidation.jsx';

import { mainApi } from '../../utils/MainApi.jsx';

import headerLogo from '../../images/header__logo.svg';
import imageInfoTooltipSuccess from '../../images/info-tooltip_successfully.svg';
import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

import {
  SIGNUP,
  MOVIES_PAGE,
  IS_LOGGED_IN,
  SUCCESS_MESSAGE,
  UNSUCCESS_MESSAGE,
  BASE_PAGE,
} from '../../utils/constants.jsx';

function Login(
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

  async function onLogin({email, password}) {
    try {
      const userLogin = await mainApi.login(email, password);
      if (userLogin) {
        setCurrentUser(userLogin);
        setIsLoggedIn(true);
        setImage(imageInfoTooltipSuccess);
        setText(SUCCESS_MESSAGE);
        navigate(MOVIES_PAGE, {replace: true});

        localStorage.setItem(IS_LOGGED_IN, JSON.stringify(isLoggedIn = true));
      } else {
        setCurrentUser({});
        setIsLoggedIn(false);
        localStorage.setItem(IS_LOGGED_IN, JSON.stringify(isLoggedIn = false));
      }
    } catch (err) {
      setIsLoggedIn(false);
      setImage(imageInfoTooltipUnSuccess);
      setText(UNSUCCESS_MESSAGE);
      console.log(`ошибка: ${err}`);
    } finally {
      openInfoTooltip();
    }
  }

  function handleSubmitLogin(evt) {
    evt.preventDefault();

    return onLogin({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <section className="login">
      <Link to={BASE_PAGE}>
        <img
          className="register__logo"
          src={headerLogo}
          alt="logo"
        />
      </ Link>
      <h2 className="register__title">
        Рады видеть!
      </h2>
      <form
        className="register__form"
        onSubmit={handleSubmitLogin}>
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
            pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{2,30}$"
            onChange={handleChangeForm}
            required
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
            onChange={handleChangeForm}
            required
          />
          <span className="register__error-active">
            {errors.password}
          </span>
        </fieldset>
        <button
          className={`register__button login__button ${isValid ? 'register__button_active' : ''}`}
          type="submit"
          aria-label="login">
          Войти
        </button>
      </form>
      <p className="register__text">
        Ещё не зарегистрированы?
        <Link
          to={SIGNUP}
          className="register__link">
          <span className="register__signature">
            Регистрация
          </span>
        </ Link>
      </p>
    </section>
  )
}

export default Login;
