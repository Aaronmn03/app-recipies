import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';
import Formulario_Texto from '../components/formulario_texto';
import FloatingRightButton from '../components/floatingrightbutton';
import ModalSelector from 'react-native-modal-selector';
import colors from '../styles/colors';
import { useRouter} from 'expo-router';
import TitleView from '../components/TitleView';
import FloatingAlert from '../components/Modals/FloatingAlert';
import IngredientsModal from '../components/Modals/IngredientsModal';
import { validateInput, sendDataBackend } from '../services/AddRecipieService';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';


export default function AddRecipie() {
  const [nombreReceta, setNombreReceta] = useState('');
  const [InstruccionesReceta, setInstruccionesReceta] = useState('');
  const [porciones, setPorciones] = useState('');
  const [tiempoPreparacion, setTiempoPreparacionReceta] = useState('');
  const [dificultadReceta, setSelectedValue] = useState('');
  const [selectedIngredientes, setSelectedIngredientes] = useState([]);

  const { user, token } = useAuth(); 
  const { handleSuccess, handleError } = useAlert(); 
  const router = useRouter();
  

  const receta = {
    nombre: nombreReceta,
    instrucciones: InstruccionesReceta,
    dificultad: dificultadReceta,
    ingredientes: selectedIngredientes,
    tiempo_preparacion: tiempoPreparacion,
    porciones: porciones,
  };

  const handleAddRecipie = () => {
    if (validateInput(receta, handleError)){
      sendDataBackend(receta, handleSuccess, handleError, user, token, router);
    }
  };

  const dificultad = [
    { key: 1, label: 'Fácil' },
    { key: 2, label: 'Medio' },
    { key: 3, label: 'Difícil' },
  ];

  return (
    
    <View style={styles.main_container}>
      <FloatingAlert/>
      <TitleView title={'¡AÑADE TU RECETA!'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.form}>
        <Formulario_Texto question="Nombre de receta:" onChangeText={setNombreReceta}/>
        <Formulario_Texto question="Instrucciones:" onChangeText={setInstruccionesReceta}/>
        <Formulario_Texto question="Tiempo de preparacion (horas):" onChangeText={setTiempoPreparacionReceta}/>
        <Formulario_Texto question="Porciones (personas):" onChangeText={setPorciones}/>
        <Text style={styles.label}>Dificultad:</Text>
        <ModalSelector
          data={dificultad}
          initValue="Selecciona una dificultad"
          onChange={(option) => setSelectedValue(option.label)}
          style={styles.selector}
          cancelText='Cerrar'
            ><TextInput
                style={styles.input}
                editable={false}
                placeholder="Selecciona una dificultad"
                value={dificultadReceta}
              />
        </ModalSelector>
        <IngredientsModal onSelect={setSelectedIngredientes} />
      </View> 
      </ScrollView>
      <FloatingRightButton onPress={handleAddRecipie} color={colors.ok} icon={'check'} />
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
    marginBottom: 20,
  },
  scrollContainer: {
    marginTop:'50',
    width: '100%',
  },
});