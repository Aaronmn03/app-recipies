import config from '../config/config';



export const consume = (recipie, user, token, handleError, handleSuccess) =>{
    const body = JSON.stringify(recipie.ingredientes)
   fetch(`${config.backendHost}/Recipie/${user}/Consume` ,{
        method: 'PUT',
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
        handleSuccess('Inventario modificado Correctamente');
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        handleError(error.message);
    });
}
