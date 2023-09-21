import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';

function MoviesCardList({isLoading, movies, isSavedMovies, setIsSavedMovies, isSavedMoviesPage, isSearchErr, deleteMovie}) {
  return (
    <section className="movies-card-list">
      {isLoading ? (
        <Preloader/>
      ) : (
        <ul className="movies-card-list__items">
          {movies?.map((movie) => {
            return <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              onDelete={deleteMovie}
              isSavedMovies={isSavedMovies}
              setIsSavedMovies={setIsSavedMovies}
            />
          })}
        </ul>
      )}
    </section>
  )
}

export default MoviesCardList;
