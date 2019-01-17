import formatErrors from '../auth/formatErrors';
import requiresAuth from '../auth/permissions';

export default {
  Query: {
      allUserAllChannels: (async (parent,args,{ models, user}) => 
          models.Channel.findAll({raw: true})    
      ),
  },

  Mutation: {
    createChannel: async (parent, args, { models }) => {
      try {
        const channel = await models.Channel.create(args);
        console.log(channel)
        return {
          ok: true,
          channel,
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          errors: formatErrors(err),
        };
      }
    },
  },

  Channel: {
      messages: ({id}, args, {models}) => models.Message.findAll({ where: {channelId: id} })
  }

};