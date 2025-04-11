import React, {useState} from 'react';
import { StyleSheet, View, Modal  } from 'react-native';
import {ThemedPrimaryView, ThemedText, ThemedTextInput, TouchablePrimary} from '../ThemedComponents'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useTheme } from '../../context/ThemeContext';
import { useAlert } from '../../context/AlertContext';

const NotInfoModal = ({ alimento,visible, onClose }) => {
    const {theme} = useTheme();
    const { handleError } = useAlert();
    const [, forceUpdate] = useState(false);

    const confirmAlimento = () => {
        if(!alimento || !alimento.nombre || !alimento.cantidad || !alimento.unidad_medida){
            handleError("Por favor, completa todos los campos.");
            return;
        }
        onClose(alimento);
    }
    
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
        <View style={styles.modalOverlay}>
            <ThemedPrimaryView style={styles.modalContent}>
                <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%'}}>
                    <ThemedText style={{fontSize: 25, fontWeight: 'bold'}}>{alimento?.codigo ? `¿Código: ${alimento.codigo}?` : 'Codigo no valido'}</ThemedText>
                    <TouchablePrimary onPress={onClose}>
                        <Icon name="close" size={25} color={theme.exit}/>
                    </TouchablePrimary>
                </View>
                <ThemedTextInput style={styles.input} placeholder="Introduce un nombre" value={alimento?.nombre} onChangeText={(text) => {alimento.nombre = text;  forceUpdate(x => !x);}}></ThemedTextInput>
                <ThemedTextInput style={styles.input} placeholder="Introduce la cantidad que viene" value={alimento?.cantidad} onChangeText={(text) => {alimento.cantidad = text;  forceUpdate(x => !x);}}></ThemedTextInput>
                <ThemedTextInput style={styles.input} placeholder="Introduce la unidad de medida(U, G, L)" value={alimento?.unidad_medida} onChangeText={(text) => {alimento.unidad_medida = text;  forceUpdate(x => !x);}}></ThemedTextInput>
                <TouchablePrimary onPress={confirmAlimento} style={[styles.confirmButtom, {backgroundColor: theme.ok}]}>
                    <ThemedText style={{fontSize:18, color: theme.secondary}}>Confirmar</ThemedText>
                </TouchablePrimary>
            </ThemedPrimaryView>
        </View>
        </Modal>  
    );
  };

  const styles = StyleSheet.create({
    modalOverlay:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        gap:20,
    },
    input:{
        borderWidth: 1,
        width: '100%',
        height: 40,
        borderRadius: 10,
        textAlign:'center',
    },
    confirmButtom:{
        padding: 12,
        borderRadius: 5
    }
  });

  export default NotInfoModal;