import React, { Fragment } from 'react'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import { isLogin } from '../API/user';

import Navbar from '../components/Navbar';
import Userprin from '../components/Userprin';
import Home from '../components/Home'
import Edituser from '../components/Edituser';
import CreateKo from '../components/CreateKo';
import AddImage from '../components/AddImage';
import ViewKollection from '../components/ViewKollection';
import Search from '../components/searCh';

const Aplication = () => {

    let { path } = useRouteMatch();
    let history = useHistory();

    useQuery('login', isLogin, {
        retry: false,
        onSuccess: (response) =>{
            console.log(response.data.status)
        },
        onError: (response) =>{
            // En caso de no existir la sesion o el servidor sea cerrado, redirige al login
            history.push('/');
        }
    })

    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='row'>
                    <Navbar />
                </div>
                <div className='row'>
                    <Switch>
                        <Route exact path = {`${path}/userprin/CreateKo`} component = {CreateKo} />
                        <Route exact path = {`${path}/AddImage`} component = {AddImage} />
                        <Route exact path = {`${path}/Home`} component = {Home} />
                        <Route path = {`${path}/search/:tag`} component = {Search} />
                        <Route path = {`${path}/userprin/Kollection/:id`} component = {ViewKollection}/>
                        <Route path = {`${path}/userprin/editInfo`} component = {Edituser} />
                        <Route exact path = {`${path}/userprin`} component = {Userprin} />
                    </Switch>
                </div>
            </div>
        </Fragment>
    )

}

export default Aplication;