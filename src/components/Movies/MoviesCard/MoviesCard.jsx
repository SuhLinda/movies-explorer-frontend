import {CurrentUserContext} from "../../../contexts/CurrentUserContext";
import {convertMinutesToHours} from '../../../utils/functions.jsx';
import {mainApi} from "../../../utils/MainApi";
import {useContext, useState} from "react";

function MoviesCard({movie, savedMovies, setSavedMovies, isSavedMoviesPage}) {
  const currentUser = useContext(CurrentUserContext);
  const [isSavedMovies, setIsSavedMovies] = useState(false)


  async function handleSavedMovie() {

    try {
     const newSavedMovies = await mainApi.savedMovies(movie);
      setIsSavedMovies(true);
      localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
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
              {isSavedMovies ?
                <button
                  className="movies-card__button-checkmark"
                  type="button"
                  aria-label="saved">
                </button>
                :
                <button
                  className="movies-card__button-close"
                  type="button"
                  aria-label="close"
                  onClick={handleDeleteMovie}>
                </button>
              }
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
            </>
          ) : (
            <>
              {isSavedMovies ?
                <button
                  className="movies-card__button-checkmark"
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
            </>
          )
        }
      </div>
    </li>
  )
}

export default MoviesCard;
