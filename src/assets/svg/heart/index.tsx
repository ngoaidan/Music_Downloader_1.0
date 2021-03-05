import React, { Component, useEffect } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconHeart = (props: any) => {
    return (
        <Svg
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <Path
          fill="#fff"
          d="M12 21a.998.998 0 01-.71-.29l-7.77-7.78a5.26 5.26 0 010-7.4 5.24 5.24 0 017.4 0L12 6.61l1.08-1.08a5.24 5.24 0 017.4 0 5.26 5.26 0 010 7.4l-7.77 7.78A1.001 1.001 0 0112 21z"
        ></Path>
      </Svg>

    )
}

export default IconHeart;