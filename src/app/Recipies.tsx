import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import FloatingRightButton from '../components/floatingrightbutton';
import config from '../config/config';
import TitleView from '../components/TitleView.js';
import { useAuth } from '../context/AuthContext';
import FloatingAlert from '../components/Modals/FloatingAlert';
import Recipie from '../components/Recipies/Recipie';
import ViewerRecipiesModal from '../components/Modals/ViewerRecipiesModal';
import {TypeRecipie} from '../types/Recipie'
import CustomModal from '../components/Modals/CustomModal';
import {consume} from '../services/ConsumeService'
import { useAlert } from '../context/AlertContext';
import { ThemedView, ThemedTextInput, ThemedText } from '../components/ThemedComponents';
import { useTheme } from '../context/ThemeContext';
import { useLoading } from '../context/LoadingContext';

export default function Recipies() {
    const [recipies, setRecipies] = useState<TypeRecipie[]>([]);
    const [recipieSelected, setRecipieSelected] = useState({ nombre: '' });
    const [recipieSearch, setSearch] = useState('');
    const router = useRouter();
    const {user, token} = useAuth();
    const [selectedVisible, setSelectedVisible] = useState(false);
    const [consumeVisible, setConsumeVisible] = useState(false);
    const { handleSuccess, handleError } = useAlert(); 
    const {theme} = useTheme();
    const {showLoading, hideLoading} = useLoading();
    const timeoutRef = useRef(null);


    const handleSelectRecipie = (recipie) => {
      setSelectedVisible(true);
      setRecipieSelected(recipie);
    }

    const handleConsume = (recipie) => {
      setRecipieSelected(recipie)
      setConsumeVisible(true);
    }
  
    const confirmConsume = () => {
      consume(recipieSelected, user, token, handleError, handleSuccess);
      setConsumeVisible(false);
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          showLoading();
          const url = `${config.backendHost}/Recipie/${user}?search=${recipieSearch}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          });
    
          const data = await response.json();
          setRecipies(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          handleError("Error al cargar las recetas");
        } finally {
          hideLoading();
        }
      };
      // ESTO PONE UNA ESPERA DE 500ms PARA QUE NO SE HAGA UNA PETICION CADA VEZ QUE SE ESCRIBE EN EL INPUT
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        fetchData();
      }, 500);
    
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };

    }, [recipieSearch]);
    
  
    return (
      <ThemedView style={styles.mainContainer}>
        <FloatingAlert/>
        <TitleView title={'TUS RECETAS'}/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ThemedTextInput style = {styles.textSearch} onChangeText={recipieSearch => setSearch(recipieSearch)} value = {recipieSearch} placeholder="Escribe aquí para encontrar una receta..."></ThemedTextInput>
          {recipies.length > 0 ? (
            <View style={styles.recipies_container}>
            {recipies.map((recipie, index) => (
              <Recipie 
                key={index}
                nombre={recipie.nombre} 
                funcion={() => handleSelectRecipie(recipie)} 
                funcion1={() => handleConsume(recipie)} 
                image={recipie.imagen ? { uri: recipie.imagen } : require('../assets/aguacate.jpg')}
              />
            ))}
          </View>
          ):(<ThemedText style={styles.text}>¡AÑADE UNA RECETA PARA COMENZAR!</ThemedText>)}          
        </ScrollView>
        <FloatingRightButton onPress={() => router.push('/AddRecipie')} color={theme.backgroundColor} icon={'plus'} bottom = {20} />
        <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />
        <CustomModal visible={consumeVisible} onClose={() => setConsumeVisible(false)} message={`¿Quieres consumir ${recipieSelected?.nombre ?? 'esta receta'}?`} onConfirm={confirmConsume}></CustomModal>
      </ThemedView>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex:1,
    },
    scrollContainer: {
      flexGrow: 1,
      width: '100%',
    },
    textSearch:{
      padding: 10,
      margin:10,
      fontSize: 18,
      borderRadius: 7,
      borderWidth:1,
      height: '5%',
    },
    recipies_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingVertical:20,
    },
    text: {
        width: '80%',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
  });
  