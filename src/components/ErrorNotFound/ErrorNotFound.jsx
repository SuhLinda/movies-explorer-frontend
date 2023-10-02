import { useNavigate } from 'react-router-dom';

function ErrorNotFound() {
  const navigate = useNavigate();

  function openThePreviousPage() {
    navigate(-1);
  }

  return (
    <section className="error-not-found">
      <h2 className="error-not-found__title">
        404
      </h2>
      <p className="error-not-found__text">
        Страница не найдена
      </p>
      <button
        className="error-not-found__button"
        type="button"
        aria-label="back"
        onClick={openThePreviousPage}>
        Назад
      </button>
    </section>
  )
}

export default ErrorNotFound;
