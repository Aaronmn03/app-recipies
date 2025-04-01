import { StyleSheet, View, Modal, Image, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemedPrimaryView, ThemedText, ThemedView} from '../ThemedComponents'
import { useTheme } from '../../context/ThemeContext';

const ViewerRecipiesModal = ({ recipie, visible, onClose }) => {
  const {theme} = useTheme();
  const getDifficultColor = (dificultad) => {
    switch (dificultad){
        case 'Fácil':
          return theme.ok;
        case 'Media':
          return theme.secondary;
        case 'Difícil':
          return theme.error;
    }
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      >
      <View style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
            <View style ={styles.Row}>
              <Image style={styles.image} source={recipie.imagen ? { uri: recipie.imagen } : require('../../assets/aguacate.jpg')}/>
              <ThemedPrimaryView style={styles.rightHeaderContent}>
                <ThemedText style={styles.recipieName}>{recipie.nombre}</ThemedText>
                <View style={{ backgroundColor: getDifficultColor(recipie.dificultad), borderRadius:10, alignSelf: 'center', paddingHorizontal:20}}>
                  <ThemedText style={styles.textHeader}>{recipie.dificultad}</ThemedText>
                </View>
                <View style={styles.horizontalContainerHeader}>
                  <ThemedText style={styles.textHeader}>{recipie.tiempo_preparacion}h</ThemedText>
                  <Icon name="clock-o" size={25} color={theme.secondary} />
                </View>
                <View style={styles.horizontalContainerHeader}>
                  <ThemedText style={styles.textHeader}>{recipie.porciones}</ThemedText>
                  <Icon name="user" size={25} color={theme.secondary} />
                </View>
              </ThemedPrimaryView>
            </View>
              <ScrollView>
              <ThemedPrimaryView style={styles.ingredientsContainer}>
                {visible && recipie.ingredientes.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientContainer}>
                    <Image style={styles.image_ingredient} source={ingredient.imagen ? { uri: ingredient.imagen } : require('../../assets/aguacate.jpg')}/>
                    <ThemedText style={styles.text_ingredient}>{ingredient.nombre}</ThemedText>
                    <ThemedText style={styles.text_ingredient}> {ingredient.cantidad}</ThemedText>
                    <ThemedText style={styles.text_ingredient}> {ingredient.unidad}</ThemedText>
                  </View>
                ))}
              </ThemedPrimaryView>

              <View>
              <ThemedText style={styles.text_instructions}>{recipie.instrucciones}</ThemedText>

              </View>
              </ScrollView> 
              <Icon 
                name={recipie.estado === 'Privado' ? 'lock' : 'unlock'} 
                size={26} 
                color={theme.secondary} 
                style={{ marginLeft: 5, textAlign: 'right'}} 
              />             
        </ThemedView>
      </View>
    </Modal>
    
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,  
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalContent:{
    flex: 1,
    margin: 20,
    marginVertical: 150,
    padding: 20,
    borderRadius: 20,
  },
  Row:{
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent:'space-around'
  },
  rightHeaderContent:{
    flex: 1,
    borderRadius: 10,
    padding:5,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  recipieName: {  
    marginTop:10,
    fontSize: 20,
    textAlign: 'center',
    flexWrap: 'wrap',
    fontWeight: 'bold',
  }, 
  horizontalContainerHeader:{
    justifyContent: 'space-evenly', 
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  tiempo_preparacion:{
    fontSize: 25,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  textHeader:{
    textAlign: 'center',
    fontSize: 20,
  },
  image:{
    width: '50%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  ingredientContainer:{
    padding: 15,
    flexDirection:'row',
    borderRadius: 10,
    alignItems:'center'
  },
  ingredientsContainer:{
    borderRadius:15,
    marginBottom:10,
  },
  image_ingredient:{
    width:30,
    height:30,
    borderRadius: 15,
    marginRight: 10,
  },
  text_ingredient:{
    fontSize: 15,
  },
  text_instructions:{
    fontSize:14,
    marginHorizontal:15 
  }
});

export default ViewerRecipiesModal;
