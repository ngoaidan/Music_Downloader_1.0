import { IconPause, IconPlay, IconShuffle, IconSkipNext } from '@assets/svg';
import color from '@config/colors';
import metric from '@config/metrics';
import stylesGeneral from '@config/stylesGeneral';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useSelector, useDispatch } from 'react-redux';
import { setIndexPlaying, setInfoMusicPlaying, setSoundStatus } from '@services/redux/actions';
import Sound from 'react-native-sound';
import { isDuration } from 'moment';
import { ImageMusicDefault } from '@assets/images';
import MusicControl, { Command } from 'react-native-music-control'
import { fn_GetRandomID } from '@services/api';
import { useNavigation } from '@react-navigation/native';
import { PLAYMUSIC } from '@config/constrans';

var soundTask;
var repeat;
var musicPlaying;

export const play = (infoMusicPlaying, setMaxDuration, dispatch, shuffle) => {
    MusicControl.setNotificationId(11, 'channel')
    MusicControl.enableBackgroundMode(true);

    if (soundTask) soundTask.release()
    soundTask = new Sound(infoMusicPlaying.path, Sound.MAIN_BUNDLE, async (error) => {
        if (error) {
            return;
        }

        MusicControl.setNowPlaying({
            title: infoMusicPlaying.name,
            artwork: infoMusicPlaying.thumbnail,
            duration: soundTask.getDuration(),
            description: '',
            color: 0xffffff,
            colorized: true,
            date: '1983-01-02T00:00:00Z',
            notificationIcon: 'my_custom_icon',
            isLiveStream: true,
        })
        
        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableControl('nextTrack', true)
        MusicControl.enableControl('previousTrack', true)
        MusicControl.enableControl('changePlaybackPosition', true)
        MusicControl.updatePlayback({ state: MusicControl.STATE_PLAYING })
        MusicControl.enableControl('closeNotification', true, { when: 'always' })

        MusicControl.on(Command.play, () => {
            resume()
            dispatch(setSoundStatus(true))
        })
        MusicControl.on(Command.pause, () => {
            dispatch(setSoundStatus(false))
            pause()
        })

        MusicControl.on(Command.nextTrack, () => {
            next(dispatch, shuffle)
        })

        MusicControl.on(Command.previousTrack, () => {
            previous(dispatch, shuffle)
        })
        soundTask.play(() => {
            if (repeat == 2) {
                console.log("🚀 ~ file: index.tsx ~ line 68 ~ soundTask.play ~ repeat", repeat)
                play(infoMusicPlaying, setMaxDuration, dispatch, shuffle)
            }
            else {
                next(dispatch, shuffle)
            }
        })
        setMaxDuration(soundTask.getDuration())
    })
}

export const stop = () => {
    soundTask.stop(() => {
        //soundTask.play()
    })
}

export const resume = () => {
    MusicControl.updatePlayback({ state: MusicControl.STATE_PLAYING })
    soundTask.play(() => {

    })
}

export const pause = () => {
    MusicControl.updatePlayback({ state: MusicControl.STATE_PAUSED })
    soundTask.pause()
}

export const next = (dispatch, shuffle) => {
    if (shuffle) {
        let indexRandom = fn_GetRandomID(musicPlaying.listMusic.length - 1)
        dispatch(setIndexPlaying(indexRandom))
        dispatch(setInfoMusicPlaying(musicPlaying.listMusic[indexRandom]))
    }
    else {
        if (musicPlaying.indexPlaying + 1 > musicPlaying.listMusic.length - 1) {
            console.log(musicPlaying.indexPlaying + 1)
            let newIndex = 0;
            dispatch(setIndexPlaying(newIndex))
            dispatch(setInfoMusicPlaying(musicPlaying.listMusic[newIndex]))
        }
        else {
            let newIndex = musicPlaying.indexPlaying + 1
            dispatch(setIndexPlaying(newIndex))
            dispatch(setInfoMusicPlaying(musicPlaying.listMusic[newIndex]))
        }
    }
}

export const previous = (dispatch, shuffle) => {
    if (shuffle) {
        let indexRandom = fn_GetRandomID(musicPlaying.listMusic.length - 1)
        dispatch(setIndexPlaying(indexRandom))
        dispatch(setInfoMusicPlaying(musicPlaying.listMusic[indexRandom]))
    }
    else {
        if (musicPlaying.indexPlaying - 1 < 0) {
            let newIndex = musicPlaying.listMusic.length - 1;
            dispatch(setIndexPlaying(newIndex))
            dispatch(setInfoMusicPlaying(musicPlaying.listMusic[newIndex]))
        }
        else {
            let newIndex = musicPlaying.indexPlaying - 1
            dispatch(setIndexPlaying(newIndex))
            dispatch(setInfoMusicPlaying(musicPlaying.listMusic[newIndex]))
        }
    }
}

const ControlMusic = () => {
    const dispatch = useDispatch()
    const [currentDuration, setCurrentDuration] = useState(0);
    const [maxDuration, setMaxDuration] = useState(1);
    const infoMusicPlaying = useSelector((state: any) => state?.infoMusicPlaying)
    const soundTaskStatus = useSelector((state: any) => state?.soundTaskStatus)
    musicPlaying = useSelector((state: any) => state?.musicPlaying)
    const shuffle = useSelector((state: any) => state?.shuffle)
    const navigation = useNavigation();
    repeat = useSelector((state: any) => state?.repeat)

    useEffect(() => {
        if (soundTask) {
            dispatch(setSoundStatus(true))
            var timer = setInterval(() => {
                soundTask.getCurrentTime((seconds) => {
                    setCurrentDuration(seconds)
                });
            }, 1000);
            return (() => {
                clearInterval(timer)
            })
        }
    }, [soundTask])

    useEffect(() => {
        play(infoMusicPlaying, setMaxDuration, dispatch, shuffle)
        setCurrentDuration(0)
        dispatch(setSoundStatus(true))
    }, [infoMusicPlaying])

    return (
        <View style={styles.rootView}>
            <View style={[styles.constainProcessBar]}>
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
            </View>
            <View style={styles.constain}>
                <TouchableOpacity
                    style={{ height: 32, flexDirection: 'row', alignItems: 'center', flex: 1 }}
                    onPress={() => {
                        navigation.navigate(PLAYMUSIC, {});
                    }}
                >
                    <View style={{ height: 32, width: 32, borderRadius: 6 }}>
                        <Image
                            style={{ height: 32, width: 32, borderRadius: 6 }}
                            source={(infoMusicPlaying?.thumbnail != '') ? { uri: infoMusicPlaying?.thumbnail } : ImageMusicDefault}
                        />
                    </View>
                    <Text
                        style={{ fontSize: 16, width: metric.DEVICE_WIDTH - 180, fontWeight: 'bold', color: color.TITLE, marginLeft: 10 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{infoMusicPlaying?.name}</Text>
                </TouchableOpacity>
                <View style={styles.constainControl}>
                    {soundTaskStatus ?
                        <TouchableOpacity
                            onPress={() => {
                                pause()
                                dispatch(setSoundStatus(false))
                            }}
                        >
                            <IconPause />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                resume()
                                dispatch(setSoundStatus(true))
                            }}
                        >
                            <IconPlay />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        onPress={() => {
                            next(dispatch, shuffle)
                        }}>
                        <IconSkipNext />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
        width: metric.DEVICE_WIDTH,
        backgroundColor: color.BG_CARD,

    },
    constain: {
        height: 58,
        width: metric.DEVICE_WIDTH,
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        flexDirection: 'row'
    },
    constainControl: {
        height: 38,
        width: 70,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    constainProcessBar: {
        width: metric.DEVICE_WIDTH,
        height: 10
    },
})

export default ControlMusic;