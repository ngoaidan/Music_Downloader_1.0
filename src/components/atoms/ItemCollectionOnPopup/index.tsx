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
import { addItemMusicEdit, loadMusic, removeItemMusicEdit } from '@services/redux/actions';
import { dboMusic } from '@services/sqlite';

const ItemCollectionOnPopup = (props: any) => {
    const editMode = useSelector((state: any) => state?.editMode)
    const listEditMusic = useSelector((state: any) => state?.listEditMusic)

    const [select, setSelect] = useState(false);
    const dispatch = useDispatch();

    return (
        <TouchableOpacity
            style={[styles.constain]} activeOpacity={0.5}
            onPress={() => {
                for (let i = 0; i < listEditMusic.length; i++) {
                    let index = i;
                    dboMusic.MoveCollection(listEditMusic[index].id, props.data.id).then(() => {
                        dboMusic.SelectAll().then((res: any) => {
                            dispatch(loadMusic(res))
                            props.setVisiable(false)
                        })
                    })
                }
            }}
        >
            <View
                style={{ flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center', flex: 1, borderColor: color.LINE }}
            >
                <View style={styles.image}>
                    <Image
                        style={styles.image}
                        source={(props?.data.thumbnail != '') ? { uri: props?.data.thumbnail } : ImageMusicDefault}
                    />
                </View>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.title}
                >{props.data.name}</Text>
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
        fontSize: 16,
        fontWeight: 'bold',
        color: color.TITLE,
        marginLeft: 12,
        marginRight: 80
    }
})

export default ItemCollectionOnPopup;