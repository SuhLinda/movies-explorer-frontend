import useClosePopup from '../../hooks/useClosePopup.jsx';

import imageInfoTooltipSuccess from '../../images/info-tooltip_successfully.svg';
import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

function InfoTooltip({ isLogged, isOpen, onClose }) {
  useClosePopup(isOpen, onClose);

  return (
    <div className={`info__tooltip ${isOpen ? 'info__tooltip_opened' : ""}`}>
      <div className="info__tooltip_container">
        <button
          className="info__tooltip_button-close"
          id="info__tooltip_button-close"
          type="button"
          aria-label="close"
          onClick={onClose}>
        </button>
        {isLogged ? (
          <>
            <img
              className="info__tooltip_img"
              src={imageInfoTooltipSuccess}
              alt="Вы успешно зарегистрировались!"
            />
            <h2 className="info__tooltip_text">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
          <>
            <img
              className="info__tooltip_img"
              src={imageInfoTooltipUnSuccess}
              alt="Что-то пошло не так!"
            />
            <h2 className="info__tooltip_text">
              Что-то пошло не так!
            </h2>
          </>
        )}
      </div>
    </div>
  )
}

export default InfoTooltip;
