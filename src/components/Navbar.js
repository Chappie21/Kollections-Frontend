import { React, useState } from 'react'
import { Link, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import axios from 'axios'

import logo from '../img/logo2.svg'
import userIcon from '../img/userIcon.svg'
import Home from '../img/home.svg'
import AddImage from '../img/addImg.svg'

const Navbar = () => {

    let { url } = useRouteMatch();
    let history = useHistory();
    const client = useQueryClient();


    // Estado de acciones del compoentne
    const [State, setState] = useState({
        isOpen: false,
        logOut: false
    });

    const menuClass = `dropdown-menu ${State.isOpen ? " show" : ""}`;

    // Evento al realizar busqueda
    const handlePress = e => {

        if (e.key === 'Enter' && e.target.value !== '') {
            history.push(`${url}/search/${e.target.value}`);
        }

        // En caso de que el input no contenga ningun valor lo redirecciona a el home page
        if(e.key === 'Enter' && e.target.value === ''){
            history.push(`${url}/Home`);
        }
        
    }

    // Acciones del menú desplegable
    const handleMenu = e => {

        if(e.target.name === 'logOut'){
            axios.get('/logOut').then(result => {
                if(result.data.status === 200){

                    // Invalidar querys, borrando al cache de resultados
                    client.invalidateQueries();

                    // Establecer logOut como exitoso
                    setState({
                        ...State,
                        logOut: true
                    })
                }
            });
        }

        if(e.target.name === 'viewProfile'){
            history.push(`${url}/userprin`);
            setState({
                ...State,
                isOpen: !State.isOpen,
            })
        }

    }

    // Deesplegar dropdown
    const toggleOpen = e => {

        if (e.target.name === "profile") {
            setState({
                ...State,
                isOpen: !State.isOpen,
            })
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <nav class="navbar navbar-light bg-light border border-buttom fixed-top">
                    <div class="container-fluid d-flex justify-content-center">
                        <div className='row d-flex align-items-center'>
                            <div className='col-12 col-sm-4'>
                                <Link class="navbar-brand text-primary d-flex align-items-center"
                                    to={`${url}/Home`}>
                                    <img src={logo} alt='' width='33px' height='33px' />
                                    <span className='ms-2'>Kollections Collage</span>
                                </Link>
                            </div>
                            <div className='col-12 col-sm-4'>
                                <form class="d-flex ps-2 ms-5" onSubmit = {(e) =>{e.preventDefault()}}>
                                    <input
                                        class="form-control"
                                        type="search"
                                        placeholder="Buscar..."
                                        aria-label="Search"
                                        onKeyPress={handlePress}
                                    />
                                </form>
                            </div>
                            <div className='col-12 col-sm-4'>
                                <div className='d-flex ps-5 ms-5 align-items-center'>
                                    <Link className='ms-4'
                                        to={`${url}/Home`}>
                                         <img src={Home} alt='' width='33px' height='33px' />
                                    </Link>
                                    <Link className='ms-4'
                                        to={`${url}/AddImage`}>
                                        <img src={AddImage} alt='' width='45px' height='45px' />
                                    </Link>
                                    <div className='ms-4 dropdown'>
                                        <img
                                            src={userIcon}
                                            alt=''
                                            role='button'
                                            width='33px'
                                            height='33px'
                                            name='profile'
                                            onClick={toggleOpen}
                                        />
                                        <div className={menuClass}
                                            aria-labelledby='btn-menu'
                                        >
                                            <button className='dropdown-item'
                                                name = 'viewProfile'
                                                onClick={handleMenu}>
                                                Perfil
                                            </button>
                                            <button className='dropdown-item'
                                                name = 'logOut'
                                                onClick={handleMenu}>
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {
                State.logOut
                ? <Redirect to = '/' />
                :''
            }
        </div>
    );
}

export default Navbar;