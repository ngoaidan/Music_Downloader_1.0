import { IconSetting } from '@assets/svg';
import color from '@config/colors';
import metric from '@config/metrics';
import { trans } from '@services/i18n';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { SETTINGS } from '@config/constrans';

const Header = (props: any) => {
    const navigation = useNavigation();

    const editMode = useSelector((state: any) => state?.editMode)
    const language = useSelector((state: any) => state?.settings.language)

    return (
        <View style={[styles.container, { paddingHorizontal: props.paddingLeft }]}>
            <Text style={styles.title}>{props.title}</Text>
            {props.home ?
                (
                    <TouchableOpacity 
                    style={{height:40,width:40}}
                    onPress={()=>{
                        navigation.navigate(SETTINGS)
                    }}
                >
                        <IconSetting color={"#fff"}/>
                    </TouchableOpacity>
                )
                :
                (
                    <View>
                        {props.buttonRight ? (
                            editMode ?
                                (<TouchableOpacity
                                    onPress={() => props.onDone()}
                                >
                                    <Text style={{ fontSize: 16, color: color.TITLE }}>{trans('done', language)}</Text>
                                </TouchableOpacity>) :
                                (<TouchableOpacity
                                    onPress={() => props.onEdit()}
                                >
                                    <Text style={{ fontSize: 16, color: color.TITLE }}>{trans('edit', language)}</Text>
                                </TouchableOpacity>)
                        ) : null}
                    </View>
                )}

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