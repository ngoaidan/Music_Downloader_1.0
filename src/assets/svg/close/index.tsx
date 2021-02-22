import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';

const IconClose = (props: any) => {
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
                d="M18 6L6 18M6 6l12 12"
            ></Path>
        </Svg>
    );
}

export default IconClose;