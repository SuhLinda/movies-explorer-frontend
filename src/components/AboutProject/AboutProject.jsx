function AboutProject() {
  return (
    <section
      className="about-project"
      id="about-project">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <div className="about-project__container">
        <h2 className="about-project__container_title">
          Дипломный проект включал 5 этапов
        </h2>
        <p className="about-project__container_subtitle">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <h2 className="about-project__container_title">
          На выполнение диплома ушло 5 недель
        </h2>
        <p className="about-project__container_subtitle">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about-project__period">
        <p className="about-project__period_title about-project__period_title-green">
          1 неделя
        </p>
        <p className="about-project__period_title about-project__period_title-grey">
          4 недели
        </p>
        <p className="about-project__period_subtitle">
          Back-end
        </p>
        <p className="about-project__period_subtitle">
          Front-end
        </p>
      </div>
    </section>
  )
}

export default AboutProject;
