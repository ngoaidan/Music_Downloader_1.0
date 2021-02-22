import Header from '@components/atoms/Header';
import color from '@config/colors';
import stylesGeneral from '@config/stylesGeneral';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { IconPaste } from '@assets/svg'
import { fn_GetAPI, fn_PushNotification } from '@services/api';
import Clipboard from '@react-native-community/clipboard'
import { EatBeanLoader } from 'react-native-indicator';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading } from '@services/redux/actions';


const Home = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state?.loading)
    const [textInputValue, setTextInputValue] = useState('')


    const fetchCopiedText = async () => {
        const text = await Clipboard.getString();
        setTextInputValue(text);
    }

    return (
        <View style={stylesGeneral.container}>
            <Header title="Download Music" paddingLeft={24} buttonRight={false} />
            <View style={styles.cardView}>
                <Text style={styles.title}>Add Link</Text>
                <View style={styles.containInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="https://"
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
                <TouchableOpacity
                    style={[stylesGeneral.centerAll, styles.button]}
                    onPress={() => {
                        if (!loading) {
                            Keyboard.dismiss()
                            if (textInputValue != '') {
                                fn_GetAPI(textInputValue, dispatch)
                                setTextInputValue('')
                                dispatch(showLoading(true))
                            }
                        }
                    }}
                >
                    {loading ?
                        <EatBeanLoader color="#fff" /> :
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.TITLE, }}>Download</Text>
                    }
                </TouchableOpacity>
            </View>
            {/* <View style={{ position: 'absolute', bottom: 0, height: 40, width: metric.DEVICE_WIDTH, marginBottom: 12 }}>
                <View style={{ flex: 1, marginHorizontal: 40, backgroundColor: color.BG_TOAST_ERROR, borderRadius: 20, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 16 }}>
                    <IconCheck color={color.WHITE} />
                    <Text style={{ fontSize: 13, color: color.TITLE, marginLeft: 12 }}>Unable to connect to the internet</Text>
                </View>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        height: 201,
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
        marginTop: 16,
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
        padding: 16,
        textAlignVertical: 'center',
        color: color.TITLE,
    },
    button: {
        height: 46,
        borderRadius: 24,
        marginTop: 16,
        backgroundColor: color.BUTTON_SHUFFLE
    },
})

export default Home;