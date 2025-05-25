import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Platform, Image } from 'react-native';
import { ThemedView, ThemedText, TouchablePrimary, ThemedModalSelector } from '../components/ThemedComponents';
import TitleView from '../components/TitleView';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useLoading } from '../context/LoadingContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { fetchRecipiesData } from '../services/RecipieService';
import { guardarNuevoDia } from '../services/CalendarService';


export default function AddDay() {
  const { user, token } = useAuth();
  const { handleError, handleSuccess } = useAlert();
  const { theme } = useTheme();
  const [date, setDate] = useState(getMaxSelectableDate());
  const [showPicker, setShowPicker] = useState(false);
  const [recetas, setRecetas] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const [recetasComida, setRecetasComida] = useState([]);
  const [recetasCena, setRecetasCena] = useState([]);


  const handleAddComida = (recetaId) => {
    const receta = recetas.find(receta => receta.receta_id === recetaId); 
    console.log('Receta seleccionada para comida:', receta);
    setRecetasComida(prev => [...prev, receta]);
  }

  const handleAddCena = (recetaId) => {
    const receta = recetas.find(receta => receta.receta_id === recetaId); 
    setRecetasCena(prev => [...prev, receta]);
  }

    useEffect(() => {
        showLoading();
        fetchRecipiesData("", user, token, setRecetas, handleError);    
        hideLoading();
    }, []);

    const recetasFormateadas = recetas
    .filter(r => r && r.receta_id != null && r.nombre != null)
    .map(r => ({
        key: r.receta_id,
        label: r.nombre
    }));

  function getMaxSelectableDate() {
    const today = new Date();
    today.setDate(today.getDate() + 7);
    return today;
  }

  function getMinSelectableDate() {
    const today = new Date();
    today.setDate(today.getDate());
    return today;
  }

  const handleGuardar = () => {
    if (date < new Date()) {
      handleError('La fecha no puede ser anterior a hoy.');
      return;
    }
    if (date >= getMaxSelectableDate()) {
      handleError('La fecha no puede ser mayor a 4 días desde hoy.');
      return;
    }
    if(recetasComida.length === 0 || recetasCena.length === 0) {
      handleError('Debes seleccionar al menos una receta para comida y cena.');
      return;
    }
    const recetasComidaIds = recetasComida.map(receta => receta.receta_id);
    const recetasCenaIds = recetasCena.map(receta => receta.receta_id);
    const fechaISO = date.toISOString().split('T')[0]; // yyyy-mm-dd
    const nuevoDia = {
      fecha: fechaISO,
      comida: {
        receta_id: recetasComidaIds,
        personas: 1,
      },
      cena: {
        receta_id: recetasCenaIds,
        personas: 1,
      },
      id_user: user?.id,
    };
    guardarNuevoDia(nuevoDia, handleSuccess, handleError);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate && selectedDate <= getMaxSelectableDate() || selectedDate >= getMinSelectableDate()) {
      setDate(selectedDate);
    }else{
        handleError('La fecha seleccionada no es válida. Debe ser dentro de los próximos 7 días.');
    }
  };

  return (
    <ThemedView style={styles.container}>        
      <TitleView title="AÑADIR DIETA" />
        <ThemedText style={styles.label}>Selecciona una fecha (maximo 7 días en adelante):</ThemedText>
        <TouchablePrimary onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <ThemedText style={[styles.dateText]}>{date.toISOString().split('T')[0]}</ThemedText>
        </TouchablePrimary>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'android' ? 'spinner' : 'default'}
            maximumDateDate={getMaxSelectableDate()}
            onChange={onChangeDate}
          />
        )}
        <ScrollView>
        <ThemedText style={styles.label}>Comida:</ThemedText>
        <ThemedModalSelector
            data={recetasFormateadas}
            initValue="Selecciona una comida"
            onChange={(option) => handleAddComida(option.key)}
            style={styles.selector}
            cancelText='Cerrar'
            >
        </ThemedModalSelector>
        {recetasComida?.length > 0 && (
            <>
            {recetasComida.map((receta, index) => (
                <Recipie key={index} receta = {receta}/>
            ))}
            </>
        )}

        <ThemedText style={styles.label}>Cena:</ThemedText>
        <ThemedModalSelector
            data={recetasFormateadas}
            initValue="Selecciona una cena"
            onChange={(option) => handleAddCena(option.key)}
            style={styles.selector}
            cancelText='Cerrar'
            >
        </ThemedModalSelector>

        {recetasCena?.length > 0 && (
            <>
            {recetasCena.map((receta, index) => (
                <Recipie key={index} receta = {receta}/>
            ))}
            </>
        )}

        </ScrollView>
        <TouchablePrimary onPress={handleGuardar} style={[styles.dateButton, { width: '100%' }]}>
          <ThemedText style={[styles.dateText]}>Guardar</ThemedText>
        </TouchablePrimary>
    </ThemedView>
  );
}

const Recipie = ({ receta }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
      <Image source={receta.imagen ? { uri: receta.imagen } : require('../assets/aguacate.jpg')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
      <ThemedText style={{ fontSize: 16 }}>{receta.nombre}</ThemedText>
      {/*todo:Alguna manera de eliminar la receta de la lista*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  form: {
    paddingVertical: 30,
    alignItems: 'stretch',
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  selector: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  dateButton: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
});
