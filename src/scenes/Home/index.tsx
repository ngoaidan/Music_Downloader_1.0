import Header from '@components/atoms/Header';
import color from '@config/colors';
import stylesGeneral from '@config/stylesGeneral';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard, Image, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BackgroundButton, IconCheck, IconClose, IconError, IconPaste } from '@assets/svg'
import { fn_GetAPI, fn_PushNotification, fn_stop } from '@services/api';
import Clipboard from '@react-native-community/clipboard'
import { EatBeanLoader } from 'react-native-indicator';
import { useSelector, useDispatch } from 'react-redux';
import { setPercent, setTaskDownloading, showErrorInternet, showLoading, showTabbar } from '@services/redux/actions';
import { trans } from "@services/i18n"
import ItemMusic from '@components/atoms/ItemMusic';
import ItemMusicSearch from '@components/atoms/ItemMusicSearch';
import YTSearch from '@services/api/youtubeSearch'
import { ImageMusicDefault } from '@assets/images';
import metric from '@config/metrics';
import LinearGradient from 'react-native-linear-gradient';
import NativeAdmobView from '@services/modules/NativeAdmob';


const Home = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state?.loading)
    const language = useSelector((state: any) => state?.settings.language)
    const errorInternet = useSelector((state: any) => state?.showAlert.errorInternet)
    const taskDownloading = useSelector((state: any) => state?.taskDownloading)
    const percentDownloading = useSelector((state: any) => state?.percentDownloading)

    const [visiableButtonDownload, setVisiableButtonDownload] = useState(true)
    const [textInputValue, setTextInputValue] = useState('')
    const [videoSelect, setVideoSelect] = useState<any>(null)
    const [showAlertProcessing, setShowAlertProcessing] = useState<any>(false)

    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setTextInputValue(text);
    }

    const [listData, setListData] = useState([])

    const videoSearch = (term) => {
        YTSearch({ key: 'AIzaSyAr2HPYpQT3clJYN3fkAwBSX-faFYgSXM0', term: term }, (videos) => {
            if (videos == "error") {
                dispatch(showErrorInternet(true))
                setTimeout(() => {
                    dispatch(showErrorInternet(false))
                }, 10000)
            }
            else {
                setListData(videos)
            }
        })
    }

    useEffect(() => {
        dispatch(showTabbar(false))
    }, [])

    useEffect(() => {
        if (visiableButtonDownload == false || (videoSelect != null && visiableButtonDownload == true)) {
            setVisiableButtonDownload(true);
            setVideoSelect(null)
        }
    }, [textInputValue])

    return (
        <View style={stylesGeneral.container}>
            <Header title={trans('download_music', language)} paddingLeft={24} buttonRight={false} />

            <View style={[styles.cardView, { height: visiableButtonDownload ? (videoSelect != null ? 302 : 156) : 354 }]}>
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
                        {!loading ? (
                            <TouchableOpacity
                                style={[stylesGeneral.centerAll, styles.button]}
                                onPress={() => {

                                    // // download
                                    // if (videoSelect != null) {
                                    //     Keyboard.dismiss()
                                    //     if (textInputValue != '') {
                                    //         fn_GetAPI(videoSelect.id.videoId, dispatch)
                                    //         setTextInputValue('')
                                    //         setVideoSelect(null)
                                    //         dispatch(showLoading(true))
                                    //     }
                                    // }
                                    // // search
                                    // else {
                                    //     videoSearch(textInputValue)
                                    //     setVisiableButtonDownload(false)
                                    //     Keyboard.dismiss();
                                    // }


                                    if (!loading) {
                                        Keyboard.dismiss()
                                        if (textInputValue != '') {
                                            fn_GetAPI(textInputValue, dispatch)
                                            setTextInputValue('')
                                            setVideoSelect(null)
                                            dispatch(showLoading(true))
                                        }
                                    }
                                    else {
                                        setShowAlertProcessing(true)
                                        setTimeout(() => {
                                            setShowAlertProcessing(false)
                                        }, 5000)
                                    }
                                }}
                            >
                                <View style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', flex: 1 }}>
                                    <BackgroundButton height={'100%'} width={'100%'} />
                                </View>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.TITLE, }}> {videoSelect != null ? (trans('download', language)) : (trans('search', language))} </Text>
                            </TouchableOpacity>
                        ) :
                            (<View style={styles.buttonLoadingContain} >
                                <TouchableOpacity
                                    style={[styles.buttonLoading]}
                                    onPress={() => {
                                        setShowAlertProcessing(true)
                                        setTimeout(() => {
                                            setShowAlertProcessing(false)
                                        }, 5000)
                                    }}>
                                    {/* <View style={{ backgroundColor:'red',position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
                                        <BackgroundButton height={'100%'} width={'100%'} />
                                    </View> */}
                                    <EatBeanLoader color="#fff" />
                                    <Text
                                        style={{ color: '#fff', fontSize: 16, marginLeft: 20 }}
                                    >{percentDownloading <= 1 ? Math.round(percentDownloading * 100) : 100} %</Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonCancle]}
                                    onPress={() => {
                                        try {
                                            fn_stop()
                                        }
                                        catch {

                                        }
                                        dispatch(setPercent(0))
                                        dispatch(showLoading(false))
                                        dispatch(setTaskDownloading(null))

                                    }}>
                                    <IconClose />
                                </TouchableOpacity>
                            </View>

                            )}
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
            <View style={{ height: 100, marginTop: 30, position: 'absolute', bottom: 10, left: 0, width: '100%', alignItems: 'center' }}>
                <NativeAdmobView style={{ flex: 1, width: '90%' }} />
            </View>
            {errorInternet ? (
                <View style={{ position: 'absolute', bottom: 0, height: 40, width: metric.DEVICE_WIDTH, marginBottom: 12 }}>
                    <View style={{ flex: 1, marginHorizontal: 40, backgroundColor: color.BG_TOAST_ERROR, borderRadius: 20, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16 }}>
                        <IconError color={color.WHITE} />
                        <Text style={{ fontSize: 13, color: color.TITLE, marginLeft: 12 }}>Error to connect to the internet </Text>
                    </View>
                </View>
            ) : null}

            {showAlertProcessing ? (
                <View style={{ position: 'absolute', bottom: 0, height: 40, width: metric.DEVICE_WIDTH, marginBottom: 12 }}>
                    <View style={{ flex: 1, marginHorizontal: 40, backgroundColor: color.BG_TOAST_ERROR, borderRadius: 20, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16 }}>
                        <IconError color={color.WHITE} />
                        <Text style={{ fontSize: 13, color: color.TITLE, marginLeft: 12 }}>Video is downloading. Please wait</Text>
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
        width: '20%',
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
        backgroundColor: color.BUTTON_SHUFFLE,

    },
    buttonLoadingContain: {
        height: 46,
        marginTop: 16,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: "100%"
    },
    buttonLoading: {
        height: 46,
        width: "80%",
        backgroundColor: color.BUTTON_SHUFFLE,
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    buttonCancle: {
        width: '20%',
        height: 46,
        backgroundColor: color.BG_ICON_PASTE,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    linearGradient: {
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,

    },
})

export default Home;