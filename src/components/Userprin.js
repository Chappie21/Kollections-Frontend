import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useQuery } from 'react-query'

import Kolleccion from './Kolleccion'

import userIcon from '../img/userIcon.svg'
import logo from '../img/logo.svg'

import userInfo from '../API/user'

const Userprin = () => {

    let { url } = useRouteMatch();

    const { data, isLoading, isError } = useQuery('UserInfo', userInfo, {
        onSuccess: (result) => {
            console.log(result)
        }
    })

    // Al cargar la peticion
    if (isLoading) {
        return (
            <div className='container-fluid position-relative vh-100'>
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }

    // En caso de error
    if (isError) {
        return (
            <div className='container-fluid position-relative vh-100'>
                <div className="position-absolute top-50 start-50 translate-middle mb-5">
                    <h1 className='text-center text-primary'>
                        Error al obtener informacion del usuario... :(
                    </h1>
                    <Link className='btn btn-outline-primary'>
                        Volver
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='container-fluid p-5 mt-5'>
                <div className='row d-flex justify-content-center'>
                    <div className='row d-flex ps-5 ms-5 justify-content-center align-items-center'>
                        <div className='col-12 col-sm-3 '>
                            <img src={data.data.user.profileImg || userIcon} className='rounded-circle' alt='' width='200px' height='200px' />
                        </div>
                        <div className='col-12 col-sm-4'>
                            <div className='d-flex align-items-center'>
                                <h2>
                                    {
                                        data.data.user.name
                                    }
                                </h2>
                                {
                                    data.data.edit
                                        ? <Link className='btn btn-outline-primary ms-3'
                                            to={`${url}/editInfo`}>
                                            Editar perfil
                                        </Link>
                                        : ''
                                }
                            </div>
                            <div>
                                <p>
                                    {
                                        data.data.user.descripcion
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center mt-5'>
                    <hr />
                    <div>
                        <Dashcollection collections={data.data.user.collections} edit={data.data.edit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// DashBoard de Collecciones del usuario
const Dashcollection = (props) => {

    let { url } = useRouteMatch();

    return (
        <div className='row d-flex'>
                {
                    props.collections.map(kc => {
                        return (
                            <div className='col-12 col-sm-3 mt-3'>
                                <Kolleccion id = {kc.id} name={kc.name} portada={kc.portada} />
                            </div>
                        )
                    })
                }
                {
                    props.edit
                        ? <Link className='col-12 col-sm-3 mt-3' to={`${url}/CreateKo`}>
                            <div className='card border-primary border-3 mb-3 p-5' style={{ width: '18rem' }}>
                                <div className='container d-flex justify-content-center align-items-center'>
                                    <img src={logo} className="card-img" alt="..." style={{ width: '70%', height: '70%' }} />
                                </div>
                                <p className="card-text text-primary text-center">Crear Kolleccion</p>
                            </div>
                        </Link>
                        : ''
                }
        </div>
    )
}


export default Userprin;