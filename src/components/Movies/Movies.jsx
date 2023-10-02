import Header from '../Header/Header.jsx'
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoreMovieCards from '../MoreMovieCards/MoreMovieCards.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer.jsx';

import { movies } from "../../utils/cardsMoviesList";

function Movies() {
  return (
    <section className="movies">
      <Header />
      <SearchForm />
      <MoviesCardList movies={movies} isSavedMoviesPage={false} />
      <MoreMovieCards />
      <Footer />
    </section>
  )
}

export default Movies;
