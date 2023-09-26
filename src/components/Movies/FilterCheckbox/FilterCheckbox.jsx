function FilterCheckbox({ shortMovies, onFilter }) {

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="checkbox"
        aria-label="checkbox"
        type="checkbox"
        checked={shortMovies}
        onChange={onFilter}>
      </input>
      <label className="filter-checkbox__text">
        Короткометражки
      </label>
    </div>
  )
}

export default FilterCheckbox;
