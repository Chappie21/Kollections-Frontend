import React from 'react'
import { useParams } from 'react-router';
import { useQuery } from 'react-query';


import ImgP from './ImgP';
import Refresh from '../img/refresh.svg'

import { searchImages } from '../API/Image';

const Search = () => {


    let { tag } = useParams();

    const query = useQuery(['searCh',tag], searchImages, {
        onSuccess: (result) => {
            console.log(result)
        }
    })

    // Refrescar vista
    const handleRefresh = () => {
        query.refetch();
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
                                    <ImgP username={pub.username} profileImg={pub.profileImg} descripcion={pub.descripccion} imgUrl={pub.pubUrl} tags={pub.tags}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='fixed-bottom pe-5 me-5 mb-5'>
                <button className='btn btn-primary float-sm-end rounded-pill'
                    onClick={handleRefresh}>
                    <img src={Refresh} alt='' width='40px' height='40px' />
                </button>
            </div>
        </div>
    );
}

export default Search;