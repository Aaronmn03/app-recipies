import config from "../config/config";

export const removeAliment = (id, token) => {
    fetch(`${config.backendHost}:${config.backendPort}/Inventory/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
    })
    .then(response => {
        console.assert('Item eliminado:', response);
        
    })
    .catch(error => console.error('Error eliminando item:', error));
};

export const editAliment = async (alimento, token) =>{
    const body = JSON.stringify(alimento);
    const response = await fetch (`${config.backendHost}:${config.backendPort}/Inventory/${alimento.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
            },
        body: body,
    })
    .then(response => {
        console.assert('Item actualizado:', response);
    })
    .catch(error => console.error('Error eliminando item:', error)); 
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
            const response = await fetch(`${config.backendHost}:${config.backendPort}/upload`, {
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
