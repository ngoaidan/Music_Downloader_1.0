import {Dimensions} from "react-native"

const {height,width} = Dimensions.get("window");

const metric = {
    DEVICE_HEIGHT: height,
    DEVICE_WIDTH: width,
}

export default metric;