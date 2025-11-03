let popupInstance = null;

export const setPopupInstance = (popup) => {
  popupInstance = popup;
};

export const closePopup = () => {
  if (popupInstance && popupInstance.opened) {
    popupInstance.close();
  }
};

export const destroyPopup = () => {
  if (popupInstance) {
    popupInstance.destroy();
    popupInstance = null;
  }
};
