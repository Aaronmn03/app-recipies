import React, {useState} from 'react';
import { StyleSheet, View, Image, Touchable, TouchableOpacity } from 'react-native';
import { ThemedView, ThemedText, TouchableSecondary } from '../ThemedComponents';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useTheme } from '../../context/ThemeContext';
import { parse, format } from "date-fns";
import { es } from "date-fns/locale";
import ViewerRecipiesModal from '../Modals/ViewerRecipiesModal';


export default function Recipies({dayOnCalendar, recetas}){
    const {theme} = useTheme();
    const recetasComida = dayOnCalendar.comida.receta_id.map(id => recetas.find(r => r.receta_id === id));
    const recetasCena = dayOnCalendar.cena.receta_id.map(id => recetas.find(r => r.receta_id === id));
    const dia_string = format(
                                parse(
                                    new Date(dayOnCalendar.fecha).toLocaleDateString(),
                                    'd/M/yyyy',
                                    new Date()
                                ),
                                "EEEE, d 'de' MMMM 'del' yyyy",
                                { locale: es }
                            );

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
                <ThemedText style={{fontSize:26}}>{dia_string}</ThemedText>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around', width:'100%'}}>
                    <View style={{flexDirection:'column', marginVertical:10}}>
                        <ThemedText style={{fontSize:24,textAlign:'center'}}>COMIDA</ThemedText>
                        <ThemedText style={{fontSize:16,textAlign:'center'}}>{dayOnCalendar.comida.personas}Persona</ThemedText>
                        <View>
                        {recetasComida.map((receta, index) => (
                            <Recipie key={receta.receta_id} receta={receta} handleRecipieSelect={handleRecipieSelect}/>
                        ))}
                        </View>
                    </View>
                    <View style={{flexDirection:'column', marginVertical:10}}>
                        <ThemedText style={{fontSize:24,textAlign:'center'}}>CENA</ThemedText>
                        <ThemedText style={{fontSize:16,textAlign:'center'}}>{dayOnCalendar.cena.personas}Persona</ThemedText>
                    <View>
                    {recetasCena.map((receta, index) => (
                        <Recipie key={receta.receta_id} receta={receta} handleRecipieSelect={handleRecipieSelect}/>
                    ))}
                    </View>
                    </View>
                </View>
                {selectedVisible && <ViewerRecipiesModal recipie={recipieSelected} visible={selectedVisible} onClose={() => setSelectedVisible(false)} />}
            </View>
            
        );
    }
}

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