import { IconPause, IconPlay, IconRepeat, IconShuffle, IconSkipForward, IconSkipNext } from '@assets/svg';
import Header3 from '@components/atoms/Header3';
import color from '@config/colors';
import metric from '@config/metrics';
import stylesGeneral from '@config/stylesGeneral';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MusicControl, { Command } from 'react-native-music-control';
import Sound from 'react-native-sound';
import { useSelector, useDispatch } from 'react-redux';
import { setListMusciPlaying, setRepeat, setShuffle, setSound, setSoundStatus, showMusicControl } from '@services/redux/actions';
import ItemMusicInPlayMusic from '@components/atoms/ItemMusicInPlayMusic';
import { ImageMusicDefault } from '@assets/images';
import { play, pause, resume, next, previous } from '@components/atoms/ControlMusic'
import IconRepeatOne from '@assets/svg/repeat1';

const renderItem = ({ item,index }) => (
    <ItemMusicInPlayMusic data={item} index={index}/>
);

const PlayMusic = () => {
    const dispatch = useDispatch()
    const listMusic = useSelector((state: any) => state?.listMusic)
    const infoMusicPlaying = useSelector((state: any) => state?.infoMusicPlaying)
    const currentIDCollectionSelect = useSelector((state: any) => state?.currentIDCollectionSelect)
    const soundTaskStatus = useSelector((state: any) => state?.soundTaskStatus)
    const shuffle = useSelector((state: any) => state?.shuffle)
    const [listDataShow, setListDataShow] = useState<any[]>([])
    const musicPlaying = useSelector((state: any) => state?.musicPlaying)
    const repeat = useSelector((state: any) => state?.repeat)

    useEffect(() => {
        let data: any[] = []
        if (listMusic != undefined || listMusic.length > 0) {
            listMusic.forEach((element: any) => {
                if (currentIDCollectionSelect == 1) {
                    data.push(element)
                }
                else if (element.id_collection == currentIDCollectionSelect) {
                    data.push(element)
                }
            })
        }
        dispatch(setListMusciPlaying(data))
        setListDataShow(data)
    }, [])

    return (
        <View style={[stylesGeneral.container, { alignItems: 'center', flexDirection: 'column' }]}>
            <Header3 />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, padding: 16 }}>
                <View style={{ backgroundColor: 'yellow', height: 100, width: 100, marginLeft: 8, borderRadius: 12 }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 12 }}
                        source={(infoMusicPlaying.thumbnail != '') ? { uri: infoMusicPlaying.thumbnail } : ImageMusicDefault}
                    />
                </View>
                <View style={{ height: 100, flex: 1, marginLeft: 16, padding: 8 }}>
                    <Text
                        numberOfLines={3}
                        ellipsizeMode="tail"
                        style={{ fontSize: 16, color: color.TITLE, fontWeight: 'bold' }}
                    >
                        {infoMusicPlaying?.name}</Text>
                </View>
            </View>


            <View style={[styles.constainControl]}>
                <TouchableOpacity onPress={() => {
                    if (shuffle) dispatch(setShuffle(false))
                    else {
                        dispatch(setShuffle(true))
                    }
                }}>
                    {shuffle ? <IconShuffle color={color.BUTTON_SHUFFLE} /> : <IconShuffle color="#fff" />}

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { previous(dispatch, shuffle) }}>
                    <IconSkipForward />
                </TouchableOpacity>
                {soundTaskStatus ?
                    <TouchableOpacity
                        style={[stylesGeneral.centerAll, styles.buttonPlay]}
                        onPress={() => {
                            pause()
                            dispatch(setSoundStatus(false))
                        }}
                    >
                        <IconPause />
                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={[stylesGeneral.centerAll, styles.buttonPlay]}
                        onPress={() => {
                            resume()
                            dispatch(setSoundStatus(true))
                        }}
                    >
                        <IconPlay />
                    </TouchableOpacity>}


                <TouchableOpacity onPress={() => {
                    next(dispatch, shuffle)
                }}>
                    <IconSkipNext />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        if (repeat == 0) dispatch(setRepeat(1))
                        else if (repeat == 1) dispatch(setRepeat(2))
                        else if (repeat == 2) dispatch(setRepeat(0))
                    }}>
                    {repeat == 2 ?
                        <IconRepeatOne /> : repeat == 1 ? <IconRepeat color={color.BUTTON_SHUFFLE} /> : <IconRepeat color={color.WHITE} />}
                </TouchableOpacity>

            </View>

            <View style={{ flex: 3, width: metric.DEVICE_WIDTH, padding: 16 }}>
                <FlatList
                    data={listDataShow}
                    renderItem={({ item, index }) => renderItem({ item, index })}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: metric.DEVICE_WIDTH - 70,
        width: metric.DEVICE_WIDTH - 70,
        backgroundColor: 'yellow',
        marginTop: 28,
        borderRadius: 24
    },
    name: {
        fontSize: 20,
        color: color.TITLE,
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    constainProcessBar: {
        height: 20,
        width: metric.DEVICE_WIDTH - 32,
        marginTop: 40,
    },
    constainControl: {
        height: 90,
        width: metric.DEVICE_WIDTH - 32,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 0,
        flexDirection: 'row',
        backgroundColor: color.BG_CARD,
        borderRadius: 12
    },
    buttonPlay: {
        backgroundColor: color.BUTTON_SHUFFLE,
        height: 66,
        width: 66,
        borderRadius: 33
    },
    constainList: {
        backgroundColor: 'red',
        marginTop: 44,
        width: metric.DEVICE_WIDTH,
        flex: 1
    },
    button: {
        height: 44,
        backgroundColor: color.BUTTON_SHUFFLE,
        width: metric.DEVICE_WIDTH / 2 - 32,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PlayMusic;