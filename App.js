import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Activity from './components/activity';
import Footer from './components/footer';
import Header from './components/header';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <ScrollView contentContainerStyle={styles.activityContainer}>
        <Activity style={styles.activity} nombreActividad="Inventario comida"/>
        <Activity style={styles.activity} nombreActividad="Calendario comida"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>
        <Activity style={styles.activity} nombreActividad="Tareas que hacer"/>  
      
      </ScrollView>
      
      <TouchableOpacity style={styles.boton_añadir}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <Footer color={0}/>

      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#daf5fe',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20, // Añade un margen inferior al Header
  },
  activityContainer: {
    alignItems: 'center',
    paddingBottom: 20, // Añade un padding inferior para evitar que el contenido se superponga con el footer
  },
  activity: {
    marginTop: 10, // Añade un margen superior a las actividades
  },
  boton_añadir: {
    width: 50, // Usa valores numéricos en lugar de cadenas
    height: 50, // Usa valores numéricos en lugar de cadenas
    borderRadius: 25, // Usa valores numéricos en lugar de cadenas
    backgroundColor: '#2e6f85',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 45,
    right: 20,
  },
});
