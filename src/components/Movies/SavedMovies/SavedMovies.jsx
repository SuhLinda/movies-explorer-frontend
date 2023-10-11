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
  SHORT_MOVIES,
  SEARCH,
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
    isSavedMovies,
    setIsSavedMovies,
  }) {
  const [search, setSearch] = useState([]);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem(SHORT_MOVIES)) || false);

  useEffect(() => {
    mainApi.getSavedMovies()
      .then((savedMovies) => {
        localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies));

        setIsLoading(true);
        setIsSearchErr(false);
        setSearch(search);
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
    // eslint-disable-next-line
  }, []);

  async function handleMoviesSearch() {
    const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
    if (search.length === NUMBER_0) {
      setIsSearchErr(true);
      setSavedMovies(savedMovies);
    } else {
      setIsLoading(true);
      setIsSearchErr(false);
      setSearch(search);

      if (shortMovies === false) {
        const savedMoviesListSearch = handleMoviesFilter(savedMovies, search);

        handleLengthSearch(savedMoviesListSearch);

        setSavedMovies(savedMoviesListSearch.reverse());
      } else {
        const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
        const savedMoviesListSearch = handleMoviesFilter(shortSavedMoviesList, search);

        handleLengthSearch(savedMoviesListSearch);
        setSavedMovies(savedMoviesListSearch.reverse());
      }
      setIsLoading(false);

      localStorage.setItem(SAVED_MOVIES, JSON.stringify(savedMovies));
      localStorage.setItem(SEARCH, JSON.stringify(search));
      localStorage.setItem(SHORT_MOVIES, JSON.stringify(shortMovies));
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
      const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
      setShortMovies(true);

      if (search.length === NUMBER_0) {
        const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
        setSavedMovies(shortSavedMoviesList.reverse());

      } else {
        const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
        const savedMoviesListSearch = handleMoviesFilter(shortSavedMoviesList, search);


        handleLengthSearch(savedMoviesListSearch);
        setSavedMovies(savedMoviesListSearch.reverse());
      }
    } else {
      const savedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));
      setShortMovies(false);

      if (search.length === NUMBER_0) {
        setSavedMovies(savedMovies.reverse());
      } else {
        const savedMoviesListSearch = handleMoviesFilter(savedMovies, search);

        handleLengthSearch(savedMoviesListSearch);

        setSavedMovies(savedMoviesListSearch.reverse());
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
          movies={savedMovies}
          savedMovies={savedMovies}
          setSavedMovies={setSavedMovies}
          isSavedMoviesPage={true}
          isSavedMovies={isSavedMovies}
          setIsSavedMovies={setIsSavedMovies}
        />
      }
      <Footer/>
    </section>
  )
}

export default SavedMovies;
