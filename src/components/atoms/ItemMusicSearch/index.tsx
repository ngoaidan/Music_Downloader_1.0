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

const ItemMusicSearch = (item: any) => {
    const navigation = useNavigation();
    const editMode = useSelector((state: any) => state?.editMode)
    const [select, setSelect] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

    }, [select])

    return (
        <View
            style={[styles.constain]}
        >
            <View
                style={{ flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center', flex: 1, borderColor: color.LINE }}
            >
                <View style={styles.image}>
                    <Image
                        style={styles.image}
                        source={(item.data.snippet.thumbnails.high.url != '') ? { uri: item.data.snippet.thumbnails.high.url } : ImageMusicDefault}
                    />
                </View>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.title}
                >{item.data.snippet.title}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    constain: {
        height: 68,
        width: metric.DEVICE_WIDTH,
        flexDirection: 'row',
        flex: 1

    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 12,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: color.TITLE,
        marginLeft: 12,
        flex: 1,
        marginRight: 80
    }
})

export default ItemMusicSearch;