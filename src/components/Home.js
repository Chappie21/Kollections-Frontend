import React from 'react'
import { useQuery } from 'react-query';

import ImgP from './ImgP';

import { getImagesHome } from '../API/Image';

import Refresh from '../img/refresh.svg'
import help from '../img/help.svg'

const Userprin = () => {

    const query = useQuery('Home', getImagesHome, {
        staleTime: Infinity,
    });

    // Refrescar vista
    const handleRefresh = () => {
        query.refetch();
    }

    // Cargar ayuda interactiva del feed
    const handleChargeHelp = () => {
        var helppierInit = window.helppierInit || function () { console.log('Error') };

        helppierInit({ silent: true }, function (error, initFunctions) {
            initFunctions.startPlay('LZZv9YlKW');
        });
    }

    if (query.isLoading) {
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
        <div className='container-fluid position-relative vh-100'>
            <div className='d-flex justify-content-center mt-5 pt-5'>
                <div className='col-12 col-sm-6'>
                    {
                        query.data.data.publicaciones.map(pub => {
                            return (
                                <div className='container mt-3 mb-3'>
                                    <ImgP username={pub.username} profileImg={pub.profileImg} descripcion={pub.descripccion} imgUrl={pub.pubUrl} tags={pub.tags} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='row d-flex'>
                <div className='fixed-bottom pe-5 me-5 mb-5'>
                    <button className='btn btn-primary ms-4 float-sm-start rounded-pill'
                        onClick={handleChargeHelp}>
                        <img src={help} alt='' width='40px' height='40px' />
                    </button>

                    <button className='btn btn-primary float-sm-end rounded-pill'
                        onClick={handleRefresh}>
                        <img src={Refresh} alt='' width='40px' height='40px' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Userprin;