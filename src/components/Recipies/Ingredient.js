import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemedModalSelector, ThemedText, ThemedTextInput, ThemedView } from "../ThemedComponents";
import { useTheme } from "../../context/ThemeContext";

export default function Ingredient({ ingredient, index, selectedIngredients, setSelectedIngredients, onSelect }) {

    const {theme} = useTheme()

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
        <ThemedView style={[styles.ingredientItem, {borderColor: theme.secondary}]}>
            <ThemedText style={styles.ingredientText}>{ingredient.nombre}</ThemedText>
            <ThemedTextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                value={ingredient.cantidad}
                onChangeText={handleQuantityChange}
            />
            <ThemedModalSelector
                data={unidades}
                initValue=""
                onChange={handleUnitChange}
            >
                <ThemedTextInput
                    style={styles.unidadSelector}
                    placeholder="Seleccione"
                    value={ingredient.unidad}
                />
            </ThemedModalSelector>
            <TouchableOpacity onPress={removeIngredient} style={[styles.removeButton, {backgroundColor: theme.error}]}>
                <Icon name="times" size={20} color="white" />
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    ingredientText: {
        fontSize: 18,
        flex: 5,
    },
    input: {
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
    },
    unidadSelector: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        textAlign: 'center',
    },
    removeButton: {
        padding: 8,
        borderRadius: 8,
        marginLeft: 20,
    },
});
