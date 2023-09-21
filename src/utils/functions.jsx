function convertMinutesToHours(min) {
  let hours = Math.trunc(min / 60);
  let minutes = min % 60;

  return hours + 'ч' + minutes + 'м';
}

function filterSearchShortMovies(movies) {
  return movies.filter(movie =>
    movie.duration < 40
  );
}

function filterSearchMovies(movies, search, checkbox) {
  const moviesBySearch = movies.filter((movie) => {
    const movieRU = String(movie.nameRU).toLowerCase().trim();
    const movieEN = String(movie.nameEN).toLowerCase().trim();
    const userMovies = search.toLowerCase().trim();
    return movieRU.indexOf(userMovies) !== -1 || movieEN.indexOf(userMovies) !== -1;
  })

  if (checkbox) {
    return filterSearchShortMovies(moviesBySearch);
  } else {
    return moviesBySearch;
  }
}

export {
  convertMinutesToHours,
  filterSearchShortMovies,
  filterSearchMovies,
}
