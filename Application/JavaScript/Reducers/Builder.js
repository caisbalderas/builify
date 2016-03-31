import { CurrentLocations } from '../Constants';
import { MAXIUMUM_PAGES_IN_STORAGE, TEMPLATE_PAGES_STORAGE_NAME, DialogTypes } from '../Constants';
import * as Actions from '../Actions/Constants';
import _ from 'lodash';
import DownloadPages from '../Common/DownloadPages';
import Storage from '../Common/Storage';

const builderInitialState = {
  isLoadingScreenActive: true,
  loadingScreenType: 0,
  currentLocation: 0,
  iconPacks: [],
  fontList: [],

  // Tabs
  isTabOpened: false,
  tabOpened: -1,
  isSidetabOpened: false,
  sidetabOpened: -1,

  // Pages
  isPageSelected: false,
  doPreviousPagesExistInStorage: false,
  pages: [],

  // Filter
  filterContentBlocksTarget: 'all',

  // Modal
  isModalOpen: false,
  modalType: null,
  modalTarget: null,

  // Images
  uploadedImages: []
};

function builder (state = builderInitialState, action) {
  let data = {};

  if (_.has(action, 'data')) {
    data = action.data;
  }

  switch (action.type) {
    case Actions.UPLOADED_IMAGE: {
      const { data } = action;

      return _.assign({}, state, {
        uploadedImages: [
          ...state.uploadedImages,
          {
            ...data
          }
        ]
      });
    }

    case Actions.GET_ICONPACKS: {
      const { iconPacks } = action;

      return _.assign({}, state, {
        iconPacks: iconPacks
      });
    }

    case Actions.DOWNLOAD_PAGES: {
      const { currentState } = action;
      const { pages } = state;
      const { pages: selectedPages } = action;
      const selectPagesLength = selectedPages.length;
      let queryPages = [];

      if (selectPagesLength !== 0) {
        for (let i = 0; i < selectPagesLength; i++) {
          queryPages.push(pages[selectedPages[i]]);
        }

        DownloadPages(queryPages, currentState);
      }

      return state;
    }

    case Actions.RESTART_PAGE: {
      const pages = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);
      const previousPages = !!(pages && pages.length !== 0);

      return _.assign({}, state, {
        currentLocation: CurrentLocations.STARTSCREEN,
        isPageSelected: false,
        pages: pages,
        doPreviousPagesExistInStorage: previousPages
      });
    }

    case Actions.SAVE_CURRENT_PAGE: {
      const pages = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);

      return _.assign({}, state, {
        pages: pages
      });
    }

    case Actions.OPEN_IMAGE_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.IMAGECHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_ICON_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.ICONCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.LINKCHANGE,
        modalTarget: action.target
      });

    case Actions.OPEN_PREVIOUS_PAGES_SELECT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.PREVIOUSPAGES
      });

    case Actions.OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.CONTENTBLOCKSOURCE,
        modalTarget: action.currentHoverBlock
      });

    case Actions.OPEN_DOWNLOAD_MODAL: {
      const { pages } = state;
      const pagesSize = _.size(pages);

      if (pagesSize === 1) {
        const { currentState } = action;

        DownloadPages(pages, currentState);
      } else if (pagesSize > 1) {
        return _.assign({}, state, {
          isModalOpen: true,
          modalType: DialogTypes.DOWNLOADPAGES
        });
      }

      return state;
    }

    case Actions.OPEN_RESTART_MODAL:
      return _.assign({}, state, {
        isModalOpen: true,
        modalType: DialogTypes.RESTART
      });

    case Actions.CLOSE_MODAL:
      return _.assign({}, state, {
        isModalOpen: false,
        modalType: null,
        modalTarget: null
      });

    case Actions.REMOVE_LOADING_SCREEN:
      return _.assign({}, state, {
        isLoadingScreenActive: false
      });

    case Actions.DO_PREVIOUS_PAGES_EXIST_IN_STORAGE: {
      const pagesInStorage = Storage.get(TEMPLATE_PAGES_STORAGE_NAME);

      if (pagesInStorage === null) {
        return state;
      }

      return _.assign({}, state, {
        doPreviousPagesExistInStorage: true,
        pages: pagesInStorage
      });
    }

    case Actions.START_NEW_PAGE: {
      const { pageID, pagesInStorage } = action;
      const pageObject = {
        pageID: pageID,
        pageTitle: 'Page Title',
        pageFileName: 'index.html',
        pageFullSource: null,

        navigation: {},
        main: [],
        footer: {},
        blocksCount: 0
      };
      let pagesList = [];

      if (pagesInStorage === null) {
        pagesList.push(pageObject);
        Storage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesList);
      } else {
        const cleanStorageFromOldPages = (arr) => {
          let arrayLen = arr.length;

          if (arrayLen > (MAXIUMUM_PAGES_IN_STORAGE - 1)) {
            arr.shift();
            cleanStorageFromOldPages(arr);
          }
        };

        pagesList = pagesInStorage;
        cleanStorageFromOldPages(pagesList);

        if (_.isArray(pagesList)) {
          pagesList.push(pageObject);
          Storage.set(TEMPLATE_PAGES_STORAGE_NAME, pagesList);
        } else {
          throw Error('Pages data type mismatches with storage pages.');
        }
      }

      return _.assign({}, state, {
        currentLocation: CurrentLocations.CANVAS,
        isPageSelected: true,
        pages: pagesList
      });
    }

    case Actions.CHECK_IF_PAGE_IS_SELECTED:
      return _.assign({}, state, {
        currentLocation: data.isPageSelected ? CurrentLocations.CANVAS : state.currentLocation,
        isPageSelected: data.isPageSelected
      });

    case Actions.LOAD_PREVIOUS_PAGE:
      return _.assign({}, state, {
        currentLocation: CurrentLocations.CANVAS,
        isPageSelected: true,
      });

    case Actions.OPEN_TAB:
      const { target } = action;
      let openTabElement = document.querySelector('[data-target="' + target + '"]');

      if (openTabElement) {
        openTabElement.classList.add('open');

        return _.assign({}, state, {
          isTabOpened: true,
          tabOpened: target
        });
      } else {
        return state;
      }

    case Actions.CLOSE_TAB:
      let closeTabElement = document.querySelector('[data-target="' + state.tabOpened + '"]');

      if (closeTabElement) {
        closeTabElement.classList.remove('open');

        return _.assign({}, state, {
          isTabOpened: false,
          tabOpened: -1
        });
      } else {
        return state;
      }

    case Actions.OPEN_SIDETAB:
      let sidetabElement = document.querySelector('[data-sidetabid="' + action.target + '"]');

      if (sidetabElement) {
        sidetabElement.classList.add('open');

        return _.assign({}, state, {
          isSidetabOpened: true,
          sidetabOpened: action.target
        });
      } else {
        return state;
      }

    case Actions.CLOSE_SIDETAB:
      let closeSidetabElement = document.querySelector(
        '[data-sidetabid="' + state.sidetabOpened + '"]'
      );

      if (closeSidetabElement) {
        closeSidetabElement.classList.remove('open');

        return _.assign({}, state, {
          isSidetabOpened: false,
          sidetabOpened: -1
        });
      } else {
        return state;
      }

    case Actions.OPEN_PREVIEW:
      if (state.currentLocation === CurrentLocations.TEMPLATESELECTION ||
          state.currentLocation === CurrentLocations.STARTSCREEN) {
        return state;
      } else {
        return _.assign({}, state, {
          currentLocation: CurrentLocations.PREVIEW
        });
      }

    case Actions.CLOSE_PREVIEW:
      return _.assign({}, state, {
        currentLocation: CurrentLocations.CANVAS
      });

    case Actions.FILTER_CONTENTBLOCKS:
      let actionTarget = action.target;

      return _.assign({}, state, {
        filterContentBlocksTarget: actionTarget
      });

    case Actions.OPEN_LINK_EDIT_MODAL:
      let linkTarget= action.target;

      return _.assign({}, state, {
        isModalOpen: true,
        modalType: 'linkchange',
        modalTarget: linkTarget
      });

    case Actions.CLOSE_MODAL:
      return _.assign({}, state, {
        isModalOpen: false,
        modalType: null,
        modalTarget: null
      });
  }

  return state;
}

export default builder;
