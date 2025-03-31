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
    fetch(`${config.backendHost}:${config.backendPort}/Inventory/${user}/AddItem` ,{
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
    });
}