import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Formulario_Texto from '../components/formulario_texto';
import FloatingRightButton from '../components/floatingrightbutton';
import { useRouter} from 'expo-router';
import TitleView from '../components/TitleView';
import FloatingAlert from '../components/Modals/FloatingAlert';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';
import { validateInput, sendDataBackend } from '../services/AddInventoryService';
import { ThemedView, ThemedText, ThemedModalSelector, ThemedTextInput } from '../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';


export default function AddItem() {
  const [UnidadSeleccionada, setSelectedValue] = useState('Gramos');
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const { handleSuccess, handleError } = useAlert(); 
  const { user, token } = useAuth(); 
  const router = useRouter();
  const {theme} = useTheme();

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
    <ThemedView style={styles.main_container}>
      <FloatingAlert/>
      <TitleView title={'¡AÑADE TU ALIMENTO!'} />
      <View style={styles.form}>
        <Formulario_Texto question="Nombre de articulo:" onChangeText={setItemName}/>
        <Formulario_Texto question="Cantidad:" onChangeText={setItemQuantity}/>
        <ThemedText style={styles.label}>Unidades:</ThemedText>
        <ThemedModalSelector
          data={data}
          initValue="Selecciona una unidad"
          onChange={(option) => setSelectedValue(option.label)}
          style={[styles.selector, {backgroundColor: theme.backgroundColor}]}
          cancelText='Cerrar'
        >
          <ThemedTextInput style={styles.input} editable={false} placeholder="Selecciona una unidad" value={UnidadSeleccionada} />
        </ThemedModalSelector>
      </View>
      <FloatingRightButton onPress={handleAddItem} color={theme.ok} icon={'check'} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  label: {
    alignSelf: 'left',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 20,
  },
  input: {
    alignSelf: 'center',
    width: '90%',
    height: 42,
    marginTop: 5,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10, 
  },
  selector: {
    width: '100%',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});