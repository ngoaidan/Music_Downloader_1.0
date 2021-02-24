import color from '@config/colors';
import metric from '@config/metrics';
import { trans } from '@services/i18n';
import { changeLanguage } from '@services/redux/actions';
import React, { Component } from 'react';
import { View, Modal, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Line from '../Line';
import { useDispatch, useSelector } from 'react-redux';

interface PopupConfig {
    visiable: boolean,
    setVisiable: any,
}


const PopupSelectLanguage = (props: PopupConfig) => {
    const language = useSelector((state: any) => state?.settings.language)
    const dispatch = useDispatch();

    return (
        <Modal
            animationType="slide"
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
                    <Text style={styles.title}>{trans('change_language',language)}</Text>
                    <ScrollView style={styles.scrollView}>
                        <TouchableOpacity
                            style={styles.itemView}
                            onPress={() => {
                                dispatch(changeLanguage('en'))
                                props.setVisiable(false);
                            }}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity
                            style={styles.itemView}
                            onPress={() => {
                                dispatch(changeLanguage('vi'))
                                props.setVisiable(false);
                            }}>
                            <Text style={{ color: color.TITLE }}>Việt Nam</Text>
                        </TouchableOpacity>
                        {/* <Line height={1} /> */}

                        {/* <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity>
                        <Line height={1} />

                        <TouchableOpacity style={styles.itemView}>
                            <Text style={{ color: color.TITLE }}>English</Text>
                        </TouchableOpacity> */}
                    </ScrollView>
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
        height: 300,
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
    scrollView: {
        height: 250,
        marginTop: 20
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
    itemView: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export default PopupSelectLanguage;