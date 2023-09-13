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
          <fieldset className="profile__form_fieldset">
            <span className="profile__form_signature">
              Имя
            </span>
            <input
              className="profile__form_input"
              type="text"
              id="profile-name"
              name="profile-name"
              value={name || ""}
              onChange={handleChangeName}
            />
            <span className="profile__form_border"></span>
            <span className="profile__form_signature">
              E-mail
            </span>
            <input
              className="profile__form_input"
              type="email"
              id="profile-email"
              name="profile-email"
              value={email || ""}
              onChange={handleChangeEmail}
            />
          </fieldset>
        </form>
        <button
          className="profile__form_button-edit"
          type="submit"
          aria-label="edit">
          Редактировать
        </button>
        <button
          className="profile__form_button-exit"
          type="submit"
          aria-label="logOut">
          Выйти из аккаунта
        </button>
      </section>
    </>
  )
}

export default Profile;
