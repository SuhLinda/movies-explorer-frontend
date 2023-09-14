import useClosePopup from '../../hooks/useClosePopup.jsx';

import imageInfoTooltipSuccess from '../../images/info-tooltip_successfully.svg';
import imageInfoTooltipUnSuccess from '../../images/info-tooltip_unsuccessfully.svg';

function InfoTooltip({ isLogged, isOpen, onClose }) {
  useClosePopup(isOpen, onClose);

  return (
    <div className={`info-tooltip ${isOpen ? 'info__tooltip_opened' : ""}`}>
      <div className="info-tooltip-container">
        <button
          className="tooltip-button-close"
          id="tooltip-button-close"
          type="button"
          aria-label="close"
          onClick={onClose}>
        </button>
        {isLogged ? (
          <>
            <img
              className="tooltip-img"
              src={imageInfoTooltipSuccess}
              alt="Вы успешно зарегистрировались!"
            />
            <h2 className="tooltip-text">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
          <>
            <img
              className="tooltip-img"
              src={imageInfoTooltipUnSuccess}
              alt="Что-то пошло не так!"
            />
            <h2 className="tooltip-text">
              Что-то пошло не так!
            </h2>
          </>
        )}
      </div>
    </div>
  )
}

export default InfoTooltip;
