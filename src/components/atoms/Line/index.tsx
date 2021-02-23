import color from '@config/colors';
import { HeaderHeightContext } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text } from 'react-native';


interface PopupConfig {
    height: number
}

const Line = (props: PopupConfig) => {
    return (
        <View style={{ height: props.height, backgroundColor: color.LINE }} />
    );
}

export default Line;