function FilterCheckbox({ checked }) {

  return (
    <section className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        id="checkbox"
        aria-label="checkbox"
        type="checkbox"
        required
        checked={checked}>
      </input>
      <label className="filter-checkbox__text">
        Короткометражки
      </label>
    </section>
  )
}

export default FilterCheckbox;
