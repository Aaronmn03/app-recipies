import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, StyleSheet, Image } from 'react-native';
import { useCameraDevice, Camera } from 'react-native-vision-camera';
import {ThemedPrimaryView, ThemedText} from '../ThemedComponents'

const CamaraModal = ({ visible, setVisible }) => {
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);
    const [permission, setPermission] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
      const checkPermissions = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus(); 
        if (cameraPermission !== 'authorized') {
          const newPermission = await Camera.requestCameraPermission(); 
          setPermission(newPermission);
        } else {
          setPermission(cameraPermission);
        }
      };
    
      checkPermissions();
    }, []);

    const takePicture = async () => {
      if (cameraRef.current) {
          const photo = await cameraRef.current.takePhoto(); 
          setPhoto(photo.path); 
      }
    };
  
    if (permission === 'denied') {
      return (
        <ThemedPrimaryView style={styles.permissionContainer}>
          <ThemedText style={styles.permissionText}>
            No tienes permisos para usar la cámara.
          </ThemedText>
        </ThemedPrimaryView>
      );
    }
    return (
        <Modal visible={visible} animationType="slide">
            <ThemedPrimaryView style={styles.cameraContainer}>  
            {device ? (
              <>
                <Camera
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    device={device}
                    isActive={true}
                    photo={true}
                />
                <Button title="Tomar Foto" onPress={takePicture} />
              </>
            ) : (
                <ThemedText style={styles.loadingText}>Cargando cámara...</ThemedText>
            )}
            {photo && <Image source={{ uri: `file://${photo}` }} style={styles.preview} />}
          </ThemedPrimaryView>
          <Button title="Cerrar" onPress={() => setVisible(false)} />
        </Modal>
    );
  };

  const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 30,
      paddingBottom: 150,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    permissionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    permissionText: {
      fontSize: 18,
      color: 'black',
      textAlign: 'center',
    },
    loadingText: {
      fontSize: 50,
      color: 'white',
      textAlign: 'center',
    },
    preview: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginTop: 20,
    },
  });

  export default CamaraModal;