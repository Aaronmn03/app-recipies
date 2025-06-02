import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemedPrimaryView, ThemedText, TouchableSecondary } from "../ThemedComponents";
import { useTheme } from "../../context/ThemeContext";

export default function Recipie({nombre, funcion, funcion1, image}) {
  const {theme} = useTheme();

  return (
    <ThemedPrimaryView style={styles.main_container}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} /> 
        <ThemedText style={styles.main_title}>{nombre}</ThemedText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableSecondary style={[styles.button, {backgroundColor: theme.backgroundColor}]} onPress={funcion}>
            <ThemedText style={styles.title}>Ver receta</ThemedText>
        </TouchableSecondary>
        {funcion1 && 
        <TouchableSecondary style={[styles.button, {backgroundColor: theme.backgroundColor}]} onPress={funcion1}>
            <ThemedText style={styles.title}>Consumir</ThemedText>
        </TouchableSecondary>
        }
      </View>
    </ThemedPrimaryView>
  );
}

const styles = StyleSheet.create({
    main_container: {
      width: '45%',
      alignItems: 'center', 
      borderRadius: 20,
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
      fontWeight:'600',
      textAlign:'left',
    },
    title: {
      padding: 2,
      fontSize: 14,
      fontWeight:'500',
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
  