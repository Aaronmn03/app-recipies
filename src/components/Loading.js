import React, {useState, useEffect} from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import {useLoading} from '../context/LoadingContext';
import { useTheme } from '../context/ThemeContext';

const Loading = () => {
    const { theme } = useTheme();
    const { loading } = useLoading();

    const [dots, setDots] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots.length === 3) {
            return ''; 
          }
          return prevDots + '.'; 
        });
      }, 500); 
  
      return () => clearInterval(interval);
    }, []);

    return (
        <Modal
        transparent={true}
        animationType="fade"
        visible={loading}
        onRequestClose={() => {}}
        >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color={theme.secondary} style={{ transform: [{ scale: 2 }] }} />
            <Text style={[styles.text, {color: theme.secondary}]}>Cargando{dots}</Text>
            </View>
        </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 30,
    fontSize: 16,
  },
});

export default Loading;
