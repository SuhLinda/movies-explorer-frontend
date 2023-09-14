function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__containers">
        <p className="footer__text">
          © 2023
        </p>
        <div className="footer__container">
          <a
            className="footer-container-link"
            href="https://practicum.yandex.ru"
            target="_blank"
            rel="noreferrer">
            Яндекс.Практикум
          </a>
          <a
            className="footer-container-link"
            href="https://github.com/SuhLinda"
            target="_blank"
            rel="noreferrer">
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
