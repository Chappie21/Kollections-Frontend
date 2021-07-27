import { React, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import Principal from './pages/Principal';
import Registro from './pages/Registro';
import Exitoregistro from './pages/Exitoregistro'
import Aplication from './pages/Aplication';
import NotFound from './pages/NotFound';

const App = () => {

    const queryClient = new QueryClient();

    return (
        <Fragment>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Principal} />
                        <Route exact path='/Registro' component={Registro} />
                        <Route exact path='/Exitoregistro' component={Exitoregistro} />
                        <Route path='/Aplication' component={Aplication} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </QueryClientProvider>
        </Fragment>
    );
}

export default App;
