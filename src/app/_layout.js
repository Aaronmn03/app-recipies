import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import colors from '../styles/colors';
import { useRouter} from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { AlertProvider } from '../context/AlertContext';

function LayoutContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      router.replace(isAuthenticated ? '/' : '/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading){
    return(
    <View style={{ flex: 1 }}>
      <Text>Cargando...</Text>
    </View>  
    );       
  }else{
    if (!isAuthenticated){
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