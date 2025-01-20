import { View, TextInput, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const TextOrInput = ({
  condition,
  titulo,
  placeholder = '0',
  valor,
  onChangeText,
  unidad,
  keyboardType,
  direccion,
}) => {
  return (
    <View style={[styles.container,{flexDirection: direccion, }]}>
      {(titulo || condition) && <Text style={[styles.text]}>{titulo} </Text>}
      {condition ? (
        <TextInput style={[styles.input_text, styles.input, { color: colors.backgroundColor, fontSize:20 }]} keyboardType={keyboardType} placeholder={placeholder} onChangeText={onChangeText} placeholderTextColor={colors.backgroundColor}/>
      ) : (
        <View style={styles.value_container}>
          <Text style={styles.text}>{valor}</Text>
        </View>
      )}
      {unidad && <Text style={styles.text}> {unidad}</Text>}
    </View>
  );
};

export default TextOrInput;

const styles = StyleSheet.create({
  container:{ 
    justifyContent:'center', 
    alignItems:'center',
  },
  text: {
    color: colors.secondary,
    fontSize: 22,
    textAlign: 'center',
  },
  input_text: {
    color: colors.backgroundColor,
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 1,
    fontSize: 16,
    color: colors.secondary,
    textAlign: 'center',
    minWidth: 60,
    backgroundColor: colors.secondary
  },
  value_container:{
    height: 40,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 1,
    fontSize: 16,
    color: colors.secondary,
    minWidth: 60,
    backgroundColor: colors.backgroundColor,
    alignItems:'center',
    justifyContent:'center'
  },
});
