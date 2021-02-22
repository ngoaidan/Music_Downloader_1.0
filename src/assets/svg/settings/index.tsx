import color from '@config/colors';
import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { G, Path } from 'react-native-svg';
import styles from '../styles';
import ShadowView from 'react-native-simple-shadow-view'


const IconSetting = (props: any) => {
    return (
        <ShadowView style={[styles.shadowView,{ backgroundColor: props.background}]}>
            <Svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
            >
                <G
                    stroke={props.color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                >
                    <Path d="M16 20a4 4 0 100-8 4 4 0 000 8z"></Path>
                    <Path d="M25.867 20a2.2 2.2 0 00.44 2.427l.08.08a2.665 2.665 0 010 3.773 2.666 2.666 0 01-3.774 0l-.08-.08a2.2 2.2 0 00-2.426-.44 2.2 2.2 0 00-1.334 2.013V28a2.667 2.667 0 01-5.333 0v-.12A2.2 2.2 0 0012 25.867a2.2 2.2 0 00-2.427.44l-.08.08a2.667 2.667 0 11-3.773-3.774l.08-.08a2.2 2.2 0 00.44-2.426 2.2 2.2 0 00-2.013-1.334H4a2.667 2.667 0 110-5.333h.12A2.2 2.2 0 006.133 12a2.2 2.2 0 00-.44-2.427l-.08-.08A2.667 2.667 0 017.5 4.938a2.667 2.667 0 011.887.782l.08.08a2.2 2.2 0 002.426.44H12a2.2 2.2 0 001.334-2.013V4a2.667 2.667 0 115.333 0v.12A2.2 2.2 0 0020 6.133a2.2 2.2 0 002.427-.44l.08-.08a2.667 2.667 0 113.773 3.774l-.08.08a2.2 2.2 0 00-.44 2.426V12a2.2 2.2 0 002.013 1.333H28a2.667 2.667 0 010 5.334h-.12A2.2 2.2 0 0025.867 20v0z"></Path>
                </G>
            </Svg>
        </ShadowView>

    )
}

export default IconSetting;