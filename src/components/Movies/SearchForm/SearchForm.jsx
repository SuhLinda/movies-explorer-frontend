import {useState} from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';

import useFormValidation from '../../../hooks/useFormValidation.jsx';

function SearchForm({onSearch, search, setSearch, setIsSearchErr, shortFilm, onchangeCheckBox}) {

  const [isErr, setIsErr] = useState(false);

  function handleSearchChange(evt) {
    setSearch(evt.target.value);
    setIsErr(false);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();

    if(!search) {
      setIsErr(true);
      setIsSearchErr('');
      return;
    }
    onSearch();
  }

return (
  <>
    <form className="search-form" onSubmit={handleSearchSubmit}>
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
          className={`search-form__error ${isErr ? 'search-form__error-active' : ''}`}>
          Нужно ввести ключевое слово!
        </span>
      </fieldset>
      <FilterCheckbox
        checked={shortFilm}
        onChange={onchangeCheckBox}
      />
    </form>
  </>
)
}

export default SearchForm;
