import config from "../config/config";

export const removeAliment = (id_aliment, token, id, handleError, handleSuccess) => {
   fetch(`${config.backendHost}/Inventory/${id}/${id_aliment}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
    })
    .then(response => {
        console.assert('Item eliminado:', response);
        handleSuccess('Alimento consumido correctamente');
    
    })
    .catch(error => {
        console.error('Error eliminando item:', error)
        handleError('Ha ocurrido un error eliminando el alimento');
    });
};

export const readInventory = async (user, token) => {      
  try {
    const response = await fetch(`${config.backendHost}/Inventory/${user}`, {
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
    return [];
  }
};


export const editAliment = async (alimento, token, handleError, handleSuccess) =>{
    const formData = new FormData();
    if (alimento.imagen && alimento.imagen.startsWith('file')) {
      formData.append('imagen', {
        uri: alimento.imagen,
        name: `alimento_${alimento.id}_${Date.now()}.jpg`, 
        type: 'image/jpeg', 
      });
    }
    for (const key in alimento) {
        if (key !== 'imagen') {
        try {
            formData.append(key, alimento[key].toString());
            } catch (e) {
            }
        }
    }

    for (const pair of formData._parts) {
        console.log(pair[0] + ': ' + JSON.stringify(pair[1]));
    }
    const response = await fetch (`${config.backendHost}/Inventory/${alimento.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            },
        body: formData,
    })
    .then(response => {
        console.assert('Item actualizado:', response);
        handleSuccess('Alimento editado correctamente');
    })
    .catch(error => {
        console.error('Error eliminando item:', error)
        handleError('Ha ocurrido un error editando el alimento');
    }); 
}

export const emptyAliment = async (alimento, token, handleError, handleSuccess) =>{
    alimento.cantidad = 0;
    editAliment(alimento, token, handleError, handleSuccess);
}
