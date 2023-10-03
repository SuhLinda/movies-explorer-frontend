function convertMinutesToHours(min) {
  let hours = Math.trunc(min / 60);
  let minutes = min % 60;

  if (hours === 0) {
    return minutes + 'м';
  } else if (minutes === 0) {
    // eslint-disable-next-line
    return hours + 'ч ' + '00м';
  }
  return hours + 'ч ' + minutes + 'м';
}

function handleMoviesFilter(movies, search) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().trim().includes(search.toLowerCase().trim()) ||
      movie.nameEN.toLowerCase().trim().includes(search.toLowerCase().trim());
  })
}

function handleShortMoviesFilter(movies) {
  return movies.filter((movie) =>
    movie.duration > 40
  );
}

export {
  convertMinutesToHours,
  handleMoviesFilter,
  handleShortMoviesFilter,
};
