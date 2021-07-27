import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from 'react-query';

import { createUser } from '../API/queryAuth'

import logo2 from '../img/logo2.svg'

const Registro = () => {

    // Establecer consulta de react-query 
    const mutation = useMutation(createUser, {
        enabled: false,
        retry: 3,
        retryDelay: 2000,
        stateTime: 60000,
        onSuccess: (result) => {

            if(result.status === 201){

                setDatos({
                    ...datos,
                    Exito: true
                })

            }else{

                setDatos({
                    ...datos,
                    Error: {
                        email: 'Correo se enceuntra en uso'
                    }
                })

                document.getElementsByName('email')[0].classList.add('is-invalid');

            }

        },
        onError: (error) => {
            console.log(error)
        }
    });

    // Estado del componente
    const [datos, setDatos] = useState({
        Error: {},
        Exito: false
    });

    // Evento al editar un cambio
    const handleChange = e => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

        document.getElementsByName(e.target.name)[0].classList.remove('is-invalid');

    }

    // Evento al enviar formulario
    const handleSubmit = e => {

        e.preventDefault();

        let { Error, ...valores } = datos;
        let Errores = validateForm(valores);

        // Comprobar existencia de errores
        if (!Object.keys(Errores).length) {
            mutation.mutate(datos)
            console.log(mutation.data)
        } else {

            for (let key in Errores) {
                document.getElementsByName(key)[0].classList.add('is-invalid');
            }

            setDatos({
                ...datos,
                Error: Errores
            })

        }

    }

    const validateForm = (valores) => {

        let Error = {};

        if (!valores.username) {
            Error.username = 'Por favor escriba un nombre';
        }

        if (!valores.email) {
            Error.email = 'Por favor ingrese un correo electronico';
        }

        if (valores.password && valores.confpass) {

            if (valores.password.length >= 8 && valores.password.length <= 16) {

                if (valores.password !== valores.confpass) {
                    Error.confpass = 'confirmacion no coincide';
                }

            } else {
                Error.password = 'Debe contener entre 8 a 16 caracteres';
            }

        } else {
            Error.password = 'Por favor ingrese una contraseña';
            Error.confpass = 'Por favor confirme la contraseña';
        }

        return Error;

    }

    return (
        <Fragment>
            <div className='container-fluid  position-relative vh-100 p-0'>
                <div className='container d-flex justify-content-center mt-5' style={{ width: '400px', height: '650px' }}>
                    <div className='card'>
                        <div className='card-header text-center text-primary'>
                            <img src={logo2} alt='' width='50px' height='50px' />
                            <h2>Kollections Collage</h2>
                            <p>Registrate para ver millones y millones de imagenes</p>
                        </div>
                        <div className='card-body'>
                            <div className='container d-flex justify-content-center pt-3'>
                                <form className='needs-validation' onSubmit={handleSubmit}>
                                    <div class="form-group">
                                        <label for="username">Nombre de usuario</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            name='username'
                                            id='username'
                                            onChange={handleChange}
                                            value={datos.username}
                                            placeholder="Nombre de usuario"
                                        />
                                        <div className="valid-feedback">
                                            nombre disponible
                                        </div>
                                        <div className="invalid-feedback">
                                            {
                                                datos.Error.username
                                            }
                                        </div>
                                    </div>
                                    <div class="form-group pt-3">
                                        <label for="email">Ingrese su correo electronico</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            name='email'
                                            aria-describedby="emailHelp"
                                            onChange={handleChange}
                                            value={datos.email}
                                            placeholder="Correo electronico"
                                        />
                                        <div className="valid-feedback">
                                            correo disponible
                                        </div>
                                        <div className="invalid-feedback">
                                            {datos.Error.email}
                                        </div>
                                    </div>
                                    <div class="form-group pt-3">
                                        <label for="password">Ingrese su contraseña</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name='password'
                                            onChange={handleChange}
                                            value={datos.password}
                                            placeholder="Ingrese su contraseña"
                                        />
                                        <div className="valid-feedback">
                                            contraseña valdia
                                        </div>
                                        <div className="invalid-feedback">
                                            {datos.Error.password}
                                        </div>
                                    </div>
                                    <div class="form-group pt-3">
                                        <label for="confpass">Ingrese su contraseña</label>
                                        <input
                                            type="password"
                                            class="form-control"
                                            name='confpass'
                                            onChange={handleChange}
                                            value={datos.confpass}
                                            placeholder="Ingrese su contraseña"
                                        />
                                        <div className="valid-feedback">
                                            verificacion coincide
                                        </div>
                                        <div className="invalid-feedback">
                                            {datos.Error.confpass}
                                        </div>
                                    </div>
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
                                            Registrarse
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div class="card-footer text-muted text-center mt-4">
                                ¿Listo para un mundo de colecciones?
                            </div>
                        </div>
                        <div className='card text-center mt-4 p-2'>
                            ¿Ya tienes cuenta? <Link to='/'>Iniciar sesión</Link>
                        </div>
                        <div className='text-muted text-center footer fixed pt-5'>
                            <p>@Chappie_Tech offical company</p>
                        </div>
                    </div>
                    {
                        mutation.isSuccess && mutation.data.status === 201
                        ? <Redirect to='/Exitoregistro' /> 
                        : ''      
                    }
                </div>
            </div>
        </Fragment>
    );

}

export default Registro;