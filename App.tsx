import React, { useEffect, useRef, useState } from 'react';
import Navigator from './src/navigations';
import { Alert, AppState, LogBox, StatusBar, View } from 'react-native';
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
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app'
import { fn_PushNotification } from '@services/api';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import PopupUpdateVersion from '@components/atoms/PopupUpdateVersion';
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';
import PushNotification from "react-native-push-notification";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
console.log("🚀 ~ file: App.tsx ~ line 27 ~ messaging ~ remoteMessage", remoteMessage)
  
  try {
    if (remoteMessage.data.type == 'version') {
      AsyncStorage.setItem('checkVersion', remoteMessage.data.data)
    }
    else if (remoteMessage.data.type == 'link') {
      AsyncStorage.setItem('link_chplay', remoteMessage.data.data)
    }
  } catch { }
});



const App = () => {
  LogBox.ignoreLogs(['Warning: ...'])
  LogBox.ignoreAllLogs();
  SQLite.enablePromise(true);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {      
      try {
        if (remoteMessage.data.type == 'version') {
          AsyncStorage.setItem('checkVersion', remoteMessage.data.data)
        }
        else if (remoteMessage.data.type == 'link') {
          AsyncStorage.setItem('link_chplay', remoteMessage.data.data)
        }
        else {
          fn_PushNotification(remoteMessage.notification.title, remoteMessage.notification.body)
        }
      } catch { }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "4",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: true,
        soundName: "default",
        importance: 1,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
    PushNotification.createChannel(
      {
        channelId: "1",
        channelName: "My channel",
        channelDescription: "A channel to categorise your notifications",
        playSound: true,
        soundName: "default",
        importance: 1,
        vibrate: true,
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );

    messaging()
			.subscribeToTopic('version')
			.then((value) => console.log('Subscribed to topic!' + value));
	
  }, [])

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [updateVersion, setUpdateVersion] = useState(false)

  const checkVersionCode = () => {
    AsyncStorage.getItem('checkVersion').then(res => {
      if (res == null) {
        AsyncStorage.setItem('checkVersion', DeviceInfo.getVersion())
      }
      else {
        let versionCode = DeviceInfo.getVersion();
        if (versionCode != res) {
          setUpdateVersion(true)
        }
      }
    })
  }

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

  useEffect(() => {
    checkVersionCode()
  }, [])

  return (
    <Provider store={store}>
      <StatusBar backgroundColor={color.BG_All} translucent={false} />
      <PopupUpdateVersion visiable={updateVersion} setVisiable={setUpdateVersion} />
      <Navigator />
    </Provider>
  );
};

export default App;
