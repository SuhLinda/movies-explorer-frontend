import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Portfolio() {
  return (
    <>
      <section className="portfolio">
        <h3 className="portfolio__title">
          Портфолио
        </h3>
        <ul className="portfolio__container">
          <li className="portfolio__container_links">
            <Link
              to='https://suhlinda.github.io/how-to-learn/'
              className="portfolio__container_link">
              Статичный сайт
              <span className="portfolio__container_copyright">
                ↗
              </span>
            </ Link>
          </li>
          <li className="portfolio__container_links">
            <Link
              to='https://suhlinda.github.io/russian-travel'
              className="portfolio__container_link">
              Адаптивный сайт
              <span className="portfolio__container_copyright">
                ↗
              </span>
            </ Link>
          </li>
          <li className="portfolio__container_links">
            <Link
              to='https://github.com/SuhLinda/react-mesto-api-full-gha'
              className="portfolio__container_link">
              Одностраничное приложение
              <span className="portfolio__container_copyright">
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
