import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Image  } from 'react-native';
import {ThemedPrimaryView, ThemedText} from '../ThemedComponents'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useTheme } from '../../context/ThemeContext';

const ListaAlimentos = ({ listaAlimentos, setListaAlimentos }) => {
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

    const handleAddOneMore = (aliment) => {
        setListaAlimentos(prevLista => [...prevLista, aliment]);
    }
    
    const handleRemoveOne = (aliment) => {
        setListaAlimentos(prevLista => {
        const index = prevLista.findIndex(item => item.nombre === aliment.nombre);
        if (index !== -1) {
            return [
                ...prevLista.slice(0, index),
                ...prevLista.slice(index + 1)
            ];
        }
        return prevLista;
    });
    }

    const handleRemoveAll = (aliment) => {
        setListaAlimentos(prevLista =>
            prevLista.filter(alimento => alimento.nombre !== aliment.nombre)
        );
    }

    const listaAgrupada = agruparAlimentos(listaAlimentos);

    return (
        <ScrollView style={styles.scrollContainer}>
            {listaAlimentos.length > 0 && (
                listaAgrupada.map((alimento, index) => (
                    <ThemedPrimaryView key={index} style={styles.itemContainer}>
                        <Image source={{uri:alimento.imagen}} style={{height:40, aspectRatio:1, borderRadius:5, marginHorizontal:5}}/>
                        <View style={{flex:1}}>
                            <ThemedText style={styles.itemText}>{alimento.nombre}</ThemedText>
                        </View>
                        <View style={{flex:1/2, flexDirection:'row',gap:5, alignItems:'center'}}>
                            <TouchableOpacity style={styles.centerIcon} onPress={() => handleAddOneMore(alimento)}>
                                <Icon name="plus" size={25} color= {theme.secondary}/>
                            </TouchableOpacity>
                            <ThemedText style={styles.itemText}>{alimento.amount}</ThemedText>
                            <TouchableOpacity style={styles.centerIcon} onPress={() => handleRemoveOne(alimento)}>
                                <Icon name="minus" size={25} color= {theme.secondary}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={[styles.centerIcon, {marginLeft:15}]} onPress={() => handleRemoveAll(alimento)}>
                            <Icon name="trash-o" size={28} color= {theme.exit}/>
                        </TouchableOpacity>
                    </ThemedPrimaryView>
                ))
            )}

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