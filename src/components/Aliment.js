import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';

export default function Aliment({nombreItem, descripcionItem, funcion, image, outOfStock}) {
  return (
    <View>
        <TouchableOpacity onPress={funcion}>
          <View style={styles.container}>
            <Image source={image} style={styles.icon} />
            <View style={{width:'50%', justifyContent:'space-around', flexDirection:'column'}}>
              <View style={{width:'100%', flexDirection:'row'}}>
                <Text style={styles.title}>{nombreItem}</Text>
                {outOfStock && <Icon name="exclamation-circle" size={25} color= {colors.exit} style={styles.alertIcon} />}
              </View>
            <Text style={styles.description}>{descripcionItem}</Text>
            </View>
            <Icon name="chevron-right" size={15} color= {colors.secondary} style={styles.chevronIcon} />
          </View>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 5,
    fontSize: 20,
    color: colors.secondary,
    fontWeight:'500',

  },
  container: {
    width: '95%',
    borderRadius: 20,
    backgroundColor: colors.primary,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    position: 'relative', 
    elevation: 5,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    padding: 5,
    fontSize: 18,
    color: colors.secondary,
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