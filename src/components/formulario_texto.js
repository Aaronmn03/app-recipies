import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText, ThemedTextInput } from './ThemedComponents';
import { useTheme } from '../context/ThemeContext';

const Formulario_Texto = ({question, onChangeText}) => {
  const {theme} = useTheme();
  return (
    <View style={styles.container}>
        <ThemedText>{question}</ThemedText>
        <ThemedTextInput style={[styles.input, {borderColor: theme.secondary}]} onChangeText={onChangeText} placeholder="Escribe aquí"/>
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

export default Formulario_Texto;