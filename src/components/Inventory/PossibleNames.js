import React, {useState} from 'react';
import { Modal, View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import {ThemedText, ThemedView, TouchablePrimary, ThemedTextInput} from '../ThemedComponents'
import { useTheme } from '../../context/ThemeContext';

const PossibleNames = ({ visible, onClose, onConfirm, names, imagen}) => {
  const [name, setName] = useState('');

  const selectName = (name) => {
    onConfirm(name);
    onClose();
  };

  const {theme} = useTheme();
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContainer}>
          <ThemedText style={styles.message}>¿Que nombre define mejor el alimento?</ThemedText>
            <ThemedView style={{flexDirection:'column', justifyContent:'space-between', width:'100%'}}>
            {visible && (
            <>
              {names?.length === 0 ? (
                <ThemedText style={{color: theme.secondary, textAlign: 'center'}}>No hay nombres posibles</ThemedText>
              ) : (
                names?.map((name, index) => (
                  <TouchablePrimary onPress={() => selectName(name)} key={index} style={{ marginTop: 5, padding: 10, borderRadius: 5, marginHorizontal: 5 }}>
                    <ThemedText style={{ textAlign: 'center' }}>{name}</ThemedText>
                  </TouchablePrimary>
                ))
              )}
              {names?.length < 2 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  <ThemedTextInput style={styles.input} placeholder="Introduce un nombre distinto" value={name} onChangeText={(text) => setName(text)}></ThemedTextInput>
                  <TouchablePrimary onPress={() => selectName(name)} style={[styles.confirmButton, {backgroundColor: theme.ok}]}>
                    <ThemedText style={styles.confirmButtonText}>Confirmar</ThemedText>
                  </TouchablePrimary>
                </View>
              )}
            </>
          )}
            </ThemedView>
          <View style={styles.imageContainer}>
            {imagen ? (
                <Image source={{ uri: imagen }} style={{ width: '90%', aspectRatio:1, borderRadius: 10 }} />
            ) : (
                <ThemedText style={{ color: theme.secondary }}>Imagen no disponible</ThemedText>
            )}
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparent,
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 22,
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding:10,
    width: '100%',
  },
  confirmButton: {
    flex:0.48,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  closeButton: {
    flex:0.48,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  cancelButtonText: {
    fontSize: 16,
    textAlign:'center',
  },
  confirmButtonText: {
    fontSize: 16,
    textAlign:'center',
  },
  singleButtonText: {
    fontSize: 16,
  },
});

export default PossibleNames;