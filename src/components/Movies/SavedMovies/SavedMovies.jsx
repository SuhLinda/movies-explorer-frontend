import { useEffect, useState } from 'react';

import { mainApi } from '../../../utils/MainApi.jsx';

import { handleMoviesFilter, handleShortMoviesFilter } from '../../../utils/functions.jsx';

import Header from '../../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';

import imageInfoTooltipUnSuccess from '../../../images/info-tooltip_unsuccessfully.svg';

import {
  SAVED_MOVIES,
  SHORT_SAVED_MOVIES,
  SEARCH_SAVED_MOVIES,
  FILTER_SAVED_MOVIES,
  ERROR_SERVER_MESSAGE,
  NOT_SEARCH,
  NUMBER_0,
} from '../../../utils/constants.jsx';

function SavedMovies(
  {
    isLoggedIn,
    isLoading,
    setIsLoading,
    setImage,
    setText,
    openInfoTooltip,
    savedMovies,
    setSavedMovies,
  }) {
  const [searchSavedMovies, setSearchSavedMovies] = useState(JSON.parse(localStorage.getItem(SEARCH_SAVED_MOVIES)) || []);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [shortSavedMovies, setShortSavedMovies] = useState(JSON.parse(localStorage.getItem(SHORT_SAVED_MOVIES)) || false);
  const [filterSavedMovie, setFilterSavedMovie] = useState([]);

  useEffect(() => {
    const filterSavedMovie = JSON.parse(localStorage.getItem(FILTER_SAVED_MOVIES));

    if (filterSavedMovie === null) {
      mainApi.getSavedMovies()
        .then((savedMovies) => {
          localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies));
          localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(filterSavedMovie));

          setIsLoading(true);
          setIsSearchErr(false);
          setSearchSavedMovies(searchSavedMovies);
          setSavedMovies(savedMovies.reverse());
        })
        .catch((err) => {
          setImage(imageInfoTooltipUnSuccess);
          setText(ERROR_SERVER_MESSAGE);
          openInfoTooltip();
          console.log(`ошибка: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        })
    } else {
      setSavedMovies(filterSavedMovie);
    }
    // eslint-disable-next-line
  }, []);

  async function handleMoviesSearch() {
    const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
    if (searchSavedMovies.length === NUMBER_0) {
      setIsSearchErr(true);
      setSavedMovies(savedMovies);
    } else {
      setIsLoading(true);
      setIsSearchErr(false);
      setSearchSavedMovies(searchSavedMovies);

      if (shortSavedMovies === false) {
        const savedMoviesListSearch = handleMoviesFilter(savedMovies, searchSavedMovies);

        handleLengthSearch(savedMoviesListSearch);

        setSavedMovies(savedMoviesListSearch.reverse());
        setFilterSavedMovie(savedMoviesListSearch.reverse());

        localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(savedMoviesListSearch));
      } else {
        const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
        const savedMoviesListSearch = handleMoviesFilter(shortSavedMoviesList, searchSavedMovies);

        handleLengthSearch(savedMoviesListSearch);
        setSavedMovies(savedMoviesListSearch.reverse());
        setFilterSavedMovie(savedMoviesListSearch.reverse());

        localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(savedMoviesListSearch));
      }
      setIsLoading(false);

      localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies));
      localStorage.setItem(SEARCH_SAVED_MOVIES, JSON.stringify(searchSavedMovies));
      localStorage.setItem(SHORT_SAVED_MOVIES, JSON.stringify(shortSavedMovies));
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
    if (shortSavedMovies === false) {
      localStorage.setItem(SHORT_SAVED_MOVIES, JSON.stringify(!shortSavedMovies));

      const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
      setShortSavedMovies(true);

      if (searchSavedMovies.length === NUMBER_0) {
        const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
        setSavedMovies(shortSavedMoviesList.reverse());

        setFilterSavedMovie(shortSavedMoviesList.reverse());

        localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(shortSavedMoviesList.reverse()));

      } else {
        const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
        const savedMoviesListSearch = handleMoviesFilter(shortSavedMoviesList, searchSavedMovies);

        handleLengthSearch(savedMoviesListSearch);
        setSavedMovies(savedMoviesListSearch.reverse());

        setFilterSavedMovie(savedMoviesListSearch.reverse());

        localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(savedMoviesListSearch.reverse()));
      }
    } else {
      localStorage.setItem(SHORT_SAVED_MOVIES, JSON.stringify(!shortSavedMovies));

      const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
      setShortSavedMovies(false);

      if (searchSavedMovies.length === NUMBER_0) {
        setSavedMovies(savedMovies.reverse());

        localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(savedMovies.reverse()));

        setFilterSavedMovie(savedMovies.reverse());
      } else {
        const savedMoviesListSearch = handleMoviesFilter(savedMovies, searchSavedMovies);

        handleLengthSearch(savedMoviesListSearch);

        setSavedMovies(savedMoviesListSearch.reverse());

        localStorage.setItem(FILTER_SAVED_MOVIES, JSON.stringify(savedMoviesListSearch.reverse()));

        setFilterSavedMovie(savedMoviesListSearch.reverse());
      }
    }
  }

  return (
    <section className="saved-movies">
      <Header
        isLoggedIn={isLoggedIn}
      />
      <SearchForm
        onSearch={handleMoviesSearch}
        search={searchSavedMovies}
        setSearch={setSearchSavedMovies}
        isSearchErr={isSearchErr}
        setIsSearchErr={setIsSearchErr}
        onFilter={handleShortMoviesSearch}
        shortMovies={shortSavedMovies}
      />
      {isLoading &&
        <Preloader />
      }
      {!isLoading &&
        <MoviesCardList
          movies={savedMovies}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isSavedMoviesPage={true}
          filterMovie={filterSavedMovie}
          setImage={setImage}
          setText={setText}
          openInfoTooltip={openInfoTooltip}
        />
      }
      <Footer/>
    </section>
  )
}

export default SavedMovies;
