import {
    SHOW_CONTROL_MUSIC,
    HIDDEN_TABBAR,
    LOAD_COLLECTION,
    LOAD_MUSIC,
    EDIT_MODE,
    ADD_ITEM_COLL_EDIT,
    REMOVE_ITEM_COLL_EDIT,
    ADD_ITEM_MUSIC_EDIT,
    REMOVE_ITEM_MUSIC_EDIT,
    SHOW_POPUP_RENAME,
    RESET_EDIT,
    SET_SOUND,
    SET_SOUND_STATUS,
    SET_INFO_MUSIC_PLAYING,
    SET_CURRENT_ID_COLLECTION_SELECT,
    SHOW_LOADING,
    SET_LIST_MUSIC_PLAYING,
    SET_INDEX_PLAYING,
    SET_SHUFFLE,
    SET_REPEAT,
    CHANGE_LANGUAGE,
    LOAD_SETTINGS,
    SHOW_ERROR_INTERNET,
} from './constrans';

export const showMusicControl = (status: boolean) => {
    return {
        type: SHOW_CONTROL_MUSIC,
        payload: status
    }
}

export const changeLanguage = (language:string) => {
    return {
        type: CHANGE_LANGUAGE,
        payload: language
    }
}

export const loadSettings = (settings:any) => {
    return {
        type: LOAD_SETTINGS,
        payload: settings
    }
}

export const showPopupRename = (status: boolean) => {
    return {
        type: SHOW_POPUP_RENAME,
        payload: status
    }
}

export const showTabbar = (status: boolean) => {
    return {
        type: HIDDEN_TABBAR,
        payload: status
    }
}

export const setEditMode = (status: boolean) => {
    return {
        type: EDIT_MODE,
        payload: status
    }
}

export const loadCollection = (data) => {
    return {
        type: LOAD_COLLECTION,
        payload: data
    }
}

export const loadMusic = (data) => {
    return {
        type: LOAD_MUSIC,
        payload: data
    }
}

export const addItemCollectionEdit = (data) => {
    return {
        type: ADD_ITEM_COLL_EDIT,
        payload: data
    }
}

export const removeItemCollectionEdit = (data) => {
    return {
        type: REMOVE_ITEM_COLL_EDIT,
        payload: data
    }
}

export const addItemMusicEdit = (data) => {
    return {
        type: ADD_ITEM_MUSIC_EDIT,
        payload: data
    }
}

export const removeItemMusicEdit = (data) => {
    return {
        type: REMOVE_ITEM_MUSIC_EDIT,
        payload: data
    }
}

export const resetEdit = () => {
    return {
        type: RESET_EDIT
    }
}

export const setSound = (data: any) => {
    return {
        type: SET_SOUND,
        payload: data
    }
}

export const setSoundStatus = (status: any) => {
    return {
        type: SET_SOUND_STATUS,
        payload: status
    }
}

export const setInfoMusicPlaying = (data: any) => {
    return {
        type: SET_INFO_MUSIC_PLAYING,
        payload: data
    }
}

export const setCurrentIDCollectionSelect = (id: any) => {
    return {
        type: SET_CURRENT_ID_COLLECTION_SELECT,
        payload: id
    }
}

export const showLoading = (status: any) => {
    return {
        type: SHOW_LOADING,
        payload: status
    }
}

export const showErrorInternet = (status: any) => {
    return {
        type: SHOW_ERROR_INTERNET,
        payload: status
    }
}

export const setListMusciPlaying = (data: any) => {
    return {
        type: SET_LIST_MUSIC_PLAYING,
        payload: data
    }
}

export const setIndexPlaying = (index: any) => {
    return {
        type: SET_INDEX_PLAYING,
        payload: index
    }
}

export const setShuffle = (status: any) => {
    return {
        type: SET_SHUFFLE,
        payload: status
    }
}

export const setRepeat = (status: any) => {
    return {
        type: SET_REPEAT,
        payload: status
    }
}