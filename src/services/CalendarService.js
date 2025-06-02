import AsyncStorage from '@react-native-async-storage/async-storage';
import { consume } from './ConsumeService';

export const guardarNuevoDia = async (nuevoDia, handleSuccess, handleError) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@dias');
        let diasGuardados = jsonValue != null ? JSON.parse(jsonValue) : [];
        if(diasGuardados.some(dia => dia.fecha === nuevoDia.fecha && dia.id_user === nuevoDia.id_user)) {
            handleError('Ya existe un día guardado para esta fecha.');
            return;
        }
        diasGuardados.push(nuevoDia);
        await AsyncStorage.setItem('@dias', JSON.stringify(diasGuardados));
        handleSuccess('Día guardado correctamente');
    } catch (e) {
        handleError('Error guardando el día:', e);
    }
    };

export const obtenerDias = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@dias');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error leyendo datos:', error);
    return null;
  }
};

export const eliminarDia = async (fecha, handleSuccess, handleError) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@dias');
    let dias = jsonValue != null ? JSON.parse(jsonValue) : [];
    const diasFiltrados = dias.filter(dia => dia.fecha !== fecha);
    await AsyncStorage.setItem('@dias', JSON.stringify(diasFiltrados));
    handleSuccess(`Día con fecha ${fecha} eliminado correctamente.`);
  } catch (error) {
    console.error('Error eliminando día:', error);
    handleError('Error al eliminar el día.');
  }
};

export const limpiarDiasAntiguos = async () => {
  try {
    const dias = await obtenerDias();
    if (!dias) return null;

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaLimite = new Date(hoy);
    fechaLimite.setDate(hoy.getDate() - 7);

    const diasFiltrados = dias.filter(dia => {
      const fechaDia = new Date(dia.fecha);
      fechaDia.setHours(0, 0, 0, 0);
      return fechaDia >= fechaLimite;
    });
    await AsyncStorage.setItem('@dias', JSON.stringify(diasFiltrados));
    return diasFiltrados;

  } catch (error) {
    console.error('Error limpiando días antiguos:', error);
    return null;
  }
};

const comprobarDiaProcesado = async (fecha) => {
  try {
    await AsyncStorage.removeItem('ultimaFechaProcesada');
    const ultimaFechaProcesada = await AsyncStorage.getItem('ultimaFechaProcesada');
    if (ultimaFechaProcesada === fecha) {
      return true;
    }
    await AsyncStorage.setItem('ultimaFechaProcesada', fecha);
    return false;
  } catch (error) {
    console.error('Error comprobando si el día ya fue procesado:', error);
    return false;
  }
}

export const procesarDias = async (dias, user, token, handleError, handleSuccess) => {
  const hoy = new Date().toISOString().split('T')[0];
  if(await comprobarDiaProcesado(hoy)){
    return;
  }
  dias.forEach(dia => {
    if(!dia.procesado){
      if(dia.fecha < new Date().toISOString().split('T')[0]) {
        consumirDia(dia, user, token, handleError, handleSuccess);
        dia.procesado = true;
      }
    }
  });
    await AsyncStorage.setItem('@dias', JSON.stringify(dias));
}

const consumirDia = async (dia, user, token, handleError, handleSuccess) => {
  dia.comida.recetas.forEach(receta => {
    consume(receta, user, token, handleError, handleSuccess);
  })
  dia.cena.recetas.forEach(receta => {
    consume(receta, user, token, handleError, handleSuccess);
  });
}

export const fetchDias = async () => {  
  const dias = await limpiarDiasAntiguos();
  if (!dias || dias.length === 0) {
    return [];
  }
  dias.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  return dias;
}