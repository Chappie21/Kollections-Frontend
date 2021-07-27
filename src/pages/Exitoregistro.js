import {React, Fragment} from 'react'
import { Link } from 'react-router-dom';
import logo2 from '../img/logo2.svg'

const Exitoresgistro = () =>{

    return(
        <Fragment>
             <div className='container-fluid position-relative vh-100 p-0'>
                <div className='container position-absolute top-50 start-50 translate-middle' style={{ width: '500px' }}>
                    <div className='card'>
                        <div className='card-header text-center text-primary'>
                            <img src={logo2} alt='' width='50px' height='50px' />
                            <h2>Kollections Collage</h2>
                            <p>Registrate para ver millones y millones de imagenes</p>
                        </div>
                        <div className='card-body text-center'>
                            <h2 className = 'text-center text-primary'>
                                ¡Registro realizado con exito!
                            </h2>
                            <p>Inicia sesion para comenzar</p>
                            <Link className = 'btn btn-outline-primary' to = '/'>
                                ¡Vamos!
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Exitoresgistro;