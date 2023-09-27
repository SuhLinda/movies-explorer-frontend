import {useEffect} from "react";

function MoreMovieCards({screenWidth, movies, listMovies, setListMovies}) {
  function handleMoreButtonClick() {
    if (screenWidth >= 1210) {
      setListMovies(movies.slice(0, listMovies.length + 3));
    }
    if (screenWidth <= 1200) {
      setListMovies(movies.slice(0, listMovies.length + 2));
    }
  }

  return (
    <div className="more-movie-card_active">
      <button
        className="more-movie-card__button"
        id="more-movie-card"
        type="submit"
        aria-label="more"
        onClick={handleMoreButtonClick}>
        Ещё
      </button>
    </div>
  )
}

export default MoreMovieCards;
