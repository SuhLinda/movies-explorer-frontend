import { Link, useLocation } from 'react-router-dom';
import useClosePopup from '../../hooks/useClosePopup.jsx';

function BurgerMenu({ isOpen, onClose }) {
  const location = useLocation().pathname;

  useClosePopup(isOpen, onClose);

  return (
    <section className={`burger-menu ${isOpen ? 'burger-menu_opened' : ""}`}>
      <div className="burger-menu__container">
        <button
          className="burger-menu__button-close"
          id="burger-menu__button-close"
          aria-label="close"
          type="button"
          onClick={onClose}>
        </button>
        <div className="burger-menu__links">
          <Link
            to='/'
            className={location === '/' ? 'burger-menu__link_active' : 'burger-menu__link'}>
            Главная
          </ Link>
          <Link
            to='/movies'
            className={location === '/movies' ? 'burger-menu__link_active' : 'burger-menu__link'}>
            Фильмы
          </ Link>
          <Link
            to='/saved-movies'
            className={location === '/saved-movies' ? 'burger-menu__link_active' : 'burger-menu__link'}>
            Сохранённые фильмы
          </ Link>
        </div>
        <Link
          to='/profile'>
          <button
            className="burger-menu__button"
            id="navigation__profile-button"
            type="button"
            aria-label="open">
          </button>
        </ Link>
      </div>
    </section>
  )
}

export default BurgerMenu;
