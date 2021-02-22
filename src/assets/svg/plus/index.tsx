import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';

const IconPlus = () => {
    return (
        <Svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v14M5 12h14"
            ></Path>
        </Svg>
    );
}

export default IconPlus;