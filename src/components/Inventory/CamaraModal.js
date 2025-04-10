import React, { useState, useEffect, useRef } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, ActivityIndicator  } from 'react-native';
import { useRouter } from 'expo-router';
import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';
import {ThemedPrimaryView, ThemedText, ThemedView} from '../ThemedComponents'
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import { extractAlimentFromCode, comprobarExisteAlimento, insertCodigoAlimento, sendDataBackend } from '../../services/AddInventoryService';
import PossibleNames from './PossibleNames';
import ListaAlimentos from './ListaAlimentos';

const CamaraModal = ({ visible, setVisible }) => {
    const device = useCameraDevice('back');
    const cameraRef = useRef(null);
    const [permission, setPermission] = useState(null);
    const {theme} = useTheme();
    const {user, token} = useAuth();
    const { handleSuccess, handleError } = useAlert(); 
    const router = useRouter();
    const [camaraActive, setCamaraActive] = useState(true);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const aliment = useRef({});
    const lastScannedCode = useRef();
    const [listaAlimentos, setListaAlimentos] = useState([]);

    const codeScanner = useCodeScanner({
      codeTypes: ['ean-13', 'ean-8', 'upc-a', 'upc-e'],
      onCodeScanned: (codes) => {
        const handleScan = async () => {
          console.log("Código escaneado: ", codes[0].value);
          setCamaraActive(false);
          const alimento = await comprobarExisteAlimento(codes[0].value, token);
          if (!alimento) {
            handleExtractAlimentFromCode(codes[0].value);
          } else {
            //todo:Poner algo como cargando
            setListaAlimentos(prevLista => [...prevLista, alimento]);
            setCamaraActive(true);
          }
        };
        if(!lastScannedCode.current || lastScannedCode.current !== codes[0].value){ 
          handleScan();
        }else{
          console.log("Este código ya fue escaneado.");
        }
        lastScannedCode.current = codes[0].value;
      }
    })

    const handleExtractAlimentFromCode = async (code) => {
      const data = await extractAlimentFromCode(code);
      //todo: AQUI TENEMOS QUE GESTIONAR SI NO SE HA ENCONTRADO NOMBRE.
      console.log(data);
      if(data){
        aliment.current = data;
        setConfirmModalVisible(true);
      }
    }

    const handleNameChange = (name) => {
      aliment.current = { ...aliment.current, nombre: name };
      handleConfirmAliment();
    };
    
    const handleConfirmAliment = async () => {
      insertCodigoAlimento(aliment.current, token);
      setListaAlimentos(prevLista => [...prevLista, aliment.current]);
      setCamaraActive(true);
    }

    const handleCancelAliment = () => { 
      setConfirmModalVisible(false);
      setCamaraActive(true);
      aliment.current = {};
    }

    const handleExist = () => {
      setListaAlimentos([]);
      setVisible(false);
    }

    const handleInsertAlimentos = async () => {
      console.log("Alimentos a insertar: ", listaAlimentos);
      for (const aliment of listaAlimentos) {
        sendDataBackend(aliment,handleSuccess, handleError, user , token, router);
      }
      setListaAlimentos([]);
      setVisible(false);
    }

    const handleAddOneMore = (aliment) => {
      setListaAlimentos(prevLista => [...prevLista, aliment]);
    }

    const handleRemoveOne = (aliment) => {
      setListaAlimentos(prevLista => {
        const index = prevLista.findIndex(item => item.nombre === aliment.nombre);
        if (index !== -1) {
            return [
                ...prevLista.slice(0, index),
                ...prevLista.slice(index + 1)
            ];
        }
        return prevLista;
    });
    }

    const handleRemoveAll = (aliment) => {
        setListaAlimentos(prevLista =>
          prevLista.filter(alimento => alimento.nombre !== aliment.nombre)
        );
    }
    
    useEffect(() => {

    }, [listaAlimentos]);

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
              <ThemedPrimaryView style = {styles.camera}>
                <View style={styles.cameraWrapper}>
                  <Camera
                    ref={cameraRef}
                    style={{flex:1}}
                    device={device}
                    isActive={camaraActive}
                    photo={true}
                    codeScanner={codeScanner}
                  />
                </View>
                {listaAlimentos.length > 0 && (
                  <ListaAlimentos listaAlimentos={listaAlimentos} removeAliment = {handleRemoveAll} addOneMore={handleAddOneMore} removeOne={handleRemoveOne}/>
                )}
                <ThemedView style={styles.closeCamera}>
                    <TouchableOpacity style={styles.centerIcon} onPress={() => handleExist()}>
                      <Icon name="arrow-left" size={14} color= {theme.secondary}/>
                    </TouchableOpacity>
                </ThemedView>
                {listaAlimentos.length > 0 && (
                    <ThemedView style={styles.confirmButton}>
                      <TouchableOpacity style={styles.centerIcon} onPress={() => handleInsertAlimentos()}>
                        <Icon name="check" size={14} color= {theme.ok}/>
                      </TouchableOpacity>
                    </ThemedView>
                )}
                  <PossibleNames imagen = {aliment?.current.imagen} visible={confirmModalVisible} names = {aliment.current.nombre} onClose={() => handleCancelAliment()} onConfirm={handleNameChange} /> 
              </ThemedPrimaryView>
            ):(
              <ThemedPrimaryView style={styles.loadingText}>
                <ActivityIndicator size="large" color={theme.secondary} />
              </ThemedPrimaryView>
            )}
          </ThemedPrimaryView>
        </Modal>
    );
  };

  const styles = StyleSheet.create({
    cameraContainer: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 10,
      paddingBottom: 20,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    camera:{
      flex:1,
      padding:10,
      borderRadius:20,
      overflow: 'hidden',
    },
    cameraWrapper:{
      marginTop: 20,
      height: '20%',
      width: '90%',
      alignSelf: 'center',
      borderRadius: 20,
      overflow: 'hidden',
      position:'relative'
    },
    closeCamera:{
      position: 'absolute',
      left:30,
      bottom:50,
      width: 45, 
      height: 45,
      borderRadius: 30, 
      justifyContent:'center',
    },
    confirmButton:{
      position: 'absolute',
      right:30,
      bottom:50,
      width: 45, 
      height: 45,
      borderRadius: 30, 
      justifyContent:'center',
    },
    takePhotoButton:{
      position: 'absolute',
      bottom: 50, 
      alignSelf: 'center', 
      width: 60, 
      height: 60,
      borderRadius: 30, 
      justifyContent:'center',
    },
    centerIcon:{
      justifyContent:'center',
      alignItems: 'center'
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
      margin:20,
      fontSize: 50,
      textAlign: 'center',
    },
    preview: {
      height:'75%',
      width: '90%',
      borderRadius:20,
      alignSelf: 'center',
      marginBottom: 20,
    },
  });

  export default CamaraModal;