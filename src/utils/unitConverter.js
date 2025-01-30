  export const unidad_medida = (item) => {
    if(item.unidad_medida == 'U'){
      if (item.cantidad == 1){
        return 'UNIDAD'
      }else{
        return 'UNIDADES'
      }
    }else if(item.unidad_medida == 'G'){
      if (item.cantidad == 1){
        return 'GRAMO'
      }else{
        return 'GRAMOS'
      }
    }else{
      return 'LITROS'
    }
  };

  export const cantidad = (item) => {
    
  } 
