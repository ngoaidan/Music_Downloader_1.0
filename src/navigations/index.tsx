import React, { Component, useEffect, useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLLECTIONS, COLLECTIONSTACK, HOME, LISTCOLLECTIONTAB, LISTMUSIC, PLAYMUSIC, SETTINGS, TABNAVIGATION } from '@config/constrans';
import { Collection, Home, ListMusic, ListMusicTab, PlayMusic, Settings } from '@scenes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomTabBar } from '@components/atoms';
import Animated, { Easing } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';
import { dboCollection, dboMusic } from '@services/sqlite';
import { useDispatch } from 'react-redux';
import { loadCollection, loadMusic, loadSettings } from '@services/redux/actions';
import storage from '@config/initStorage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackCollection = createStackNavigator();
import DeviceInfo from 'react-native-device-info';
import { Alert } from 'react-native';


const CollectionStack = () => {
    return (
        <StackCollection.Navigator initialRouteName={COLLECTIONS} headerMode="none" >
            <StackCollection.Screen name={COLLECTIONS} component={Collection} ></StackCollection.Screen>
            <StackCollection.Screen
                name={LISTMUSIC}
                component={ListMusic}
                options={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                }}
            ></StackCollection.Screen>
            {/* <StackCollection.Screen
                name={PLAYMUSIC}
                component={PlayMusic}
                options={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal'
                }} ></StackCollection.Screen> */}
        </StackCollection.Navigator>
    )
}

const TabStack = () => {
    return (
        <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
            <Tab.Screen name={HOME} component={Home} ></Tab.Screen>
            <Tab.Screen name={LISTCOLLECTIONTAB} component={ListMusicTab}></Tab.Screen>
            <Tab.Screen name={COLLECTIONSTACK} component={CollectionStack}></Tab.Screen>
        </Tab.Navigator>
    )
}

const Navigator = () => {
    const [firstLoad, setFirstLoad] = useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        storage
            .load({
                key: 'settings',
                autoSync: true,
            })
            .then(res => {
                dispatch(loadSettings(res));
            })
            .catch(err => {
            })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('firstOpen').then(res => {
            if (res == null) {
                AsyncStorage.setItem('firstOpen', 'true')
                setFirstLoad(true)
            }
            else {
                setFirstLoad(false)
            }
        })
    }, [])


    const loadData = () => {
        dboCollection.SelectAll().then((res: any) => {
            dispatch(loadCollection(res))
        })
        dboMusic.SelectAll().then((res: any) => {
            dispatch(loadMusic(res))
        })
    }

    if (firstLoad == null) {
        return null;
    }
    else if (firstLoad == true) {
        console.log("first")
        let task1 = dboCollection.CreateTable().then((res: any) => {
        })
        let task4 = dboMusic.CreateTable().then((res: any) => {
        })

        let task2 = dboCollection.InsertItem({ name: "Download", thumbnail: "" }).then((res: any) => {
            if (res.status == 200) {
                console.log('Insert collection success')
            }
        })

        let task3 = dboCollection.InsertItem({ name: "Favourist", thumbnail: "" }).then((res: any) => {
            if (res.status == 200) {
                console.log('Insert collection success')
            }
        })

        Promise.all([task1, task2, task3, task4]).then(() => {
            loadData()
        })

        return (
            <NavigationContainer theme={DarkTheme} >
                <Stack.Navigator
                    initialRouteName={TABNAVIGATION}
                    headerMode="none"
                    screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: 'horizontal'

                    }}
                >
                    <Stack.Screen name={TABNAVIGATION} component={TabStack}></Stack.Screen>
                    <Stack.Screen
                        name={PLAYMUSIC}
                        component={PlayMusic}
                        options={{
                            gestureEnabled: true,
                            gestureDirection: 'horizontal'
                        }} ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
    else {
        loadData()
        return (
            <NavigationContainer theme={DarkTheme}>
                <Stack.Navigator
                    initialRouteName={TABNAVIGATION}
                    headerMode="none"
                    screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',

                    }}>
                    <Stack.Screen name={TABNAVIGATION} component={TabStack}></Stack.Screen>
                    <Stack.Screen name={SETTINGS} component={Settings} options={{
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        animationEnabled: false
                    }} ></Stack.Screen>
                    <Stack.Screen
                        name={PLAYMUSIC}
                        component={PlayMusic}
                        options={{
                            gestureEnabled: true,
                            gestureDirection: 'horizontal',
                            animationEnabled: false
                        }}

                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default Navigator;