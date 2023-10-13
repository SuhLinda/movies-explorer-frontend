import { useState, useEffect } from 'react';

import { moviesApi } from '../../utils/MoviesApi.jsx';
import { handleMoviesFilter, handleShortMoviesFilter } from '../../utils/functions.jsx';

import Header from '../Header/Header.jsx';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer.jsx';
import Preloader from './Preloader/Preloader.jsx';

import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

import {
  MOVIES,
  SAVED_MOVIES,
  SEARCH,
  SHORT_MOVIES,
  FILTER_MOVIES,
  ERROR_SERVER_MESSAGE,
  NOT_SEARCH,
  NUMBER_0,
} from '../../utils/constants.jsx';

function Movies(
  {
    isLoggedIn,
    isLoading,
    setIsLoading,
    setImage,
    setText,
    openInfoTooltip,
    savedMovies,
    setSavedMovies,
    isSavedMovies,
  }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(JSON.parse(localStorage.getItem(SEARCH)) || []);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem(SHORT_MOVIES)) || false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [filterMovie, setFilterMovie] = useState([]);

  useEffect(() => {
    localStorage.setItem(SHORT_MOVIES, JSON.stringify(shortMovies));
    const movies = JSON.parse(localStorage.getItem(MOVIES));
    const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));

    if (shortMovies === false) {

      if (movies !== null && search !== null) {
        const moviesListSearch = handleMoviesFilter(movies, search);

        setMovies(moviesListSearch);
        setFilterMovie(moviesListSearch);

        localStorage.setItem(FILTER_MOVIES, JSON.stringify(moviesListSearch));
      }
    } else {
      if (movies !== null && search !== null) {
        const shortMoviesList = handleShortMoviesFilter(movies);

        const moviesListSearch = handleMoviesFilter(shortMoviesList, search);


        setMovies(moviesListSearch);
        setFilterMovie(moviesListSearch);

        localStorage.setItem(FILTER_MOVIES, JSON.stringify(moviesListSearch));
      }
    }
    // eslint-disable-next-line
  }, [shortMovies]);

  async function handleMoviesSearch() {
    if (search.length === NUMBER_0) {
      setIsSearchErr(true);
      setMovies([]);
    } else {
      try {
        setIsLoading(true);
        setIsSearchErr(false);
        setSearch(search);

        const movies = await moviesApi.getMovies();

        if (shortMovies === false) {
          const moviesListSearch = handleMoviesFilter(movies, search);

          handleLengthSearch(moviesListSearch);

          setMovies(moviesListSearch);
          setFilterMovie(moviesListSearch);

          localStorage.setItem(FILTER_MOVIES, JSON.stringify(moviesListSearch));

        } else {
          const shortMoviesList = handleShortMoviesFilter(movies);

          const moviesListSearch = handleMoviesFilter(shortMoviesList, search);


          handleLengthSearch(moviesListSearch);

          setMovies(moviesListSearch);
          setFilterMovie(moviesListSearch);

          localStorage.setItem(FILTER_MOVIES, JSON.stringify(moviesListSearch));
        }

        localStorage.setItem(MOVIES, JSON.stringify(movies));
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies));
        localStorage.setItem(SEARCH, JSON.stringify(search));
        localStorage.setItem(SHORT_MOVIES, JSON.stringify(shortMovies));
      } catch (err) {
        setIsSearchErr(false);
        setImage(imageInfoTooltipUnSuccess);
        setText(ERROR_SERVER_MESSAGE);
        openInfoTooltip();
        console.log(`ошибка: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleLengthSearch(searchQuery) {
    if (searchQuery.length === NUMBER_0) {
      setImage(imageInfoTooltipUnSuccess);
      setText(NOT_SEARCH);
      openInfoTooltip();
    }
  }

  async function handleShortMoviesSearch() {
    if (shortMovies === false) {
      setShortMovies(true);
      localStorage.setItem(SHORT_MOVIES, JSON.stringify(!shortMovies));
    }
    if (shortMovies === true) {
      setShortMovies(false);
      localStorage.setItem(SHORT_MOVIES, JSON.stringify(!shortMovies));
    }
  }

  return (
    <section className="movies">
      <Header
        isLoggedIn={isLoggedIn}
      />
      <SearchForm
        onSearch={handleMoviesSearch}
        search={search}
        setSearch={setSearch}
        isSearchErr={isSearchErr}
        setIsSearchErr={setIsSearchErr}
        onFilter={handleShortMoviesSearch}
        shortMovies={shortMovies}
      />
      {isLoading &&
        <Preloader/>
      }
      {!isLoading &&
        <MoviesCardList
          movies={movies}
          isSavedMoviesPage={false}
          setSavedMovies={setSavedMovies}
          filterMovie={filterMovie}
        />
      }
      <Footer/>
    </section>
  )
}

export default Movies;
