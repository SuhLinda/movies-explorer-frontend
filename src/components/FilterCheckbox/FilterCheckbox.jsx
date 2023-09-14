function FilterCheckbox({ checked }) {

  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="checkbox"
        aria-label="checkbox"
        type="checkbox"
        checked={checked}>
      </input>
      <label className="filter-checkbox__text">
        Короткометражки
      </label>
    </div>
  )
}

export default FilterCheckbox;
