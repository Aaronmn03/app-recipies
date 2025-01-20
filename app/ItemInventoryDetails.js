import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import colors from '../styles/colors';
import FloatingRightButton from '../components/floatingrightbutton';
import TitleView from '../components/TitleView';
import config from '../config/config';
import CustomModal from '../components/Modals/CustomModal';
import { unidad_medida } from '../utils/unitConverter.js';
import TextOrInput from '../components/TextOrInput';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import * as ImagePicker from 'expo-image-picker';

export default function ItemInventoryDetails() { 
    const router = useRouter();
    const { item } = useLocalSearchParams();
    const itemData = JSON.parse(item);
    const [removeModalVisible, setRemoveModalVisible] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alimento, setAlimento] = useState({
        ...itemData
    });
    const [uri, setUri] = useState();
    const [exitModalVisible, setExitModal] = useState(false);
    const [imageAux, setImageAux] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

    /****REMOVE*****/
    const fetchRemoveItem = () => {
        fetch(`${config.backendHost}:${config.backendPort}/Inventory/${itemData.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            console.assert('Item eliminado:', response);
            router.push('/');
        })
        .catch(error => console.error('Error eliminando item:', error));
    };


    const handleRemoveCancel = () => {
        setRemoveModalVisible(false);
    };

    const handleRemoveConfirm = () => {
        setRemoveModalVisible(false);
        fetchRemoveItem();
    };

    /********EDIT******/
    const fetchEditItem = async () => {
        setEditModalVisible(false);
        const body = JSON.stringify(alimento);
        console.log("El que mando a la bbdd", alimento.imagen);
        const response = await fetch (`${config.backendHost}:${config.backendPort}/Inventory/${alimento.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
              },
            body: body,
        })
        .then(response => {
            console.assert('Item actualizado:', response);
            router.push('/');
        })
        .catch(error => console.error('Error eliminando item:', error));   
        
        if (uri !== undefined) {
            const formData = new FormData();
            const fileName = alimento.imagen;
            formData.append('image', {
            uri: uri,
            name: fileName, 
            type: 'image/jpeg',  
            });
            try {
                const response = await fetch(`${config.backendHost}:${config.backendPort}/upload`, {
                method: 'POST',
                body: formData,
                });
                
                if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
                }
                const data = await response.json();
            } catch (error) {
                console.error('Error al subir la foto:', error);
            }
        }
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
                updateAlimento('imagen', `${alimento.id.toString()}_${alimento.nombre.toString()}_${alimento.id_inventario.toString()}_${new Date().getTime()}.jpg`);
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
        const parsedValue = parseInt(value, 10);
        if (parsedValue != alimento.cantidad && !isNaN(parsedValue)){
            updateAlimento('cantidad', parsedValue);
        }   
    }

    const handleStockMin = (value) => {
        const parsedValue = parseInt(value, 10);
        if (parsedValue != alimento.stock_minimo && !isNaN(parsedValue)){
            updateAlimento('stock_minimo', parsedValue);
        }   
    }
    
    const handleStockMax = (value) => {
        const parsedValue = parseInt(value, 10);
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
        <View style={styles.mainContainer}> 
            <TitleView title={'DETALLES'} onclick = {() => {
                if(editMode){
                    setExitModal(true);
                }else{
                    router.push('../');
                }
            }}/>        
            <View style={styles.headerDetail}>
                <TouchableOpacity style={styles.icon} onPress={pickImage}>
                    <Image source={imageAux ? {uri:uri} : alimento.imagen ? { uri: alimento.imagen} : require('../assets/aguacate.jpg')} style={styles.image}  />
                </TouchableOpacity>
                <Text style={styles.title_text}>{itemData.nombre.toString().toUpperCase()}</Text>
                {item.stock_minimo && parseFloat(item.cantidad) < parseFloat(item.stock_minimo) && <Icon name="exclamation-circle" size={25} color= {colors.exit} style={styles.alertIcon} />}
            </View>
            <View style={styles.cantidad_container}>
                <TextOrInput titulo={'Cantidad:'} keyboardType={'numeric'} condition={editMode} placeholder={String(alimento.cantidad)} valor= {alimento.cantidad} onChangeText={handleCount}  unidad ={unidad_medida(itemData)} direccion={'row'}></TextOrInput>
            </View>
            <View style={{flexDirection:'row', alignContent:'center', alignItems:'center', justifyContent: 'space-around', width: '90%', borderStyle:'solid', borderColor:colors.secondary, borderTopWidth:1, borderBottomWidth:1 ,paddingVertical:30}}>
                <View style={styles.stock_container}>
                    <TextOrInput titulo={'Stock mínimo '} keyboardType={'numeric'}condition={editMode} placeholder={String(alimento.stock_minimo)} valor= {alimento.stock_minimo} onChangeText={handleStockMin} direccion={'column'}></TextOrInput>
                    <TextOrInput titulo={'Stock máximo '} keyboardType={'numeric'} condition={editMode} placeholder={String(alimento.stock_maximo)} valor= {alimento.stock_maximo} onChangeText={handleStockMax} direccion={'column'}></TextOrInput>
                </View>
                <View style={styles.category_container}>
                    <TextOrInput titulo={'Categoría '} condition={editMode} placeholder={String(alimento.categoria)} valor= {alimento.categoria} onChangeText={handleCategoria}></TextOrInput>
                </View>
            </View>
            <Text style={styles.headerDesc}>DESCRIPCIÓN</Text>
            <View style={{width:'80%', borderStyle:'solid', borderWidth:1, borderRadius:10, padding:20, alignItems:'center', justifyContent:'flex-start', backgroundColor: colors.primary, }}>
                <TextOrInput condition={editMode} placeholder={String(alimento.descripcion)} valor= {alimento.descripcion} onChangeText={handleDescription}></TextOrInput>
            </View>
                
            
            {editMode && (
            <FloatingRightButton bottom={100} icon="check" color={colors.ok} onPress={() => setEditModalVisible(true)}/>       
            )}
            {!editMode && (
            <FloatingRightButton bottom={100} icon="edit" color={colors.backgroundColor} onPress={() => {setEditMode(true)}}/>
            )}
            <FloatingRightButton icon="trash" color={colors.exit} onPress={() => setRemoveModalVisible(true)}/>
            <CustomModal
                visible={removeModalVisible}
                onClose={handleRemoveCancel}
                message={`¿Eliminar ${itemData.nombre}?`}
                confirmText='Eliminar'
                cancelText='Cancelar'
                onConfirm={handleRemoveConfirm}
            /> 
            <CustomModal
                visible={exitModalVisible}
                message={`¿Salir sin guardar?`}
                onClose={() => setExitModal(false)}
                cancelText='Continuar modificando'
                onConfirm={() => {
                    setExitModal(false);
                    router.push('/');}
                }
                confirmText='Salir'
            />  

            <CustomModal
                visible={editModalVisible}
                onClose={() => setEditModalVisible(false)}
                message={`¿Guardar cambios en ${itemData.nombre}?`}
                confirmText='Editar'
                cancelText='Cancelar'
                onConfirm={fetchEditItem}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },
    icon: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginRight: 10,
        elevation: 10,
        borderStyle: 'solid',
        borderColor: colors.secondary,
        borderWidth: 2.5,
    },
    headerDetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        padding: 15,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: colors.secondary,
    },
    title_text:{
        color: colors.secondary,
        fontSize: 30,
        textAlign: 'center',
    },
    image: {
        width: '100%',  
        height: '100%', 
        resizeMode: 'cover', 
        borderRadius: 100,
    },
    cantidad_container:{
        width:'80%',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        margin:10,
        padding:15,
        borderStyle:'solid',
        borderWidth:1,
        borderColor: colors.secondary,
        borderRadius:10,
        backgroundColor: colors.primary
    },
    input: {
        height:40,
        borderWidth: 1,
        borderColor: colors.secondary,  
        borderRadius: 5,  
        padding: 1, 
        fontSize:16,
        color: colors.secondary,  
        textAlign: 'center',  
        minWidth: 60,  
    },
    stock_container:{
        borderStyle:'solid',
        borderWidth: 1,
        borderRadius:10,
        padding:10,
        backgroundColor: colors.primary
    },
    category_container:{
        borderStyle:'solid',
        borderWidth: 1,
        borderRadius:10,
        padding:10,
        backgroundColor: colors.primary
    },    
    headerDesc:{
        alignSelf:'left',
        marginLeft:'15%',
        margin:10,
        color: colors.secondary,
        fontSize:24,
    },  
});