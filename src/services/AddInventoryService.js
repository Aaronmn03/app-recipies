import config from '../config/config';

export function validateInput(alimento, handleError) {
    if (!alimento.nombre || !alimento.cantidad || !alimento.unidad_medida) {
      handleError('Rellena todos los campos');
      return false;
    }
    return true;
  }

export function sendDataBackend(alimento, handleSuccess, handleError, user, token, router) {
    const body = JSON.stringify(alimento);
   fetch(`${config.backendHost}/Inventory/${user}/AddItem` ,{
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
        handleSuccess('Alimento añadido correctamente');
        router.replace('/Inventory');
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        handleError(error.message);
    }
    );
}

export async function extractAlimentFromCode(code = 8421691499294) {
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const productNames = [
        data.product?.product_name_es,
        data.product?.product_name,
        data.product?.abbreviated_product_name
      ];
      const aliment = {
        codigo: data.code,
        nombre: getCombinations(productNames),
        cantidad: data.product?.product_quantity,
        unidad_medida: data.product?.product_quantity_unit,
        imagen: data.product?.selected_images?.front?.display?.es || 'https://tse1.mm.bing.net/th/id/OIP.H1gHhKVbteqm1U5SrwpPgwHaFj?rs=1&pid=ImgDetMain',
      };
      return aliment;
  
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  const getCombinations = (productNames) => {
    const validNames = productNames.filter(name => name && name.trim() !== '');  
    const combinations = new Set();
    validNames.forEach((productName) => {
      const words = productName.split(' ');  
      if (words[0]) combinations.add(words[0]);
      if (words[1]) combinations.add(words[1]);
      if (words[2]) combinations.add(words[2]);
      if (words.length > 1 && words[1]) {
        combinations.add(`${words[0]} ${words[1]}`);
      }  
      if (words.length > 2 && words[2]) {
        combinations.add(`${words[0]} ${words[1]} ${words[2]}`);
      }  
    });
    if (combinations.length === 0) {
      combinations.add('Desconocido');
    }
    return Array.from(combinations);
  };
  

export async function comprobarExisteAlimento(code, token){
    try {
        const response = await fetch(`${config.backendHost}/Inventory/code/${code}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,     
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 404) {
            return false; 
        }
        if (!response.ok) {
            console.log("Error en la respuesta de la red: ", response.status);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function insertCodigoAlimento(aliment, token) {
    try {
        const response = await fetch(`${config.backendHost}/Inventory/code/${aliment.codigo}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aliment),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}