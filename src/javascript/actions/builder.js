import JSZip from 'jszip';
import {
    delay as _delay,
    map as _map,
    has as _has
} from 'lodash';
import Actions from './constants';
import iconPacksData from '../../configuration/icon-packs.json';
import imageLibrariesData from '../../configuration/images-library.json';
import builderConfigurationData from '../../configuration/builder.json';
import asideData from '../../configuration/aside.json';
import { checkPreviousPagesInStorage } from './page';
import { addNotification, demoNotification } from './notifications';
import { IS_DEMO_VERSION } from '../constants';

export function initialize() {
    return {
        type: Actions.INITIALIZE,
        meta: {
            throttle: true
        }
    };
}

export function removeLoadingScreen() {
    return (dispatch) => {
        dispatch({ type: Actions.LOGIC_INITIALIZED });

        _delay(() => {
            dispatch({ type: Actions.REMOVE_LOADING_SCREEN });
        }, 500);
    };
}

export function getBuilderConfiguration() {
    return {
        type: Actions.GET_BUILDER_CONFIGURATION
    };
}

export function receiveConfiguration() {
    return {
        type: Actions.RECEIVE_BUILDER_CONFIGURATION,
        data: JSON.parse(JSON.stringify(builderConfigurationData))
    };
}

export function receiveAsideConfiguration() {
    return {
        type: Actions.RECEIVE_ASIDE_CONFIGURATION,
        data: JSON.parse(JSON.stringify(asideData))
    };
}

export function addIconPackSourcesToHead(iconPacks) {
    const headElement = document.getElementsByTagName('head')[0];

    // Chromium bug.
    // Adding stylesheets at start results scrollbar not working.
    _delay(() => {
        _map(iconPacks, (iconPack) => {
            const { iconSource } = iconPack;
            const font = document.createElement('link');

            font.rel = 'stylesheet';
            font.type = 'text/css';
            font.href = iconSource;

            headElement.appendChild(font);
        });
    }, 1000);

    return {
        type: Actions.ADD_ICONPACK_SOURCES_TO_HEAD
    };
}

export function getIconPacks() {
    return (dispatch) => {
        if (_has(iconPacksData, 'iconPacks')) {
            const { iconPacks } = iconPacksData;

            dispatch(addIconPackSourcesToHead(iconPacks));
            dispatch({
                type: Actions.GET_ICONPACKS,
                iconPacks
            });
        } else {
            throw Error('Iconpacks not found.');
        }
    };
}

export function uploadImage(data) {
    return {
        type: Actions.UPLOADED_IMAGE,
        data
    };
}

export function downloadSinglePage() {
    return (dispatch, getState) => {
        if (IS_DEMO_VERSION) {
            dispatch(demoNotification());
        } else {
            dispatch({
                type: Actions.DOWNLOAD_SINGLE_PAGE,
                currentState: getState()
            });
        }
    };
}

export function downloadPages(pages) {
    return (dispatch, getState) => {
        if (IS_DEMO_VERSION) {
            dispatch(demoNotification());
        } else {
            dispatch({
                type: Actions.DOWNLOAD_PAGES,
                pages,
                currentState: getState()
            });
        }
    };
}

export function noPagesToDownload() {
    return (dispatch) => {
        dispatch({ type: Actions.NO_PAGES_TO_DOWNLOAD });
        dispatch(addNotification({
            message: 'No pages to download!',
            level: 'info'
        }));
    };
}

export function getImagesLibrary() {
    return {
        type: Actions.GET_IMAGESLIBRARY,
        data: imageLibrariesData
    };
}

export function cloneItem() {
    return {
        type: Actions.CLONE_ITEM
    };
}

export function changeBaseFontSize(value) {
    return {
        type: Actions.CHANGE_BASE_FONT_SIZE,
        value,
        meta: {
            throttle: 500
        }
    };
}

export function changeBaselineValue(value) {
    return {
        type: Actions.CHANGE_BASELINE_VALUE,
        value,
        meta: {
            throttle: 500
        }
    };
}

export function sendFeedBack() {
    return (dispatch) => {
        dispatch({ type: Actions.SEND_FEEDBACK });
        dispatch(addNotification({
            message: 'Feedback sent!',
            level: 'info'
        }));
    };
}

export function getTemplateFiles() {
    return (dispatch) => {
        const zip = new JSZip();
        const data = __BUILIFY_TEMPLATE; // eslint-disable-line

        zip.loadAsync(data, { base64: true, checkCRC32: true }).then(() => {
            zip.file('manifest.json').async('string')
                .then((contents) => {
                    dispatch({
                        type: Actions.GET_TEMPLATE_DATA,
                        data: JSON.parse(contents)
                    });
                    dispatch(getIconPacks());
                    dispatch(getImagesLibrary());
                });
        });
    };
}

export function runApplicationActions() {
    return (dispatch) => {
        dispatch(initialize());
        dispatch(checkPreviousPagesInStorage());
        dispatch(getBuilderConfiguration());
        dispatch(receiveConfiguration());
        dispatch(receiveAsideConfiguration());
        dispatch(getTemplateFiles());
    };
}
