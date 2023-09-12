import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx';

function Navigation({ loggedIn }) {
  const location = useLocation().pathname;
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  function handleBurgerMenuClick() {
    setBurgerMenuOpen(true)
  }

  function closeBurgerMenuClick() {
    setBurgerMenuOpen(false);
  }

  return (
    <nav className="navigation">
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        onClose={closeBurgerMenuClick}
      />
      <button
        className="navigation__button_burger-menu"
        type="button"
        id="burger-menu_open"
        aria-label="open menu"
        onClick={handleBurgerMenuClick}>
      </button>
      {loggedIn ? (
        <>
          <ul className="navigation__links">
            <div className="navigation__links_container">
              <Link
                to='/movies'
                className={location === '/movies' ? 'navigation__link_active' : 'navigation__link'}>
                Фильмы
              </ Link>
              <Link
                to='/saved-movies'
                className={location === '/saved-movies' ? 'navigation__link_active' : 'navigation__link'}>
                Сохранённые фильмы
              </ Link>
            </div>
          </ul>
          <Link
            to='/profile'
            className="navigation__link">
            <button
              className="navigation__profile"
              id="navigation__profile-button"
              type="button"
              aria-label="login">
            </button>
          </ Link>
        </>
      ) : (
        <>
          <ul className="navigation__auth">
            <Link
              to='/signup'
              className="navigation__registration">
              Регистрация
            </ Link>
          </ul>
          <Link to='/signin'>
            <button
              className="navigation__button-entrance"
              id="button_entrance"
              type="button"
              aria-label="open">
              <p className="navigation__button-entrance_text">
                Войти
              </p>
            </button>
          </ Link>
        </>
      )}
    </nav>
  )
}

export default Navigation;
