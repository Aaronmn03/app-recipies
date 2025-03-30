import { Ingredient } from "./Ingredient";

export type TypeRecipie = {
    id: number, 
    nombre: string, 
    imagen: string, 
    dificultad: string, 
    descripcion: string,
    instrucciones: string, 
    porciones: number,
    tiempo_preparacion: number, 
    estado: string, 
    fecha_creacion: Date, 
    notas: string, 
    propietario_id: number, 
    video_url: string,
    ingredientes: Ingredient[];
}