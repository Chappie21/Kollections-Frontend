import { React, useState }from 'react'
import { useMutation } from 'react-query'

import { changePassword } from '../API/user'


import userIcon from '../img/userIcon.svg'

// Formulario de cambio de contraseña
const ModPass = (props) => {


    const mutation = useMutation(changePassword, {
        enabled: false,
        onError: async (error) => {

            if (error.response.status === 400) {

                setData({
                    ...data,
                    Error: {
                        oldpassword: 'Contraseña antigua incorrecta'
                    }
                })

                document.getElementsByName('oldpassword')[0].classList.add('is-invalid');
            }
        }
    })

    const [data, setData] = useState({
        username: props.info.name,
        profileImg: props.info.profileImg,
        Error: {},
        newpassword: '',
        oldpassword: '',
        confpassword: ''
    })

    // Evento al alterar un campo
    const handleChange = e => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        document.getElementsByName(e.target.name)[0].classList.remove('is-invalid');
    }

    // Enviar datos a servidor
    const handleSubmit = e => {
        e.preventDefault();

        let { username, profileImg, ...claves } = data;
        let Errores = confForm(claves);

        if (!Object.keys(Errores).length) {

            mutation.mutate(new FormData(e.target));

        } else {

            for (let key in Errores) {
                console.log(key)
                document.getElementsByName(key)[0].classList.add('is-invalid');
            }

            setData({
                ...data,
                Error: Errores
            })

        }

    }

    const confForm = (claves) => {

        let Error = {}

        if (!claves.oldpassword) {
            Error.oldpassword = 'Por favor ingrese la antigua clave'
        }

        if (claves.newpassword) {

            if (claves.newpassword.length >= 8 && claves.newpassword.length <= 16) {
                if (claves.confpassword) {

                    if (claves.newpassword !== claves.confpassword) {
                        Error.confpassword = 'No concide con la nueva clane ingresada'
                    }

                } else {
                    Error.confpassword = 'Por favor confirme la nueva clave a establecer'
                }
            } else {
                Error.newpassword = 'Debe contener entre 8 a 16 caracteres';
            }

        } else {
            Error.newpassword = 'Por favor ingrese la nueva clave a establecer'
        }

        console.log(claves.confpassword)

        if (!claves.confpassword) {
            Error.confpassword = 'Por favor confirme la nueva clave a establecer'
        }

        return Error

    }

    return (
        <div className='container-fluid'>
            <div className='row d-flex m-3 align-items-center'>
                <div className='col-12 col-sm-3'>
                    <img src={data.profileImg|| userIcon} alt='' className='rounded-circle' width='95px' height='90px' />
                </div>
                <div className='col-12 col-sm-9'>
                    <h4>
                        {data.username}
                    </h4>
                </div>
            </div>
            <div className='row d-flex m-3 pt-2'>
                <form className='col-12' onSubmit={handleSubmit}>
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-sm-4">
                            <label for="oldpassword" className="col-form-label">Contraseña anterior</label>
                        </div>
                        <div className="col-12 col-sm-8">
                            <input
                                type="password"
                                className="form-control"
                                name='oldpassword'
                                value={data.oldpassword}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                                {data.Error.oldpassword}
                            </div>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mt-2">
                        <div className="col-12 col-sm-4">
                            <label for="newpassword" className="col-form-label">Nueva contraseña</label>
                        </div>
                        <div className="col-12 col-sm-8">
                            <input
                                type="password"
                                className="form-control"
                                name='newpassword'
                                value={data.newpassword}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                                {data.Error.newpassword}
                            </div>
                        </div>
                    </div>
                    <div className="row g-3 align-items-center mt-2">
                        <div className="col-12 col-sm-4">
                            <label for="confpassword" className="col-form-label">Confirmar</label>
                        </div>
                        <div class="col-12 col-sm-8">
                            <input
                                type="password"
                                className="form-control"
                                name='confpassword'
                                value={data.confpassword}
                                onChange={handleChange}
                            />
                            <div className="invalid-feedback">
                                {data.Error.confpassword}
                            </div>
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
                        mutation.isSuccess && mutation.data.data.status === 200
                            ? <div class="alert alert-success mt-3" role="alert">
                                Contraseña cambiada con exito
                            </div>
                            : ''
                    }
                    <div className='row g-3 mt-2 d-flex justify-content-center'>
                        <button className='btn btn-outline-primary' type='submit'>
                            Cambiar contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default ModPass;