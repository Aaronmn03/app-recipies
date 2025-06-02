export type DayOnCalendar = {
    id: number,
    fecha: string,
    id_user: number,
    comida:{
        receta_id: number[], // Recetas que se van a comer en ese día
        personas: number, // Número de personas que van a comer debera ser mas o menos la suma de los comensales de cada receta
    },
    cena:{
        receta_id: number[],
        personas: number,
    }
}