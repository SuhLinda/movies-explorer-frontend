import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';

function SearchForm() {
  return (
    <>
      <form className="search-form">
        <fieldset className="search-form__fieldset">
          <input
            className="search-form__input"
            placeholder="Фильм"
            required/>
          <button
            className="search-form__button"
            type="button"
            aria-label="search">
          </button>
        </fieldset>
        <FilterCheckbox />
      </form>
    </>
  )
}

export default SearchForm;
