import { View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ThemedText, ThemedTextInput, ThemedView } from './ThemedComponents';

const TextOrInput = ({condition,titulo,placeholder = '0',valor,onChangeText,unidad,keyboardType,direccion,}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container,{flexDirection: direccion, }]}>
      {(titulo || condition) && <ThemedText style={[styles.text]}>{titulo} </ThemedText>}
      {condition ? (
        <ThemedTextInput style={[styles.input_text, styles.input, { color: theme.backgroundColor, fontSize:20 }]} keyboardType={keyboardType} placeholder={placeholder} onChangeText={onChangeText} placeholderTextColor={theme.backgroundColor}/>
      ) : (
        <ThemedView style={styles.value_container}>
          <ThemedText style={styles.text}>{valor}</ThemedText>
        </ThemedView>
      )}
      {unidad && <ThemedText style={styles.text}> {unidad}</ThemedText>}
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
    fontSize: 22,
    textAlign: 'center',
  },
  input_text: {
    fontSize: 22,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 60,
  },
  value_container:{
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    padding: 1,
    fontSize: 16,
    minWidth: 60,
    alignItems:'center',
    justifyContent:'center'
  },
});
