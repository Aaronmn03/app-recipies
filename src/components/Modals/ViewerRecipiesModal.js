import { StyleSheet, View, Text, Modal, Image, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const ViewerRecipiesModal = ({ recipie, visible, onClose }) => {
  
  const getDifficultColor = (dificultad) => {
    switch (dificultad){
        case 'Fácil':
          return colors.ok;
        case 'Media':
          return colors.secondary;
        case 'Difícil':
          return colors.error;
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
        <View style={styles.modalContent}>
            <View style ={styles.Row}>
              <Image style={styles.image} source={recipie.imagen ? { uri: recipie.imagen } : require('../../assets/aguacate.jpg')}/>
              <View style={styles.rightHeaderContent}>
                <Text style={styles.recipieName}>{recipie.nombre}</Text>
                <View style={{ backgroundColor: getDifficultColor(recipie.dificultad), borderRadius:10, alignSelf: 'center', paddingHorizontal:20}}>
                  <Text style={styles.textHeader}>{recipie.dificultad}</Text>
                </View>
                <View style={styles.horizontalContainerHeader}>
                  <Text style={styles.textHeader}>{recipie.tiempo_preparacion}h</Text>
                  <Icon name="clock-o" size={25} color={colors.secondary} />
                </View>
                <View style={styles.horizontalContainerHeader}>
                  <Text style={styles.textHeader}>{recipie.porciones}</Text>
                  <Icon name="user" size={25} color={colors.secondary} />
                </View>
              </View>
            </View>
              <ScrollView>
              <View style={styles.ingredientsContainer}>
                {visible && recipie.ingredientes.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientContainer}>
                    <Image style={styles.image_ingredient} source={ingredient.imagen ? { uri: ingredient.imagen } : require('../../assets/aguacate.jpg')}/>
                    <Text style={styles.text_ingredient}>{ingredient.nombre}</Text>
                    <Text style={styles.text_ingredient}> {ingredient.cantidad}</Text>
                    <Text style={styles.text_ingredient}> {ingredient.unidad}</Text>
                  </View>
                ))}
              </View>

              <View>
              <Text style={styles.text_instructions}>{recipie.instrucciones}</Text>

              </View>
              </ScrollView> 
              <Icon 
                name={recipie.estado === 'Privado' ? 'lock' : 'unlock'} 
                size={26} 
                color={colors.secondary} 
                style={{ marginLeft: 5, textAlign: 'right'}} 
              />             
        </View>
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
    backgroundColor: colors.backgroundColor,
    margin: 20,
    marginVertical: 150,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  Row:{
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent:'space-around'
  },
  rightHeaderContent:{
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding:5,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  recipieName: {  
    marginTop:10,
    fontSize: 20,
    color: colors.secondary,
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
    color: colors.secondary,
    fontSize: 25,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  textHeader:{
    textAlign: 'center',
    color: colors.secondary,
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
    backgroundColor: colors.primary,
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
    color: colors.secondary
  },
  text_instructions:{
    fontSize:14,
    color: colors.secondary,
    marginHorizontal:15 
  }
});

export default ViewerRecipiesModal;
