import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import { IconSecondary, ThemedPrimaryView, ThemedText, ThemedView, TouchablePrimary, TouchableSecondary } from '../components/ThemedComponents';
import TitleView from '../components/TitleView';
import { useAlert } from '../context/AlertContext';
import { fetchRecipiesData } from '../services/RecipieService';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';
import ViewerRecipiesModal from '../components/Modals/ViewerRecipiesModal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'expo-router';
import { fetchDias } from '../services/CalendarService';
import { set } from 'date-fns';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

export default function Calendar() {
  const { user, token } = useAuth();
  const { showLoading, hideLoading } = useLoading();
  const { handleError } = useAlert();
  const [recetas, setRecetas] = useState([]);
  const [recipieSelected, setRecipieSelected] = useState();
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [recetasDia, setRecetasDia] = useState([]);
  const [daySelected, setDaySelected] = useState();
  const [diaReceta, setDiaReceta] = useState();
  const scrollRef = useRef(null);

  const handleRecipieSelect = (recipie) => {
      setRecipieSelected(recipie);
      setSelectedVisible(true);
  }


  const formatDate = (dateInput) => {
    const d = new Date(dateInput);
    return d.toISOString().split('T')[0];
  };

  const handleSelectDay = (dia) => {
    setDaySelected(dia);
    const diaFormateado = formatDate(dia);
    const recetaDelDia = recetasDia.find(receta => formatDate(receta.fecha) === diaFormateado);
    if (recetaDelDia) {
      setDiaReceta(recetaDelDia);
    } else {
      setDiaReceta(undefined);
    }
  }

  useEffect(() => {
    const fetchRecipies = async () => {
      try {
        const recetas = await fetchRecipiesData("", user, token, handleError);
        setRecetas(recetas);
      } catch (error) {
        handleError("Error al cargar las recetas");
        console.error("Error al cargar las recetas:", error);
      }
    };

    showLoading();
    fetchRecipies();
    hideLoading();


  }, []);


  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({
          x: (diasDisponibles().length / 2) * 85, 
          animated: false,
        });
      }
    }, 0);
  }, []);

  useEffect(() => {
    const cargarDias = async () => {
      try {
        showLoading();
        const dias = await fetchDias();
        setRecetasDia(dias);
        if (dias.length > 0) {
          const hoy = new Date().toISOString().split('T')[0];
          const recetaDelDia = dias.find(receta => receta.fecha === hoy);
          if (recetaDelDia) {
            setDiaReceta(recetaDelDia);
            setDaySelected(hoy);
          } else {
            setDiaReceta(undefined);
            setDaySelected(undefined);
          }
        }
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

  const diasDisponibles = () => {
    const HOY = new Date();
    const dias = [];
    for (let i = -6; i < 7; i++) {
      const fecha = new Date(HOY);
      fecha.setDate(HOY.getDate() + i);
      dias.push(fecha.toISOString().split('T')[0]);
    }
    return dias;
  }

  return (
    <ThemedView style={styles.container}>
      <TitleView title={'CALENDARIO'} />
        <ScrollView horizontal ref={scrollRef} style={{height: 80, width:'100%'}} contentContainerStyle={{justifyContent:'center', alignItems:'center', gap:5}}>
          {diasDisponibles().map((dia, index) => (
            <Dia dia={dia} key={index} handleSelectDay={handleSelectDay} selectedDay={daySelected}/>
          ))}
        </ScrollView>
        <Recipie daySelected={daySelected} receta={diaReceta}/>
      {selectedVisible && <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />}
    </ThemedView>
  );
}

  const Dia = ({dia, handleSelectDay, selectedDay}) => {
    const { theme } = useTheme();
    const fecha = new Date(dia);
    const HOY = new Date();
    const normalizarFecha = (fecha) => {
      return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
    };

    const hoy = normalizarFecha(HOY);
    const fechaDia = normalizarFecha(fecha);

    const diffEnDias = (fechaDia.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);

    let diaFormateado = '';
    if (diffEnDias === 0) {
      diaFormateado = 'Hoy';
    } else if (diffEnDias === 1) {
      diaFormateado = 'Mañana';
    } else if (diffEnDias === -1) {
      diaFormateado = 'Ayer';
    } else {
      diaFormateado = fecha.toISOString().split('T')[0].split('-').slice(1).join('/');
    }
    if(dia != selectedDay){
      return (
        <TouchablePrimary style={{padding:18, borderRadius: 12, width:110}} onPress={() => handleSelectDay(dia)}>
          <ThemedText style={{fontSize: 20, textAlign: 'center'}}>{diaFormateado}</ThemedText>
        </TouchablePrimary>
      )
    } else {
      return(
      <TouchableSecondary style={{padding:18, borderRadius: 12, width:110}}>
        <Text style={{fontSize: 20, textAlign: 'center', color: theme.primary}}>{diaFormateado}</Text>
      </TouchableSecondary>
      )
      
    }
  }

  const Recipie = ({daySelected, receta}) => {
    const { theme } = useTheme();
    const router = useRouter();

    const latestDay = () => {
      const ayer = new Date();
      ayer.setDate(ayer.getDate() - 1);
      if (daySelected) {
        const fechaSeleccionada = new Date(daySelected);
        return fechaSeleccionada >= ayer;
      }
    }

    if(daySelected == undefined){
      return (
        <ThemedPrimaryView style={RecipieStyles.mainContainer}>
          <ThemedText style={{fontSize: 26, textAlign: 'center'}}>Selecciona el dia que quieras añadir</ThemedText>
        </ThemedPrimaryView>
      );
    }else{
      if(receta == undefined){
        return (
          <ThemedPrimaryView style={RecipieStyles.mainContainer}>
            <ThemedText style={{fontSize: 26, textAlign: 'center'}}>No hay recetas para este dia</ThemedText>
            {latestDay() && <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 'auto'}}>
              <TouchableSecondary style={[RecipieStyles.botones, {width: '100%'}]} onPress={() => router.push('/AddDay?fecha=' + daySelected)}>
                <Icon name="plus" size={26} color={theme.primary}/>
              </TouchableSecondary>
            </View>}
          </ThemedPrimaryView>
        );
      }else{
        return (
        <ThemedPrimaryView style={RecipieStyles.mainContainer}>
            <ThemedPrimaryView style={RecipieStyles.comidaContainer}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', width:'100%', marginBottom: 10}}>
                <ThemedText style={{fontSize: 26, textAlign: 'center'}}>Comida:</ThemedText>
                <View style={{flexDirection:'row', alignItems:'right', justifyContent:'center'}}>
                  <ThemedText style={{fontSize: 18, textAlign:'center'}}>{receta.comida.personas}</ThemedText>
                  <IconSecondary name="user" size={18} style={{marginLeft: 10}} />
                </View>
              </View>
              {receta.comida.recetas.map((comida, index) => (
                <View style = {{flexDirection:'row', alignItems:'center'}}key={index}>
                  <Image source={comida.imagen ? { uri: receta.imagen } : require('../assets/aguacate.jpg')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                  <ThemedText style={{fontSize: 18, textAlign: 'center'}}>{comida.nombre}</ThemedText>
                </View>
              ))}
            </ThemedPrimaryView>

            <ThemedPrimaryView style={RecipieStyles.comidaContainer}>
              <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', width:'100%', marginBottom: 10}}>
                <ThemedText style={{fontSize: 26, textAlign: 'center'}}>Cena:</ThemedText>
                <View style={{flexDirection:'row', alignItems:'right', justifyContent:'center'}}>
                  <ThemedText style={{fontSize: 18, textAlign:'center'}}>{receta.cena.personas}</ThemedText>
                  <IconSecondary name="user" size={18} style={{marginLeft: 10}} />
                </View>
              </View>
              {receta.cena.recetas.map((cena, index) => (
                <View style = {{flexDirection:'row', alignItems:'center'}}key={index}>
                  <Image source={cena.imagen ? { uri: receta.imagen } : require('../assets/aguacate.jpg')} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} />
                  <ThemedText style={{fontSize: 18, textAlign: 'center'}}>{cena.nombre}</ThemedText>
                </View>
              ))}
            </ThemedPrimaryView>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 'auto'}}>
              <TouchableSecondary style={RecipieStyles.botones}>
                <Icon name="pencil" size={26} color={theme.primary} />
              </TouchableSecondary>
              <TouchableSecondary style={RecipieStyles.botones}>
                <Icon name="trash" size={26} color={theme.primary} />
              </TouchableSecondary>
            </View>
            
          </ThemedPrimaryView>
        );
      }
    }  
  }
    const RecipieStyles = StyleSheet.create({
    mainContainer: {
      padding:50 ,
      flex:50,
      width:'100%',
      marginTop:90,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    comidaContainer:{
      padding: 15,
      flexDirection: 'column',
      alignItems: 'center',
      marginVertical: 10,
      justifyContent:'space-evenly',
      borderRadius: 15,
    },
    botones: {
      borderRadius: 15,
      height: 40,
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

