import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "../styles/colors";
import sizes from "../styles/sizes";

const ButtonWithIcon = ({ title, icon, onPress }) => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
                <Icon name={icon} size={86} color={colors.secondary} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width:'100%',
        height: "100%",
        borderRadius: sizes.borderRadius,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 2,
    },
    buttonRow: {
        flexDirection: "row",
        gap:'4%'
    },
    buttonColumn: {
        flexDirection: "column",
        gap:'4%'
    },
    iconLeft: {
        marginRight: 10,
    },
    text: {
        color: colors.secondary,
        fontSize: 29,
        textAlign: "center",
        margin: 5,
        fontWeight:'500',

    },
});

export default ButtonWithIcon;
