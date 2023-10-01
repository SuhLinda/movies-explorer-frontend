import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useScreenWidth from '../../../hooks/useScreenWidth.jsx';

import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import MoreMovieCards from '../MoreMovieCards/MoreMovieCards.jsx';

function MoviesCardList({ movies, savedMovies, setSavedMovies, isSavedMoviesPage }) {
  const screenWidth = useScreenWidth();
  const showMoreButton = movies ? movies.length : 0;

  const [listMovies, setListMovies] = useState(movies);
  const [listMoviesLength, setListMoviesLength] = useState(false)

  const location = useLocation().pathname;

  useEffect(() => {
   if (location === '/movies') {
     if (listMovies.length) {

     }
     if (screenWidth >= 1210) {
       setListMovies(movies.slice(0, 12));
     }

     if (screenWidth >= 731 && screenWidth <= 1200) {
       setListMovies(movies.slice(0, 8));
     }

     if (screenWidth <= 730) {
       setListMovies(movies.slice(0, 5));
     }
   } else {
     setListMovies(movies);
   }
  }, [screenWidth, movies]);

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__items">
        {listMovies.map((movie, index) => {
          movie.isSaved = false;
          JSON.parse(localStorage.getItem('savedMovies')).map((savedMovies) => {
            if (savedMovies.movieId === movie.id) {
              movie.isSaved = true;
            }

            if (listMovies.length - 1 === index) {

              //console.log(listMovies.length - 1, index)
            }
          })
            return <MoviesCard
              key={isSavedMoviesPage ? movie.movieId : movie.id}
              movie={movie}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              isSavedMoviesPage={isSavedMoviesPage}
            />
        })}
      </ul>
      {!isSavedMoviesPage && showMoreButton && listMovies.length - 1 ?
        <MoreMovieCards
          screenWidth={screenWidth}
          movies={movies}
          listMovies={listMovies}
          setListMovies={setListMovies}
        /> : ''
      }
    </section>
  )
}

export default MoviesCardList;
