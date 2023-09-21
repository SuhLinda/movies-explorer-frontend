import Header from '../../Header/Header.jsx';

function Promo({isLoggedIn}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
      />
      <section className="promo">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <nav>
          <ul className="promo__navigation">
            <li className="promo__navigation-links">
              <a
                className="promo__link"
                href="#about-project">
                <p className="promo__text">
                  О проекте
                </p>
              </a>
            </li>
            <li className="promo__navigation-links">
              <a
                className="promo__link"
                href="#techc">
                <p className="promo__text">
                  Технологии
                </p>
              </a>
            </li>
            <li className="promo__navigation-links">
              <a
                className="promo__link"
                href="#about-me">
                <p className="promo__text">
                  Студент
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Promo;
