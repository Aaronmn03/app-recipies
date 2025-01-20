import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../styles/colors';

const IconButton = ({funtion, icon}) => { 
return (
    <TouchableOpacity style={styles.button} onPress={funtion}>
        <Icon name={icon} size={15} color={colors.backgroundColor}/>
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        height:30,
        width:30,
        backgroundColor: colors.secondary,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
    }

});

export default IconButton;