import React from 'react';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Home from '../components/Home';
import decode from 'jwt-decode';


const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken');

    try{
        
        decode(token);
        decode(refreshToken);

    } catch(err){
        return false;
    }

    return true;
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => 
            (isAuthenticated()?(
                <Component {...props}/>
            ):(
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            ))
        }
    />
    
);



export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home} />
        </Switch>
    </BrowserRouter>
);