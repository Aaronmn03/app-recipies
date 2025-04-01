import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemedPrimaryView, ThemedText} from '../components/ThemedComponents'
import {useTheme} from '../context/ThemeContext'

export default function Aliment({nombreItem, descripcionItem, funcion, image, outOfStock}) {
  const {theme} = useTheme();
  return (
    <View>
        <TouchableOpacity onPress={funcion}>
          <ThemedPrimaryView style={styles.container}>
            <Image source={image} style={styles.icon} />
            <View style={{width:'50%', justifyContent:'space-around', flexDirection:'column'}}>
              <View style={{width:'100%', flexDirection:'row'}}>
                <ThemedText style={styles.title}>{nombreItem}</ThemedText>
                {outOfStock && <Icon name="exclamation-circle" size={25} color= {theme.exit} style={styles.alertIcon} />}
              </View>
            <ThemedText style={styles.description}>{descripcionItem}</ThemedText>
            </View>
            <Icon name="chevron-right" size={15} color= {theme.secondary} style={styles.chevronIcon} />
          </ThemedPrimaryView>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    fontSize: 20,
    fontWeight:'500',
  },
  container: {
    width: '95%',
    borderRadius: 20,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    position: 'relative', 
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    elevation: 5,
  },
  description: {
    padding: 5,
    fontSize: 18,
    fontWeight:'300',
  },
  alertIcon:{
    alignContent:'right',
    alignItems:'right',
    marginLeft:5
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  topRightIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  }
});