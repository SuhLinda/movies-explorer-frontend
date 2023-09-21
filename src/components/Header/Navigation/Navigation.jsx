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
        className="navigation__button-burger"
        type="button"
        id="burger-menu_open"
        aria-label="open menu"
        onClick={handleBurgerMenuClick}>
      </button>
      {loggedIn ? (
        <>
          <div className="navigation__links_container">
            <Link
              to='/movies'
              className={location === '/movies' ? 'link_active' : 'link'}>
              Фильмы
            </ Link>
            <Link
              to='/saved-movies'
              className={location === '/saved-movies' ? 'link_active' : 'link'}>
              Сохранённые фильмы
            </ Link>
          </div>
          <Link
            to='/profile'
            className="link navigation__profile" />
        </>
      ) : (
        <>
          <Link
            to='/signup'
            className="navigation__registration">
            Регистрация
          </ Link>
          <Link
            to='/signin'
            className="navigation__login">
            Войти
          </ Link>
        </>
      )}
    </nav>
  )
}

export default Navigation;
