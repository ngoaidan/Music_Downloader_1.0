import color from '@config/colors';
import React, { Component } from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';

const IconMusicDefault = (props: any) => {
    return (
        <View style={{ height: props.height, width: props.width, backgroundColor: props.background, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
            <Svg
                width="66"
                height="66"
                fill="none"
                viewBox="0 0 66 66"
            >
                <Path
                    fill="#fff"
                    d="M65.215.6a2.393 2.393 0 00-1.831-.586L20.955 4.728a2.357 2.357 0 00-2.098 2.343v42.007a13.639 13.639 0 00-7.071-1.936C5.287 47.142 0 51.373 0 56.572 0 61.77 5.287 66 11.786 66c6.498 0 11.785-4.227 11.785-9.429V20.978l37.715-4.2v27.578a13.64 13.64 0 00-7.072-1.928c-6.498 0-11.785 4.229-11.785 9.429s5.287 9.428 11.785 9.428C60.713 61.285 66 57.06 66 51.858v-49.5c0-.67-.285-1.31-.785-1.756z"
                    opacity="0.25"
                ></Path>
            </Svg>
        </View>

    )
}

export default IconMusicDefault;