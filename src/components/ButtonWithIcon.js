import { StyleSheet, View } from "react-native";
import sizes from "../styles/sizes";
import {ThemedText, TouchablePrimary, IconSecondary } from '../components/ThemedComponents';


const ButtonWithIcon = ({ title, icon, onPress }) => {
    return (
        <View>
            <TouchablePrimary style={styles.button} onPress={onPress}>
                <ThemedText style={styles.text}>{title}</ThemedText>
                <IconSecondary name={icon} size={86}/>
            </TouchablePrimary>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        width:'100%',
        height: "100%",
        borderRadius: sizes.borderRadius,
        justifyContent: "center",
        alignItems: "center",
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
        fontSize: 29,
        textAlign: "center",
        margin: 5,
        fontWeight:'500',
    },
});

export default ButtonWithIcon;
