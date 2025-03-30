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
    fetch(`${config.backendHost}:${config.backendPort}/Recipie/${user}/AddRecipie` ,{
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