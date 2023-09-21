import {useState, useEffect} from 'react';

import { filterSearchShortMovies, filterSearchMovies } from '../../utils/functions.jsx';
import useScreenWidth from '../../hooks/useScreenWidth.jsx';

import Header from '../Header/Header.jsx';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoreMovieCards from './MoreMovieCards/MoreMovieCards.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer.jsx';

import { moviesApi } from '../../utils/MoviesApi.jsx';
import { mainApi } from '../../utils/MainApi.jsx';

function Movies({ isLoggedIn }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchErr, setIsSearchErr] =useState('');
  const [shortFilm, setShortFilm] = useState(false);
  const [savedMovies, setSavedMovies] =useState([]);

  const [isNumberOfVisibleMovies, setNumberOfVisibleMovies, resetTheNumberOfVisibleMovies] = useScreenWidth();


  useEffect(() => {
    const savedSearchResult = localStorage.getItem('resultSearch');
    const savedSearch = localStorage.getItem('search');
    const savedShortFilm = localStorage.getItem('shortFilm');
    const savedMovies = localStorage.getItem('savedMovies');

    if (savedSearchResult && savedSearch) {
      setResultSearch(JSON.parse(savedSearchResult));
      setSearch(savedSearch);
      setShortFilm(savedShortFilm ? savedShortFilm === 'true' : false);
    } else {
      setShortFilm(false);
      setResultSearch([]);
    }

    if (savedMovies) {
      setSavedMovies(JSON.parse(savedMovies));
    }
  }, []);


  function  findSavedMoviesById(movie, savedMovies) {
    return savedMovies.find((saveMovie) =>
      saveMovie.movieId === movie.id
    );
  }

  const newSearchResult = resultSearch.map((movie) =>
    ({ ...movie, saved: findSavedMoviesById(movie)})
  )

  function handleSearchErr(err) {
    setIsSearchErr(err);
    setResultSearch([]);
  }

  function handleSearchSuccess(filterMovies) {
    setResultSearch(filterMovies);
    setIsSearchErr('');
    localStorage.setItem('resultSearch', JSON.stringify(filterMovies));
    localStorage.setItem('search', search);
  }

  function handleMoviesSearch() {
    resetTheNumberOfVisibleMovies(isNumberOfVisibleMovies);
    const movies  = localStorage.getItem('movies');

    if (movies) {
      setMovies(JSON.parse(movies));
      const filterMovies = filterSearchMovies(JSON.parse(movies), search);

      if (filterMovies.length === 0) {
        handleSearchErr('none');
        return;
      }

      if (shortFilm) {
        const filterShortFilms = filterSearchShortMovies(filterMovies, true);
        handleSearchSuccess(filterShortFilms, true);
      } else {
        handleSearchSuccess(filterMovies, false);
      }
    } else {
      setIsLoading(true);

      mainApi.getSavedMovies()
        .then((savedMovies) => {
          setSavedMovies(savedMovies)

          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch((err) => {
          console.log(err);

        })

      moviesApi.getMovies()
        .then((movies) => {
          setMovies(movies);
          const filterMovies = filterSearchMovies(movies, search);

          if (filterMovies.length === 0) {
            handleSearchErr('no');
            return;
          }

          if (shortFilm) {
            const filterShortFilm = filterSearchShortMovies(filterMovies, true);
            handleSearchSuccess(filterShortFilm, true);
          } else {
            handleSearchSuccess(filterMovies, false);
          }

          localStorage.setItem('movies', JSON.stringify(movies));
          localStorage.setItem('search', search);
        })
        .catch((err) => {
          setMovies([]);
          setResultSearch([]);
          handleSearchErr('111');
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }


  function handleCheckboxChange() {
    setShortFilm(!shortFilm);
    localStorage.setItem('shortFilm', !shortFilm ? 'true' : 'false');

    const movies = localStorage.getItem('movies');

    if (!movies) {
      return;
    }

    const savedShortFilms = localStorage.getItem('shortFilm');

    if (savedShortFilms === 'true') {
      const filterShortFilms = filterSearchShortMovies(resultSearch, true);
      localStorage.setItem('resultSearch', JSON.stringify(filterShortFilms));
      setResultSearch(filterShortFilms);
    } else {
      const movies = localStorage.getItem('movies');
      const filterMovies = filterSearchMovies(JSON.parse(movies), search);

      localStorage.setItem('resultSearch', JSON.stringify(filterMovies));
      setResultSearch(filterMovies);
    }
  }



  return (
    <section className="movies">
      <Header
        isLoggedIn={isLoggedIn}/>
      <SearchForm
        onSearch={handleMoviesSearch}
        search={search}
        setSearch={setSearch}
        setIsSearchErr={setIsSearchErr}
        shortFilm={shortFilm}
        onchangeCheckBox={handleCheckboxChange}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={newSearchResult.slice(0, isNumberOfVisibleMovies)}
        isSearchErr={isSearchErr}
        savedMovies={savedMovies}
        setSavedMovies={setSavedMovies}
      />

      <Footer />
    </section>
  )
}

export default Movies;
