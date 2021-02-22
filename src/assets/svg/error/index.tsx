import React, { Component } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconError = (props: any) => {
    return (
        <Svg
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
      >
        <Path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10 18.333a8.333 8.333 0 100-16.666 8.333 8.333 0 000 16.666zM10 6.667V10M10 13.333h.008"
        ></Path>
      </Svg>

    )
}

export default IconError;