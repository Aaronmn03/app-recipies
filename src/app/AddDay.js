import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Platform, Image } from 'react-native';
import { ThemedView, ThemedText, TouchablePrimary, ThemedModalSelector, ThemedTextInput } from '../components/ThemedComponents';
import TitleView from '../components/TitleView';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import { useLoading } from '../context/LoadingContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';
import { fetchRecipiesData } from '../services/RecipieService';
import { guardarNuevoDia } from '../services/CalendarService';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewerRecipiesModal from '../components/Modals/ViewerRecipiesModal';


export default function AddDay() {
  const { user, token } = useAuth();
  const { handleError, handleSuccess } = useAlert();
  const [date, setDate] = useState(getMaxSelectableDate());
  const [showPicker, setShowPicker] = useState(false);
  const [recetas, setRecetas] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const [recetasComida, setRecetasComida] = useState([]);
  const [recetasCena, setRecetasCena] = useState([]);
  const [recipieSelected, setRecipieSelected] = useState();
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [comensalesComida, setComensalesComida] = useState('');
  const [comensalesCena, setComensalesCena] = useState('');


  const handleAddComida = (recetaId) => {
    const receta = recetas.find(receta => receta.receta_id === recetaId); 
    setRecetasComida(prev => [...prev, receta]);
  }

  const handleAddCena = (recetaId) => {
    const receta = recetas.find(receta => receta.receta_id === recetaId); 
    setRecetasCena(prev => [...prev, receta]);
  }

  const handleRemoveComida = (recetaId) => {
    setRecetasComida(prev => prev.filter(receta => receta.receta_id !== recetaId));
  }

  const handleRemoveCena = (recetaId) => {
    setRecetasCena(prev => prev.filter(receta => receta.receta_id !== recetaId));
  }

  const handleSelect = (receta) => {
    setRecipieSelected(receta);
    setSelectedVisible(true);
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
    if (comensalesComida === '' || comensalesCena === '') {
      handleError('Debes introducir el número de comensales para comida y cena.');
      return;
    }
    if(recetasComida.length === 0 || recetasCena.length === 0) {
      handleError('Debes seleccionar al menos una receta para comida y cena.');
      return;
    }
    const recetasComidaIds = recetasComida.map(receta => receta.receta_id);
    const recetasCenaIds = recetasCena.map(receta => receta.receta_id);
    const fechaISO = date.toISOString().split('T')[0]; 
    const nuevoDia = {
      fecha: fechaISO,
      comida: {
        receta_id: recetasComidaIds,
        personas: parseInt(comensalesComida),
      },
      cena: {
        receta_id: recetasCenaIds,
        personas: parseInt(comensalesCena),
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
        <ScrollView style={{width:'80%'}}>
        <ThemedText style={styles.label}>Comida:</ThemedText>
        <ThemedModalSelector
            data={recetasFormateadas}
            initValue="Selecciona una comida"
            onChange={(option) => handleAddComida(option.key)}
            style={styles.selector}
            cancelText='Cerrar'
            >
        </ThemedModalSelector>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, width:'75%' }}>
          <ThemedText style={{fontSize:15}}>Comensales: </ThemedText>
          <ThemedTextInput style={styles.input} onChangeText={comensales => setComensalesComida(comensales)} editable={true} placeholder="Introduce el numero de comensales" value={comensalesComida} />
        </View>
        {recetasComida?.length > 0 && (
            <>
            {recetasComida.map((receta, index) => (
                <Recipie key={index} receta = {receta} handleRemoveReceta={handleRemoveComida} handleSelect={handleSelect}/>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10, width:'75%' }}>
          <ThemedText style={{fontSize:15}}>Comensales: </ThemedText>
          <ThemedTextInput style={styles.input} onChangeText={comensales => setComensalesCena(comensales)} editable={true} placeholder="Introduce el numero de comensales" value={comensalesCena} />
        </View>
        {recetasCena?.length > 0 && (
            <>
            {recetasCena.map((receta, index) => (
                <Recipie key={index} receta = {receta} handleRemoveReceta={handleRemoveCena} handleSelect={handleSelect}/>
            ))}
            </>
        )}

        </ScrollView>
        <TouchablePrimary onPress={handleGuardar} style={[styles.dateButton, { width: '100%' }]}>
          <ThemedText style={[styles.dateText]}>Guardar</ThemedText>
        </TouchablePrimary>
        {selectedVisible && <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />}
    </ThemedView>
  );
}

const Recipie = ({ receta, handleRemoveReceta, handleSelect }) => {

  const { theme } = useTheme();
  
  return (
    <TouchablePrimary style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent:'space-around', padding: 8, borderRadius:15}} onPress={() => handleSelect(receta)}>
      <Image source={receta.imagen ? { uri: receta.imagen } : require('../assets/aguacate.jpg')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
      <ThemedText style={{ fontSize: 16 }}>{receta.nombre}</ThemedText>
      <TouchablePrimary style={{padding:7, borderRadius:5}} onPress={() => handleRemoveReceta(receta.receta_id)}>
        <Icon name="trash" size={25} color= {theme.exit} style={{}} />
      </TouchablePrimary>
    </TouchablePrimary>
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
    marginBottom: 5,
  },
  input: {
    height: 25,
    borderWidth: 1,
    paddingHorizontal: 6,
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
