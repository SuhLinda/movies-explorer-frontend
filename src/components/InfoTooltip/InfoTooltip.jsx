import useClosePopup from '../../hooks/useClosePopup.jsx';

function InfoTooltip({isOpen, onClose, image, text}) {
  useClosePopup(isOpen, onClose);

  return (
    <>
      <div className={`info-tooltip ${isOpen && 'info-tooltip_opened'}`}>
        <div className="info-tooltip-container">
          <button
            className="tooltip-button-close"
            id="tooltip-button-close"
            type="button"
            aria-label="close"
            onClick={onClose}>
          </button>
          <img
            className="tooltip-img"
            src={image}
            alt={text}
          />
          <h2 className="tooltip-text">
            {text}
          </h2>
        </div>
      </div>
    </>
  )
}

export default InfoTooltip;
