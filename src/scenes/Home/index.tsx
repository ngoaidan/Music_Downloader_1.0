import Header from '@components/atoms/Header';
import color from '@config/colors';
import stylesGeneral from '@config/stylesGeneral';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Image } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { IconCheck, IconError, IconPaste } from '@assets/svg'
import { fn_GetAPI, fn_PushNotification } from '@services/api';
import Clipboard from '@react-native-community/clipboard'
import { EatBeanLoader } from 'react-native-indicator';
import { useSelector, useDispatch } from 'react-redux';
import { showErrorInternet, showLoading } from '@services/redux/actions';
import { trans } from "@services/i18n"
import ItemMusic from '@components/atoms/ItemMusic';
import ItemMusicSearch from '@components/atoms/ItemMusicSearch';
import YTSearch from '@services/api/youtubeSearch'
import { ImageMusicDefault } from '@assets/images';
import metric from '@config/metrics';

const Home = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state?.loading)
    const language = useSelector((state: any) => state?.settings.language)
    const errorInternet = useSelector((state: any) => state?.showAlert.errorInternet)

    const [visiableButtonDownload, setVisiableButtonDownload] = useState(true)
    const [textInputValue, setTextInputValue] = useState('')
    const [videoSelect, setVideoSelect] = useState<any>()

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setTextInputValue(text);
    }

    const [listData, setListData] = useState([])

    const videoSearch = (term) => {
        YTSearch({ key: 'AIzaSyA16Oe_4HaJK0LKfwZWCxO0IqxhBfAg-Mo', term: term }, (videos) => {
            if(videos == "error"){
                dispatch(showErrorInternet(true))
                setTimeout(()=>{
                    dispatch(showErrorInternet(false))
                },10000)
            }
            else{
                setListData(videos)
            }
        })
    }

    useEffect(() => {
        if (textInputValue != '') {
            videoSearch(textInputValue)
            setVisiableButtonDownload(false)
        }
        else {
            setVideoSelect(undefined)
            setVisiableButtonDownload(true)
        }
    }, [textInputValue])

    return (
        <View style={stylesGeneral.container}>
            <Header title={trans('download_music', language)} paddingLeft={24} buttonRight={false} />
            <View style={[styles.cardView, { height: visiableButtonDownload ? (videoSelect != undefined ? 302 : 156) : 354 }]}>
                <View style={styles.containInput}>
                    <TextInput
                        textAlignVertical={'center'}
                        style={styles.input}
                        placeholder={trans('input_name', language)}
                        placeholderTextColor={color.PLACEHOLDER}
                        selectionColor={color.PLACEHOLDER}
                        multiline={false}
                        numberOfLines={1}
                        value={textInputValue}

                        onChangeText={(value) => setTextInputValue(value)}
                    />
                    <TouchableOpacity
                        style={[stylesGeneral.centerAll, styles.containIconPaste]}
                        onPress={() => {
                            Keyboard.dismiss()
                            fetchCopiedText()
                        }}
                    >
                        <IconPaste />
                    </TouchableOpacity>
                </View>
                {visiableButtonDownload ?
                    (<View style={{ flexDirection: 'column', flex: 1 }}>
                        {videoSelect != undefined ? (
                            <View style={[styles.constain]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.image}>
                                        <Image
                                            style={styles.image}
                                            source={(videoSelect?.snippet.thumbnails.high.url != '') ? { uri: videoSelect?.snippet.thumbnails.high.url } : ImageMusicDefault}
                                        />
                                    </View>
                                    <Text
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                        style={styles.titleVideo}
                                    >{videoSelect?.snippet.title}</Text>
                                </View>
                                <View style={{ flex: 1, marginTop: 12 }}>
                                    <Text style={{ fontSize: 12, color: color.TITLE, }}>{videoSelect?.snippet.description}</Text>
                                </View>
                            </View>) : null}
                        <TouchableOpacity
                            style={[stylesGeneral.centerAll, styles.button]}
                            onPress={() => {
                                if (!loading) {
                                    Keyboard.dismiss()
                                    if (textInputValue != '') {
                                        fn_GetAPI(videoSelect.id.videoId, dispatch)
                                        setTextInputValue('')
                                        setVideoSelect(undefined)
                                        dispatch(showLoading(true))
                                    }
                                }
                            }}
                        >
                            {loading ?
                                <EatBeanLoader color="#fff" /> :
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.TITLE, }}>{trans('download', language)}</Text>
                            }
                        </TouchableOpacity>
                    </View>) :
                    (<View style={{ flex: 1, marginTop: 20 }}>
                        <FlatList
                            data={listData}
                            renderItem={({ item, index }) => (
                                <TouchableWithoutFeedback onPress={() => {
                                    setVideoSelect(item)
                                    setVisiableButtonDownload(true)
                                }}>
                                    <ItemMusicSearch data={item} index={index} />
                                </TouchableWithoutFeedback>
                            )}
                            keyExtractor={(item: any) => item.etag.toString()}
                        />
                    </View>)}
            </View>
            {errorInternet ? (
                <View style={{ position: 'absolute', bottom: 0, height: 40, width: metric.DEVICE_WIDTH, marginBottom: 12 }}>
                    <View style={{ flex: 1, marginHorizontal: 40, backgroundColor: color.BG_TOAST_ERROR, borderRadius: 20, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16 }}>
                        <IconError color={color.WHITE} />
                        <Text style={{ fontSize: 13, color: color.TITLE, marginLeft: 12 }}>Unable to connect to the internet</Text>
                    </View>
                </View>
            ) : null}

        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        marginHorizontal: 24,
        borderRadius: 24,
        backgroundColor: color.BG_CARD,
        marginTop: 27,
        paddingTop: 24,
        paddingBottom: 34,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.TITLE
    },
    containInput: {
        height: 46,
        borderRadius: 24,
        backgroundColor: color.BG_INPUT,
        flexDirection: 'row'
    },
    containIconPaste: {
        width: 52,
        height: 46,
        backgroundColor: color.BG_ICON_PASTE,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24
    },
    input: {
        flex: 1,
        paddingLeft: 16,
        color: color.TITLE,
    },
    button: {
        height: 46,
        borderRadius: 24,
        marginTop: 16,
        backgroundColor: color.BUTTON_SHUFFLE
    },
    constain: {
        height: 128,
        flexDirection: 'column',
        marginTop: 14,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 12,
    },
    titleVideo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: color.TITLE,
        marginLeft: 12,
        flex: 1,
        marginRight: 0
    }
})

export default Home;