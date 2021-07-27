import { React, Fragment, useState } from 'react'
import { useMutation } from 'react-query';
import { Link, Redirect } from 'react-router-dom';

import { login } from '../API/queryAuth'

import logo from '../img/logo.svg'
import logo1 from '../img/logo1.svg'
import logo2 from '../img/logo2.svg'

const Principal = () => {

    const mutation = useMutation(login, {
        enabled: false,
        retry: false,
        staleTime: Infinity,
        onError: (error) =>{

            // Eliminar contraseña escrita al ocurrir un error
            setDatos({
                ...datos,
                password: ''
            });

        }
    })

    // Datos de estado
    const [datos, setDatos] = useState({
        user: '',
        password: '',
        Error: {}
    })

    // Evento al alterar algun campo del formulario
    const handleChange = e => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        });

    }

    // Evento al enviar datos al servidor
    const handleSubmit = async e => {
        e.preventDefault()
        console.log(datos)
        if (datos.user !== '' && datos.password !== '') {
            await mutation.mutate(datos)
        } else {
            setDatos({
                Error: {
                    ...datos,
                    mensaje: 'Rellene todos los campos'
                }
            })
        }
    }

    return (
        <Fragment>
            <div className='container-fluid p-0'>
                <div className='container position-relative vh-100'>
                    <div className='row d-flex position-absolute top-50 start-50 translate-middle' style={{ width: '1000px', height: '500px' }}>
                        <div className='col-12 col-sm-7 d-flex justify-content-center pt-5'>
                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src={logo} className="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={logo1} classclassName="d-block w-100" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src={logo2} classclassName="d-block w-100" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-5'>
                            <div className='card'>
                                <div className='card-header text-center text-primary'>
                                    <img src={logo2} alt='' width='50px' height='50px' />
                                    <h2>Kollections Collage</h2>
                                </div>
                                <div className='card-body'>
                                    <div className='container d-flex justify-content-center pt-3'>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label for="user">Nombre de usuario o correo</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name='user'
                                                    aria-describedby="emailHelp"
                                                    placeholder="Ingrese usuario o correo"
                                                    onChange={handleChange}
                                                    value={datos.user}
                                                />
                                            </div>
                                            <div className="form-group pt-3">
                                                <label for="password">Ingrese su contraseña</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    name='password'
                                                    placeholder="Ingrese su contraseña"
                                                    onChange={handleChange}
                                                    value={datos.password}
                                                />
                                            </div>
                                            {
                                                mutation.isError && mutation.error.response.status === 400
                                                    ? (
                                                        <div class="alert alert-danger mt-3" role="alert">
                                                            Credenciales incorrectas
                                                        </div>
                                                    )
                                                    : ''
                                            }
                                            {
                                                mutation.isLoading
                                                    ? (<div className="d-flex justify-content-center mt-3">
                                                        <div className="spinner-grow text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>)
                                                    : ''
                                            }
                                            <div className='d-grid pt-4'>
                                                <button className='btn btn-primary text-white'>
                                                    Iniciar sesión
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="card-footer text-muted text-center mt-4">
                                    ¿No extrañas los collages?
                                </div>
                            </div>
                            <div className='card text-center mt-3 p-2'>
                                ¿No tienes cuenta? <Link to='/Registro'>Regístrate</Link>
                            </div>
                        </div>
                        <div className='text-muted text-center footer fixed pt-5'>
                            <p>@Chappie_Tech offical company</p>
                        </div>
                    </div>
                </div>
                {
                    mutation.isSuccess && mutation.data.status === 200
                    ? <Redirect to = '/Aplication/Home' />
                    : ''
                }
            </div>
        </Fragment>
    );

}


export default Principal