import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';

function MoviesCardList({ isLoading, movies, isSavedMoviesPage }) {
  return (
    <section className="movies-card-list">
      {isLoading ? <Preloader /> : (
        <ul className="movies-card-list__items">
          {movies?.map((movie) => {
            return <MoviesCard key={movie.id} movie={movie} isSavedMoviesPage={isSavedMoviesPage} />
          })}
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList;
