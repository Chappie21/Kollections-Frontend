/*
    Se definen funciones encargadas de realizar peticiones con respecto a la
    entidad de colecciones a el servidor
*/

import axios from "axios";

export function createColleccion(form){
    return axios.post('/Collection', form);
}

export function getCollection(id){
    return axios.get(`/getCollection/${parseInt(id.queryKey[1])}`)
}