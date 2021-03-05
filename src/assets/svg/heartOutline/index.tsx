import React, { Component, useEffect } from 'react';
import Svg, { G, Path } from 'react-native-svg';

const IconHeartOutline = (props: any) => {
    return (
        <Svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <Path
                fill="#fff"
                d="M12 21a1.002 1.002 0 01-.71-.29l-7.77-7.78a5.26 5.26 0 010-7.4 5.24 5.24 0 017.4 0L12 6.61l1.08-1.08a5.24 5.24 0 017.4 0 5.26 5.26 0 010 7.4l-7.77 7.78A1.001 1.001 0 0112 21zM7.22 6a3.2 3.2 0 00-2.28.94 3.24 3.24 0 000 4.57L12 18.58l7.06-7.07a3.24 3.24 0 000-4.57 3.32 3.32 0 00-4.56 0l-1.79 1.8a1.001 1.001 0 01-1.42 0L9.5 6.94A3.2 3.2 0 007.22 6z"
                opacity="0.5"
            ></Path>
        </Svg>

    )
}

export default IconHeartOutline;