import {useState, useEffect} from 'react';
import Header from '../../Header/Header.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../../Footer/Footer.jsx';
import {mainApi} from "../../../utils/MainApi";
import { filterSearchShortMovies, filterSearchMovies } from "../../../utils/functions.jsx";

function SavedMovies({isLoggedIn, onDelete}) {
  const [savedMovie, setSavedMovie] = useState([]);
  const [search, setSearch] = useState('');
  const [isSearchErr, setIsSearchErr] =useState('');
  const [shortFilm, setIsShortFilm] = useState(false);


  useEffect(() => {
    mainApi.getSavedMovies()
      .then((savedMovies) => {
        setSavedMovie(savedMovies);

        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
  }, [setSavedMovie])




  function handleSearchErr(err) {
    setIsSearchErr(err);
    setSavedMovie([]);
  }

  function handleSearchSuccess(filterMovies) {
    setSavedMovie(filterMovies);
    setIsSearchErr('');
  }

  function handleMoviesSearch() {
    const savedMovies = localStorage.getItem('savedMovies')

    if (savedMovies) {
      setSavedMovie(JSON.parse(savedMovies));
      const filterMovies = filterSearchMovies(JSON.parse(savedMovies), search);

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
    }
  }

  function handleCheckboxChange() {
    setIsShortFilm(!shortFilm);

    const savedMovies = localStorage.getItem('savedMovies');

    if (!savedMovies) {
      return;
    }

    if (shortFilm) {
      const filterMovies = filterSearchMovies(JSON.parse(savedMovies), search);

      setSavedMovie(filterMovies);
    } else {
      const filterShortFilms = filterSearchShortMovies(savedMovie, true);

      setSavedMovie(filterShortFilms)
    }

  }

  /*function handleMovieDelete(movieID) {
    mainApi.deleteMovie(movieID)
      .then(() => {
        const findMovie = savedMovie.filter((item) =>
          item._id !== movieID
        );
        const findSavedMovies = JSON.parse(localStorage.getItem('savedMovies')).filter((item) =>
          item._id !== movieID
        )
        setSavedMovie(findMovie);
        localStorage.setItem('savedMovies', JSON.stringify(findSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      })
  }*/

  return (
    <section className="saved-movies">
      <Header
        isLoggedIn={isLoggedIn}
      />
      <SearchForm
        onSearch={handleMoviesSearch}
        search={search}
        setSearch={setSearch}
        setIsSearchErr={setIsSearchErr}
        shortFilm={shortFilm}
        onchangeCheckBox={handleCheckboxChange}
      />
      <MoviesCardList

        isSearchErr={isSearchErr}
        onDelete={onDelete}
        isSavedMoviesPage={true}
      />
      <Footer/>
    </section>
  )
}

export default SavedMovies;
