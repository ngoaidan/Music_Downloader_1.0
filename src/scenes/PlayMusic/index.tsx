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
import {  setListMusciPlaying, setRepeat, setShuffle, setSoundStatus, showMusicControl, showTabbar } from '@services/redux/actions';
import ItemMusicInPlayMusic from '@components/atoms/ItemMusicInPlayMusic';
import { ImageMusicDefault } from '@assets/images';
import {  pause, resume, next, previous } from '@components/atoms/ControlMusic'
import IconRepeatOne from '@assets/svg/repeat1';
import ControlMusic from"@components/atoms/ControlMusic"
import {
    AdMobInterstitial,
} from 'react-native-admob'

const renderItem = ({ item, index }) => (
    <ItemMusicInPlayMusic data={item} index={index} />
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
    const [currentDuration, setCurrentDuration] = useState(0);
    const [maxDuration, setMaxDuration] = useState(1);

    useEffect(() => {
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then();
    }, [])

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
            <Header3 infoMusicPlaying={infoMusicPlaying} />
          
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, padding: 16 }}>
                <View style={{ backgroundColor: 'yellow', height: 100, width: 100, marginLeft: 8, borderRadius: 12 }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 12 }}
                        source={(infoMusicPlaying.thumbnail != '') ? { uri: infoMusicPlaying.thumbnail } : ImageMusicDefault}
                    />
                </View>
                <View style={{ height: 100, flex: 1, marginLeft: 16, padding: 8, flexDirection: 'column' }}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{ fontSize: 16, color: color.TITLE, fontWeight: 'bold' }}
                    >
                        {infoMusicPlaying?.name}</Text>

                    {/* <TouchableOpacity
                        style={{
                            justifyContent:'center',
                            alignItems:'center',
                            // backgroundColor:color.BG_CARD,
                            borderRadius:4
                        }}
                        onPress={() => {
                            if (statusLike == 1) {
                                dboMusic.ChangeStatus(infoMusicPlaying.id, 0).then(res => {
                                    dboMusic.SelectAll().then(res => {
                                        dispatch(loadMusic(res))
                                    })
                                })
                                dboMusic.DeleteMusicInFavourist(infoMusicPlaying.id)
                            }
                            else {
                                dboMusic.ChangeStatus(infoMusicPlaying.id, 1).then(res => {
                                    dboMusic.SelectAll().then(res => {
                                        dispatch(loadMusic(res))
                                    })
                                })
                                dboMusic.MoveCollection(infoMusicPlaying.id, 2)
                            }
                        }}
                    >
                        {statusLike == 1 ? <IconHeart /> : <IconHeartOutline />}
                    </TouchableOpacity> */}
                </View>
            </View>


            <View style={[styles.constainControl]}>
                {/* <View style={[styles.constainProcessBar]}>
                    <Slider
                        style={{ width: metric.DEVICE_WIDTH, padding: 0 }}
                        minimumValue={0}
                        maximumValue={maxDuration}
                        minimumTrackTintColor={color.SEEKBAR}
                        maximumTrackTintColor="#56585b"
                        thumbTintColor={color.SEEKBAR}
                        value={currentDuration}
                        onValueChange={(value) => {
                            if (soundTask != undefined)
                                soundTask.setCurrentTime(value)
                        }}
                    />
                </View> */}
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