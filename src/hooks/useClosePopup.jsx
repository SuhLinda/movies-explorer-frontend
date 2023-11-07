import { useEffect } from 'react';

function useClosePopup(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    function handleOverlay(evt) {
      if (evt.target.classList.contains('burger-menu_opened' || 'info__tooltip_opened')) {
          onClose();
        }
    }

    function handleEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleOverlay);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleOverlay);
      document.removeEventListener("keydown", handleEsc);
    }
  }, [isOpen, onClose]);
}

export default useClosePopup;
