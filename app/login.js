import {View, Text, StyleSheet, TouchableOpacity, Animated, Easing} from 'react-native'
import colors from '../styles/colors';
import Formulario_Texto from '../components/formulario_texto';
import Formulario_Contraseña from '../components/formulario_contraseña';
import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import config from '../config/config';
import {useAuth} from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';
import { useAlert } from '../context/AlertContext';

export default function Login() {
    const [isLoginView, setIsLoginView] = useState(true);
    const rotationAnim = useRef(new Animated.Value(0)).current;
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [email, setEmail] = useState('');
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const auth = useAuth();
    const {handleError} = useAlert();

    const toggleView = () => {
        Animated.timing(rotationAnim,{
            toValue: isLoginView ? 1 : 0,
            duration:750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setIsLoginView(!isLoginView);

        })
    }

    const frontRotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'], // Rotación del frente
    });

    const backRotation = rotationAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg'], // Rotación de la parte trasera
    });

    const frontOpacity = rotationAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0, 0], // Oculta el frente cuando gira
    });

    const backOpacity = rotationAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1], // Muestra la parte trasera después del giro
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
                auth.login(userID, token);
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
                console.log(data);
                auth.login(userID, token);
            }else{
                const errorData = await response.json();
                //Alert.alert('Error', errorData.message || 'Usuario o contraseña incorrectos');  
                handleError("Revise los campos, deben estar todos completos");
            }

        }catch (error){
            console.error('Error durante el inicio de sesión:', error);
            //Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
            handleError("Ha ocurrido un error al intentar registrar al usuario");

        }
      };

    return(
        <View style={styles.main_container}>
            <FloatingAlert/>
            <View style={styles.container}>
                
                <Animated.View
                    style={[styles.flipContainer,{transform: [{rotateY: frontRotation}], opacity:frontOpacity,}]}pointerEvents={isLoginView ? 'auto' : 'none'}>
                <Text style={styles.welcome_message}>¡Hola de nuevo!</Text>
                <View style={styles.login_container}>
                    <Text style={styles.header_title}>LOGIN</Text> 
                    <Formulario_Texto question="Introduce tu nombre de usuario" onChangeText={setLoginUsername}></Formulario_Texto>
                    <Formulario_Contraseña question="Introduce tu contraseña" onChangeText={setLoginPassword}></Formulario_Contraseña>
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.button_text}>Accede!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButton} onPress={toggleView}>
                    <Text style={{ color: colors.primary }}>
                        ¿Aun no tienes cuenta?
                    </Text>
                    </TouchableOpacity>
                </View>
                </Animated.View>
                <Animated.View
                    style={[styles.flipContainer,{transform: [{rotateY: backRotation}], opacity:backOpacity,}]}pointerEvents={!isLoginView ? 'auto' : 'none'}>
                <Text style={styles.welcome_message}>¡BIENVENIDO!</Text>
                <View style={styles.register_container}>
                    <Text style={styles.header_title}>REGISTRARTE</Text> 
                    <Formulario_Texto question="Introduce tu nombre de usuario" onChangeText={setRegisterUsername}></Formulario_Texto>
                    <Formulario_Texto question="Introduce un correo electronico" onChangeText={setEmail}></Formulario_Texto>
                    <Formulario_Contraseña question="Introduce tu contraseña" onChangeText={setRegisterPassword}></Formulario_Contraseña>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.button_text}>Registrate!</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButton} onPress={toggleView}>
                    <Text style={{ color: colors.primary }}>
                        ¿Ya tienes alguna cuenta?
                    </Text>
                </TouchableOpacity>
                </View>
                
                </Animated.View>
            </View>
        </View>
    );
}

const commonStyles = {
    container:{
        backgroundColor: colors.primary,
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
        backgroundColor: colors.backgroundColor,  
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.backgroundColor,  
    },
    welcome_message:{
        fontSize:40,
        color: colors.secondary,
    },
    flipContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backfaceVisibility: 'hidden', // Esconde el lado trasero
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
        color: colors.secondary,
        fontSize: 28
    },
    button:{
        backgroundColor: colors.ok,
        borderRadius:15,
        borderColor: colors.secondary,
        borderWidth:1,
        width:'70%',
        height:'15%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
    },
    button_text:{
        color:colors.secondary,
        fontSize:20
    },
    toggleButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        backgroundColor: colors.secondary,
    },
});