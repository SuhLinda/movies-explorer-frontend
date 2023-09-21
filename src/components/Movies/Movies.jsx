import {useState, useEffect} from 'react';

import { filterTheSearchByWords, filterTheSearchByDuration } from '../../utils/functions.jsx';
import useTheNumberOfVisibleMovies from '../../hooks/useTheNumberOfVisibleMovies.jsx';

import Header from '../Header/Header.jsx';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoreMovieCards from './MoreMovieCards/MoreMovieCards.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer.jsx';

import { moviesApi } from '../../utils/MoviesApi.jsx';
import { mainApi } from '../../utils/MainApi.jsx';

function Movies({ isLoggedIn }) {
  const [isMovies, setIsMovies] = useState([]);
  const [isSearch, setIsSearch] = useState('');
  const [isResultSearch, setIsResultSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchErr, setIsSearchErr] =useState('');
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [isSavedMovies, setIsSavedMovies] =useState();

  const [isNumberOfVisibleMovies, setNumberOfVisibleMovies, resetTheNumberOfVisibleMovies] = useTheNumberOfVisibleMovies();


  useEffect(() => {
    const savedSearchResult = localStorage.getItem('resultSearch');
    const savedSearch = localStorage.getItem('search');
    const savedShortFilm = localStorage.getItem('shortFilm');
    const savedMovies = localStorage.getItem('savedMovies');

    if (savedSearchResult && savedSearch) {
      setIsResultSearch(JSON.parse(savedSearchResult));
      setIsSearch(savedSearch);
      setIsShortFilm(savedShortFilm ? savedShortFilm === 'true' : false);
    } else {
      setIsShortFilm(false);
      setIsResultSearch([]);
    }

    if (savedMovies) {
      setIsSavedMovies(JSON.parse(savedMovies));
    }
  }, []);


  function  findSavedMoviesById(movie, savedMovies) {
    return savedMovies.find((saveMovie) =>
      saveMovie.movieId === movie.id
    );
  }

  const newSearchResult = isResultSearch.map((movie) =>
    ({ ...movie, saved: findSavedMoviesById(movie)})
  )

  function handleSearchErr(err) {
    setIsSearchErr(err);
    setIsResultSearch([]);
  }

  function handleSearchSuccess(filterMovies) {
    setIsResultSearch(filterMovies);
    setIsSearchErr('');
    localStorage.setItem('resultSearch', JSON.stringify(filterMovies));
    localStorage.setItem('search', isSearch);
  }

  function handleMoviesSearch() {
    resetTheNumberOfVisibleMovies(isNumberOfVisibleMovies);
    const savedMovies  = localStorage.getItem('allMovies');

    if (savedMovies) {
      setIsMovies(JSON.parse(savedMovies));
      const filterMovies = filterTheSearchByWords(JSON.parse(savedMovies), isSearch);

      if (filterMovies.length === 0) {
        handleSearchErr('none');
        return;
      }

      if (isShortFilm) {
        const filterShortFilms = filterTheSearchByDuration(filterMovies, true);
        handleSearchSuccess(filterShortFilms, true);
      } else {
        handleSearchSuccess(filterMovies, false);
      }
    } else {
      setIsLoading(true);

      moviesApi.getMovies()
        .then((res) => {
          setIsMovies(res);
          const filterMovies = filterTheSearchByWords(res, isSearch);

          if (filterMovies.length === 0) {
            handleSearchErr('no');
            return;
          }

          if (isShortFilm) {
            const filterShortFilm = filterTheSearchByDuration(filterMovies, true);
            handleSearchSuccess(filterShortFilm, true);
          } else {
            handleSearchSuccess(filterMovies, false);
          }

          localStorage.setItem('allMovies', JSON.stringify(res));
          localStorage.setItem('search', isSearch);


        })
        .catch((err) => {
          setIsMovies([]);
          setIsResultSearch([]);
          handleSearchErr('111');
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })


      mainApi.getSavedMovies()
        .then((res) => {
          setIsSavedMovies(res)

          localStorage.setItem('savedMovies', JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);

        })
    }
  }


  function handleCheckboxChange() {
    setIsShortFilm(!isShortFilm);
    localStorage.setItem('shortFilm', !isShortFilm ? 'true' : 'false');

    const savedMovies = localStorage.getItem('allMovies');

    if (!savedMovies) {
      return;
    }

    const savedShortFilms = localStorage.getItem('shortFilm');

    if (savedShortFilms === 'true') {
      const filterShortFilms = filterTheSearchByDuration(isResultSearch, true);
      localStorage.setItem('resultSearch', JSON.stringify(filterShortFilms));
      setIsResultSearch(filterShortFilms);
    } else {
      const savedMovies = localStorage.getItem('allMovies');
      const filterMovies = filterTheSearchByWords(JSON.parse(savedMovies), isSearch);

      localStorage.setItem('resultSearch', JSON.stringify(filterMovies));
      setIsResultSearch(filterMovies);
    }
  }

  useEffect(() => {
    function handleResizeWindow() {
      const width = window.innerWidth;

      if (width >= 768) {
        setNumberOfVisibleMovies(12);
      }
      if (width >= 550) {
        setNumberOfVisibleMovies(8);
      } else {
        setNumberOfVisibleMovies(5);
      }

      const resizeTimeOutDelay = 500;
      let resizeTimeOut;

      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeOut);
        resizeTimeOut = setTimeout(handleResizeWindow, resizeTimeOutDelay);
      })

      return () => {
        window.removeEventListener('resize', handleResizeWindow);
        clearTimeout(resizeTimeOut);
      }
    }

    window.addEventListener('resize', handleResizeWindow);
    handleResizeWindow()

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    }
  }, [isSearch, setNumberOfVisibleMovies])

  return (
    <section className="movies">
      <Header
        isLoggedIn={isLoggedIn}/>
      <SearchForm
        onSearch={handleMoviesSearch}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setIsSearchErr={setIsSearchErr}
        isShortFilm={isShortFilm}
        onchangeCheckBox={handleCheckboxChange}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={newSearchResult.slice(0, isNumberOfVisibleMovies)}
        isSearchErr={isSearchErr}
        isSavedMovies={isSavedMovies}
        setIsSavedMovies={setIsSavedMovies}
      />

      {isNumberOfVisibleMovies < isResultSearch.length && (
        <MoreMovieCards
          isNumberOfVisibleMovies={isNumberOfVisibleMovies}
          setNumberOfVisibleMovies={setNumberOfVisibleMovies}
        />
      )}

      <Footer />
    </section>
  )
}

export default Movies;
