/*
    Definicion de funciones de query para la obtencion de datos de
    autenticacion
*/
import axios from 'axios'

export function getFormdata(data){

    // Crear nuevo form data
    let form = new FormData();

    // Construir datos de form data del estado obtenido
    for(let atribute in data){
        form.append(atribute, data[atribute]);
    }
    
    return form;
}

// * Creacion o registro de un nuevo usuario
export function createUser(data){

    // Crear nuevo form data
    let form = getFormdata(data);

    // realziar consulta
    // Retornar resultado de consulta o peticion
    return axios.post('/registro', form);
}

// Login 
export function login(data){

    // Obtener formulario
    let form = getFormdata(data);

    // realziar consulta
    // Retornar resultado de consulta o peticion
    return axios.post('/login', form);

}