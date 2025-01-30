import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const CustomModal = ({ visible, onClose, message, onConfirm, confirmText = 'Confirmar', cancelText = 'Cerrar' }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
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
    backgroundColor: colors.transparent,
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    alignItems: 'center',
    borderStyle:'solid',
    borderWidth:3,
    borderColor: colors.secondary
  },
  message: {
    fontSize: 22,
    color: colors.secondary,
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
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  closeButton: {
    flex:0.48,
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:'center',
  },
  cancelButtonText: {
    color: colors.ok,
    fontSize: 16,
    textAlign:'center',
  },
  confirmButtonText: {
    color: colors.exit,
    fontSize: 16,
    textAlign:'center',
  },
  singleButtonText: {
    color: colors.exit,
    fontSize: 16,
  },
});

export default CustomModal;