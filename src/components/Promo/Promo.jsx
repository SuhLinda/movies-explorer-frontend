import Header from '../Header/Header.jsx';

function Promo() {
  return (
    <>
      <Header/>
      <section className="promo">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <nav>
          <ul className="promo__navigation">
            <li className="promo__links">
              <a
                className="promo__links_link"
                href="#about-project">
                <p className="promo__links_text">
                  О проекте
                </p>
              </a>
            </li>
            <li className="promo__links">
              <a
                className="promo__links_link"
                href="#techc">
                <p className="promo__links_text">
                  Технологии
                </p>
              </a>
            </li>
            <li className="promo__links">
              <a
                className="promo__links_link"
                href="#about-me">
                <p className="promo__links_text">
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
