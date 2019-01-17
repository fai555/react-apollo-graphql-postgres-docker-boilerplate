import formatErrors from '../auth/formatErrors';
import requiresAuth from '../auth/permissions';


export default {
    Query: {
        allTeams: requiresAuth.createResolver(async (parent,args,{ models, user}) => 
            models.Team.findAll({ where: {owner: user.id} }, {raw: true})    
        ),

        allUsersAllTeams: (async (parent,args,{ models, user}) => 
            models.Team.findAll({raw: true})    
        ),
        getTeams: (parent, {id}, {models}) => models.Team.findAll({ where: {owner: id} }, {raw: true})    ,
        getTeam: (parent, {id}, {models}) => models.Team.findOne({ where: {id: id} }, {raw: true}),
    },

    Mutation: {
        createTeam: (async (parent,args,{ models, user}) => {

            
            try{
                const team = await models.Team.create({...args, owner: user.id});
                // await models.Channel.create({name: "General", public: true, teamId: team.id});
                return {
                    ok: true,
                    team,
                };
            } catch (err) {
                console.log(err)
                return {
                    ok: false,
                    errors: formatErrors(err)
                };
            }
        }),

        createTeamWithChannel: (async (parent,{name, insight, channelname, tags},{ models, user}) => {

            
            try{
                const team = await models.Team.create({name, insight, tags, owner: user.id});
                await models.Channel.create({name: channelname, public: true, teamId: team.id});
                return {
                    ok: true,
                    team,
                };
            } catch (err) {
                console.log(err)
                return {
                    ok: false,
                    errors: formatErrors(err)
                };
            }
        }),

        updateTeamWithChannel: (async (parent,{id, name, insight, channelname, tags},{ models, user}) => {


            console.log("@@@@@@@@@@@@@")
            
            try{
                const team = await models.Team.update({name, insight, tags},{where: {id}});
                // await models.Channel.create({name: channelname, public: true, teamId: team.id});
                return {
                    ok: true,
                    team,
                };
            } catch (err) {
                console.log("err")
                console.log(err)
                return {
                    ok: false,
                    errors: formatErrors(err)
                };
            }
        }),

        addTeamMember: (async (parent, { teamId }, { models, user }) => {

            console.log("##############################################")

            console.log(teamId);
            try {
            //   const teamPromise = models.Team.findOne({ where: { id: teamId } }, { raw: true });
            //   const userToAddPromise = models.User.findOne({ where: { id: user.id } }, { raw: true });
            //   const [team, userToAdd] = await Promise.all([teamPromise, userToAddPromise]);
            //   if (team.owner !== user.id) {
            //     return {
            //       ok: false,
            //       errors: [{ path: 'email', message: 'You cannot add members to the team' }],
            //     };
            //   }
            //   if (!userToAdd) {
            //     return {
            //       ok: false,
            //       errors: [{ path: 'email', message: 'Could not find user with this email' }],
            //     };
            //   }
              await models.Member.create({ userId: 1, teamId });
              return {
                ok: true,
              };
            } catch (err) {
              console.log(err);
              return {
                ok: false,
                errors: formatErrors(err),
              };
            }
          }),
    },

    Team: {
        channels: ({id}, args, {models}) => models.Channel.findAll({ where: {teamId: id} }),
        owner : ({owner}, args, {models}) => models.User.findOne({ where: {id: owner} }),
    }
}