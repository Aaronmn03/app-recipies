import { Text, StyleSheet, TouchableOpacity, Animated, Easing} from 'react-native'
import Formulario_Texto from '../components/formulario_texto';
import Formulario_Contraseña from '../components/formulario_contraseña';
import React, { useState, useRef } from 'react';
import config from '../config/config';
import {useAuth} from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';
import { useAlert } from '../context/AlertContext';
import { useTheme } from '../context/ThemeContext';
import { ThemedPrimaryView, ThemedText, ThemedView, TouchableSecondary } from '../components/ThemedComponents';

export default function Login() {
    const [isLoginView, setIsLoginView] = useState(true);
    const rotationAnim = useRef(new Animated.Value(0)).current;
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [email, setEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const {login} = useAuth();
    const {handleError} = useAlert();
    const {theme} = useTheme();

    const toggleView = () => {
        Animated.timing(rotationAnim,{
            toValue: isLoginView ? 1 : 0,
            duration:750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => setIsLoginView(!isLoginView))
    }

    const frontRotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'], 
    });

    const backRotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'], 
    });

    const frontOpacity = rotationAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0], 
    });

    const backOpacity = rotationAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1], 
    });

    const handleLogin = async () => {
        try{
            const response = await fetch(`${config.backendHost}:${config.backendPort}/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre_usuario: loginUsername,
                        contraseña: loginPassword,
                      }),
            });
            if(response.ok){
                const data = await response.json();
                const{token, userID} = data;
                login(userID, token);
            }else{
                const errorData = await response.json();
                handleError("Usuario o contraseña incorrectos");
            }

        }catch (error){
            console.error('Error durante el inicio de sesión:', error);
            handleError("Ha ocurrido un error al intentar iniciar sesión");
        }
      };

    const handleRegister = async () => {
        try{
            const response = await fetch(`${config.backendHost}:${config.backendPort}/register`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre_usuario: registerUsername,
                        contraseña: registerPassword,
                        email: email,
                      }),
            });
            if(response.ok){
                const data = await response.json();
                const{token, userID} = data;
                login(userID, token);
            }else{
                handleError("Revise los campos, deben estar todos completos");
            }

        }catch (error){
            console.error('Error durante el inicio de sesión:', error);
            handleError("Ha ocurrido un error al intentar registrar al usuario");

        }
      };

    return(
        <ThemedView style={styles.main_container}>
            <FloatingAlert/>
            <ThemedView style={styles.container}>  
                <Animated.View
                    style={[styles.flipContainer,{transform: [{rotateY: frontRotation}], opacity:frontOpacity,}]}pointerEvents={isLoginView ? 'auto' : 'none'}>
                <ThemedText style={styles.welcome_message}>¡Hola de nuevo!</ThemedText>
                <ThemedPrimaryView style={styles.login_container}>
                    <ThemedText style={styles.header_title}>LOGIN</ThemedText> 
                    <Formulario_Texto question="Introduce tu nombre de usuario" onChangeText={setLoginUsername}></Formulario_Texto>
                    <Formulario_Contraseña question="Introduce tu contraseña" onChangeText={setLoginPassword}></Formulario_Contraseña>
                    <TouchableSecondary style={[styles.button, {backgroundColor: theme.ok}]} onPress={handleLogin}>
                        <ThemedText style={styles.button_text}>Accede!</ThemedText>
                    </TouchableSecondary>
                    <TouchableSecondary style={styles.toggleButton} onPress={toggleView}>
                    <Text style={{ color: theme.primary }}>
                        ¿Aun no tienes cuenta?
                    </Text>
                    </TouchableSecondary>
                </ThemedPrimaryView>
                </Animated.View>
                <Animated.View
                    style={[styles.flipContainer,{transform: [{rotateY: backRotation}], opacity:backOpacity,}]}pointerEvents={!isLoginView ? 'auto' : 'none'}>
                <ThemedText style={styles.welcome_message}>¡BIENVENIDO!</ThemedText>
                <ThemedPrimaryView style={styles.register_container}>
                    <ThemedText style={styles.header_title}>REGISTRARTE</ThemedText> 
                    <Formulario_Texto question="Introduce tu nombre de usuario" onChangeText={setRegisterUsername}></Formulario_Texto>
                    <Formulario_Texto question="Introduce un correo electronico" onChangeText={setEmail}></Formulario_Texto>
                    <Formulario_Contraseña question="Introduce tu contraseña" onChangeText={setRegisterPassword}></Formulario_Contraseña>
                    <TouchableSecondary style={[styles.button, {backgroundColor: theme.ok}]} onPress={handleRegister}>
                        <ThemedText style={styles.button_text}>Registrate!</ThemedText>
                    </TouchableSecondary>
                    <TouchableSecondary style={styles.toggleButton} onPress={toggleView}>
                    <Text style={{ color: theme.primary }}>
                        ¿Ya tienes alguna cuenta?
                    </Text>
                </TouchableSecondary>
                </ThemedPrimaryView>
                
                </Animated.View>
            </ThemedView>
        </ThemedView>
    );
}

const commonStyles = {
    container:{
        width:'90%',
        alignItems:'center',
        justifyContent:'space-evenly',
        paddingVertical:20,
        borderWidth:5,
        borderRadius:25,
        margin:10,
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex:1,
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    welcome_message:{
        fontSize:40,
    },
    flipContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    login_container:{
        ...commonStyles.container,
    },
    register_container:{
        ...commonStyles.container,
    },
    header_title:{
        fontSize: 28
    },
    button:{
        borderRadius:15,
        borderWidth:1,
        width:'70%',
        height:'15%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
    button_text:{
        fontSize:20
    },
    toggleButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
    },
});