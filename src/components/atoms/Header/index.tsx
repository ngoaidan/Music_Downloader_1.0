import color from '@config/colors';
import metric from '@config/metrics';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

const Header = (props: any) => {

    const editMode = useSelector((state: any) => state?.editMode)

    return (
        <View style={[styles.container, { paddingHorizontal: props.paddingLeft }]}>
            <Text style={styles.title}>{props.title}</Text>
            {props.buttonRight ? (
                editMode ?
                    (<TouchableOpacity
                        onPress={() => props.onDone()}
                    >
                        <Text style={{ fontSize: 16, color: color.TITLE }}>Done</Text>
                    </TouchableOpacity>) :
                    (<TouchableOpacity
                        onPress={() => props.onEdit()}
                    >
                        <Text style={{ fontSize: 16, color: color.TITLE }}>Edit</Text>
                    </TouchableOpacity>)
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 19,
        height: 30,
        width: metric.DEVICE_WIDTH,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        color: color.TITLE,
        fontWeight: 'bold',

    }
})

export default Header;