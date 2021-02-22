import color from '@config/colors';
import React, { Component } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { G, Path } from 'react-native-svg';
import styles from '../styles';
import ShadowView from 'react-native-simple-shadow-view'


const IconTrash = (props: any) => {
    return (
        <Svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"
            ></Path>
        </Svg>
    )
}

export default IconTrash;