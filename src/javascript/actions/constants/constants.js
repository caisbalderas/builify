import keyMirror from 'ttkeymirror';

export default keyMirror([
    // Builder's actions
    'INITIALIZE',
    'REMOVE_LOADING_SCREEN',
    'GET_BUILDER_CONFIGURATION',
    'RECEIVE_BUILDER_CONFIGURATION',
    'RECEIVE_ASIDE_CONFIGURATION',
    'GET_ICONPACKS',
    'ADD_ICONPACK_SOURCES_TO_HEAD',
    'GET_IMAGESLIBRARY',
    'UPLOADED_IMAGE',
    'LOGIC_INITIALIZED',
    'GET_FONTS',
    'SEND_FEEDBACK',

    // Assets' actions.
    'UPLOAD_FILE',
    'SELECT_IMAGE_FILE',
    'DELETE_ALL_ASSETS',

    // Template's actions
    'GET_TEMPLATE_DATA',

    // Page's actions
    'SET_PAGE_TITLE',
    'START_NEW_PAGE',
    'LOAD_PREVIOUS_PAGE',
    'DO_PREVIOUS_PAGES_EXIST_IN_STORAGE',
    'FLUSH_PAGES_IN_STORAGE',
    'GET_CURRENT_PAGE_DATA',
    'SAVE_CURRENT_PAGE',
    'DOWNLOAD_PAGES',
    'DOWNLOAD_SINGLE_PAGE',
    'NO_PAGES_TO_DOWNLOAD',
    'RESTART_PAGE',
    'SET_PAGE_TITLE',
    'SET_PAGE_FILENAME',
    'IMPORT_PAGE',
    'EXPORT_PAGE',
    'DELETE_PAGE',

    // Tab's actions
    'OPEN_TAB',
    'CLOSE_TAB',
    'OPEN_SIDETAB',
    'CLOSE_SIDETAB',
    'SET_SWATCH',
    'SET_FONT',
    'OPEN_BLOCKEDITOR_TAB',
    'CLOSE_BLOCKEDITOR_TAB',

    // Preview's actions
    'SET_PREVIEW_MODE',

    // Notification's actions
    'ADD_NOTIFICATION',
    'ALERT_NOTIFICATION_FOR_REMOVAL',
    'REMOVE_NOTIFICATION',
    'REMOVE_ALL_NOTIFICATIONS',

    // Colorpicker's actions
    'OPEN_COLORPICKER',
    'SET_COLOR_FROM_COLORPICKER',
    'CLOSE_COLORPICKER',

    // Canvas' actions
    'SET_CANVAS_ELEMENTS_HOVER_EVENTS',

    // Tempate design's actions
    'LOAD_CONTENTBLOCK_TO_PAGE',
    'BLOCK_WAS_RENDERED_TO_PAGE',
    'CLEAR_PAGE_BLOCKS_COUNT',
    'UPDATE_CONTENTBLOCK_SOURCE',
    'CONTENTBLOCK_WAS_UPDATED',
    'CURRENT_HOVER_BLOCK',
    'REMOVE_CONTENTBLOCK',
    'CLONE_ITEM',
    'CHANGE_BASE_FONT_SIZE',
    'CHANGE_BASELINE_VALUE',
    'SET_CUSTOM_CSS',

    // Checkbox's actions
    'TOGGLE_BASELINE',

    // Modal's/Dialog's actions
    'OPEN_CONTENTBLOCK_SETTINGS',
    'SORT_CONTENTBLOCKS',
    'FILTER_CONTENTBLOCKS',
    'OPEN_CONTEXTMENU_TOOLBOX',
    'CLOSE_CONTEXTMENU_TOOLBOX',
    'OPEN_IMAGE_EDIT_MODAL',
    'OPEN_VIDEO_EDIT_MODAL',
    'OPEN_COUNTDOWN_EDIT_MODAL',
    'OPEN_ICON_EDIT_MODAL',
    'OPEN_CONTENTBLOCK_SOURCE_EDIT_MODAL',
    'OPEN_PREVIOUS_PAGES_SELECT_MODAL',
    'OPEN_DOWNLOAD_MODAL',
    'OPEN_RESTART_MODAL',
    'OPEN_FEEDBACK_MODAL',
    'OPEN_MAPS_MODAL',
    'OPEN_CUSTOMCSS_MODAL',
    'OPEN_LINK_CHANGE_MODAL',
    'OPEN_FORMEDIT_MODAL',
    'OPEN_HELP_MODAL',
    'CLOSE_MODAL'
]);
