import { React, useState } from 'react'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router'

import { createColleccion } from '../API/Colleccion'

import Kolleccion from './Kolleccion'

const CreateKo = () => {

    let history = useHistory();

    const [data, setData] = useState({
        name: '',
        portada: ''
    })

    const mutation = useMutation(createColleccion, {
        enabled: false,
        retry: false,
        onSuccess: (response) =>{

            // En caso de añadir con exito redirige a vista de usuario
            if(response.data.status === 201){

                setTimeout(() =>{
                    history.goBack()
                }, 1500)

            }

        }
    })

    // Evento al alterar algún campo
    const handleChange = e => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        })

        // En caso de escoger una portada
        if (e.target.name === 'portada') {

            // Obtener objeto absoluto url
            let img = URL.createObjectURL(e.target.files[0]);

            setData({
                ...data,
                portada: img
            })

        }

        document.getElementsByName(e.target.name)[0].classList.remove('is-invalid');

    }

    // Evento al pedit peticion al servidor
    const handleSubmit = e => {
        e.preventDefault();

        // En caso de que el usuario haya ingresado un nombre
        if (data.name !== '') {
            mutation.mutate(new FormData(e.target))
        } else {
            document.getElementsByName('name')[0].classList.add('is-invalid');
        }

    }

    return (
        <div className='container-fluid position-relative vh-100'>
            <div className='row ms-5 ps-5 d-flex position-absolute top-50 start-50 translate-middle' style={{ width: '1000px', height: '500px' }}>
                <div className='row ms-4 d-flex justify-content-center'>
                    <div className='col-12 col-sm-5'>
                        <div className='card'>
                            <div className='card-header text-center text-primary'>
                                <h3>Krear Kolleccion</h3>
                            </div>
                            <div className='card-body'>
                                <div className='container d-flex justify-content-center pt-3'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label for="name">Nombre de Kolleccion</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='name'
                                                aria-describedby="emailHelp"
                                                placeholder="Nombre de kolleccion"
                                                onChange={handleChange}
                                                value={data.name}
                                            />
                                        </div>
                                        <div className="invalid-feedback">
                                            Campo obligatorio
                                        </div>
                                        <div className="form-group pt-3">
                                            <label for="portada">Imagen de portada</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name='portada'
                                                accept='image/*'
                                                onChange={handleChange}
                                                src={data.portada}
                                            />
                                        </div>
                                        <div className='d-grid mt-4'>
                                            <button className='btn btn-primary text-white'
                                                type='submit'
                                            >
                                                Krear Kollecion
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card-footer text-muted text-center mt-4">
                                Las Kolecciones funcionan para almacenar images
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-7 ps-5 mt-5 pt-4'>
                        {
                            mutation.isLoading
                                ? (<div className="d-flex justify-content-center mt-3">
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>)
                                : <Kolleccion name={data.name} portada={data.portada} />
                        }
                        {
                            mutation.isSuccess && mutation.data.data.status === 201
                                ? <div className='alert alert-success mt-3' style={{ width: '18rem'}}>{mutation.data.data.mensaje}</div>
                                : ''
                        }
                        {
                            mutation.isError
                                ? <div className='alert alert-danger mt-3' style={{ width: '18rem'}}>{mutation.data.data.mensaje}</div>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateKo;