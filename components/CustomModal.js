import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const CustomModal = ({ visible, onClose, message, onConfirm, confirmText = 'Confirmar', cancelText = 'Cerrar' }) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={onConfirm ? styles.cancelButtonText : styles.singleButtonText}>{cancelText}</Text>
            </TouchableOpacity>
            {onConfirm && (
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 20,
    color: colors.backgroundColor,
    marginBottom: 20,
  },
  closeButton: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.ok,
    fontSize: 16,
  },
  confirmButtonText: {
    color: colors.exit,
    fontSize: 16,
  },
  singleButtonText: {
    color: colors.exit,
    fontSize: 16,
  },
});

export default CustomModal;