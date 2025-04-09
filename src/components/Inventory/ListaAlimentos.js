import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image  } from 'react-native';
import {ThemedPrimaryView, ThemedText} from '../ThemedComponents'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useTheme } from '../../context/ThemeContext';

const ListaAlimentos = ({ listaAlimentos, removeAliment, addOneMore, removeOne }) => {
    const {theme} = useTheme();
    const agruparAlimentos = (listaAlimentos) => {
        const alimentosAgrupados = {};
    
        listaAlimentos.forEach(alimento => {
            if (alimentosAgrupados[alimento.nombre]) {
                alimentosAgrupados[alimento.nombre].amount += 1;
            } else {
                alimentosAgrupados[alimento.nombre] = { ...alimento, amount: 1 };
            }
        });
    
        return Object.values(alimentosAgrupados);
    };

    const listaAgrupada = agruparAlimentos(listaAlimentos);

    return (
        <ScrollView style={styles.scrollContainer}>
            {listaAgrupada.map((alimento, index) => (
                <ThemedPrimaryView key={index} style={styles.itemContainer}>
                    <Image source={{uri:alimento.imagen}} style={{height:40, aspectRatio:1, borderRadius:5, marginHorizontal:5}}/>
                    <View style={{flex:1}}>
                        <ThemedText style={styles.itemText}>{alimento.nombre}</ThemedText>
                    </View>
                    <View style={{flex:1/3, flexDirection:'row',  alignItems:'center'}}>
                        <TouchableOpacity style={styles.centerIcon} onPress={() => addOneMore(alimento)}>
                            <Icon name="plus" size={14} color= {theme.secondary}/>
                        </TouchableOpacity>
                        <ThemedText style={styles.itemText}>{alimento.amount}</ThemedText>
                        <TouchableOpacity style={styles.centerIcon} onPress={() => removeOne(alimento)}>
                            <Icon name="minus" size={14} color= {theme.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.centerIcon} onPress={() => removeAliment(alimento)}>
                        <Icon name="trash-o" size={18} color= {theme.exit}/>
                    </TouchableOpacity>
                </ThemedPrimaryView>
            ))}
        </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        padding: 10,
    },
    itemContainer: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    centerIcon: {
        alignItems: 'right',
        borderRadius: 50,
    },
  });

  export default ListaAlimentos;