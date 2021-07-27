import { React, Fragment } from 'react'
import { useHistory } from 'react-router-dom';

import logo2 from '../img/logo2.svg'
import img404 from '../img/404.gif'

const NotFound = () => {

    let history = useHistory();

    return (
        <Fragment>
            <div className='container-fluid p-0'>
                <div className='container position-relative vh-100'>
                    <div className='row d-flex position-absolute top-50 start-50 translate-middle'
                        style={{ width: '800px', height: '400px' }}>
                        <div className='card'>
                            <div className='card-header text-center text-primary'>
                                <img src={logo2} alt='' width='50px' height='50px' />
                                <h2>Kollections Collage</h2>
                            </div>
                            <div className='card-body text-center'>
                                <img src = {img404} alt = ''  width='150px' height='150px'/>
                                <div className='container p-5'>
                                    <h3 className='text-primary'>
                                        Error 404 Recurso no encontrado... :(
                                    </h3>
                                    <button className='btn btn-outline-primary mt-3'
                                        onClick = {() => history.goBack()}>
                                        Volver
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}


export default NotFound