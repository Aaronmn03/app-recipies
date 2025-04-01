import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import { ThemedText, ThemedTextInput } from './ThemedComponents';



const Formulario_Contraseña = ({question, onChangeText}) => {
  return (
    <View style={styles.container}>
        <ThemedText color={colors.secondary}>{question}</ThemedText>
        <ThemedTextInput secureTextEntry={true} style={styles.input} onChangeText={onChangeText} placeholder="Escribe aquí"/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 75,
        flexDirection: 'column',
        borderRadius: 6,
        padding: 10,
    },
    input: {
        height: 42,
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10, 
    },
});

export default Formulario_Contraseña;