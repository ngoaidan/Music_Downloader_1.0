import { ImageMusicDefault } from '@assets/images';
import color from '@config/colors';
import metric from '@config/metrics';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { addItemMusicEdit, removeItemMusicEdit, setEditMode, setIndexPlaying, setInfoMusicPlaying, showMusicControl } from '@services/redux/actions';
import { useNavigation } from '@react-navigation/native';
import { PLAYMUSIC } from '@config/constrans';
import { isDuration } from 'moment';

const ItemMusic = (item: any,) => {
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

    useEffect(()=>{
        if(!editMode){
            setSelect(false)
        }
    },[editMode])

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
        fontSize: 16,
        fontWeight: 'bold',
        color: color.TITLE,
        marginLeft: 12,
        marginRight: 80
    }
})

export default ItemMusic;