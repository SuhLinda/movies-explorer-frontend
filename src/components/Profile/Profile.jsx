import {useContext, useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.jsx';
import Header from '../Header/Header.jsx';
import useFormValidation from '../../hooks/useFormValidation.jsx';
import {mainApi} from '../../utils/MainApi.jsx';
import {Link} from "react-router-dom";
import imageInfoTooltipSuccess from "../../images/info-tooltip_successfully.svg";
import imageInfoTooltipUnSuccess from "../../images/info-tooltip_unsuccessfully.svg";

function Profile({ setCurrentUser,openInfoTooltip, setImage, setText, isLoggedIn, setIsLoggedIn}) {
  const currentUser = useContext(CurrentUserContext);

  const {
    values,
    errors,
    isValid,
    handleChangeForm,
    resetFormValues,
  } = useFormValidation();

  const checkingValues = (!isValid || (currentUser.name === values.name && currentUser.email === values.email))

  useEffect(() => {
    mainApi.getUserMe()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
  }, [isLoggedIn]);

  async function onProfile({name, email}) {
    try {
      const newUser = await mainApi.updateProfile(name, email)
      if (newUser) {
        setCurrentUser(newUser)
        setIsLoggedIn(true)
        setImage(imageInfoTooltipSuccess);
        setText('Изменения успешно сохранены!');
      }
    } catch (res) {
      setIsLoggedIn(false)
      setImage(imageInfoTooltipUnSuccess);
      setText('Что-то пошло не так! Попробуйте ещё раз!');
      console.log(`ошибка: ${res}`);
    } finally {
      openInfoTooltip()
    }
  }

  async function handleSubmitProfile(evt) {
    evt.preventDefault();

    await onProfile({
      name: values.name,
      email: values.email,
    })
  }

  async function logOut() {
    try {
      const userLogOut = await mainApi.logout()
      if (userLogOut) {
        setCurrentUser({});
        setIsLoggedIn(false);
        localStorage.clear();
      }
    } catch (res) {
      console.log(`ошибка: ${res}`);
    }
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}/>
      <section className="profile">
        <h2 className="profile__title">
          Привет, {currentUser.name || 'имя'}!
        </h2>
        <form className="profile__form" onSubmit={handleSubmitProfile}>
          <fieldset className="profile__fieldset">
            <div className="profile__container">
              <label className="profile__signature">
                Имя
              </label>
              <input
                className="profile__input"
                type="text"
                id="name"
                name="name"
                minLength="2"
                maxLength="30"
                placeholder="имя"
                value={values.name || ""}
                required
                onChange={handleChangeForm}
              />
              <span className="profile__error-active">{errors.name}</span>
            </div>
            <span className="profile__border"></span>
            <div className="profile__container">
              <label className="profile__signature">
                E-mail
              </label>
              <input
                className="profile__input"
                type="email"
                id="email"
                name="email"
                placeholder="email"
                value={values.email || ""}
                required
                onChange={handleChangeForm}
              />
              <span className="profile__error-active">{errors.email}</span>
            </div>
          </fieldset>
          <button
            className={`profile__button-edit ${isValid ? 'profile__button-edit_active' : ''}`}
            type="submit"
            aria-label="edit"
            disabled={checkingValues}>
            Редактировать
          </button>
          <Link
            to='/'
            className="profile__link-exit"
            onClick={logOut}>
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  )
}

export default Profile;
