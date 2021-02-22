import React, { } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconRepeat = (props:any) => {
    return (
        <Svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <G
                stroke={props.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                opacity="1"
            >
                <Path d="M17 1l4 4-4 4"></Path>
                <Path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"></Path>
                <Path d="M21 13v2a4 4 0 01-4 4H3"></Path>
            </G>
        </Svg>
    )
}

export default IconRepeat;