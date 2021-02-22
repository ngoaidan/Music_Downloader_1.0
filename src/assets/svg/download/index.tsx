import color from '@config/colors';
import React, { Component, useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import ShadowView from 'react-native-simple-shadow-view'
import styles from '../styles';


const IconDownArrow = (props: any) => {
    return (
        <ShadowView style={[styles.shadowView, { backgroundColor: props.background }]}>
            <Svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32">
                <Path
                    stroke={props.color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M28 20v5.333A2.667 2.667 0 0125.333 28H6.667A2.667 2.667 0 014 25.333V20M9.334 13.333L16 20l6.667-6.667M16 20V4"
                ></Path>
            </Svg>
        </ShadowView>

    )
}

export default IconDownArrow;