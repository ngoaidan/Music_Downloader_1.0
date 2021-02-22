import Header from '@components/atoms/Header';
import color from '@config/colors';
import metric from '@config/metrics';
import stylesGeneral from '@config/stylesGeneral';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ShadowView from 'react-native-simple-shadow-view'
import Svg, { Path } from 'react-native-svg';


const Settings = () => {
    return (
        <View style={stylesGeneral.container}>
            <Header title="Settings" paddingLeft={16} />
            <View style={styles.shadowView}>
                <View style={styles.optionBg}>
                    <Text style={styles.textOption}>Version</Text>
                    <View style={styles.icon}>
                        <Text style={{ color: color.TITLE }}>1.0</Text>
                    </View>
                </View>
                <View style={styles.line} />
                <TouchableOpacity style={styles.optionBg}>
                    <Text style={styles.textOption}>Share with friends</Text>
                    <View style={styles.icon}>
                        <Svg
                            width="16"
                            height="16"
                            fill="#939393"
                            viewBox="0 0 512.001 512.001"
                        >
                            <Path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"></Path>
                        </Svg>
                    </View>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.optionBg}>
                    <Text style={styles.textOption}>Submit Feedback</Text>
                    <View style={styles.icon}>
                        <Svg
                            width="16"
                            height="16"
                            fill="#939393"
                            viewBox="0 0 512.001 512.001"
                        >
                            <Path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"></Path>
                        </Svg>
                    </View>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.optionBg}>
                    <Text style={styles.textOption}>Platform Support</Text>
                    <View style={styles.icon}>
                        <Svg
                            width="16"
                            height="16"
                            fill="#939393"
                            viewBox="0 0 512.001 512.001"
                        >
                            <Path d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"></Path>
                        </Svg>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadowView: {
        height: 186,
        marginTop: 28,
        borderRadius: 12,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 16,
        marginHorizontal: 16,
        backgroundColor: color.BG_CARD,

    },
    optionBg: {
        height: 24,
        width: metric.DEVICE_WIDTH - 70,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        height: 0.5,
        width: metric.DEVICE_WIDTH - 70,
        borderWidth: 0.5,
        backgroundColor: color.LINE,
        borderColor: color.LINE,
    },
    icon: {
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textOption: {
        flex: 1,
        fontSize: 13,
        color: color.TITLE
    },
    alertModalBg: {
        height: 68,
        // width:WIDTH-30,
        alignItems: 'center',
        borderRadius: 12,
        // position: 'absolute',
        // bottom: 15,
        // right: 15,
        flexDirection: 'row',
        backgroundColor: color.TITLE,
        shadowColor: '#4D5574',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 2 },
    }
})

export default Settings;