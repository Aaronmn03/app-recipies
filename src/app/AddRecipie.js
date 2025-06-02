import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Formulario_Texto from '../components/formulario_texto';
import FloatingRightButton from '../components/floatingrightbutton';
import { useRouter} from 'expo-router';
import TitleView from '../components/TitleView';
import IngredientsModal from '../components/Modals/IngredientsModal';
import { validateInput, sendDataBackend } from '../services/RecipieService';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../context/AuthContext';
import { ThemedModalSelector, ThemedText, ThemedTextInput, ThemedView } from '../components/ThemedComponents';
import {useTheme} from '../context/ThemeContext'

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
  const {theme} = useTheme();
  

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
    
    <ThemedView style={styles.main_container}>
      <TitleView title={'¡AÑADE TU RECETA!'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.form}>
        <Formulario_Texto question="Nombre de receta:" onChangeText={setNombreReceta}/>
        <Formulario_Texto question="Instrucciones:" onChangeText={setInstruccionesReceta}/>
        <Formulario_Texto question="Tiempo de preparacion (horas):" onChangeText={setTiempoPreparacionReceta}/>
        <Formulario_Texto question="Porciones (personas):" onChangeText={setPorciones}/>
        <ThemedText style={styles.label}>Dificultad:</ThemedText>
        <ThemedModalSelector
          data={dificultad}
          initValue="Selecciona una dificultad"
          initValueTextStyle={{}}
          onChange={(option) => setSelectedValue(option.label)}
          style={styles.selector}
          cancelText='Cerrar'
            ><ThemedTextInput
                style={styles.input}
                editable={false}
                placeholder="Selecciona una dificultad"
                value={dificultadReceta}
              />
        </ThemedModalSelector>
        <IngredientsModal onSelect={setSelectedIngredientes} />
      </View> 
      </ScrollView>
      <FloatingRightButton onPress={handleAddRecipie} color={theme.ok} icon={'check'} />
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
    borderWidth: 2,
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
    marginBottom: 20,
  },
  scrollContainer: {
    marginTop:'50',
    width: '100%',
  },
});