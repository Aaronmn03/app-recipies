import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import {ThemedText, ThemedView, TouchableSecondary} from '../ThemedComponents'
import { useTheme } from '../../context/ThemeContext';

const CustomModal = ({ visible, onClose, message, onConfirm, confirmText = 'Confirmar', cancelText = 'Cerrar' }) => {

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
          <ThemedText style={styles.message}>{message}</ThemedText>
          <View style={styles.buttonContainer}>
            <TouchableSecondary style={styles.closeButton} onPress={onClose}>
              <Text style={onConfirm ? [styles.cancelButtonText,{color: theme.ok}] : [styles.singleButtonText, {color:theme.exit}]}>{cancelText}</Text>
            </TouchableSecondary>
            {onConfirm && (
              <TouchableSecondary style={styles.confirmButton} onPress={onConfirm}>
                <Text style={[styles.confirmButtonText, {color: theme.exit}]}>{confirmText}</Text>
              </TouchableSecondary>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default CustomModal;