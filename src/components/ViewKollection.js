import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router'
import ImgP from './ImgP'


import { getCollection } from '../API/Colleccion'

const ViewKollection = () =>{

    const {id} = useParams();

    const userData = useQueryClient();
    const user = userData.getQueryData('UserInfo')

    const { data, isLoading } = useQuery(['Collection', id], getCollection, {
        retry: 3,
        retryDelay: 2000,
        staleTime: Infinity,
        onSuccess: (response) =>{
            console.log(response.data)
        }
    })

    if(isLoading){
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

    return(
        <div className = 'container-fluid'>
            <div className = 'd-flex justify-content-center mt-5 pt-5'>
                <div className = 'col-12 col-sm-6'>
                {
                    data.data.imgs.lenght !== 0
                    ?   data.data.imgs.map(pub =>{
                            return(
                            <div className = 'container mt-3 mb-3'>
                                    <ImgP 
                                        id = {pub.id}
                                        username={user.data.user.name} 
                                        profileImg={user.data.user.profileImg} 
                                        descripcion={pub.descripccion} 
                                        imgUrl={pub.urlImg} 
                                        tags={pub.tags}
                                        edit = {true}
                                    />
                                </div>
                            )
                        })
                    : 'asdfsdasdadsdaads'
                }
                </div>
            </div>
        </div>
    )
}

export default ViewKollection