import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation.jsx';

import headerLogo from '../../images/header__logo.svg';

function Header() {

  return (
    <header className="header">
      <Link to='/'>
        <img
          className="header__logo"
          src={headerLogo}
          alt="logo"/>
      </ Link>
      <Navigation />
    </header>
  )
}

export default Header;
