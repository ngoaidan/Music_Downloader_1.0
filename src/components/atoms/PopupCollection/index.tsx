import { IconClose, IconPlus, IconSearch } from '@assets/svg';
import color from '@config/colors';
import metric from '@config/metrics';
import React, { Component, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, Alert, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemCollectionOnPopup from '../ItemCollectionOnPopup';
import ItemMusic from '../ItemMusic';
import Search from '../Search';
import { useSelector, useDispatch } from 'react-redux';
import { ImageMusicDefault } from '@assets/images';
import { trans } from '@services/i18n';
import { SafeAreaView } from 'react-native-safe-area-context';


interface PopupConfig {
    visiable: boolean,
    setVisiable: any,
    data: any,
    setVisiableCreate: any
}

const PopupCollection = (props: PopupConfig) => {
    const listCollection = useSelector((state: any) => state?.listCollection)
    const [listDataShow, setListDataShow] = useState<any[]>([])
    const language = useSelector((state: any) => state?.settings.language)

    const renderItem = ({ item }) => (
        <ItemCollectionOnPopup data={item} setVisiable={props.setVisiable} />
    );

    const search = (text: any) => {
        setListDataShow(listCollection.filter((val: any) => {
            let value = text.toLocaleLowerCase();
            if (val.name != "" && val.name.toLocaleLowerCase().search(text.toLocaleLowerCase()) > -1) return true;
            return false;
        }))

        if (text == "") {
            setListDataShow(listCollection)
        }
    }

    useEffect(() => {
        setListDataShow(listCollection)
    }, [])

    return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={props.visiable}>
                  
                    <View style={styles.constrainOpacity}></View>

              
                <TouchableOpacity
                    style={styles.centeredView}
                    onPress={() => { props.setVisiable(false) }}
                    activeOpacity={1}
                >
                    <View style={styles.modalView}>
                        <View style={{ height: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.title}>{trans('select_collection', language)}</Text>
                            <TouchableOpacity onPress={() => { props.setVisiable(false) }}>
                                <IconClose />
                            </TouchableOpacity>
                        </View>

                        {/* <Search
                        height={46}
                        marginTop={16}
                    /> */}


                        {/* <View
                        style={{ flexDirection: 'row', alignItems: 'center', height: 68, marginTop: 16 }}
                    >
                        <View style={styles.image}>
                            <Image
                                style={styles.image}
                                source={ImageMusicDefault}
                            />
                        </View>
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder='Search collection'
                            placeholderTextColor={color.PLACEHOLDER}
                            selectionColor={color.PLACEHOLDER}
                            multiline={false}
                            numberOfLines={1}
                            onChangeText={(value) => {
                                search(value)
                            }}
                        />

                    </View> */}

                        <View style={{ flexDirection: 'row', alignItems: 'center', height: 46, marginTop: 16, backgroundColor: color.BG_INPUT, borderRadius: 24 }}>
                            <View style={styles.iconSearchBg}>
                                <IconSearch />
                            </View>
                            <TextInput
                                style={styles.inputSearch}
                                placeholder={trans('search_collection', language)}
                                placeholderTextColor={color.PLACEHOLDER}
                                selectionColor={color.PLACEHOLDER}
                                multiline={false}
                                numberOfLines={1}
                                onChangeText={(value) => {
                                    search(value)
                                }}
                            />
                        </View>

                        <View style={{ flex: 1, marginTop: 20 }}>
                            <FlatList
                                data={listDataShow}
                                renderItem={renderItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>

                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.buttonPlus}
                                onPress={() => {
                                    props.setVisiable(false);
                                    props.setVisiableCreate(true)
                                }}
                            >
                                <IconPlus />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal >
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        width: metric.DEVICE_WIDTH - 48,
        height: metric.DEVICE_HEIGHT - 138,
        backgroundColor: color.BG_CARD,
        borderRadius: 12,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    title: {
        textAlign: "center",
        color: color.TITLE,
        fontSize: 16,
        fontWeight: 'bold'
    },
    input: {
        backgroundColor: color.BG_INPUT,
        marginTop: 16,
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 40,
        fontSize: 16,
        color: color.TITLE
    },
    buttonPlus: {
        height: 48,
        width: 48,
        marginTop: 16,
        borderRadius: 12,
        backgroundColor: color.WHITE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    constrainOpacity: {
        backgroundColor: '#000',
        opacity: 0.85,
        position: 'absolute',
        top: 0,
        left: 0,
        height: metric.DEVICE_HEIGHT + 50,
        width: metric.DEVICE_WIDTH
    },
    image: {
        height: 48,
        width: 48,
        borderRadius: 12,
    },
    iconSearchBg: {
        height: 20,
        width: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSearch: {
        marginLeft: 12,
        marginRight: 15,
        flex: 1,
        fontSize: 16,
        color: color.TITLE
    },
});

export default PopupCollection;