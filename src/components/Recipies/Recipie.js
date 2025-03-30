import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import colors from '../../styles/colors';

export default function Recipie({nombre, funcion, funcion1, image}) {
  return (
    <View style={styles.main_container}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} /> 
        <Text style={styles.main_title}>{nombre}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, {backgroundColor:colors.backgroundColor}]} onPress={funcion}>
            <Text style={styles.title}>Ver receta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor:colors.backgroundColor}]} onPress={funcion1}>
            <Text style={styles.title}>Consumir</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    main_container: {
      width: '45%',
      alignItems: 'center', 
      borderRadius: 20,
      backgroundColor: colors.primary,
      marginVertical: 20,
      padding: 10,
    },
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main_title: {
      fontSize: 20,
      marginTop: 40,
      color: colors.secondary,
      fontWeight:'600',
      textAlign:'left',
    },
    title: {
      padding: 2,
      fontSize: 14,
      fontWeight:'500',
      color: colors.secondary,
    },
    image: {
      position: 'absolute',
      top: -30,
      width: '80%',
      height:undefined,
      borderRadius: 15,
      elevation: 5,
      aspectRatio: 2,
    },
    buttonContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical:5
    },
    button:{
      width:'75%',
      marginBottom:7,
      padding:2,
      borderWidth:1,
      borderRadius:7,
      alignItems:'center',
    },
  });
  