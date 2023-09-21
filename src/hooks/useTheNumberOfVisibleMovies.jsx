import { useState } from 'react';

function useTheNumberOfVisibleMovies() {
  const [isNumberOfVisibleMovies, setNumberOfVisibleMovies] = useState(12);

  function resetTheNumberOfVisibleMovies() {
    setNumberOfVisibleMovies(isNumberOfVisibleMovies);
  }

  return [isNumberOfVisibleMovies, setNumberOfVisibleMovies, resetTheNumberOfVisibleMovies];
}

export default useTheNumberOfVisibleMovies;
