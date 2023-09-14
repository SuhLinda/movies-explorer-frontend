import { useState } from 'react';
import Header from '../Header/Header.jsx';
import InfoTooltip from "../InfoTooltip/InfiTooltip";

function Profile({ isSuccess }) {
  const [name, setName] = useState('Имя');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
/*
  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }*/

  function closeInfoTooltip() {
    setInfoTooltipOpen(false);
  }

  return (
    <>
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
      <Header/>
      <section className="profile">
        <h2 className="profile__title">
          Привет, Линда!
        </h2>
        <form className="profile__form">
          <fieldset className="profile__fieldset">
            <label className="profile__signature">
              Имя
            </label>
            <input
              className="profile__input"
              type="text"
              id="profile-name"
              name="profile-name"
              value={name || ""}
              required
              onChange={handleChangeName}
            />
            <span className="profile__border"></span>
            <label className="profile__signature">
              E-mail
            </label>
            <input
              className="profile__input"
              type="email"
              id="profile-email"
              name="profile-email"
              value={email || ""}
              required
              onChange={handleChangeEmail}
            />
          </fieldset>
        </form>
        <button
          className="profile__button-edit"
          type="submit"
          aria-label="edit">
          Редактировать
        </button>
        <button
          className="profile__button-exit"
          type="submit"
          aria-label="logOut">
          Выйти из аккаунта
        </button>
      </section>
    </>
  )
}

export default Profile;
