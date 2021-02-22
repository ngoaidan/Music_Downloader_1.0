import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';

const IconCheck = (props:any) => {
    return (
        <Svg
        width="30"
        height="30"
        fill="none"
        viewBox="0 0 30 30"
      >
        <Path
          stroke={props.color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M25 7.5L11.25 21.25 5 15"
          opacity="0.8"
        ></Path>
      </Svg>
    );
}

export default IconCheck;