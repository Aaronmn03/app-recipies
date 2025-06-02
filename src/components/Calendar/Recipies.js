import React, {useState} from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {  ThemedText, TouchableSecondary } from '../ThemedComponents';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useTheme } from '../../context/ThemeContext';
import { parse, format } from "date-fns";
import { da, es } from "date-fns/locale";
import ViewerRecipiesModal from '../Modals/ViewerRecipiesModal';
import { useLoading } from '../../context/LoadingContext';

export default function Recipies({dayOnCalendar}){
    const {theme} = useTheme();

    const [recipieSelected, setRecipieSelected] = useState();
    const [selectedVisible, setSelectedVisible] = useState(false);

    const handleRecipieSelect = (recipie) => {
        setRecipieSelected(recipie);
        setSelectedVisible(true);
    }

    if(!dayOnCalendar){
        return (            
            <View style={styles.container}>
                <ThemedText style={{fontSize:28,textAlign:'center'}}>¿Que vas a comer hoy?</ThemedText>
                <TouchableSecondary style={{width:'35%', height:40, borderRadius:12, justifyContent:'center', alignItems:'center', marginTop:30}} onPress={() => {}}>
                    <Icon name="plus" size={25} color= {theme.primary}/>
                </TouchableSecondary>
            </View>
        );
    }else{

        return (
            <View style={styles.container}>
                <DayRecipies handleRecipieSelect={handleRecipieSelect} dayOnCalendar={dayOnCalendar}></DayRecipies>
                {selectedVisible && <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />}
            </View>
        );
    }
}

export const DayRecipies = ({handleRecipieSelect, dayOnCalendar}) => {
    const { hideLoading } = useLoading();

    const dias = new Map();
    dias.set(obtenerFechaISO(), "Hoy");
    dias.set(obtenerFechaISO(1), "Mañana");
    dias.set(obtenerFechaISO(-1), "Ayer");

    const formattedDate = (date) => {
        const dia = format(
            parse(
                new Date(date).toLocaleDateString(),
                'd/M/yyyy',
                new Date()
            ),
            "EEEE, d 'de' MMMM 'del' yyyy",
            { locale: es }
        );
        return dia;
    }

    function obtenerFechaISO(diasOffset = 0) {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + diasOffset);
        return fecha.toISOString().split('T')[0];
    }

    function obtenerFecha() {
        const fechaISO = dayOnCalendar.fecha;
        if (dias.has(fechaISO)) {
            return dias.get(fechaISO);
        } else {
            return formattedDate(fechaISO);
        }
    }

    return (
        <View style={{flex:1, width:'100%', alignItems:'center', justifyContent:'center'}}>
            <ThemedText style={{fontSize:26}}>{obtenerFecha()}</ThemedText>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'100%'}}>
                <View style={{flexDirection:'column', marginVertical:10,}}>
                    <ThemedText style={{fontSize:20,textAlign:'center'}}>COMIDA</ThemedText>
                    <ThemedText style={{fontSize:16,textAlign:'center'}}>
                        {dayOnCalendar.comida.personas} {dayOnCalendar.comida.personas > 1 ? 'Comensales' : 'Comensal'}
                    </ThemedText>
                    <View>
                    {dayOnCalendar.comida.recetas.map((receta, index) => (
                        <Recipie key={receta.receta_id} receta={receta} handleRecipieSelect={handleRecipieSelect}/>
                    ))}
                    </View>
                    </View>
                    <View style={{flexDirection:'column', marginVertical:10}}>
                        <ThemedText style={{fontSize:20,textAlign:'center'}}>CENA</ThemedText>
                        <ThemedText style={{fontSize:16,textAlign:'center'}}>
                            {dayOnCalendar.cena.personas} {dayOnCalendar.cena.personas > 1 ? 'Comensales' : 'Comensal'}
                        </ThemedText>
                    <View>
                    {dayOnCalendar.cena.recetas.map((receta, index) => (
                        <Recipie key={receta.receta_id} receta={receta} handleRecipieSelect={handleRecipieSelect}/>
                    ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

const Recipie = ({receta, handleRecipieSelect}) => {
    return (
        <TouchableOpacity
            onPress={() => {handleRecipieSelect(receta)}}>
            <Image source={receta.imagen ? { uri: receta.imagen } : require('../../assets/aguacate.jpg')} style={{width: 75, height: 60, borderRadius: 7, marginVertical:5}}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
});