import { React, useState }from 'react'
import { useQueryClient, useMutation } from 'react-query'

import { editInfo } from '../API/user'


import userIcon from '../img/userIcon.svg'

// Formulario de informacion basica de usuario
const BasicInfo = (props) => {


    // Estados del componente
    const [data, setData] = useState({
        username: props.info.name,
        email: props.info.email,
        descripcion: props.info.descripcion,
        profileImg: props.info.profileImg,
        Error: {}
    })

    const client = useQueryClient();

    const mutation = useMutation(editInfo, {
        enabled: false,
        retry: false,
        onSuccess: (response) => {

            if (response.data.status === 201) {

                // Invalidar query pasada
                client.invalidateQueries('UserInfo');

                // Actualizar datos de la query
                client.refetchQueries('UserInfo');

            }

        },
        onError: (error) => {

            let Error = {} // Objeto creado apra la asignacion de nombres segun el tagname de los inputs

            // En caso de ser un erro referente al username
            if(error.response.data.input === 'username'){
                Error.username = error.response.data.mensaje
                document.getElementsByName(error.response.data.input)[0].classList.add('is-invalid')
            }

            // En caso de ser un erro referente al email
            if(error.response.data.input === 'email'){
                Error.email = error.response.data.mensaje
                document.getElementsByName(error.response.data.input)[0].classList.add('is-invalid')
            }

            // Actualizar estado del componente con los errores
            setData({
                ...data,
                Error: Error
            })

        }

    })

    const handleChange = e => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        // En caso de escoger un archivo
        if (e.target.name === 'profileImg') {

            // Obtener objeto absoluto url
            let img = URL.createObjectURL(e.target.files[0]);

            setData({
                ...data,
                profileImg: img
            })

        }

        document.getElementsByName(e.target.name)[0].classList.remove('is-invalid');

    }

    // Evento al enviar modificacion de archivos
    const handleSubmit = e => {
        e.preventDefault();

        // Comprobar que los dos campos obligatorios estén llenos
        if (data.username !== '' && data.email !== '') {
            mutation.mutate(new FormData(e.target));
        } else {

            let Error = {};

            if (data.username === '') {
                Error.username = 'Campo obligatorio'
                document.getElementsByName('username')[0].classList.add('is-invalid')
            }

            if (data.email === '') {
                Error.email = 'Campo obligatorio'
                document.getElementsByName('email')[0].classList.add('is-invalid')
            }

            setData({
                ...data,
                Error: Error
            })

        }

    }

    return (
        <div className='container-fluid'>
            <form id='form' onSubmit={handleSubmit}>
                <div className='row d-flex m-3 align-items-center'>
                    <div className='col-12 col-sm-3'>
                        <img src={data.profileImg || userIcon} alt='' className='rounded-circle' width='95px' height='90px' />
                    </div>
                    <div className='col-12 col-sm-9'>
                        <h4>
                            {data.username}
                        </h4>
                        <label name='profileImg ' className="text-primary border border-0 bg bg-white"
                            role='button'>
                            <input
                                type="file"
                                name='profileImg'
                                accept='image/*'
                                style={{ display: 'none' }}
                                onChange={handleChange}
                                src={data.profileImg}
                            />
                            Cambiar foto de perfil
                        </label>
                    </div>
                </div>
                <div className='row d-flex m-3 pt-2'>
                    <div className='col-12'>
                        <div className="row g-3 align-items-center">
                            <div className="col-12 col-sm-4">
                                <label for="username" className="col-form-label">Nombre de usuario</label>
                            </div>
                            <div className="col-12 col-sm-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    name='username'
                                    value={data.username}
                                    onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                    {data.Error.username}
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 align-items-center mt-2">
                            <div className="col-12 col-sm-4">
                                <label for="email" className="col-form-label">Correo electronico</label>
                            </div>
                            <div className="col-12 col-sm-8">
                                <input
                                    type="email"
                                    className="form-control"
                                    aria-describedby="passwordHelpInline"
                                    name='email'
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                <div className="invalid-feedback">
                                    {data.Error.email}
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mt-2">
                            <div className="col-12 col-sm-4">
                                <label for="descripcion" className="col-form-label">Descripcion pefil</label>
                            </div>
                            <div className="col-12 col-sm-8">
                                <textarea
                                    name='descripcion'
                                    className="form-control"
                                    value={data.descripcion}
                                    onChange={handleChange}
                                />
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
                        {
                            mutation.isSuccess && mutation.data.data.status === 201
                                ? <div className='alert alert-success mt-3'>{mutation.data.data.mensaje}</div>
                                : ''
                        }
                        <div className='row g-3 mt-2 d-flex justify-content-center'>
                            <button className='btn btn-outline-primary'>
                                Editar informacion
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default BasicInfo;