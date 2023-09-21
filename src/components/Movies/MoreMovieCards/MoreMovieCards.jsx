import React, { useCallback } from 'react';

function MoreMovieCards({isNumberOfVisibleMovies, setNumberOfVisibleMovies}) {

  const handleButtonMoreMovies = useCallback(() => {
    const width = window.innerWidth;

    if (width <= 1280 && width >=768) {
      setNumberOfVisibleMovies(isNumberOfVisibleMovies + 3);
    }

    if (width <= 767) {
      setNumberOfVisibleMovies(isNumberOfVisibleMovies + 2);
    } else {
      setNumberOfVisibleMovies(isNumberOfVisibleMovies + 3);
    }
  }, [isNumberOfVisibleMovies, setNumberOfVisibleMovies]);


  return (
    <div className="more-movie-card">
      <button
        className="more-movie-card__button"
        type="submit"
        aria-label="more"
        onClick={handleButtonMoreMovies}>
        Ещё
      </button>
    </div>
  )
}

export default MoreMovieCards;
