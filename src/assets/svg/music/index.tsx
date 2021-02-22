

import color from '@config/colors';
import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const IconMusic = (props: any) => {
    return (
        <View style={{ height: 48, width: 48, backgroundColor: props.background, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }}>
            <Svg
                width="32"
                height="32"
                fill="none"
                viewBox="0 0 32 32">
                <G
                    stroke={props.color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                >
                    <Path d="M12 24V6.667L28 4v17.333"></Path>
                    <Path d="M8 28a4 4 0 100-8 4 4 0 000 8zM24 25.333a4 4 0 100-8 4 4 0 000 8z"></Path>
                </G>
            </Svg>
        </View>

    )
}

export default IconMusic;