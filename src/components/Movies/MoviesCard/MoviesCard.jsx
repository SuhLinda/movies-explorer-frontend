import { useState } from 'react';

import { Link } from 'react-router-dom';

import { mainApi } from '../../../utils/MainApi.jsx';

import { convertMinutesToHours } from '../../../utils/functions.jsx';

import { SAVED_MOVIES } from '../../../utils/constants.jsx';

function MoviesCard({ movie, isSavedMoviesPage, setSavedMovies }) {
  const [isSavedMovies, setIsSavedMovies] = useState(false);

  async function handleSavedMovie() {
    try {
      const newSavedMovie = await mainApi.savedMovies(movie);

      setSavedMovies((state) =>
        state.map((item) =>
          item._id === movie._id ? newSavedMovie : item
        ),
      );

      setIsSavedMovies(true);
      const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
      savedMovies.unshift(newSavedMovie);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies));

    } catch (err) {
      setIsSavedMovies(false);
      console.log(`ошибка: ${err}`);
    }
  }

  async function handleDeleteMovie() {
    try {
      const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
      const filteredMovies = savedMovies.filter(item => item._id !== movie._id);
      localStorage.setItem(SAVED_MOVIES, JSON.stringify(filteredMovies));

      if (!isSavedMoviesPage && movie.isSaved) {
        const deletedMovie = savedMovies.filter((item) => item.movieId === movie.id);
        deletedMovie.map((item) =>  mainApi.deleteMovie(item._id));
        const filteredMovies = savedMovies.filter(item => item.movieId !== movie.id);
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(filteredMovies));

        movie.isSaved = false;
        setIsSavedMovies(false);
      } else {
        await mainApi.deleteMovie(movie._id);

        setSavedMovies((state) =>
          state.filter((item) =>
            item._id !== movie._id));
        setIsSavedMovies(false);
      }
    } catch (err) {
      console.log(`ошибка: ${err}`);
    }
  }

  return (
    <li>
      <div className="movies-card">
        {isSavedMoviesPage ?
          (
            <>
              <button
                className="movies-card__button-close"
                type="button"
                aria-label="close"
                onClick={handleDeleteMovie}>
              </button>
              <Link
                to={movie.trailerLink}
                className="movies-card__link">
                <img
                  className="movies-card__img"
                  src={movie.image}
                  alt={movie.nameRU || movie.nameEN}
                />
                <h2 className="movies-card__title">
                  {movie.nameRU || movie.nameEN}
                </h2>
                <p className="movies-card__text">{convertMinutesToHours(movie.duration)}
                </p>
              </ Link>
            </>
          ) : (
            <>
              {movie.isSaved || isSavedMovies ?
                <button
                  className="movies-card__button-checkmark_active"
                  type="button"
                  aria-label="saved"
                  onClick={handleDeleteMovie}>
                </button>
                :
                <button
                  className="movies-card__button-save"
                  type="button"
                  aria-label="save"
                  onClick={handleSavedMovie}>
                  Сохранить
                </button>
              }
              <Link
                to={movie.trailerLink}
                className="movies-card__link">
                <img
                  className="movies-card__img"
                  src={`https://api.nomoreparties.co/${movie.image.url}`}
                  alt={movie.nameRU || movie.nameEN}
                />
                <h2 className="movies-card__title">
                  {movie.nameRU || movie.nameEN}
                </h2>
                <p className="movies-card__text">{convertMinutesToHours(movie.duration)}
                </p>
              </ Link>
            </>
          )
        }
      </div>
    </li>
  )
}

export default MoviesCard;
