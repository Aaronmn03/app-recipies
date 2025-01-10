import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Footer from './components/footer';
import Header from './components/header';
import Icon from 'react-native-vector-icons/FontAwesome';

const colors = {
  primary: '#2e6f85',
  secondary: '#B4F9FCFF',
  textPrimary: '#1A446BFF',
  textSecondary: '#fff',
  shadow: 'rgba(0, 0, 0, 0.4)',
};

const sizes = {
  iconSize: 65,
  buttonIconSize: 80,
  textSize: 24,
  borderRadius: 25,
  buttonWidth: '45%',
  buttonHeight: '100%',
  containerWidth: '90%',
  containerHeight: 150,
};

export default function App() {
  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.container_calendar_inventory}> 
        <TouchableOpacity style={styles.calendario}>
          <Text style={styles.text}>Calendario</Text>
          <Icon style={styles.icon} name='calendar' size={sizes.iconSize} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.despensa}>
          <Text style={styles.text}>Inventario</Text>
          <Icon style={styles.icon} name='archive' size={sizes.iconSize} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.container_days}> </View>
      <View style={styles.container_recipies}>
        <TouchableOpacity style={styles.boton_añadir}>
          <Icon name="plus" size={sizes.buttonIconSize} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.boton_recipies}>
          <Text style={styles.text_blue}>Mis Recetas</Text>
          <Icon name="book" size={sizes.buttonIconSize} color={colors.secondary} />
        </TouchableOpacity>
      </View> 
      
      <Footer color={0}/>

      <StatusBar style="auto"/>
    </View>
  );
}

const commonStyles = {
  button: {
    width: sizes.buttonWidth,
    height: sizes.buttonHeight,
    boxShadow: `4px 6px 3px ${colors.shadow}`,
    borderRadius: sizes.borderRadius,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: sizes.containerWidth,
    height: sizes.containerHeight,
    backgroundColor: colors.primary,
    borderRadius: 18,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  container_calendar_inventory: {
    ...commonStyles.container,
    boxShadow: `4px 6px 3px ${colors.shadow}`,
  },
  container_days: {
    ...commonStyles.container,
    boxShadow: `4px 6px 3px ${colors.shadow}`,
  },
  despensa: {
    flex: 1,
    margin: '5%',
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `3px 5px 3px ${colors.shadow}`,
  },
  calendario: {
    flex: 1,
    margin: '5%',
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: `3px 5px 3px ${colors.shadow}`,
  },
  boton_añadir: {
    ...commonStyles.button,
  },
  boton_recipies: {
    ...commonStyles.button,
  },
  container_recipies: {
    ...commonStyles.container,
    backgroundColor: colors.secondary,
  },
  text: {
    color: colors.textPrimary,
    fontSize: sizes.textSize,
    textAlign: 'center',
  },
  text_blue: {
    color: colors.secondary,
    fontSize: sizes.textSize,
    textAlign: 'center',
  },
  icon: {
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
