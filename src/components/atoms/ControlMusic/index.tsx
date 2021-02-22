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

export const play = (infoMusicPlaying, setMaxDuration, dispatch, musicPlaying, shuffle, repeat) => {
    if (soundTask) soundTask.release()
    soundTask = new Sound(infoMusicPlaying.path, Sound.MAIN_BUNDLE, async (error) => {
        if (error) {
            console.log('failed to load the sound', error);
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
        MusicControl.enableBackgroundMode(true);
        MusicControl.handleAudioInterruptions(true);
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
            next(dispatch, musicPlaying, shuffle, repeat)
        })

        MusicControl.on(Command.previousTrack, () => {
            previous(dispatch, musicPlaying, shuffle)
        })
        soundTask.play(() => {
            if (repeat == 2) {
                console.log("🚀 ~ file: index.tsx ~ line 155 ~ soundTask.play ~ musicPlaying.indexPlaying", musicPlaying.indexPlaying)
                console.log("🚀 ~ file: index.tsx ~ line 155 ~ soundTask.play ~ musicPlaying.listMusic[musicPlaying.indexPlaying]", musicPlaying.listMusic[musicPlaying.indexPlaying])

                dispatch(setInfoMusicPlaying(musicPlaying.listMusic[musicPlaying.indexPlaying]))
            }
            else {
                next(dispatch, musicPlaying, shuffle, repeat)
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

export const next = (dispatch, musicPlaying, shuffle, repeat) => {
    if (shuffle) {
        let indexRandom = fn_GetRandomID(musicPlaying.listMusic.length - 1)
        dispatch(setIndexPlaying(indexRandom))
        dispatch(setInfoMusicPlaying(musicPlaying.listMusic[indexRandom]))
    }
    else {
        if (repeat == 1 && musicPlaying.listMusic.length - 1 == musicPlaying.indexPlaying + 1) {
            soundTask.release()
        }
        else if (musicPlaying.listMusic.length - 1 < musicPlaying.indexPlaying + 1) {
            dispatch(setIndexPlaying(0))
            dispatch(setInfoMusicPlaying(musicPlaying.listMusic[0]))
        }
        else {
            let newIndex = musicPlaying.indexPlaying + 1
            dispatch(setIndexPlaying(newIndex))
            dispatch(setInfoMusicPlaying(musicPlaying.listMusic[newIndex]))
        }
    }
}

export const previous = (dispatch, musicPlaying, shuffle) => {
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
    const musicPlaying = useSelector((state: any) => state?.musicPlaying)
    const shuffle = useSelector((state: any) => state?.shuffle)
    const navigation = useNavigation();
    const repeat = useSelector((state: any) => state?.repeat)


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
        play(infoMusicPlaying, setMaxDuration, dispatch, musicPlaying, shuffle, repeat)
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
                        navigation.navigate(PLAYMUSIC);
                    }}
                >
                    <View style={{ height: 32, width: 32, borderRadius: 6 }}>
                        <Image
                            style={{ height: 32, width: 32, borderRadius: 6 }}
                            source={(infoMusicPlaying.thumbnail != '') ? { uri: infoMusicPlaying.thumbnail } : ImageMusicDefault}
                        />
                    </View>
                    <Text
                        style={{ fontSize: 16, width: metric.DEVICE_WIDTH - 180, fontWeight: 'bold', color: color.TITLE, marginLeft: 10 }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >{infoMusicPlaying.name}</Text>
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
                            next(dispatch, musicPlaying, shuffle, repeat)
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