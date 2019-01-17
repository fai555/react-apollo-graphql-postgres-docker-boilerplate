import bcrypt from 'bcryptjs';

import formatErrors from '../auth/formatErrors';

import {tryLogin} from '../auth/auth';


export default {

    Query: {
        getUser: (parent, {id}, {models}) => models.User.findOne({ where: { id } }),
        allUsers: (parent, args, {models}) => models.User.findAll(),
    },

    Mutation: {

        login: (parent, {email, password}, {models, SECRET, SECRET2}) => tryLogin(email, password, models, SECRET, SECRET2),
        // login: (parent, {email, password}, {models}) => {
        
        //     models.User.findOne({ where: {email, password} }).then( user=>{
        //         return {
        //             ok: true,
        //         }
        //     })


        // },

        createUser: async(parent, args, {models}) => {
            
            try{
                const user = await models.User.create(args);
                return {
                    ok: true,
                    user
                };
            }catch(err){
                return {
                    ok: false,
                    errors: formatErrors(err, models)
                };
            }
        },
        
        register: async(parent, {password, ...otherArgs}, {models}) => {
            
            try{
                const hashedPassword = await bcrypt.hash(password, 12);
                await models.User.create({ ...otherArgs, password:hashedPassword})
                return true;
            }catch(err){
                return false;
            }
        }
    }

};
