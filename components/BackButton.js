import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import colors from '../styles/colors';


const BackButton = ({onclick}) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.button} onPress={onclick || (() => router.replace('../'))}>
      <Icon name={'arrow-left'} size={26} color={colors.backgroundColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start'
      },
});

export default BackButton;