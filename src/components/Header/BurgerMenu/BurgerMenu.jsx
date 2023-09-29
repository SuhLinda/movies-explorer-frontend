import { Link, useLocation } from 'react-router-dom';

import useClosePopup from '../../../hooks/useClosePopup.jsx';

function BurgerMenu({ isOpen, onClose }) {
  const location = useLocation().pathname;

  useClosePopup(isOpen, onClose);

  return (
    <section className={`burger-menu ${isOpen ? 'burger-menu_opened' : ''}`}>
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
            className={location === '/' ? 'link-active' : 'link'}>
            <h2 className="link-title">
              Главная
            </h2>
          </ Link>
          <Link
            to='/movies'
            className={location === '/movies' ? 'link-active' : 'link'}>
            <h2 className="link-title">
              Фильмы
            </h2>
          </ Link>
          <Link
            to='/saved-movies'
            className={location === '/saved-movies' ? 'link-active' : 'link'}>
            <h2 className="link-title">
              Сохранённые фильмы
            </h2>
          </ Link>
        </div>
        <Link
          to='/profile'
          className="burger-menu__button-edit" />
      </div>
    </section>
  )
}

export default BurgerMenu;
