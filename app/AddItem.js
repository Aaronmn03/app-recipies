import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Formulario_Texto from '../components/formulario_texto';
import FloatingRightButton from '../components/floatingrightbutton';
import ModalSelector from 'react-native-modal-selector';
import colors from '../styles/colors';
import { useRouter} from 'expo-router';
import CustomModal from '../components/Modals/CustomModal';
import TitleView from '../components/TitleView';
import config from '../config/config';

export default function AddItem() {
  const [UnidadSeleccionada, setSelectedValue] = useState('Gramos');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    if (validateInput()){
      sendDataBackend();
    }
  };

  function validateInput() {
    if (!itemName || !itemQuantity || !UnidadSeleccionada) {
      setErrorMessage('Todos los campos son obligatorios.');
      setModalVisible(true);
      return false;
    }
    return true;
  }

  function sendDataBackend() {
    const body = JSON.stringify(alimento);
    fetch(`${config.backendHost}:${config.backendPort}/Inventory/AddItem/` ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(`Network response was not ok: ${text}`) });
      }
      return response.json();
    })
    .then((data) => {
      console.log('Datos recibidos del backend:', data);
      router.push('/Inventory');
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setErrorMessage(`Error al añadir el ítem: ${error.message}`);
      setModalVisible(true);
    });
  }
  const router = useRouter();  
  return (
    <View style={styles.main_container}>
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
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        message={errorMessage}
      />
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