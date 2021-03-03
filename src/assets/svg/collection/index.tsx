import color from '@config/colors';
import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { G, Path } from 'react-native-svg';
import styles from '../styles';
import ShadowView from 'react-native-simple-shadow-view'


const IconCollection = (props: any) => {
    return (
        <ShadowView style={[styles.shadowView, { backgroundColor: props.background }]}>
            <Svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32"
            >
                <G
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    opacity="0.17"
                >
                    <Path d="M16 29.333c7.363 0 13.333-5.97 13.333-13.333 0-7.364-5.97-13.333-13.334-13.333C8.636 2.667 2.666 8.637 2.666 16c0 7.364 5.97 13.333 13.333 13.333z"></Path>
                    <Path d="M16 20a4 4 0 100-8 4 4 0 000 8z"></Path>
                </G>
            </Svg>
        </ShadowView>

    )
}

export default IconCollection;