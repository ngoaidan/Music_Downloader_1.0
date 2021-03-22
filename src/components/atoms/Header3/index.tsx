import { IconBack, IconThreeDot } from '@assets/svg';
import IconHeart from '@assets/svg/heart';
import IconHeartOutline from '@assets/svg/heartOutline';
import color from '@config/colors';
import metric from '@config/metrics';
import { useNavigation } from '@react-navigation/native';
import { loadMusic } from '@services/redux/actions';
import { dboMusic } from '@services/sqlite';
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';


const Header3 = (props: any) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [statusLike, setStatusLike] = useState(0)
    const infoMusicPlaying = useSelector((state: any) => state?.infoMusicPlaying)

    useEffect(() => {
        setStatusLike(props.infoMusicPlaying.like)
    }, [infoMusicPlaying])

    return (
        <View style={[styles.container]}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <IconBack />
            </TouchableOpacity>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                   // backgroundColor:color.BG_CARD,
                    borderRadius: 4
                }}
                onPress={() => {
                    if (statusLike == 1) {
                        dboMusic.ChangeStatus(props.infoMusicPlaying.id, 0).then(res => {
                            dboMusic.SelectAll().then(res => {
                                dispatch(loadMusic(res))
                            })
                        })
                        dboMusic.DeleteMusicInFavourist(props.infoMusicPlaying.id)
                        setStatusLike(0)
                    }
                    else {
                        dboMusic.ChangeStatus(props.infoMusicPlaying.id, 1).then(res => {
                            dboMusic.SelectAll().then(res => {
                                dispatch(loadMusic(res))
                            })
                        })
                        dboMusic.MoveCollection(props.infoMusicPlaying.id, 2)
                        setStatusLike(1)

                    }
                }}
            >
                {statusLike == 1 ? <IconHeart /> : <IconHeartOutline />}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 19,
        height: 30,
        paddingHorizontal: 16,
        width: metric.DEVICE_WIDTH,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        color: color.SUB_TITLE,
        fontWeight: 'bold',

    }
})

export default Header3;