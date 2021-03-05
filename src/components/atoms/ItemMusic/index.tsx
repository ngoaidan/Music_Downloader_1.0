import { ImageMusicDefault } from '@assets/images';
import color from '@config/colors';
import metric from '@config/metrics';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { addItemMusicEdit, loadMusic, removeItemMusicEdit, setEditMode, setIndexPlaying, setInfoMusicPlaying, showMusicControl } from '@services/redux/actions';
import { useNavigation } from '@react-navigation/native';
import { PLAYMUSIC } from '@config/constrans';
import { isDuration } from 'moment';
import IconHeart from '@assets/svg/heart';
import { dboMusic } from '@services/sqlite';
import IconHeartOutline from '@assets/svg/heartOutline';

const ItemMusic = (item: any) => {
    const navigation = useNavigation();
    const editMode = useSelector((state: any) => state?.editMode)
    const [select, setSelect] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (select) {
            dispatch(addItemMusicEdit(item.data))
        }
        else {
            dispatch(removeItemMusicEdit(item.data))
        }
    }, [select])

    useEffect(() => {
        if (!editMode) {
            setSelect(false)
        }
    }, [editMode])

    return (
        <TouchableOpacity
            style={[styles.constain]} activeOpacity={0.5}
            onPress={() => {
                if (editMode) {
                    setSelect(!select)
                }
                else {
                    dispatch(showMusicControl(true))
                    dispatch(setInfoMusicPlaying(item.data))
                    dispatch(setIndexPlaying(item.index))
                    navigation.navigate(PLAYMUSIC);
                }
            }}
            onLongPress={() => {
                if (!editMode) {
                    dispatch(setEditMode(true))
                    setSelect(true)
                }
            }}
        >
            {editMode ? (<View style={{ height: 62 }} >
                <CheckBox
                    containerStyle={{ padding: 0, justifyContent: 'center', alignItems: "center", flex: 1 }}
                    iconRight
                    size={20}
                    uncheckedColor={color.CHECKBOX_UNCHECK}
                    checkedColor={color.CHECKBOX_CHECK}
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={select}
                    onPress={() => {
                        if (editMode) {
                            setSelect(!select)
                        }
                    }}
                />
            </View>) : null}
            <View
                style={{ flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center', width: '90%', borderColor: color.LINE }}
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
                    style={[styles.title]}
                >{item.data.name}</Text>
                {editMode ? null : (
                    <TouchableOpacity
                        style={{
                            height: 40, width: 40, justifyContent: 'center', alignItems: 'flex-end'
                        }}
                        onPress={() => {
                            if (item.data.like == 1) {
                                dboMusic.ChangeStatus(item.data.id, 0).then(res => {
                                    dboMusic.SelectAll().then(res => {
                                        dispatch(loadMusic(res))
                                    })
                                })
                                dboMusic.DeleteMusicInFavourist(item.data.id)
                            }
                            else {
                                dboMusic.ChangeStatus(item.data.id, 1).then(res => {
                                    dboMusic.SelectAll().then(res => {
                                        dispatch(loadMusic(res))
                                    })
                                })
                                dboMusic.MoveCollection(item.data.id, 2)
                            }
                        }}
                    >
                        {item.data.like == 1 ? <IconHeart /> : <IconHeartOutline />}
                    </TouchableOpacity>)}


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
        width: '70%',
        marginLeft: 10
    }
})

export default ItemMusic;