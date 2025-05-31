import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const fetchDias = async (recetas) => {
      await limpiarDiasAntiguos();

      const dias = await obtenerDias();
      console.log(dias, 'dias');
      if (!dias || dias.length === 0) {
        return [];
      }
      const diasParsed = typeof dias === 'string' ? JSON.parse(dias) : dias;
      const nuevasRecetasDia = diasParsed.map((dia) => {
        const comida = dia.comida.receta_id
          .map(id => recetas.find(r => r.receta_id === id))
          .filter(Boolean);

        const cena = dia.cena.receta_id
          .map(id => recetas.find(r => r.receta_id === id))
          .filter(Boolean);
        return {
          fecha: dia.fecha,
          id_user: dia.id_user,
          comida: {
            recetas: comida,  
            personas: dia.comida.personas,
          },
          cena: {
            recetas: cena,    
            personas: dia.cena.personas,
          }
        };
      });
      nuevasRecetasDia.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
      return nuevasRecetasDia;
    }