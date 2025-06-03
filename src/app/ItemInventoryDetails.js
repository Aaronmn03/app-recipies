import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FloatingRightButton from '../components/floatingrightbutton';
import TitleView from '../components/TitleView';
import CustomModal from '../components/Modals/CustomModal';
import { unidad_medida } from '../utils/unitConverter.js';
import TextOrInput from '../components/TextOrInput';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import * as ImagePicker from 'expo-image-picker';
import { editAliment, removeAliment, emptyAliment } from '../services/inventoryService';
import { useAuth } from '../context/AuthContext';
import { useAlert } from '../context/AlertContext';
import {useTheme} from '../context/ThemeContext'
import { ThemedPrimaryView, ThemedText, ThemedView } from '../components/ThemedComponents';

export default function ItemInventoryDetails() { 
    const router = useRouter();
    const { item } = useLocalSearchParams();
    const itemData = JSON.parse(item);
    const {user, token} = useAuth()
    const {handleError, handleSuccess} = useAlert();
    const {theme} = useTheme();

    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [exitModalVisible, setExitModal] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alimento, setAlimento] = useState({
        ...itemData
    });
    const [uri, setUri] = useState();
    const [imageAux, setImageAux] = useState(null);
    
    /****REMOVE*****/

    const handleRemoveCancel = () => {
        setRemoveModalVisible(false);
    };

    const handleRemoveConfirm = async () => {
        setRemoveModalVisible(false);
        if(alimento.stock_minimo && parseInt(alimento.stock_minimo) > 0 && alimento.cantidad != 0){
            emptyAliment(alimento, token, handleError, handleSuccess);
        }else{
            removeAliment(alimento.id, token, user, handleError, handleSuccess);
        }
        router.replace('/');
    };

    /********EDIT******/

    const handleEdit = () =>{
        setEditModalVisible(false);
        editAliment(alimento, token, handleError, handleSuccess);
        router.replace('/');
    }

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, 
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled && result.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                setUri(uri)
                setImageAux(uri);
                updateAlimento('imagen', uri);
                setEditMode(true);
            }
        } catch (error) {
            console.error('Error al seleccionar la imagen:', error);
        }
    };  

    const updateAlimento = (key, value) => {
        setAlimento(prevAlimento => ({
            ...prevAlimento,
            [key]: value,
        }));
    };        
    
    const handleCount = (value) => {
        const parsedValue = parseFloat(value);
        if (parsedValue != alimento.cantidad && !isNaN(parsedValue)){
            updateAlimento('cantidad', parsedValue);
        }   
    }

    const handleStockMin = (value) => {
        const parsedValue = parseFloat(value);
        if (parsedValue != alimento.stock_minimo && !isNaN(parsedValue)){
            updateAlimento('stock_minimo', parsedValue);
        }   
    }
    
    const handleStockMax = (value) => {
        const parsedValue = parseFloat(value);
        if (parsedValue != alimento.stock_maximo && !isNaN(parsedValue)){
            updateAlimento('stock_maximo', parsedValue);
        }   
    }   

    const handleDescription = (value) => {
        if (value != alimento.descripcion){
            updateAlimento('descripcion', value);
        }   
    }

    const handleCategoria = (value) => {
        if (value != alimento.categoria){
            updateAlimento('categoria', value);
        }   
    }

    return (
        <ThemedView style={styles.mainContainer}> 
            <TitleView title={'DETALLES'}/>        
            <View style={styles.headerDetail}>
                <TouchableOpacity style={styles.icon} onPress={pickImage}>
                    <Image source={imageAux ? {uri:uri} : alimento.imagen ? { uri: alimento.imagen} : require('../assets/aguacate.jpg')} style={styles.image}  />
                </TouchableOpacity>
                <ThemedText style={styles.title_text}>{itemData.nombre.toString().toUpperCase()}</ThemedText>
                {item.stock_minimo && parseFloat(item.cantidad) < parseFloat(item.stock_minimo) && <Icon name="exclamation-circle" size={25} color= {theme.exit} style={styles.alertIcon} />}
            </View>
            <ThemedPrimaryView style={styles.cantidad_container}>
                <TextOrInput titulo={'Cantidad:'} keyboardType={'numeric'} condition={editMode} placeholder={String(alimento.cantidad)} valor= {alimento.cantidad} onChangeText={handleCount}  unidad ={unidad_medida(itemData)} direccion={'row'}></TextOrInput>
            </ThemedPrimaryView>
            <View style={{...commonStyles.container, width: '90%', borderColor:theme.secondary, borderTopWidth:1, borderBottomWidth:1 ,paddingVertical:30}}>
                <ThemedPrimaryView style={styles.stock_container}>
                    <TextOrInput titulo={'Stock mínimo '} keyboardType={'numeric'}condition={editMode} placeholder={String(alimento.stock_minimo)} valor= {alimento.stock_minimo} onChangeText={handleStockMin} direccion={'column'}></TextOrInput>
                    <TextOrInput titulo={'Stock máximo '} keyboardType={'numeric'} condition={editMode} placeholder={String(alimento.stock_maximo)} valor= {alimento.stock_maximo} onChangeText={handleStockMax} direccion={'column'}></TextOrInput>
                </ThemedPrimaryView>
                <ThemedPrimaryView style={styles.category_container}>
                    <TextOrInput titulo={'Categoría '} condition={editMode} placeholder={String(alimento.categoria)} valor= {alimento.categoria} onChangeText={handleCategoria}></TextOrInput>
                </ThemedPrimaryView>
            </View>
            <ThemedText style={styles.headerDesc}>DESCRIPCIÓN</ThemedText>
            <ThemedPrimaryView style={styles.contDesc}>
                <TextOrInput condition={editMode} placeholder={String(alimento.descripcion)} valor= {alimento.descripcion} onChangeText={handleDescription}></TextOrInput>
            </ThemedPrimaryView>
            
            {editMode && (
            <FloatingRightButton bottom={80} icon="check" color={theme.ok} onPress={() => setEditModalVisible(true)}/>       
            )}
            {!editMode && (
            <FloatingRightButton bottom={80} icon="edit" color={theme.backgroundColor} onPress={() => {setEditMode(true)}}/>
            )}
            <FloatingRightButton icon="trash" color={theme.exit} onPress={() => setRemoveModalVisible(true)}/>

            <CustomModal visible={removeModalVisible} onClose={handleRemoveCancel} message={`¿Eliminar ${itemData.nombre}?`} confirmText='Eliminar' cancelText='Cancelar' onConfirm={handleRemoveConfirm} /> 
            <CustomModal visible={exitModalVisible} message={`¿Salir sin guardar?`} onClose={() => setExitModal(false)} cancelText='Continuar modificando' onConfirm={() => { setExitModal(false); router.push('/');} } confirmText='Salir'/> 
            <CustomModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} message={`¿Guardar cambios en ${itemData.nombre}?`} confirmText='Editar' cancelText='Cancelar' onConfirm={handleEdit} /> 
        </ThemedView>
    );
}

const commonStyles = {
    container: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
    },
  };

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 10,
        borderWidth: 2.5,
    },
    headerDetail: {
        ...commonStyles.container,
        width: '90%',
        padding: 15,
        paddingHorizontal: 20,
    },
    title_text:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight:'500',
    },
    image: {
        width: '100%',  
        height: '100%', 
        resizeMode: 'cover', 
        borderRadius: 100,
    },
    cantidad_container:{
        ...commonStyles.container,
        width:'80%',
        margin:30,
        padding:10,
        borderRadius:10,
    },
    stock_container:{
        borderRadius:10,
        padding:10,
    },
    category_container:{
        borderRadius:10,
        padding:10,
    },    
    headerDesc:{
        alignSelf:'left',
        marginLeft:'15%',
        margin:10,
        fontSize:24,
    },  
    contDesc:{
        width:'80%',
        borderRadius:10,
        padding:20, 
        alignItems:'center', 
        justifyContent:'flex-start', 
    }
});