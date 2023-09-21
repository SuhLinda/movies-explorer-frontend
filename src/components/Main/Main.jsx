import Promo from './Promo/Promo.jsx';
import AboutProject from './AboutProject/AboutProject.jsx';
import Techs from './Techs/Techs.jsx';
import AboutMe from './AboutMe/AboutMe.jsx';
import Portfolio from './Portfolio/Portfolio.jsx';

function Main({isLoggedIn}) {

  return (
    <main>
      <Promo
        isLoggedIn={isLoggedIn}
      />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  )
}

export default Main;
