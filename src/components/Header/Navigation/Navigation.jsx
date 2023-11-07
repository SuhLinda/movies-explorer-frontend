import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';

import { SIGNUP, SIGNIN, MOVIES_PAGE, SAVED_MOVIES_PAGE, PROFILE_PAGE } from '../../../utils/constants.jsx';

function Navigation({ isLoggedIn }) {
  const location = useLocation().pathname;
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  function handleBurgerMenuClick() {
    setBurgerMenuOpen(true);
  }

  function closeBurgerMenuClick() {
    setBurgerMenuOpen(false);
  }

  return (
    <nav className="navigation">
      {isLoggedIn ? (
        <>
          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onClose={closeBurgerMenuClick}
          />
          <button
            className="navigation__button-burger"
            type="button"
            id="burger-menu_open"
            aria-label="openMenu"
            onClick={handleBurgerMenuClick}>
          </button>
          <div className="navigation__links_container">
            <Link
              to={MOVIES_PAGE}
              className={location === MOVIES_PAGE ? 'link_active' : 'link'}>
              Фильмы
            </ Link>
            <Link
              to={SAVED_MOVIES_PAGE}
              className={location === SAVED_MOVIES_PAGE ? 'link_active' : 'link'}>
              Сохранённые фильмы
            </ Link>
          </div>
          <Link
            to={PROFILE_PAGE}
            className="link navigation__profile" />
        </>
      ) : (
        <>
          <Link
            to={SIGNUP}
            className="navigation__registration">
            Регистрация
          </ Link>
          <Link
            to={SIGNIN}
            className="navigation__login">
            Войти
          </ Link>
        </>
      )}
    </nav>
  )
}

export default Navigation;
