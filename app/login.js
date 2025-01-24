import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import colors from '../styles/colors';
import Formulario_Texto from '../components/formulario_texto';
import { useRouter} from 'expo-router';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import config from '../config/config';
import {useAuth} from '../context/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const auth = useAuth();

    const handleLogin = async () => {
        try{
            const response = await fetch(`${config.backendHost}:${config.backendPort}/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre_usuario: username,
                        contraseña: password,
                      }),
            });
            if(response.ok){
                const data = await response.json();
                const{token, userID} = data;
                auth.login(userID, token);
            }else{
                const errorData = await response.json();
                Alert.alert('Error', errorData.message || 'Usuario o contraseña incorrectos');  
            }

        }catch (error){
            console.error('Error durante el inicio de sesión:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión.');
        }
      };

    return(
        <View style={styles.container}>
            <Text style={{fontSize:32, color: colors.secondary, margin:20}}>¡BIENVENIDO!</Text>
            <View style={styles.login_container}>
                <Text style={styles.header_title}>LOGIN</Text> 
                <Formulario_Texto question="Introduce tu nombre de usuario" onChangeText={setUsername}></Formulario_Texto>
                <Formulario_Texto question="Introduce tu contraseña" onChangeText={setPassword}></Formulario_Texto>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text>Accede!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.register_container}>
                <Text style={styles.header_title}>REGISTRARSE</Text> 
                <Formulario_Texto question="Introduce tu nombre de usuario"></Formulario_Texto>
                <Formulario_Texto question="Introduce un correo electronico"></Formulario_Texto>
                <Formulario_Texto question="Introduce tu contraseña"></Formulario_Texto>
                <TouchableOpacity style={styles.button}>
                    <Text>Registrate!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const commonStyles = {
    container:{
        backgroundColor: colors.primary,
        width:'90%',
        paddingVertical:20,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:5,
        borderRadius:25,
        margin:10,
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor: colors.backgroundColor,
        
    },
    login_container:{
        ...commonStyles.container,
        flex:1,
    },
    register_container:{
        ...commonStyles.container,
        flex:1.2,
        marginBottom:20,
    },
    header_title:{
        color: colors.secondary,
        fontSize: 24
    },
    button:{
        backgroundColor: colors.ok,
        padding:10,
        borderRadius:15,
        borderColor: colors.secondary,
        borderWidth:1,
        width:'30%',
        height:'20%',
        justifyContent:'center',
        alignItems:'center'
    }
});