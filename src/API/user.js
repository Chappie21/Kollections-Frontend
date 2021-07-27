import axios from "axios"
import { useParams } from 'react-router-dom'

// Obtener informacion de usuario
async function userInfo(){

     let {id} = useParams

     if(id !== undefined){
          return await axios.get(`/dataUser?id=${id}`)
     }else{
          return await axios.get('/dataUser');
     }

}

// Cambiar contraseña
export async function changePassword(form){
     return await axios.post('/changePassword',  form);
}

// Modificar informacion basica del usuario
export async function editInfo(form){
     return await axios.put('/editBasicData', form);
}

// Eliminar cuenta del usuario
export async function deleteAcount(){
     return await axios.delete('/editBasicData');
}

export function isLogin(){
     return axios.get('/isLogin');
}

export default userInfo;


