import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from "../../styles/colors";
import { useAlert } from '../../context/AlertContext'; // Importa el contexto

export default function FloatingAlert() {
    const { isVisible, setIsVisible, alertMessage, alertType } = useAlert();
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.sequence([
                // Animación para mostrar la alerta
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.delay(3000),
                // Animación para ocultar la alerta
                Animated.timing(opacityAnim, {
                    duration: 500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setIsVisible(false);
            });
        }
    }, [isVisible]);

    const alertStyles = {
        success: { backgroundColor: colors.success, icon: 'check-circle' },
        info: { backgroundColor: colors.info, icon: 'exclamation-circle' },
        error: { backgroundColor: colors.error, icon: 'times-circle' },
    };

    const { backgroundColor, icon } = alertStyles[alertType] || alertStyles.success;

    return (
        <Animated.View style={[styles.main_container, { opacity: opacityAnim, backgroundColor, pointerEvents: isVisible ? 'auto' : 'none' }]}>
            <Icon style={styles.icon} name={icon} size={26} />
            <Text style={styles.alert_text}>{alertMessage}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex:1,
        width: '95%',
        backgroundColor: colors.success,
        padding: 12,
        borderRadius: 10,
        marginTop: '2.5%',
        position: 'absolute',
        zIndex: 1000, // Se asegura de que esté por encima de otros componentes
        elevation: 10, // Necesario para Android
        alignSelf:'center',
        flexDirection:'row',
        alignContent:'center'
    },
    icon: {
        color: colors.secondary,
    },
    alert_text:{
        color: colors.secondary,
        fontSize: 20,
        marginLeft:5,
        
    }
});
