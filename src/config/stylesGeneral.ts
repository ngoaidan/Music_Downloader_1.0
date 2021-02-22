import color from "@config/colors";
import { StyleSheet } from "react-native";

const stylesGeneral = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BG_All
    },
    centerAll: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    styleTextNormal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.TITLE,
        textAlign: 'center'
    }
})

export default stylesGeneral;