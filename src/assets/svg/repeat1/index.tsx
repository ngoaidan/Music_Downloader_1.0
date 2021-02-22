import React, { } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconRepeatOne = () => {
    return (
        <Svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <G opacity="1">
          <Path
            stroke="#6D12E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 1l4 4-4 4"
          ></Path>
          <Path
            stroke="#6D12E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"
          ></Path>
          <Path
            stroke="#6D12E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13v2a4 4 0 01-4 4H3"
          ></Path>
          <Path
            fill="#6D12E0"
            d="M13.085 16H11.25V8.929l-2.19.679V8.116l3.828-1.37h.197V16z"
          ></Path>
        </G>
      </Svg>
    )
}

export default IconRepeatOne;