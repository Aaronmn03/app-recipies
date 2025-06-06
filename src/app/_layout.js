import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter} from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { AlertProvider } from '../context/AlertContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { LoadingProvider } from '../context/LoadingContext';
import Loading from '../components/Loading';
import FloatingAlert from '../components/Modals/FloatingAlert';

function LayoutContent() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const {theme} = useTheme();

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
              <FloatingAlert/>
              <Stack screenOptions={{ headerShown: false }} />
            </AlertProvider>
        </View>
      );
    }else{
      return (
        <View style={{ flex: 1 }}>
          <Header style={styles.header} />
          <View style={[styles.content, {backgroundColor: theme.backgroundColor}]}>
            <AlertProvider>
              <FloatingAlert/>
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
    <ThemeProvider>
      <LoadingProvider>
        <Loading />
        <AuthProvider>
          <SafeAreaView style={{ flex: 1 }}>
          <LayoutContent />
          <StatusBar style="auto"/>
          
          </SafeAreaView>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
    
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginBottom: 60,
  },
  footer:{
    marginBottom: 60,
  }
});