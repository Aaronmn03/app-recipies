import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../styles/colors';


const Formulario_Contraseña = ({question, onChangeText}) => {
  return (
    <View style={styles.container}>
        <Text color={colors.secondary}>{question}</Text>
        <TextInput secureTextEntry={true} style={styles.input} onChangeText={onChangeText} placeholder="Escribe aquí"/>
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
        borderColor: colors.secondary,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10, 
        color: colors.secondary,
        placeholderTextColor: colors.secondary,
    },
});

export default Formulario_Contraseña;