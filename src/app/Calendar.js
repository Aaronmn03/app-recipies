import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedView } from '../components/ThemedComponents';
import TitleView from '../components/TitleView';
import { DayRecipies } from '../components/Calendar/Recipies';
import { useAlert } from '../context/AlertContext';
import { fetchRecipiesData } from '../services/RecipieService';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import ViewerRecipiesModal from '../components/Modals/ViewerRecipiesModal';
import FloatingRightButton from '../components/floatingrightbutton';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';
import { fetchDias } from '../services/CalendarService';

export default function Calendar() {
  const {theme} = useTheme();
  const router = useRouter();
  const { user, token } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { handleError } = useAlert();
  const [recetas, setRecetas] = useState([]);
  const [recipieSelected, setRecipieSelected] = useState();
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [recetasDia, setRecetasDia] = useState([]);

    const handleRecipieSelect = (recipie) => {
        setRecipieSelected(recipie);
        setSelectedVisible(true);
    }

  useEffect(() => {
    showLoading();
    fetchRecipiesData("", user, token, setRecetas, handleError);    
  }, []);

  useEffect(() => {
    const cargarDias = async () => {
      try {
        const dias = await fetchDias(recetas);
        setRecetasDia(dias);
      } catch (error) {
        handleError("Error al cargar los días del calendario");
        console.error("Error al cargar los días del calendario:", error);
      } finally {
        hideLoading();
      }
    };

    if (recetas.length > 0) {
      cargarDias();
    }
  }, [recetas]);
  

  return (
    <ThemedView style={styles.container}>
      <TitleView title={'CALENDARIO'} />
      <ScrollView style={{flex:1, width:'100%', marginVertical:'30', }} contentContainerStyle={{justifyContent:'center', alignItems:'center', gap:30}}>
      {recetasDia?.length > 0 &&
        recetasDia.map((dayOnCalendar, index )=> (
            <DayRecipies 
              key={index} 
              handleRecipieSelect={handleRecipieSelect} 
              dayOnCalendar={dayOnCalendar}
            />
        ))
      } 
      
      </ScrollView>      
      {selectedVisible && <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />}
      <FloatingRightButton onPress={() => router.push('/AddDay')} color={theme.backgroundColor} icon={'plus'}/>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
