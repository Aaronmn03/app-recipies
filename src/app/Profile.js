import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../styles/colors';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
const auth = useAuth();
  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.close_session}>
            <Text style={styles.text} onPress={auth.logout}>Cerrar Sesión</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'flex-end',
        backgroundColor: colors.backgroundColor,
    },
    text:{
        color: colors.exit,
        fontSize: 20,
    },
    close_session:{
        padding:10,
        marginBottom:30,
        borderStyle:'solid',
        borderWidth:7,
        borderRadius:20,
        borderColor: colors.exit,
        backgroundColor: colors.secondary
    }

});