import Actions from './constants';
import TTStorage from '../modules/tt-storage';
import { TEMPLATE_PAGES_STORAGE_NAME, CurrentLocations } from '../constants';
import { addNotification } from './notifications';

export function startNewPage () {
  const pagesInStorage = TTStorage.get(TEMPLATE_PAGES_STORAGE_NAME);
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const uniqueKey = Math.random().toString(36).slice(-8);
  const pageID = `abpage-${currentTimestamp}-${uniqueKey}`;

  return {
    type: Actions.START_NEW_PAGE,
    pageID: pageID,
    pagesInStorage: pagesInStorage
  };
}

export function loadPreviousPage (idx) {
  return {
    type: Actions.LOAD_PREVIOUS_PAGE,
    idx: idx
  };
}

export function checkPreviousPagesInStorage () {
  return {
    type: Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE
  };
}

export function flushPagesInStorage () {
  return {
    type: Actions.FLUSH_PAGES_IN_STORAGE
  };
}

export function getCurrentPageData () {
  return {
    type: Actions.GET_CURRENT_PAGE_DATA
  };
}

export function saveCurrentPage () {
  return (dispatch, getState) => {
    const { builder } = getState();
    const { currentLocation } = builder;

    if (currentLocation !== CurrentLocations.STARTSCREEN) {
      dispatch({ type: Actions.SAVE_CURRENT_PAGE });
      dispatch(addNotification({
        message: 'Page saved',
        level: 'success'
      }));
    }
  };
}

export function downloadAsHTML () {
  return {
    type: Actions.DOWNLOAD_AS_HTML
  };
}

export function restartPage () {
  return {
    type: Actions.RESTART_PAGE
  };
}

export function setPageTitle (title) {
  return {
    type: Actions.SET_PAGE_TITLE,
    title: title
  };
}

export function setPageFilename (filename) {
  return {
    type: Actions.SET_PAGE_FILENAME,
    filename: filename
  };
}
