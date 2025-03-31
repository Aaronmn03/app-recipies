import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { useRouter } from 'expo-router';
import FloatingPlusButton from '../components/floatingrightbutton';
import colors from '../styles/colors';
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

export default function Recipies() {
    const [recipies, setRecipies] = useState<TypeRecipie[]>([]);
    const [recipieSelected, setRecipieSelected] = useState({ nombre: '' });
    const [recipieSearch, setSearch] = useState('');
    const router = useRouter();
    const {user, token} = useAuth();
    const [selectedVisible, setSelectedVisible] = useState(false);
    const [consumeVisible, setConsumeVisible] = useState(false);
    const { handleSuccess, handleError } = useAlert(); 
    

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
        const url = `${config.backendHost}:${config.backendPort}/Recipie/${user}?search=${recipieSearch}`;
        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(data => {
          setRecipies(data);
        })
        .catch(error => console.error('Error fetching data:', error));
      }
      fetchData();
    }, [recipieSearch]);
  
    return (
      <View style={styles.mainContainer}>
        <FloatingAlert/>
        <TitleView title={'TUS RECETAS'}/>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput style = {styles.textSearch} onChangeText={recipieSearch => setSearch(recipieSearch)} value = {recipieSearch} placeholder="Escribe aquí para encontrar una receta..."></TextInput>
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
          ):(<Text style={styles.text}>¡AÑADE UNA RECETA PARA COMENZAR!</Text>)}          
        </ScrollView>
        <FloatingPlusButton onPress={() => router.push('/AddRecipie')} color={colors.backgroundColor} icon={'plus'} bottom = {20} />
        <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />
        <CustomModal visible={consumeVisible} onClose={() => setConsumeVisible(false)} message={`¿Quieres consumir ${recipieSelected?.nombre ?? 'esta receta'}?`} onConfirm={confirmConsume}></CustomModal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex:1,
      backgroundColor: colors.backgroundColor,
    },
    scrollContainer: {
      flexGrow: 1,
      width: '100%',
    },
    textSearch:{
      margin:10,
      backgroundColor: colors.primary,
      fontSize: 18,
      borderRadius: 18,
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    recipies_container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingVertical:20,
    },
    text: {
        color: colors.secondary,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
  });
  