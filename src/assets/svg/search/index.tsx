import React, { Component } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconSearch = (props: any) => {
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
                opacity="0.5"
            >
                <Path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"></Path>
            </G>
        </Svg>
    )
}

export default IconSearch;