import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import colors from '../styles/colors';
import FooterButton from './FooterButton'; // Importa el botón reutilizable

export default function Footer() {
  const router = useRouter();
  const [selected, setSelected] = useState(0); 
  const handleNavigation = (path, index) => {
    setSelected(index)
    router.replace(path);
  };

  return (
    <View style={styles.container}>
      <FooterButton
        label="HOME"
        iconName="home"
        isActive={selected == 0}
        onPress={() => handleNavigation('/', 0)}
      />
      <FooterButton
        label="USER"
        iconName="user"
        isActive={selected == 1}
        onPress={() => handleNavigation('/Profile', 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 2,
    borderColor: colors.secondary,
  },
});
