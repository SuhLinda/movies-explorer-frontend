import {useContext, useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.jsx';

import { mainApi } from '../../../utils/MainApi.jsx';

import { convertMinutesToHours } from '../../../utils/functions.jsx';

function MoviesCard({ movie, isSavedMoviesPage, savedMovies, setSavedMovies }) {
  const currentUser = useContext(CurrentUserContext);
  const [isSavedMovies, setIsSavedMovies] = useState(false);

  useEffect(() => {
    //JSON.parse(localStorage.getItem('savedMovies'))
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies')).find(item => item.movieId ===
      JSON.parse(localStorage.getItem('savedMovies')).find(item => item.movieId))
    if (savedMovies) {
      setIsSavedMovies(true)
      console.log('tet')
    }

    const savedMovie = JSON.parse(localStorage.getItem('savedMovies'))


  }, [savedMovies]);


  async function handleSavedMovie() {


    try {
      const newSavedMovie = await mainApi.savedMovies(movie);

        setIsSavedMovies(true);

        let savedMovies = JSON.parse(localStorage.getItem('savedMovies')).find(item => item.movieId !== newSavedMovie.movieId);

        if (savedMovies) {
          setIsSavedMovies(true);
          console.log(savedMovies.movieId, newSavedMovie.movieId);
          savedMovies = JSON.parse(localStorage.getItem('savedMovies'))
          savedMovies.unshift(newSavedMovie);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        }



    } catch (err) {
      setIsSavedMovies(false);
      console.log(err);
    }
  }

  async function handleDeleteMovie() {
    try {
      const movieDelete = await mainApi.deleteMovie(movie._id);
      setIsSavedMovies(false);

    } catch (err) {
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
