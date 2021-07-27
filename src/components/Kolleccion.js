import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import logo2 from '../img/logo2-w.svg'

const Kolleccion = (props) => {

    let { url } = useRouteMatch();

    if (props.portada === '' || props.portada === null) {
        return (
            <Link to={`${url}/Kollection/${props.id}`}>
                <div className="card" style={{ width: '18rem', height: '14rem' }}>
                    <img src={logo2} className="card-img-top bg-primary p-4" alt="" width='75%' height='75%' />
                    <div className="card-body">
                        <p className="card-text text-center text-primary"><b>{props.name}</b></p>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <Link to={`${url}/Kollection/${props.id}`}>
            <div className='card' style={{ width: '18rem', height: '14rem' }}>
                <img src={props.portada} class="card-img" alt="" />
                <div class="card-body">
                    <h5 class="card-title text-center text-primary">{props.name}</h5>
                </div>
            </div>
        </Link>
    )

}

export default Kolleccion;