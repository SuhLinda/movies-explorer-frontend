import { useEffect, useState } from 'react';

import { mainApi } from '../../../utils/MainApi.jsx';

import { handleMoviesFilter, handleShortMoviesFilter } from '../../../utils/functions.jsx';

import Header from '../../Header/Header.jsx';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../../Footer/Footer.jsx';
import Preloader from '../Preloader/Preloader.jsx';

import imageInfoTooltipUnSuccess from '../../../images/info-tooltip_unsuccessfully.svg';

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
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('shortMovies')) || false);

  useEffect(() => {
    JSON.parse(localStorage.getItem('savedMovies'));
    mainApi.getSavedMovies()
      .then((savedMovies) => {
        if (shortMovies === false) {
          const shortSavedMoviesList = handleShortMoviesFilter(savedMovies);
          setSavedMovies(shortSavedMoviesList.reverse());
        } else {
          setSavedMovies(savedMovies.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      })
    // eslint-disable-next-line
  }, [shortMovies, search]);

  async function handleMoviesSearch() {
    if (search.length === 0) {
      setIsSearchErr(true);
      setSavedMovies(savedMovies);
    } else {
      try {
        setIsLoading(true);
        setIsSearchErr(false);
        setSearch(search);

        if (shortMovies === false) {

        } else {
          const savedMoviesListSearch = handleMoviesFilter(savedMovies, search);

          handleLengthSearch(savedMoviesListSearch);
          setSavedMovies(savedMoviesListSearch);
        }

        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        localStorage.setItem('search', JSON.stringify(search));
        localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
      } catch (err) {
        setImage(imageInfoTooltipUnSuccess);
        setText('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        openInfoTooltip();
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  function handleLengthSearch(searchQuery) {
    if (searchQuery.length === 0) {
      setImage(imageInfoTooltipUnSuccess);
      setText('Ничего не найдено...');
      openInfoTooltip();
    }
  }

  async function handleShortMoviesSearch() {
    if (shortMovies === false) {
      setShortMovies(true);
    }
    if (shortMovies === true) {
      setShortMovies(false);
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
        <Preloader />
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
      <Footer />
    </section>
  )
}

export default SavedMovies;
