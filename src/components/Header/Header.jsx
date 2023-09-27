import { Link } from 'react-router-dom';

import Navigation from './Navigation/Navigation.jsx';

import headerLogo from '../../images/header__logo.svg';

function Header({ isLoggedIn }) {

  return (
    <header className="header">
      <Link to='/'>
        <img
          className="header__logo"
          src={headerLogo}
          alt="logo"
        />
      </ Link>
      <Navigation
        isLoggedIn={isLoggedIn}
      />
    </header>
  )
}

export default Header;
