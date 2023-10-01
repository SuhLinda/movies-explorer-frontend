import { Link } from 'react-router-dom';

import useFormValidation from '../../hooks/useFormValidation.jsx';

import { mainApi } from '../../utils/MainApi.jsx';

import headerLogo from '../../images/header__logo.svg';
import imageInfoTooltipSuccess from '../../images/info-tooltip_successfully.svg';
import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

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

  async function onLogin({ email, password }) {
    try {
      const userLogin = await mainApi.login(email, password);
      if (userLogin) {
        setCurrentUser(userLogin);
        setIsLoggedIn(true);
        console.log(isLoggedIn)
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

  function handleSubmitLogin(evt) {
    evt.preventDefault();

    return onLogin({
      email: values.email,
      password: values.password,
    })
  }

  return (
    <section className="login">
      <Link to='/'>
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
          to='/signup'
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
