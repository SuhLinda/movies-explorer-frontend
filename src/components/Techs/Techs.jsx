function Techs() {
  return (
    <section
      className="techs"
      id="techc">
      <h2 className="techs__title">
        Технологии
      </h2>
      <h3 className="techs__subtitle">
        7 технологий
      </h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <div className="techs__container">
        <ul className="lists">
          <li className="lists__item">
            <p className="lists__text">
              HTML
            </p>
          </li>
          <li className="lists__item">
          <p className="lists__text">
              CSS
            </p>
          </li>
          <li className="lists__item">
            <p className="lists__text">
              JS
            </p>
          </li>
          <li className="lists__item">
            <p className="lists__text">
              React
            </p>
          </li>
          <li className="lists__item">
            <p className="lists__text">
              Git
            </p>
          </li>
          <li className="lists__item">
            <p className="lists__text">
              Express.js
            </p>
          </li>
          <li className="lists__item">
            <p className="lists__text">
              mongoDB
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;
