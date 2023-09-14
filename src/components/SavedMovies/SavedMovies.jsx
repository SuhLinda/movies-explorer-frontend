import React from 'react';
import Header from '../Header/Header.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import Footer from '../Footer/Footer.jsx';
import { savedMovies } from "../../utils/cardsMoviesList";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header/>
      <SearchForm/>
      <MoviesCardList movies={savedMovies} isSavedMoviesPage={true}/>
      <Footer/>
    </section>
  )
}

export default SavedMovies;
