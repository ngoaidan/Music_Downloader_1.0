import React, { Component } from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const BackgroundButton = (props:any) => {
    return (
        <Svg
        width={props.width}
        height={props.height}
        fill="none"
        viewBox="0 0 280 46"
      >
        <Rect width="280" height="46" fill="url(#paint0_linear)" rx="22"></Rect>
        <Defs>
          <LinearGradient
            id="paint0_linear"
            x1="-67.941"
            x2="288.819"
            y1="53.5"
            y2="-120.176"
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#12C2E9"></Stop>
            <Stop offset="0.497" stopColor="#C471ED"></Stop>
            <Stop offset="0.886" stopColor="#F64F59"></Stop>
          </LinearGradient>
        </Defs>
      </Svg>
    );
}

export default BackgroundButton;