import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';

function SearchForm({ onSearch, search, setSearch, isSearchErr, setIsSearchErr, onFilter, shortMovies }) {

  function handleSearchChange(evt) {
    setSearch(evt.target.value);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();

    if(!search) {
      setIsSearchErr(true);
      return;
    }
    onSearch();
  }

return (
  <>
    <form
      className="search-form"
      onSubmit={handleSearchSubmit}>
      <fieldset className="search-form__fieldset">
        <input
          className="search-form__input"
          type="text"
          id="search"
          name="search"
          placeholder="Фильм"
          onChange={handleSearchChange}
          value={search}
        />
        <button
          className="search-form__button"
          type="submit"
          aria-label="search">
        </button>
        <span
          className={`search-form__error ${isSearchErr ? 'search-form__error-active' : ''}`}>
          Нужно ввести ключевое слово!
        </span>
      </fieldset>
      <FilterCheckbox
        onFilter={onFilter}
        shortMovies={shortMovies}
      />
    </form>
  </>
)
}

export default SearchForm;
