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
    const body = JSON.stringify(alimento);
    const response = await fetch (`${config.backendHost}/Inventory/${alimento.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
            },
        body: body,
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

export const uploadImage = async (uri, alimento, token) => {
    if (uri !== undefined) {
        const formData = new FormData();
        const fileName = alimento.imagen;
        formData.append('image', {
        uri: uri,
        name: fileName, 
        type: 'image/jpeg',  
        });
        try {
            const response = await fetch(`${config.backendHost}/upload`, {
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data'
            },
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
