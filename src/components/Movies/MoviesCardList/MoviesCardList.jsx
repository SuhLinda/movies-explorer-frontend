import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useScreenWidth from '../../../hooks/useScreenWidth.jsx';

import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import MoreMovieCards from '../MoreMovieCards/MoreMovieCards.jsx';

import {
  MOVIES_PAGE,
  SAVED_MOVIES,
  MAX_SCREEN_WIDTH,
  AVERAGE_SCREEN_WIDTH,
  MIN_SCREEN_WIDTH_731,
  MIN_SCREEN_WIDTH,
  NUMBER_0,
  NUMBER_5,
  NUMBER_8,
  NUMBER_12,
} from '../../../utils/constants.jsx';

function MoviesCardList({movies, savedMovies, setSavedMovies, isSavedMoviesPage, filterMovie}) {
  const screenWidth = useScreenWidth();
  const totalMovies = movies ? movies.length : NUMBER_0;
  const [listMovies, setListMovies] = useState(movies);

  const location = useLocation().pathname;

  useEffect(() => {
    if (location === MOVIES_PAGE) {
      if (screenWidth >= MAX_SCREEN_WIDTH) {
        setListMovies(movies.slice(NUMBER_0, NUMBER_12));
      }
      if (screenWidth >= MIN_SCREEN_WIDTH_731 && screenWidth <= AVERAGE_SCREEN_WIDTH) {
        setListMovies(movies.slice(NUMBER_0, NUMBER_8));
      }
      if (screenWidth <= MIN_SCREEN_WIDTH) {
        setListMovies(movies.slice(NUMBER_0, NUMBER_5));
      }
    } else {
      setListMovies(movies);
    }
  }, [movies]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {listMovies.map((movie) => {
          movie.isSaved = false;
          // eslint-disable-next-line
          JSON.parse(localStorage.getItem(SAVED_MOVIES)).map((savedMovies) => {
            if (savedMovies.movieId === movie.id) {
              movie.isSaved = true;
            }
          })
          return <MoviesCard
            key={isSavedMoviesPage ? movie._id : movie.id}
            movie={movie}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            isSavedMoviesPage={isSavedMoviesPage}
          />
        })}
      </ul>
      {!isSavedMoviesPage && totalMovies && listMovies.length !== totalMovies ?
        <MoreMovieCards
          screenWidth={screenWidth}
          movies={movies}
          listMovies={listMovies}
          setListMovies={setListMovies}
          filterMovie={filterMovie}
        /> : ''
      }
    </section>
  )
}

export default MoviesCardList;
