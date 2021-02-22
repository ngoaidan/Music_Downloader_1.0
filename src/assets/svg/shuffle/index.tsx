import React, { Component } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconShuffle = (props:any) => {
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
                strokeWidth="1.5"
                opacity="1"
            >
                <Path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></Path>
            </G>
        </Svg>
    );
}

export default IconShuffle;