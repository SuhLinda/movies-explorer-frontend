import {useState, useContext, useEffect} from 'react';

import {CurrentUserContext} from '../../contexts/CurrentUserContext.jsx';

import {moviesApi} from '../../utils/MoviesApi.jsx';
import {handleMoviesFilter, handleShortMoviesFilter} from '../../utils/functions.jsx';

import Header from '../Header/Header.jsx';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer.jsx';
import Preloader from './Preloader/Preloader.jsx';

import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';
import {mainApi} from "../../utils/MainApi";

function Movies({isLoggedIn, isLoading, setIsLoading, setImage, setText, openInfoTooltip, savedMovies, setSavedMovies, isSavedMovies, setIsSavedMovies}) {
  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState(JSON.parse(localStorage.getItem('search')) || []);
  const [shortMovies, setShortMovies] = useState(JSON.parse(localStorage.getItem('shortMovies')) || false);
  const [isSearchErr, setIsSearchErr] = useState(false);
  const [filterMovie, setFilterMovie] = useState(JSON.parse(localStorage.getItem('filterMovie')) || []);

  useEffect(() => {
    localStorage.getItem('movies');

    if (shortMovies === false) {
      const shortMoviesList = handleShortMoviesFilter(movies);
      setMovies(shortMoviesList);
    } else {
      setMovies(movies);
    }
  }, [isLoggedIn, shortMovies]);

  async function handleMoviesSearch() {
    if (search.length === 0) {
      setIsSearchErr(true);
      setMovies([]);
    } else {
      try {
        setIsLoading(true);
        setIsSearchErr(false);
        setSearch(search);

        const movies = await moviesApi.getMovies();

        if (shortMovies === false) {
          const shortMoviesList = handleShortMoviesFilter(movies);

          const moviesListSearch = handleMoviesFilter(shortMoviesList, search);

          handleLengthSearch(moviesListSearch);

          setMovies(moviesListSearch);
          setFilterMovie(moviesListSearch);
        } else {
          const moviesListSearch = handleMoviesFilter(movies, search);

          handleLengthSearch(moviesListSearch);

          setMovies(moviesListSearch);
          setFilterMovie(moviesListSearch);
        }

        localStorage.setItem('movies', JSON.stringify(movies));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        localStorage.setItem('search', JSON.stringify(search));
        localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
        localStorage.setItem('filterMovie', JSON.stringify(filterMovie));

      } catch (err) {
        setIsSearchErr(false);
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
          isSavedMovies={isSavedMovies}
          setIsSavedMovies={setIsSavedMovies}
        />
      }
      <Footer/>
    </section>
  )
}

export default Movies;
