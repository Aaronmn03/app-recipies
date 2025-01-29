import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import colors from '../styles/colors';
import { useRouter} from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { AlertProvider } from '../context/AlertContext';
import Constants from 'expo-constants';

function LayoutContent() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try{
        if (!auth.isAuthenticated ) {
          router.replace('/login'); 
        } else{
          router.replace('/');
        }
      }catch(error){
        console.error("Error comprobando autenticación:", error);
      }
    };
    if(!auth.isLoading){
      checkAuth();
    }
    
  }, [auth.isLoading, auth.isAuthenticated]);

  if (auth.isLoading){
    return(
    <View style={{ flex: 1 }}>
      <Text>Cargando...</Text>
    </View>  
    );       
  }else{
    if (!auth.isAuthenticated){
      return(
        <View style={{ flex: 1 }}>
            <AlertProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </AlertProvider>
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1 }}>
          <Header style={styles.header} />
          <View style={styles.content}>
            <AlertProvider>
              <Stack screenOptions={{ headerShown: false }} />
            </AlertProvider>
          </View>
          <Footer color={0} style={styles.footer} />
        </View>
      );
    }
  }
}

export default function Layout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginBottom: 60,
    backgroundColor: colors.backgroundColor,
  },
  footer:{
    marginBottom: 60,
  }
});