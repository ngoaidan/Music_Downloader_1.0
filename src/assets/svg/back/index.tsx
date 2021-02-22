import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';

const IconBack = () => {
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
                strokeWidth="2"
                d="M19 12H5M12 19l-7-7 7-7"
            ></Path>
        </Svg>
    );
}

export default IconBack;