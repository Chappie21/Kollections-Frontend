import { React } from 'react'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { useQueryClient  } from 'react-query'

import BasicInfo from './BasicInfo'
import ModPass from './ModPass'
import DeleteAcount from './DeleteAcount'

// Componente o vista principal de edicion de datos del usuario
const Edituser = () => {

    const { path, url } = useRouteMatch();
    const userData = useQueryClient();
    const data = userData.getQueryData('UserInfo')

    return (
        <div className='container-fluid d-flex justify-content-center mt-5'>
            <div className='container w-75 mt-5'>
                <div className='row d-flex border'>
                    <div className='col-12 col-sm-4 border border-end-1'>
                        <nav className='navbar navbar-inverse' role='navigation'>
                            <ul className='nav'>
                                <li className='nav-item'>
                                    <Link className='nav-link'
                                        to={`${url}/basicInfo`}>
                                        Informacion basica
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link'
                                        to={`${url}/modPass`}>
                                        Cambiar contraseña
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link'
                                        to={`${url}/deleteAcount`}>
                                        Eliminar cuenta
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='col-12 col-sm-8'>
                        <Switch>
                            <Route exact path={`${path}/basicInfo`} >
                                <BasicInfo info={data.data.user} />
                            </Route>
                            <Route exact path={`${path}/modPass`}>
                                <ModPass info={data.data.user} />
                            </Route>
                            <Route exact path={`${path}/deleteAcount`} component={DeleteAcount} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Edituser;