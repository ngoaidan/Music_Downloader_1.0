import { Platform } from "react-native"

export const PLATFORM = {
    IS_IOS: Platform.OS == 'ios',
    IS_ANDROID: Platform.OS == "android",
}

export const COLLECTIONS = 'Collections'
export const HOME = 'Home'
export const SETTINGS = 'Settings'
export const LISTMUSIC = 'ListMusic'
export const PLAYMUSIC = 'PlayMusic'
export const COLLECTIONEDIT = 'CollectionEdit'

export const COLLECTIONSTACK = "CollectionStack"
export const TABNAVIGATION = 'TabNavigator'