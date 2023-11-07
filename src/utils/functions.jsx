import {
  MINUTES,
  HOURS,
  MINUTES_00,
  NUMBER_0,
  NUMBER_40,
  NUMBER_60,
} from '../utils/constants.jsx';

function convertMinutesToHours(min) {
  let hours = Math.trunc(min / NUMBER_60);
  let minutes = min % NUMBER_60;

  if (hours === NUMBER_0) {
    return minutes + MINUTES;
  } else if (minutes === NUMBER_0) {
    // eslint-disable-next-line
    return hours + HOURS + MINUTES_00;
  }
  return hours + HOURS + minutes + MINUTES;
}

function handleMoviesFilter(movies, search) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
      movie.nameEN.toLowerCase().trim().includes(search.toLowerCase().trim());
  })
}

function handleShortMoviesFilter(movies) {
  return movies.filter((movie) =>
    movie.duration < NUMBER_40
  );
}

export {
  convertMinutesToHours,
  handleMoviesFilter,
  handleShortMoviesFilter,
};
