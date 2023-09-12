function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__containers">
        <p className="footer__container_text">
          © 2023
        </p>
        <div className="footer__container">
          <a
            className="footer__container_link"
            href="https://practicum.yandex.ru">
            Яндекс.Практикум
          </a>
          <a
            className="footer__container_link"
            href="https://github.com/SuhLinda">
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
