import React, {useState} from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import colors from '../styles/colors';
import FooterButton from './FooterButton'; 

export default function Footer() {
  const router = useRouter();
  const [selected, setSelected] = useState(0); 
  const handleNavigation = (path, index) => {
    setSelected(index)
    router.replace(path);
  };

  return (
    <View style={styles.main_container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  main_container:{
    width: '100%',
    backgroundColor: colors.backgroundColor,
    position: 'absolute',
    bottom: 0,
  },
  container: {
    width: '100%',
    height: 60,
    backgroundColor: colors.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
    borderTopStartRadius:35,
    borderTopEndRadius:35,
  },
});
