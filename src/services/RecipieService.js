import config from '../config/config';

export function validateInput(receta, handleError) {
    if (!receta.nombre || !receta.instrucciones || !receta.dificultad || !validateIngredientes(receta.ingredientes)) {
      handleError('Rellena todos los campos');
      return false;
    }
    return true;
  }

function validateIngredientes(ingredientes){
    for (const ingrediente of ingredientes ){
        if(!ingrediente.nombre || !ingrediente.cantidad || !ingrediente.unidad){
            return false;
        }
    }
    return true;
}

export function sendDataBackend(receta, handleSuccess, handleError, user, token, router) {
    const body = JSON.stringify(receta);
   fetch(`${config.backendHost}/Recipie/${user}/AddRecipie` ,{
        method: 'POST',
        headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json',
        },
        body: body,
    })
    .then((response) => {
        if (!response.ok) {
            return response.text().then(text => {
                handleError(text);
                throw new Error(`Network response was not ok: ${text}`);
            });
        }
        return response.json();
    })
    .then((data) => {
        handleSuccess('Receta añadida correctamente');
        router.replace('/Recipies');
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        handleError(error.message);
    });
}

export async function fetchRecipiesData (recipieSearch, user, token, handleError) {
    try {
        const url = `${config.backendHost}/Recipie/${user}?search=${recipieSearch}`;
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        },
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        handleError("Error al cargar las recetas");
    }
}

import { readInventory } from './inventoryService';
import { fetchDias } from './CalendarService';

export const fetchRecetasConsumibles = async (user, token, handleError) =>{
  const recetas = await fetchRecipiesData("", user, token, handleError);
  if (!recetas) {
    console.error("Error al cargar las recetas");
    return [];
  }
  const inventario = await readInventory(user, token, handleError);
  console.log("Inventario:", inventario.find(item => item.nombre === "MACARRONES"));
  const dias = await fetchDias();
  dias.forEach(dia => {
    dia.comida.recetas.forEach(receta => {
        receta.ingredientes.forEach(ingrediente => {
            const alimento = inventario.find(item => item.nombre === ingrediente.nombre);
            if (alimento) {
                alimento.cantidad -= ingrediente.cantidad;
            }
        });
    });
    dia.cena.recetas.forEach(receta => {
        receta.ingredientes.forEach(ingrediente => {
            const alimento = inventario.find(item => item.nombre === ingrediente.nombre);
            if (alimento) {
                alimento.cantidad -= ingrediente.cantidad;
            }
        });
    });
  })
  console.log("inventario, despues de quitar los dias", inventario.find(item => item.nombre === "MACARRONES"));

  const recetasConsumibles = recetas.filter(receta => {
    return receta.ingredientes.every(ingrediente => {
      return inventario.some(alimento => alimento.nombre === ingrediente.nombre && alimento.cantidad >= ingrediente.cantidad);
    });
  });
  return recetasConsumibles;
}