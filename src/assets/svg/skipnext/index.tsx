import React, { } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconSkipNext = () => {
    return (
        <Svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <G
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                opacity="0.9"
            >
                <Path d="M5 4l10 8-10 8V4zM19 5v14"></Path>
            </G>
        </Svg>

    )
}

export default IconSkipNext;