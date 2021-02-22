import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { IconDownArrow, IconMusic, IconSetting } from "@assets/svg"
import color from '@config/colors';
import stylesGeneral from "@config/stylesGeneral"
import ControlMusic from '../ControlMusic';
import { useSelector, useDispatch } from 'react-redux';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const showMusic = useSelector((state: any) => state?.showMusic)
    const hiddenTabbar = useSelector((state: any) => state?.hiddenTabbar)
    const editMode = useSelector((state: any) => state?.editMode)

    if(editMode){
        return null
    }
    else{
        return (
            <View>
                {showMusic ? <ControlMusic /> : null}
                {hiddenTabbar ? null : (
                <View style={[stylesGeneral.centerAll, { backgroundColor: color.BG_BUTTON, height: 62, flexDirection: 'row', borderTopWidth: 1, borderColor: "#3e3e3e" }]}>
                    {state.routes.map((route: any, index: any) => {
                        const { options } = descriptors[route.key];
                        // const label =
                        //     options.tabBarLabel !== undefined
                        //         ? options.tabBarLabel
                        //         : options.title !== undefined
                        //             ? options.title
                        //             : route.name;
    
                        const isFocused = state.index === index;
    
                        let icon = <IconDownArrow
                            background={isFocused ? color.BG_ICON_TAB : color.BG_BUTTON}
                            color={isFocused ? color.IC_FOCUS : color.IC_DISABLE} />
    
                        switch (index) {
                            case 0: {
                                icon = <IconDownArrow
                                    background={isFocused ? color.BG_ICON_TAB : color.BG_BUTTON}
                                    color={isFocused ? color.IC_FOCUS : color.IC_DISABLE}
                                />
                                break
                            }
                            case 1: {
                                icon = <IconMusic
                                    background={isFocused ? color.BG_ICON_TAB : color.BG_BUTTON}
                                    color={isFocused ? color.IC_FOCUS : color.IC_DISABLE} />
                                break
                            }
                            case 2: {
                                icon = <IconSetting
                                    background={isFocused ? color.BG_ICON_TAB : color.BG_BUTTON}
                                    color={isFocused ? color.IC_FOCUS : color.IC_DISABLE} />
                                break
                            }
    
                            default: icon = <IconDownArrow
                                background={isFocused ? color.BG_ICON_TAB : color.BG_BUTTON}
                                color={isFocused ? color.IC_FOCUS : color.IC_DISABLE} />
                        }
    
                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
    
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };
    
                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };
    
                        return (
                            <View style={{ flex: 1 }} key={route.key}>
                                <TouchableOpacity
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                    accessibilityLabel={options.tabBarAccessibilityLabel}
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    onLongPress={onLongPress}
                                    style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                                >
                                    {icon}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                )}
    
            </View>
        )
    }
 
}



export default CustomTabBar;