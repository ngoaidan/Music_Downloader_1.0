import { IconSearch } from '@assets/svg';
import color from '@config/colors';
import metric from '@config/metrics';
import React, { Component, useState } from 'react';
import { View, Modal, StyleSheet, Alert, Text, TouchableOpacity, TextInput, TouchableHighlight } from 'react-native';

interface SearchConfig {
    height: number,
    marginTop: number
}

const Search = (props: SearchConfig) => {
    return (
        <View style={[styles.searchBg, { height: props.height, marginTop: props.marginTop, }]}>
            <View style={styles.iconSearchBg}>
                <IconSearch />
            </View>
            <TextInput
                style={styles.inputSearch}
                placeholder='Search collection'
                placeholderTextColor={color.PLACEHOLDER}
                selectionColor={color.PLACEHOLDER}
                multiline={false}
                numberOfLines={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchBg: {
        flexDirection: 'row',
        height: 46,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 24,
        backgroundColor: color.BG_INPUT
    },
    iconSearchBg: {
        height: 20,
        width: 20,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputSearch: {
        marginLeft: 12,
        marginRight: 15,
        flex: 1,
        fontSize: 16
    },
});

export default Search;