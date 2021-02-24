import storage from '@config/initStorage';
import { ListMusic } from '@scenes';
import {
    HIDDEN_TABBAR,
    SHOW_CONTROL_MUSIC,
    LOAD_COLLECTION,
    LOAD_MUSIC,
    EDIT_MODE,
    ADD_ITEM_COLL_EDIT,
    REMOVE_ITEM_COLL_EDIT,
    ADD_ITEM_MUSIC_EDIT,
    REMOVE_ITEM_MUSIC_EDIT,
    SHOW_POPUP_RENAME,
    RESET_EDIT, SET_SOUND,
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

var initState = {
    showMusic: false,
    loading: false,
    hiddenTabbar: false,
    editMode: false,
    listCollection: [],
    listMusic: [],
    listCollectionEdit: [],
    listEditMusic: [],
    popupRename: false,
    infoMusicPlaying: [],
    currentIDCollectionSelect: -1,
    showAlert:{
        errorInternet: false,

    },
    musicPlaying: {
        listMusic: [],
        indexPlaying: 0
    },
    shuffle: false,
    repeat: 0,
    settings: {
        language: 'en'
    }
};

export const rootReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case SHOW_CONTROL_MUSIC: {
            return {
                ...state,
                showMusic: action.payload
            }
        }
        case CHANGE_LANGUAGE: {
            let stateTemp = state;
            stateTemp.settings.language = action.payload
            updateSettings(stateTemp.settings)
            return {
                ...state,
                settings: {
                    ...state.settings,
                    language: action.payload
                }
            }
        }
        case LOAD_SETTINGS: {
            return {
                ...state,
                settings: action.payload
            }
        }
        case SHOW_ERROR_INTERNET:{
            return {
                ...state,
                showAlert: {
                    ...state.showAlert,
                    errorInternet: action.payload
                }
            }
        }
        case SHOW_POPUP_RENAME: {
            return {
                ...state,
                popupRename: action.payload
            }
        }
        case HIDDEN_TABBAR: {
            return {
                ...state,
                hiddenTabbar: action.payload
            }
        }
        case LOAD_COLLECTION: {
            return {
                ...state,
                listCollection: action.payload,
                listCollectionEdit: []
            }
        }
        case LOAD_MUSIC: {
            return {
                ...state,
                listMusic: action.payload
            }
        }
        case EDIT_MODE: {
            return {
                ...state,
                editMode: action.payload,
                listCollectionEdit: [],
                listEditMusic: []
            }
        }
        case ADD_ITEM_COLL_EDIT: {
            return {
                ...state,
                listCollectionEdit: [
                    ...state.listCollectionEdit,
                    action.payload
                ]
            }
        }
        case REMOVE_ITEM_COLL_EDIT: {
            return {
                ...state,
                listCollectionEdit: state.listCollectionEdit.filter(item => item.id !== action.payload.id)
            }
        }
        case ADD_ITEM_MUSIC_EDIT: {
            return {
                ...state,
                listEditMusic: [
                    ...state.listEditMusic,
                    action.payload
                ]
            }
        }
        case REMOVE_ITEM_MUSIC_EDIT: {
            return {
                ...state,
                listEditMusic: state.listEditMusic.filter(item => item.id !== action.payload.id)
            }
        }
        case RESET_EDIT: {
            return {
                ...state,
                listEditMusic: [],
                listCollectionEdit: []
            }
        }
        case SET_SOUND_STATUS: {
            return {
                ...state,
                soundTaskStatus: action.payload
            }
        }
        case SET_INFO_MUSIC_PLAYING: {
            return {
                ...state,
                infoMusicPlaying: action.payload
            }
        }
        case SET_CURRENT_ID_COLLECTION_SELECT: {
            return {
                ...state,
                currentIDCollectionSelect: action.payload
            }
        }

        case SHOW_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case SET_LIST_MUSIC_PLAYING: {
            return {
                ...state,
                musicPlaying: {
                    ...state.musicPlaying,
                    listMusic: action.payload
                }
            }
        }
        case SET_INDEX_PLAYING: {
            return {
                ...state,
                musicPlaying: {
                    ...state.musicPlaying,
                    indexPlaying: action.payload
                }
            }
        }

        case SET_SHUFFLE: {
            return {
                ...state,
                shuffle: action.payload
            }
        }

        case SET_REPEAT: {
            return {
                ...state,
                repeat: action.payload
            }
        }

    }
}

const updateSettings = async (settings) => {
    storage.save({
        key: "settings",
        data: settings,
        expires: null
    })
}