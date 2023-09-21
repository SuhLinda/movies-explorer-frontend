function convertMinutesToHours(min) {
  let hours = Math.trunc(min / 60);
  let minutes = min % 60;

  return hours + 'ч' + minutes + 'м';
}

function filterTheSearchByWords(movies, searchQuery) {
  return movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.nameEN.toLowerCase().includes(searchQuery.toLowerCase());
  })
}

function filterTheSearchByDuration(movies, shortFilms) {
  if (shortFilms) {
    return movies.filter((movie) =>
      movie.duration <= 40
    )
  }
}

export {
  convertMinutesToHours,
  filterTheSearchByWords,
  filterTheSearchByDuration
}
