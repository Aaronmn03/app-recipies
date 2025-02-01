import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Formulario_Texto from '../components/formulario_texto';
import FloatingRightButton from '../components/floatingrightbutton';
import ModalSelector from 'react-native-modal-selector';
import colors from '../styles/colors';
import { useRouter} from 'expo-router';
import TitleView from '../components/TitleView';
import FloatingAlert from '../components/Modals/FloatingAlert';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';
import { validateInput, sendDataBackend } from '../services/AddInventoryService';


export default function AddItem() {
  const [UnidadSeleccionada, setSelectedValue] = useState('Gramos');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const { handleSuccess, handleError } = useAlert(); 
  const { user, token } = useAuth(); 
  const router = useRouter();
  

  const data = [
    { key: 1, label: 'Gramos' },
    { key: 2, label: 'Litros' },
    { key: 3, label: 'Unidades' },
  ];

  const alimento={
    nombre: itemName,
    cantidad: itemQuantity,
    unidad_medida: UnidadSeleccionada
  }

  const handleAddItem = () => {
    if (validateInput(alimento, handleError)){
      sendDataBackend(alimento, handleSuccess, handleError, user, token, router);
    }
  };
  return (
    <View style={styles.main_container}>
      <FloatingAlert/>
      <TitleView title={'¡AÑADE TU ALIMENTO!'} />
      <View style={styles.form}>
        <Formulario_Texto question="Nombre de articulo:" onChangeText={setItemName}/>
        <Formulario_Texto question="Cantidad:" onChangeText={setItemQuantity}/>
        <Text style={styles.label}>Unidades:</Text>
        <ModalSelector
          data={data}
          initValue="Selecciona una unidad"
          onChange={(option) => setSelectedValue(option.label)}
          style={styles.selector}
          cancelText='Cerrar'
        >
          <TextInput
            style={styles.input}
            editable={false}
            placeholder="Selecciona una unidad"
            value={UnidadSeleccionada}
          />
        </ModalSelector>
      </View>
      <FloatingRightButton onPress={handleAddItem} color={colors.ok} icon={'check'} />
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  label: {
    alignSelf: 'left',
    fontSize: 15,
    color: colors.secondary,
    marginTop: 5,
    marginLeft: 20,
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    height: 42,
    marginTop: 5,
    fontSize: 16,
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10, 
    backgroundColor: colors.backgroundColor,
    color: colors.secondary,
    placeholderTextColor: colors.secondary,
  },
  selector: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.backgroundColor,
  },
  form: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});