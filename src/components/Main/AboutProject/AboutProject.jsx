function AboutProject() {
  return (
    <section
      className="about-project"
      id="about-project">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <div className="about-project__container">
        <p className="container-title">
          Дипломный проект включал 5 этапов
        </p>
        <p className="container-subtitle">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="container-title">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="container-subtitle">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__period">
        <p className="period-title period-title-green">
          1 неделя
        </p>
        <p className="period-title period-title-grey">
          4 недели
        </p>
        <p className="period-subtitle">
          Back-end
        </p>
        <p className="period-subtitle">
          Front-end
        </p>
      </div>
    </section>
  )
}

export default AboutProject;
