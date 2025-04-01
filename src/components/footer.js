import React, {useState, useEffect} from "react";
import { StyleSheet } from "react-native";
import { useRouter, usePathname  } from 'expo-router';
import FooterButton from './FooterButton';
import { ThemedView, ThemedPrimaryView } from '../components/ThemedComponents' 

export default function Footer() {
  const router = useRouter();
  const [selected, setSelected] = useState(0); 
  const pathname = usePathname();

  const routes = [
    { path: '/', iconName: 'home', index: 0 },
    { path: '/Inventory', iconName: 'archive', index: 2 },
    { path: '/Recipies', iconName: 'book', index: 3 },
    { path: '/Profile', iconName: 'user', index: 1 },
  ];

  const setSelectedIcon = () => {  
    const currentRoute = routes.find(route => route.path === pathname);  
    setSelected(currentRoute ? currentRoute.index : -1);
  };
  
  useEffect(() => {
    setSelectedIcon()
  }, [pathname]);

  const handleNavigation = (path, index) => {
    setSelected(index)
    router.replace(path);
  };

  return (
    <ThemedView style={styles.main_container}>
    <ThemedPrimaryView style={styles.container}>
    {routes.map(({ path, iconName, index }) => (
        <FooterButton
          key={path} 
          iconName={iconName}
          isActive={selected === index}
          onPress={() => handleNavigation(path, index)}
        />
      ))}
      
    </ThemedPrimaryView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  main_container:{
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  container: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopStartRadius:25,
    borderTopEndRadius:25,
  },
});
