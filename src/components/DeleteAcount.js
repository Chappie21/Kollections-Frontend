import { React } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { Redirect } from 'react-router-dom';

import { deleteAcount } from '../API/user';


// Formulario de cambio de contraseña
const DeleteAcount = () => {


    // Cliente global de react-query
    const client  = useQueryClient();

    const mutation = useMutation(deleteAcount, {
        enabled: false,
        retry: false,
        onSuccess: (response) => {

            // Invalidar querys, borrando al cache de resultados
            client.invalidateQueries();

        },
        onError: (error) => {

        }
    });

    const handleClick = e => {
        e.preventDefault();
        mutation.mutate()
    }

    // Renderizar animacion de cargado al enviar peticion
    if (mutation.isLoading) {
        return (
            <div className='container-fluid'>
                <div className="d-flex justify-content-center mt-3">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    // En caso de eliminar cuenta con exito
    if(mutation.isSuccess && mutation.data.data.status === 200){
        
        return(
            <div className='container-fluid'>
                <div className = 'd-flex justify-content-center align-items-center'>
                    <div className='alert alert-warning mt-3'>Su cuenta ha sido eliminada</div>
                </div>
                <Redirect to = '/' />
            </div>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='row d-flex m-3 align-items-center'>
                <h2 className='text-center text-danger'>
                    ELIMINAR CUENTA
                </h2>
                <p className='text-center'>
                    ¿Esta seguro de hacer está accion?
                </p>
                <p>
                    Al eliminar su cuenta, no podrá recuperar sus colecciones
                    ni imagenes almacenadas, <b>toda su informacion será eliminada.</b>
                </p>
                <p className='text-center'>
                    <b>ES IRREVERSIBLE</b>
                </p>
            </div>
            <div className='row g-3 mt-2 mb-5 d-flex justify-content-center'>
                <button className='btn btn-outline-danger' onClick={handleClick}>
                    Eliminar mi cuenta
                </button>
            </div>
        </div>
    )
}

export default DeleteAcount;