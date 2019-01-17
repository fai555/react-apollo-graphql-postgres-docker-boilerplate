import React from 'react'
import decode from 'jwt-decode';

const AdminOnly = ({component:Component, ...rest}) => {
    const token = localStorage.getItem('token');

    let userRole = '';
    let userId=null;
    
    if(token){

        const {user:{id, role}} = decode(token);
        userRole=role;
        userId=id;
    }else{
        rest.history.push("/login")
        // userRole = 'Regular';
    }

    // console.log(Component)
    // console.log(rest)

    return(
        userRole==="Admin"?
        Component
        : null 
    )
}

export default AdminOnly;
