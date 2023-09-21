import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { convertMinutesToHours } from '../../../utils/functions.jsx';
import { mainApi } from '../../../utils/MainApi.jsx';

function MoviesCard({movie, isSavedMovies, setIsSavedMovies, key, onDelete}) {
  const imgSrc = movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image;
  const changeButton = location.pathname === '/savedMovies';
  const [isSavedMovie, setIsSavedMovie] = useState(movie.saved);

  const location = useLocation();

  function handleMovieDelete(movie) {
    setIsSavedMovie(true);

    const findMovie = isSavedMovies.find((item) =>
      item.movieId === movie.id
    );
    const movieId = findMovie._id;

    mainApi.deleteMovie(movieId)
      .then(() => {
        setIsSavedMovie(false);
        setIsSavedMovies((state) =>
          state.filter((m) =>
            m._id !== movieId
          )
        )

        localStorage.setItem('savedMovies', JSON.stringify(isSavedMovies.filter((item) =>
          item._id !== movieId
        )))
      })
      .catch((err) => {
        setIsSavedMovie(true)
        console.log(err);

      })
  }

  function handleMovieSave(movie) {
    setIsSavedMovie(false);

    return mainApi.savedMovies({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    })
      .then((res) => {
        setIsSavedMovie(true)
        setIsSavedMovies([...res, isSavedMovies]);
      })
      .catch((err) => {
        setIsSavedMovie(false);
        console.log(err);
      })
  }

  function handleMovieClick() {
    if (!changeButton) {
      if (isSavedMovie) {
        handleMovieDelete(movie);
      } else {
        return handleMovieSave(movie);
      }
    } else {
      onDelete(movie._id || movie.id);
    }
  }

  return (
    <li>
      <div className="movies-card">
          <button
            className="movies-card__button-checkmark"
            type="button"
            aria-label="saved">
          </button>
          <button
            className="movies-card__button-save"
            type="submit"
            aria-label="save"
            onClick={handleMovieClick}>
            Сохранить
          </button>
          <button
            className="movies-card__button-close"
            type="button"
            aria-label="close">
          </button>
        <img
          className="movies-card__img"
          src={imgSrc}
          alt={movie.nameRU}
        />
        <h2 className="movies-card__title">
          {movie.nameRU}
        </h2>
        <p className="movies-card__text">
          {convertMinutesToHours(movie.duration)}
        </p>
      </div>
    </li>
  )
}

export default MoviesCard;
