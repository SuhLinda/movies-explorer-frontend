import studentInfoImg from '../../images/about-me__info_img.jpeg';

function AboutMe() {
  return (
    <section
      className="about-me"
      id="about-me">
      <h2 className="about-me__title">
        Студент
      </h2>
      <div className="about-me__info">
        <h3 className="about-me__info_title">
          Линда
        </h3>
        <p className="about-me__info_subtitle">
          Фронтенд-разработчик, 34 года
        </p>
        <p className="about-me__info_text">
          Привет! Меня зовут Линда. Я родилась на Дальнем Востоке, долго прожила в
          Ростове-на-Дону, теперь живу в Москве. Училась я в Ростове по специальности "Информационная безопасность"
          и "Прикладная информатика в экономике". "Рисовать сайты" мне нравилось ещё с колледжа, поэтому спустя долгие
          годы я решила научиться делать это заново.
        </p>
        <a
          className="about-me__info_link"
          href="https://github.com/SuhLinda">
          Github
        </a>
        <img
          className="about-me__info_img"
          src={studentInfoImg}
          alt="photo_me"
        />
      </div>
    </section>
  )
}

export default AboutMe;
