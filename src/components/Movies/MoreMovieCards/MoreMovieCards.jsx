import {
  MAX_SCREEN_WIDTH,
  AVERAGE_SCREEN_WIDTH,
  MORE_MOVIES_FOR_MAX_SCREEN_WIDTH,
  MORE_MOVIES_FOR_MIN_SCREEN_WIDTH,
  NUMBER_0,
  NUMBER_1,
} from '../../../utils/constants.jsx';

function MoreMovieCards({ screenWidth, movies, listMovies, setListMovies }) {

  function handleMoreButtonClick() {
    if (screenWidth >= MAX_SCREEN_WIDTH) {
      setListMovies(movies.slice(NUMBER_0, listMovies.length + MORE_MOVIES_FOR_MAX_SCREEN_WIDTH));
    }
    if (screenWidth <= AVERAGE_SCREEN_WIDTH) {
      setListMovies(movies.slice(NUMBER_0, listMovies.length + MORE_MOVIES_FOR_MIN_SCREEN_WIDTH));
    }
  }

  return (
    <div className={listMovies.length - NUMBER_1 ? 'more-movie-card_active' : 'more-movie-card'}>
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
