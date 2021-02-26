import { createStore } from "redux";

import { rootReducer } from './reducers'

var initState = {
    showMusic: false,
    hiddenTabbar: false,
    editMode: false,
    listCollection: [],
    listMusic: [],
    listCollectionEdit: [],
    listEditMusic:[],
    settings: {
        language: 'en'
    }
};

export const store = createStore(rootReducer,initState);