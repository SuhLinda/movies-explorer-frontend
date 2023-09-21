import {useState, useEffect} from 'react';

import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';

import useFormValidation from '../../../hooks/useFormValidation.jsx';
import React from "react";

function SearchForm({onSearch, isSearch, setIsSearchErr, setIsSearch, isShortFilm, onchangeCheckBox}) {
  const {values, errors, isValid, handleChangeForm} = useFormValidation();

  const [isInputErr, setIsInputErr] = useState(false);

  function handleSearchChange(evt) {
    setIsSearch(evt.target.value);
    setIsInputErr(false);
  }

  function handleSearchSubmit(evt) {
    evt.preventDefault();

    if(!isSearch) {
      setIsInputErr(true);
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
          value={isSearch}
          required/>
        <button
          className="search-form__button"
          type="submit"
          aria-label="search">
        </button>
        <span
          className={`search-form__error ${isInputErr ? 'search-form__error-active' : ''}`}>
          нужно ввести ключевое слово
        </span>
      </fieldset>
      <FilterCheckbox
        checked={isShortFilm}
        onChange={onchangeCheckBox}
      />
    </form>
  </>
)
}

export default SearchForm;
