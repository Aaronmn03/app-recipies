import {React, useState} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomModal = ({ visible, onClose, onConfirm, message, cantidad, setQuantity, unidad}) => {
  const [cant, setCantidad] = useState(Number(cantidad));

  function handleAddOne(){
    const new_cant = cant + 1;
    setCantidad(new_cant);
    setQuantity(new_cant);
  }

  function handleRemoveOne(){
    const new_cant = cant - 1;
    setCantidad(new_cant);
    setQuantity(new_cant);
  }

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
          <View style={styles.countContainer}>
            <TouchableOpacity style={styles.buttonMod} onPress={handleAddOne}>
                <Icon name="chevron-up" size={15} color= {colors.backgroundColor} > </Icon>
            </TouchableOpacity>
            <Text style={styles.cantidad}>{cant}</Text>
            <Text style={styles.unidad}>{unidad}</Text>
            <TouchableOpacity style={styles.buttonMod} onPress={handleRemoveOne}>
                <Icon name="chevron-down" size={15} color= {colors.backgroundColor}> </Icon>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Guardar</Text>
            </TouchableOpacity>
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
    width: '70%',
    padding: 20,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    alignItems: 'center',
  },
  message:{
    fontSize: 24,
    color: colors.backgroundColor,
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
  confirmButton:{
    flex: 1,
    marginLeft: 10,
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.exit,
    fontSize: 16,
  },
  confirmButtonText: {
    color: colors.ok,
    fontSize: 16,
  },
  countContainer:{
    margin: 20,
    flexDirection: 'column',
    alignSelf:'center',
    justifyContent: 'center',
    width:'40%',
  },
  cantidad:{
    fontSize: 36,
    alignSelf:'center',
    color: colors.backgroundColor
  },
  unidad:{
    fontSize: 12,
    alignSelf:'center',
    color: colors.backgroundColor
  },
  buttonMod:{
    backgroundColor: colors.primary,
    margin:5,
    padding: 10,
    paddingLeft:15,
    borderStyle: 'solid',
    borderRadius: 5,
    justifyContent:'center',
    alignItems: 'center'
  },
});

export default CustomModal;