import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import MoreMovieCards from '../MoreMovieCards/MoreMovieCards.jsx';

function MoviesCardList({ movies, savedMovies, setSavedMovies, isSavedMoviesPage }) {
  const screenWidth = window.innerWidth;
  const showMoreButton = movies ? movies.length : 0;

  const [listMovies, setListMovies] = useState(movies);
  const location = useLocation().pathname;

  useEffect(() => {
   if (location === '/movies') {
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
        {listMovies.sort().map((movie) => {
          return <MoviesCard
            key={isSavedMoviesPage ? movie.movieId : movie.id}
            movie={movie}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            isSavedMoviesPage={isSavedMoviesPage}
          />
        })}
      </ul>
      {!isSavedMoviesPage && showMoreButton ?
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
