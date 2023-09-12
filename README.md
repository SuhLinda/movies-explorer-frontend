Дипломный проект Yandex практикума

1. Установка CRA

В качестве инфраструктуры проекта используйте пакет CRA, который содержит всё необходимое для работы. Вы уже делали это раньше, поэтому проблем возникнуть не должно.
2. Компоненты и файловая структура

Подготовьте файловую структуру проекта перед тем, как перейти к созданию компонентов. Вот несколько рекомендаций:
для «Реакт-компонентов» создайте отдельную директорию components/;
для вспомогательных функций, а также для запросов к API — директорию utils/;
для изображений — images/;
для кода или файлов сторонних разработчиков, например шрифтов, — vendor/;
После этого перейдите к созданию компонентов на «Реакте». Мы рекомендуем портировать всю вёрстку в JSX. Таким образом часть компонентов окажется презентационной.
Для каждого компонента создавайте отдельную директорию. В ней будут лежать JS и CSS-файлы компонента. Например, для компонента App будет такая структура:
-- components/

---- App/

------ App.jsx

------ App.css

В CSS-файле содержатся только стили компонента.
Примерный список компонентов, которые вам потребуются:
1. App — корневой компонент приложения, его создаёт CRA.
2. Main — компонент страницы «О проекте». Он будет содержать только презентационные компоненты и в будущем, за исключением шапки навигации. Вот так выглядит список компонентов, которые будут использоваться только на этой странице:
3. Promo — компонент с вёрсткой баннера страницы «О проекте».
4. NavTab — компонент с навигацией по странице «О проекте».
5. AboutProject — компонент с описанием дипломного проекта.
6. Techs — компонент с использованными технологиями.
7. AboutMe — компонент с информацией о студенте.
8. Portfolio — компонент со ссылками на другие проекты.
9. Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
10. SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
11. Preloader — отвечает за работу прелоадера.
12. MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
13. MoviesCard — компонент одной карточки фильма.
14. SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
15. MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
16. MoviesCard — компонент одной карточки фильма.

Для работы со страницами регистрации, авторизации и редактирования профиля создайте три компонента:

1. Register — компонент страницы регистрации.
2. Login — компонент страницы авторизации.
3. Profile — компонент страницы изменения профиля.

Компоненты, которые понадобятся на каждой из основных страниц:

1. Header — компонент, который отрисовывает шапку сайта на страницу. Шапка на главной странице, как и на других страницах, должна менять отображение, если пользователь авторизован или не авторизован. Такое поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё не реализована.
2. Navigation — компонент, который отвечает за меню навигации на сайте.
3. Footer — презентационный компонент, который отрисовывает подвал.

Это базовые компоненты этого этапа. Вы можете создать дополнительные компоненты, например для элементов форм. Кроме этого, мы рекомендуем создать отдельный компонент для вывода ошибок при работе с API — это может быть модальное окно или текстовое сообщение в соответствующих частях проекта.
На следующем этапе у вас появятся новые компоненты или дополнятся существующие, которые отвечают за функциональность: регистрации, авторизации,
защищённых роутов.
Вы можете использовать как функциональные компоненты, так и классовые.

3. Роуты

Подготовьте необходимые маршруты:
1. по роуту / отображается страница «О проекте»;
2. по роуту /movies отображается страница «Фильмы»;
3. по роуту /saved-movies отображается страница «Сохранённые фильмы»;
4. по роуту /profile отображается страница с профилем пользователя;
5. по роутам /signin и /signup отображаются страницы авторизации и регистрации.

Защищать маршруты авторизацией пока не требуется. Достаточно наладить работу всех ссылок:
1. нажатие на логотип ведёт на страницу «О проекте»;
2. нажатие на «Фильмы» — на роут /movies;
3. нажатие на «Сохранённые фильмы» — на роут /saved-movies;
4. нажатие на «Регистрация», «Авторизация», «Аккаунт» — на соответствующие роуты /signup, /signin и /profile.
5.
4. Вёрстка

Сверстайте все блоки сайта по выбранному макету. Вносить правки в дизайн выбранного макета нельзя..
HTML:
- Разметка портирована в JSX.
- Разметка семантическая.
- Все классы названы по БЭМ.
- Навигация должна работать: ни одна ссылка не ведёт «в никуда».

CSS:

- Для стилизации каждого блока выбраны правильные инструменты, которые подходят для задачи.
- Вёрстка на Flex layout и/или Grid layout.
- Адаптивность под указанные в макете разрешения и отсутствие поломок в промежуточных значениях.
- Шрифты подключены через @font-face.
- Элементы правильно позиционированы.
- Сделана микроанимация кнопок, ссылок и инпутов.
- Использован normalize.сss или стилизован строго по БЭМ — без внешних файлов.
- Формы и плейсхолдеры стилизованы верно.
- В разных частях проекта есть переиспользуемые блоки.
- Все изображения оптимизированы — в том числе и .svg.
- Отображение элементов интерфейса в разных состояниях возьмите из UI-kit к макету.
- Полный список требований находится в критериях к диплому. Обратите внимание, что делать файловую структуру по БЭМ не требуется.

Ссылка на макет: https://www.figma.com/file/6FMWkB94wE7KTkcCgUXtnC/light-1?type=design&node-id=891-3857&mode=design&t=SAUTEJ4fgoT4Jaf7-0

Макет: dark-2

IP: 130.193.36.139

Backend: api.lindasux.nomoredomainsicu.ru

Frontend: lindasux.nomoredomainsicu.ru
