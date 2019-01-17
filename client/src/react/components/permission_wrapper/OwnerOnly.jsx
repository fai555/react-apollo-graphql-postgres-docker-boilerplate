import React from 'react'
import decode from 'jwt-decode';

const OwnerOnly = ({component:Component, ownerId, ...rest}) => {
    const token = localStorage.getItem('token');

    let userID = '';
    
    if(token){

        const {user:{id, role}} = decode(token);
        userID=id;
    }else{
        rest.history.push("/login")
        // userID = 'Regular';
    }

    // console.log(Component)
    // console.log(rest)

    return(
        userID===ownerId?
        Component
        : null 
    )
}

export default OwnerOnly;
