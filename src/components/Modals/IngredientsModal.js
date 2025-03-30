import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import colors from '../../styles/colors';
import config from '../../config/config';
import { useAuth } from '../../context/AuthContext';
import Ingredient from '../Recipies/Ingredient';


const IngredientsModal = ({ onSelect }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const { token } = useAuth(); 
  

  useEffect(() => {
    const fetchData = async () => {      
      fetch(`${config.backendHost}:${config.backendPort}/Ingredients`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        const ingredientesConKey = data.map(item => ({
          ...item,
          key: item.id.toString(),
        }));
        setIngredientes(ingredientesConKey);
      })
      .catch(error => console.error('Error fetching data:', error));
    }
    fetchData();
  }, []);

  const handleSelect = (option) => {
    if (!selectedIngredients.some((item) => item.nombre === option.label)) {
      const updatedList = [...selectedIngredients, { nombre: option.label, cantidad: '', unidad: '' }];
      setSelectedIngredients(updatedList);
      onSelect(updatedList);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona ingredientes:</Text>
      <ModalSelector
        data={ingredientes.map(item => ({ key: item.key, label: item.nombre }))}
        initValue="Selecciona un ingrediente"
        onChange={handleSelect}
      >
        <TextInput
            style={styles.selector}
            placeholder="Añada Ingredientes"
            />
      </ModalSelector>
      <View>
        {selectedIngredients.map((item, index) => (
            <Ingredient 
              key={index}
              ingredient={item}
              index={index}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              onSelect={onSelect}
            />
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 15,
    color: colors.secondary,
    marginBottom: 5,
  },
  selector: {
    width: '100%',
    backgroundColor: colors.backgroundColor,
    borderColor: colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    textAlign:'center',
  },
});

export default IngredientsModal;
