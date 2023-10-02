function MoviesCard({ movie, isSavedMoviesPage }) {

  return (
    <li>
      <div className="movies-card">
        {movie.saved === true && !isSavedMoviesPage &&
          <button
            className="movies-card__button-checkmark"
            type="button"
            aria-label="saved">
          </button>}
        {movie.saved === false && !isSavedMoviesPage &&
          <button
            className="movies-card__button-save"
            type="submit"
            aria-label="save">
            Сохранить
          </button>}
        {movie.saved === true && isSavedMoviesPage &&
          <button
            className="movies-card__button-close"
            type="button"
            aria-label="close">
          </button>}
        <img
          className="movies-card__img"
          src={movie.image}
          alt={`${movie.name}`}/>
        <h2 className="movies-card__title">
          {movie.name}
        </h2>
        <p className="movies-card__text">
          {movie.duration}
        </p>
      </div>
    </li>
  )
}

export default MoviesCard;
