import { Link, useLocation } from 'react-router-dom';

import useClosePopup from '../../../hooks/useClosePopup.jsx';

import { BASE_PAGE, MOVIES_PAGE, SAVED_MOVIES_PAGE, PROFILE_PAGE } from '../../../utils/constants.jsx';

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
            to={BASE_PAGE}
            className={location === BASE_PAGE ? 'link-active' : 'link'}>
            <h2 className="link-title">
              Главная
            </h2>
          </ Link>
          <Link
            to={MOVIES_PAGE}
            className={location === MOVIES_PAGE ? 'link-active' : 'link'}>
            <h2 className="link-title">
              Фильмы
            </h2>
          </ Link>
          <Link
            to={SAVED_MOVIES_PAGE}
            className={location === SAVED_MOVIES_PAGE ? 'link-active' : 'link'}>
            <h2 className="link-title">
              Сохранённые фильмы
            </h2>
          </ Link>
        </div>
        <Link
          to={PROFILE_PAGE}
          className="burger-menu__button-edit" />
      </div>
    </section>
  )
}

export default BurgerMenu;
