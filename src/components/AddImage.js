import { infinity } from 'check-types'
import { React, useState } from 'react'
import { useHistory } from 'react-router'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'

import axios from 'axios'
import userInfo from '../API/user'
import ImgP from './ImgP'


const AddImage = () => {

    let history = useHistory();

    // Estado de componente
    const [datos, setDatos] = useState({
        descripccion: '',
        idCollecion: '',
        image: '',
        tags: '',
        username: '',
        profileImg: ''
    })

    // Cliente global de react-query
    const client  = useQueryClient();

    // Funcion que ejecuta peticion al servidor, enviado los datos de la neuva imagen
    const agregarImage = (form) =>{
        console.log(form)
        return axios.post('/Images', form);
    }

    const mutation = useMutation(agregarImage, {
        enabled: false,
        retry: false,
        onSuccess: function (response) {
            // En caso de tener exito, invalida el query de las colecciones obtenidas
            /*
                Esto con el fin de que al revisar nuevamente una coleccion,
                se vuelva a relizar obteniendo la peticion con la data nueva
            */
           // En caso de añadir con exito redirige a vista de usuario
           if(response.data.status === 201){
               
                client.invalidateQueries('Collection')

                // Redirigir a pestaña anterior
                setTimeout(() =>{
                    history.goBack()
                }, 1500)

           }
          
        },
        onError: function (error) {
            console.log("error:" + error)
        }
    })


    // Realizar consulta de datos del usuario
    /*
        Se obtiene los datos del usuario como nombre y foto de eprfil en caso de ser necesario
        y las colecciones que este contiene
    */
    const { data, isLoading } = useQuery('UserInfo', userInfo, {
        staleTime: infinity,
        onSuccess: function (data) {
            setDatos({
                ...datos,
                username: data.data.user.name,
                profileImg: data.data.user.profileImg
            })
        }
    })

    const handleChange = e => {

        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'image') {
            // Obtener objeto absoluto url
            let img = URL.createObjectURL(e.target.files[0]);

            setDatos({
                ...datos,
                image: img
            })
        }

        document.getElementsByName(e.target.name)[0].classList.remove('is-invalid');

    }

    const handleSubmit = e => {
        e.preventDefault();

        if (datos.idCollecion !== '' && datos.image !== '' && datos.tags !== '') {
            // axios.post('/Images', new FormData(e.target));
            let form = new FormData(e.target)
            mutation.mutate(form)
        } else {
            
            if (datos.image === '') {
                document.getElementsByName('image')[0].classList.add('is-invalid');
            }

            if (datos.tags === '') {
                document.getElementsByName('tags')[0].classList.add('is-invalid');
            }

            if (datos.idCollecion === '') {
                document.getElementsByName('idCollecion')[0].classList.add('is-invalid');
            }

        }

    }

    // En caso de cargar consulta inicial
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

    return (
        <div className='container-fluid p-0'>
            <div className='container position-relative vh-100'>
                <div className='row d-flex position-absolute top-50 start-50 translate-middle' style={{ width: '1000px', height: '500px' }}>
                    <div className='col-12 col-sm-5'>
                        <div className='card'>
                            <div className='card-header text-center text-primary'>
                                <h2>Realizar publikacion</h2>
                            </div>
                            <div className='card-body'>
                                <div className='container d-flex justify-content-center pt-3'>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label for="user">Descripcion de publicación</label>
                                            <textarea
                                                className="form-control"
                                                name='descripccion'
                                                aria-describedby="emailHelp"
                                                placeholder="Ingrese una descripcion"
                                                onChange={handleChange}
                                                value={datos.descripcion}
                                            />
                                        </div>
                                        <div className="form-group pt-3">
                                            <label for="password">Seleccione Kolleccion</label>
                                            <select name='idCollecion' 
                                                className="form-control"
                                                onChange = {handleChange}>
                                                <option value='0'>Seleccionar kollecion</option>
                                                {
                                                    data.data.user.collections.map(kc => {
                                                        return (
                                                            <option value={kc.id}>{kc.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <div className="invalid-feedback">
                                                Debe seleccionar una Kollecion
                                            </div>
                                        </div>
                                        <div className="form-group pt-3">
                                            <label for="image">Imagen de portada</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name='image'
                                                accept='image/*'
                                                onChange={handleChange}
                                                src={datos.image}
                                            />
                                            <div className="invalid-feedback">
                                                Debe seleccionar una imagen
                                            </div>
                                        </div>
                                        <div className="form-group pt-3">
                                            <label for="tags">Descripcion de publicación</label>
                                            <textarea
                                                className="form-control"
                                                name='tags'
                                                placeholder="tags de publicacion ej: Hoy Noticia"
                                                onChange={handleChange}
                                                value={datos.tags}
                                            />
                                            <div className="invalid-feedback">
                                                Debe colocar almenos un tag
                                            </div>
                                        </div>
                                        <div className='d-grid pt-4'>
                                            {
                                                data.data.user.collections.length !== 0
                                                ?  <button className='btn btn-primary text-white'
                                                        type='submit'>
                                                        Agregar publikacion
                                                    </button>
                                                : <div className='alert alert-danger'>
                                                        Usted no posee colecciones para almacenar imagenes
                                                        <Link to={`userprin/CreateKo`}> Crear koleccion</Link>
                                                  </div>
                                                    
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-7'>
                        <ImgP username={datos.username} profileImg={datos.profileImg} descripcion={datos.descripccion} imgUrl={datos.image} tags={datos.tags.split(' ')}/>
                        {
                            mutation.isSuccess && mutation.data.data.status === 201
                                ? <div className='alert alert-success mt-3'>{mutation.data.data.mensaje}</div>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddImage;