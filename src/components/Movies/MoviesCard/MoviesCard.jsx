import {CurrentUserContext} from "../../../contexts/CurrentUserContext";
import {convertMinutesToHours} from '../../../utils/functions.jsx';
import {mainApi} from "../../../utils/MainApi";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";

function MoviesCard({movie, savedMovies, setSavedMovies, isSavedMoviesPage}) {
  const currentUser = useContext(CurrentUserContext);
  const [isSavedMovies, setIsSavedMovies] = useState(false);

  async function handleSavedMovie() {
    try {
      const newSavedMovie = await mainApi.savedMovies(movie);
      if (newSavedMovie.movieId === movie.movieId) {
        setIsSavedMovies(false);

        //localStorage.setItem('savedMovies', JSON.stringify(newSavedMovie));
      } else {
        setIsSavedMovies(true)
      }
    } catch (err) {
      setIsSavedMovies(false);
      console.log(err);
    }

  }

  async function handleDeleteMovie() {
    console.log(movie._id);
    try {
      const deletedMovie = await mainApi.deleteMovie(movie._id);

      localStorage.removeItem('savedMovies');
    } catch (err) {
      setIsSavedMovies(false);
      console.log(err);
    }
  }

  return (
    <li>
      <div className="movies-card">
        {isSavedMoviesPage ?
          (
            <>
              <button
                className={isSavedMovies ? 'movies-card__button-checkmark' : 'movies-card__button-checkmark_active'}
                type="button"
                aria-label="saved">
              </button>
              <button
                className={'movies-card__button-close'}
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
              {isSavedMovies ?
                <button
                  className="movies-card__button-checkmark_active"
                  type="button"
                  aria-label="saved">
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
