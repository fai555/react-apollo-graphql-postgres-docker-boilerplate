import formatErrors from '../auth/formatErrors';
import requiresAuth from '../auth/permissions';

export default {

    Query: {
        allUserAllMessages: (async (parent,args,{ models, user}) => 
            models.Message.findAll({raw: true})    
        ),
        getMessages: (parent, {id}, {models}) => models.Message.findAll({ where: {channelId: id} }, {raw: true}),
    },

    Mutation: {
        createMessage: async (parent,args,{ models, user}) => {

            try{
                const message = await models.Message.create({
                    ...args,
                    userId:user.id,
                });
                return {
                    ok:true,
                    message
                }
            } catch (err) {
                console.log("errsdsdsdsdsdsd")
                console.log(err)
                return {
                    ok:false,
                    errors: formatErrors(err),
                }
            }
        },

        updateMessage: async (parent,{id, text},{ models, user}) => {

            try{
                const message = await models.Message.update({text}, {where: {id}});
                return {
                    ok:true,
                    message
                }
            } catch (err) {
                console.log(err)
                return {
                    ok:false,
                    errors: formatErrors(err),
                }
            }
        }
    },
    Message: {
        user : ({userId}, args, {models, user}) => models.User.findOne({ where: {id: userId} })
    }
}