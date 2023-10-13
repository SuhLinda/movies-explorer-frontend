/* routes */
const SIGNUP = '/signup';
const SIGNIN = '/signin';
const BASE_PAGE = '/';
const MOVIES_PAGE = '/movies';
const SAVED_MOVIES_PAGE= '/saved-movies';
const PROFILE_PAGE = '/profile';
const NOT_FOUND_PAGE = '*';

/* localStorage */
const IS_LOGGED_IN= 'isLoggedIn';
const MOVIES = 'movies';
const SAVED_MOVIES= 'savedMovies';
const SHORT_MOVIES= 'shortMovies';
const SHORT_SAVED_MOVIES = 'shortSavedMovies';
const SEARCH = 'search';
const SEARCH_SAVED_MOVIES = 'searchSavedMovies';
const FILTER_MOVIES = 'filterMovie';
const FILTER_SAVED_MOVIES = 'filterSavedMovie';

/* links */

const YANDEX= 'https://practicum.yandex.ru';
const GITHUB_PAGE = 'https://github.com/SuhLinda';
const STATIC_WEBSITE = 'https://suhlinda.github.io/how-to-learn/';
const ADAPTIVE_WEBSITE = 'https://suhlinda.github.io/russian-travel';
const SINGLE_PAGE_APPLICATION = 'https://github.com/SuhLinda/react-mesto-api-full-gha';

const SUCCESS_MESSAGE = 'Вы успешно зарегистрировались!';
const SUCCESS_MESSAGE_PROFILE = 'Изменения успешно сохранены!';
const UNSUCCESS_MESSAGE = 'Что-то пошло не так! Попробуйте ещё раз!';
const ERROR_SERVER_MESSAGE = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const NOT_SEARCH = 'Ничего не найдено...';
const MINUTES = 'м';
const HOURS = 'ч ';
const MINUTES_00 = '00м';

/* screenWidth */

const MAX_SCREEN_WIDTH = 1210;
const AVERAGE_SCREEN_WIDTH = 1200;
const MIN_SCREEN_WIDTH_731 = 731;
const MIN_SCREEN_WIDTH = 730;

const MORE_MOVIES_FOR_MAX_SCREEN_WIDTH = 3;
const MORE_MOVIES_FOR_MIN_SCREEN_WIDTH = 2;
const NUMBER_0 = 0;
const NUMBER_1 = 1;
const NUMBER_5 = 5;
const NUMBER_8 = 8;
const NUMBER_12 = 12;
const NUMBER_40 = 40;
const NUMBER_60 = 60;

export {
  SIGNUP,
  SIGNIN,
  BASE_PAGE,
  MOVIES_PAGE,
  SAVED_MOVIES_PAGE,
  PROFILE_PAGE,
  NOT_FOUND_PAGE,
  IS_LOGGED_IN,
  MOVIES,
  SAVED_MOVIES,
  SHORT_MOVIES,
  SHORT_SAVED_MOVIES,
  SEARCH,
  SEARCH_SAVED_MOVIES,
  FILTER_MOVIES,
  FILTER_SAVED_MOVIES,
  YANDEX,
  GITHUB_PAGE,
  STATIC_WEBSITE,
  ADAPTIVE_WEBSITE,
  SINGLE_PAGE_APPLICATION,
  SUCCESS_MESSAGE,
  SUCCESS_MESSAGE_PROFILE,
  UNSUCCESS_MESSAGE,
  ERROR_SERVER_MESSAGE,
  NOT_SEARCH,
  MINUTES,
  HOURS,
  MINUTES_00,
  MAX_SCREEN_WIDTH,
  AVERAGE_SCREEN_WIDTH,
  MIN_SCREEN_WIDTH_731,
  MIN_SCREEN_WIDTH,
  MORE_MOVIES_FOR_MAX_SCREEN_WIDTH,
  MORE_MOVIES_FOR_MIN_SCREEN_WIDTH,
  NUMBER_0,
  NUMBER_1,
  NUMBER_5,
  NUMBER_8,
  NUMBER_12,
  NUMBER_40,
  NUMBER_60,
};
