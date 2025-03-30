import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import ModalSelector from "react-native-modal-selector";
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';

export default function Ingredient({ ingredient, index, selectedIngredients, setSelectedIngredients, onSelect }) {
    const unidades = [
        { key: 'g', label: 'Gramos' },
        { key: 'l', label: 'Litros' },
        { key: 'unidad', label: 'Unidad' },
    ];

    const removeIngredient = () => {
        const updatedList = selectedIngredients.filter((_, i) => i !== index);
        setSelectedIngredients(updatedList);
        onSelect(updatedList);
    };

    const handleQuantityChange = (value) => {
        const updatedList = [...selectedIngredients];
        updatedList[index].cantidad = value;
        setSelectedIngredients(updatedList);
        onSelect(updatedList);
    };

    const handleUnitChange = (option) => {
        const updatedList = [...selectedIngredients];
        updatedList[index].unidad = option.label;
        setSelectedIngredients(updatedList);
        onSelect(updatedList);
    };

    return (
        <View style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{ingredient.nombre}</Text>
            <TextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={ingredient.cantidad}
                onChangeText={handleQuantityChange}
            />
            <ModalSelector
                data={unidades}
                initValue=""
                onChange={handleUnitChange}
            >
                <TextInput
                    style={styles.unidadSelector}
                    placeholder="Seleccione"
                    value={ingredient.unidad}
                />
            </ModalSelector>
            <TouchableOpacity onPress={removeIngredient} style={styles.removeButton}>
                <Icon name="times" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.secondary,
        backgroundColor: colors.primary,
    },
    ingredientText: {
        fontSize: 18,
        color: colors.secondary,
        flex: 5,
    },
    input: {
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 5,
        textAlign: 'center',
        color: colors.secondary,
    },
    unidadSelector: {
        width: '100%',
        backgroundColor: colors.primary,
        borderColor: colors.secondary,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        textAlign: 'center',
    },
    removeButton: {
        backgroundColor: colors.error,
        padding: 8,
        borderRadius: 8,
        marginLeft: 20,
    },
});
