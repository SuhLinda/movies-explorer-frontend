import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import {useEffect, useState} from "react";
import useScreenWidth from "../../../hooks/useScreenWidth";

function MoviesCardList({isLoading, movies, isSearchErr, savedMovies, setSavedMovies}) {
  const [showMovieCardList, setShowMovieCardList] = useState(movies);

  const width = useScreenWidth();
  const searchedMovies = movies ? movies.length : 0;

  useEffect(() => {
    if (width > 900) {
      setShowMovieCardList(movies.slice(0, 12));
    } else if (width > 450 && width <= 900) {
      setShowMovieCardList(movies.slice(0, 8));
    } else if (width <= 450) {
      setShowMovieCardList(movies.slice(0, 5));
    } else {
      setShowMovieCardList(movies);
    }
  }, [width, movies]);

  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader/>
      ) : (
        <ul className="movies-card-list__items">
          {showMovieCardList.sort().map((movie) => {
            return <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
            />
          })}
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList;
