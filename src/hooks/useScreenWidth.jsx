import { useState, useEffect, useCallback } from 'react';

function useScreenWidth() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);
  const [isScreenWidth, setIsScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleScreenResize() {
      setIsScreenWidth(getScreenWidth());
    }

      let timerResize;

      function resizeController() {
        if (!timerResize) {
          timerResize = setTimeout(() => {
            timerResize = null;
            handleScreenResize();
          }, 1000);
        }
      }

      window.addEventListener('resize', resizeController, false);

     return () => window.removeEventListener('resize', handleScreenResize);

  }, [getScreenWidth()]);

  return isScreenWidth;
}

export default useScreenWidth;