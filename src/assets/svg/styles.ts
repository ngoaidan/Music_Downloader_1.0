import color from "@config/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    shadowView: {
        height: 48,
        width: 48,
        shadowColor: color.BG_ICON_TAB,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 2 },
    }
})

export default styles;