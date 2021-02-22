import { IconClose } from '@assets/svg';
import color from '@config/colors';
import metric from '@config/metrics';
import { loadCollection, loadMusic } from '@services/redux/actions';
import { dboCollection, dboMusic } from '@services/sqlite';
import React, { Component, useState } from 'react';
import { View, Modal, StyleSheet, Alert, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

interface PopupConfig {
    visiable: boolean,
    setVisiable: any
}


const PopupCreateCollect = (props: PopupConfig) => {
    const [textInputValue, setTextInputValue] = useState("")
    const listEditMusic = useSelector((state: any) => state?.listEditMusic)
    const dispatch = useDispatch();

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visiable}
        >
            <View style={styles.constrainOpacity}></View>
            <TouchableOpacity
                style={styles.centeredView}
                onPress={() => { props.setVisiable(false) }}
                activeOpacity={1}
            >
                <View style={styles.modalView}>
                    <View style={{ height: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>Create Collection</Text>
                    </View>
                    <View style={{ height: 20, flexDirection: 'row', marginTop: 12, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: "#8c8c8c" }}>Please enter the name:</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="New Name"
                        placeholderTextColor={color.PLACEHOLDER}
                        selectionColor={color.PLACEHOLDER}
                        multiline={false}
                        numberOfLines={1}
                        value={textInputValue}
                        onChangeText={(value) => setTextInputValue(value)}
                    />
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', }}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: color.BG_CARD }]}
                            onPress={() => { props.setVisiable(false) }}
                        >
                            <Text style={{ fontSize: 16, color: color.TITLE }}>Cancle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                console.log(textInputValue)
                                dboCollection.InsertItem({ name: textInputValue, thumbnail: "" }).then((res: any) => {
                                    if (res.status == 200) {
                                        dboCollection.SelectAll().then((res: any) => {
                                            dispatch(loadCollection(res))
                                        })
                                        for (let i = 0; i < listEditMusic.length; i++) {
                                            let index = i;
                                            dboMusic.MoveCollection(listEditMusic[index].id, res.data[0].insertId).then(() => {
                                                dboMusic.SelectAll().then((res: any) => {
                                                    dispatch(loadMusic(res))
                                                    props.setVisiable(false)
                                                })
                                            })
                                        }
                                    }
                                })
                            }}
                        >
                            <Text style={{ fontSize: 16, color: color.TITLE }}>Done</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </TouchableOpacity>
        </Modal>
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
        width: metric.DEVICE_WIDTH - 66,
        height: 200,
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
    button: {
        height: 40,
        width: 96,
        marginTop: 16,
        borderRadius: 20,
        backgroundColor: color.BUTTON_SHUFFLE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    constrainOpacity: {
        backgroundColor: '#000',
        opacity: 0.85,
        position: 'absolute',
        top: 0,
        left: 0,
        height: metric.DEVICE_HEIGHT,
        width: metric.DEVICE_WIDTH
    }
});

export default PopupCreateCollect;