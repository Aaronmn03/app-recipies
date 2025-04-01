import { StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ThemedText, ThemedView, TouchablePrimary } from '../components/ThemedComponents';

export default function Profile() {
    const { toggleTheme } = useTheme();
const auth = useAuth();
  return (
    <ThemedView style={styles.mainContainer}>
        <TouchablePrimary style={styles.buttons}>
            <ThemedText style={styles.text} onPress={auth.logout}>Cerrar Sesión</ThemedText>
        </TouchablePrimary>
        <TouchablePrimary style={styles.buttons}>
            <ThemedText style={styles.text} onPress={toggleTheme}>Cambiar Tema</ThemedText>
        </TouchablePrimary>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'flex-end',
    },
    text:{
        fontSize: 20,
    },
    buttons:{
        padding:10,
        marginBottom:30,
        borderStyle:'solid',
        borderRadius:20,
    },
});