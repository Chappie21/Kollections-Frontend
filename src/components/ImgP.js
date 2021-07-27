import React from 'react'

import userIcon from '../img/userIcon.svg'
import logo from '../img/logo2-w.svg'

import { useMutation, useQueryClient } from 'react-query'
import { deleteImage } from '../API/Image'

const ImgP = (props) => {


    // Cliente global de react-query
    const client  = useQueryClient();

    const mutation = useMutation(deleteImage, {
        enabled: false,
        retry: 2,
        onSuccess: (response) =>{
            console.log(response)

            if(response.data.status === 200){
                client.refetchQueries('Collection')
            }
            
        },
        onError: (response) =>{
            console.log(response)
        }
    })

    // Accion al eliminar imagen
    const handleDelete = e =>{
        mutation.mutate(props.id)
    }

    return (
        <div className="card">
            <div classname="card-body">
                <div className='row d-flex align-items-center p-1'>
                    <div className='col-12 col-sm-8'>
                        <div className='d-flex align-items-center pt-3 ps-3 mb-2'>
                            <img src={props.profileImg || userIcon} className="rounded-circle" alt=" " width='40px' height='40px' />
                            <h5 className="card-title text-primary ms-3 pt-1">{props.username}</h5>
                        </div>
                    </div>
                    {
                        props.edit
                            ? <div className='col-12 col-sm-4 position-relative'>
                                <button className='btn btn-sm btn-primary text-white ms-3 position-absolute top-0 start-50 translate-middle'
                                    onClick = {handleDelete}>
                                    Borrar
                                </button>
                            </div>
                            : ''
                    }
                </div>
            </div>
            {
                props.imgUrl !== ''
                    ? <img src={props.imgUrl} classname="card-img-bottom" alt="" />
                    : <div className='bg-primary d-flex justify-content-center'>
                        <img src={logo} classname="card-img-bottom" alt="" />
                    </div>
            }
            <div classname="card-body">
                <div className='container pt-1 ps-3 pb-3 mt-2'>
                    <p className="card-text">{props.descripcion || 'Descripcion de la publicacion'}</p>
                    <p className="card-text">
                        <small class="text-muted">
                            {
                                props.tags.map((tag) => {
                                    return tag + ' '
                                })
                            }
                        </small>
                    </p>
                </div>
            </div>
        </div>
    )

}

export default ImgP;