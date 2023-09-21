import { Link } from 'react-router-dom';
import Footer from '../../Footer/Footer.jsx';

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
              to='https://suhlinda.github.io/how-to-learn/'
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
              to='https://suhlinda.github.io/russian-travel'
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
              to='https://github.com/SuhLinda/react-mesto-api-full-gha'
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
