import React, { useEffect, useRef, useState } from 'react';
import Navigator from './src/navigations';
import { AppState, LogBox, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from "./src/services/redux/store"
import color from '@config/colors';
import PopupDelete from '@components/atoms/PopupDelete';
import PopupRename from '@components/atoms/PopupRename';
import PopupCollection from '@components/atoms/PopupCollection';
import PopupCreateCollect from '@components/atoms/PopupCreateCollect';
import SQLite from "react-native-sqlite-storage";
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import MusicControl from 'react-native-music-control';

const App = () => {
  LogBox.ignoreLogs(['Warning: ...'])
  LogBox.ignoreAllLogs();
  SQLite.enablePromise(true);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   AppState.addEventListener("change", _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener("change", _handleAppStateChange);
  //   };
  // }, []);

  // const _handleAppStateChange = (nextAppState) => {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     console.log("App has come to the foreground!");
  //   }
  //   if (
  //     nextAppState === "inactive"
  //   ) {
  //     console.log("App has come to the kill!");
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  //   console.log("AppState", appState.current);
  // };

  // useEffect(()=>{
  //   return     console.log("🚀 ~ file: App.tsx ~ line 48 ~ App ~ appStateVisible", appStateVisible)

  // },[])

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={color.BG_All} />
      <Navigator />
    
    </Provider>
  );
};

export default App;
