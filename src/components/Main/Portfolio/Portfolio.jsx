import { Link } from 'react-router-dom';

import Footer from '../../Footer/Footer.jsx';

import { STATIC_WEBSITE, ADAPTIVE_WEBSITE, SINGLE_PAGE_APPLICATION } from '../../../utils/constants.jsx';

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio__title">
          Портфолио
        </h3>
        <ul className="portfolio__container">
          <li className="container-links">
            <Link
              to={STATIC_WEBSITE}
              className="container-link"
              target="_blank"
              rel="noreferrer">
              Статичный сайт
              <span className="container-copyright">
                ↗
              </span>
            </ Link>
          </li>
          <li className="container-links">
            <Link
              to={ADAPTIVE_WEBSITE}
              className="container-link"
              target="_blank"
              rel="noreferrer">
              Адаптивный сайт
              <span className="container-copyright">
                ↗
              </span>
            </ Link>
          </li>
          <li className="container-links">
            <Link
              to={SINGLE_PAGE_APPLICATION}
              className="container-link"
              target="_blank"
              rel="noreferrer">
              Одностраничное приложение
              <span className="container-copyright">
                ↗
              </span>
            </ Link>
          </li>
        </ul>
      </section>
      <Footer />
    </>
  )
}

export default Portfolio;
