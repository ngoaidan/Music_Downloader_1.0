import { ImageMusicDefault } from '@assets/images';
import color from '@config/colors';
import metric from '@config/metrics';
import stylesGeneral from '@config/stylesGeneral';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import MusicControl, { Command } from 'react-native-music-control'
import Sound from 'react-native-sound'
import ControlMusic from '../ControlMusic';
import { useSelector, useDispatch } from 'react-redux';
import { addItemMusicEdit, removeItemMusicEdit, setIndexPlaying, setInfoMusicPlaying, setSound, setSoundStatus, showMusicControl } from '@services/redux/actions';
import { useNavigation } from '@react-navigation/native';
import { PLAYMUSIC } from '@config/constrans';

const ItemMusicInPlayMusic = (item: any) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const soundTask = useSelector((state: any) => state?.soundTask)

    return (
        <TouchableOpacity
            style={[styles.constain]} activeOpacity={0.5}
            onPress={() => {
                dispatch(showMusicControl(true))
                dispatch(setIndexPlaying(item.index))
                dispatch(setInfoMusicPlaying(item.data))
            }}
        >
            <View
                style={{ flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center', flex: 1, borderColor: color.LINE }}
            >
                <View style={styles.image}>
                    <Image
                        style={styles.image}
                        source={(item?.data.thumbnail != '') ? { uri: item?.data.thumbnail } : ImageMusicDefault}
                    />
                </View>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.title}
                >{item.data.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    constain: {
        height: 68,
        width: metric.DEVICE_WIDTH,
        flexDirection: 'row',

    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 12,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: color.TITLE,
        marginLeft: 12,
        marginRight: 80
    }
})

export default ItemMusicInPlayMusic;