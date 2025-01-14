import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import colors from '../styles/colors';
import FloatingRightButton from '../components/floatingrightbutton';
import TitleView from '../components/TitleView';
import config from '../config/config';
import CustomModal from '../components/CustomModal';

export default function ItemInventoryDetails() { 
    const router = useRouter();
    const { item } = useLocalSearchParams();
    const itemData = JSON.parse(item);
    const [modalVisible, setModalVisible] = useState(false);

    const handleRemoveItem = () => {
        //Hay que hacer antes un estas seguro que quieres eliminar el item
        fetch(`${config.backendHost}:${config.backendPort}/Inventory/${itemData.id_item}`, {
            method: 'DELETE',
        })
        .then(response => {
            console.log('Item eliminado:', response);
            router.push('/');
        })
        .catch(error => console.error('Error eliminando item:', error));
    };

    const handleConfirm = () => {
        setModalVisible(false);
        handleRemoveItem();
      };
    
      const handleCancel = () => {
        setModalVisible(false);
      };

    return (
        <View style={styles.mainContainer}>
            <TitleView title={'DETALLES'} />
            <View style={styles.headerDetail}>
                <Image source={require('../assets/aguacate.jpg')} style={styles.icon} />
                <Text style={styles.title_text}>{itemData.item.toString().toUpperCase()}</Text>
            </View>
            <Text style={styles.text}>{`Cantidad: ${itemData.cantidad} ${itemData.unidades.toString().toUpperCase()}`}</Text>
            <FloatingRightButton bottom={100} icon="edit" color={colors.backgroundColor}/>
            <FloatingRightButton icon="trash" color={colors.exit} onPress={() => setModalVisible(true)}/>
            <CustomModal
                visible={modalVisible}
                onClose={handleCancel}
                message={`¿Estás seguro de que deseas eliminar ${itemData.item}?`}
                confirmText='Eliminar'
                cancelText='Cancelar'
                onConfirm={handleConfirm}
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
        padding: 10,
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
    text:{
        color: colors.secondary,
        fontSize: 18,
        textAlign: 'center',
        margin: 20,
    },
    selector: {
        width: '100%',
        marginBottom: 20,
        backgroundColor: colors.backgroundColor,
      },
});