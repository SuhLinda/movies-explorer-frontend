import { useState } from 'react';

function useScreenWidth() {
  const [isNumberOfVisibleMovies, setNumberOfVisibleMovies] = useState(12);

  function resetUseScreenWidth() {
    setNumberOfVisibleMovies(isNumberOfVisibleMovies);
  }

  return [isNumberOfVisibleMovies, setNumberOfVisibleMovies, resetUseScreenWidth];
}

export default useScreenWidth;
