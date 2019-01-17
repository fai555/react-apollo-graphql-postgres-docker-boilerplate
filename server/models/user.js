import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) =>{

    const User = sequelize.define('user',{
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        bio: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg:"Invalid email"
                },
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 100],
                    msg: "The password needs to be between 1 and 100 characters"
                }
            }
        },
        role: {
            type: DataTypes.STRING,
        },
        // channels_own: {
        //     type: DataTypes.ARRAY({
        //         type: DataTypes.STRING,
        //     })
        // },
        // channels_following: {
        //     type: DataTypes.ARRAY({
        //         type: DataTypes.STRING,
        //     })
        // },
        // opportunitiy: {
        //     type: DataTypes.ARRAY({
        //         type: DataTypes.STRING,
        //     })
        // },
        // information: {
        //     type: DataTypes.ARRAY({
        //         type: DataTypes.STRING,
        //     })
        // },
        // followers: {
        //     type: DataTypes.ARRAY({
        //         type: DataTypes.STRING,
        //     })
        // },
        // following: {
        //     type: DataTypes.ARRAY({
        //         type: DataTypes.STRING,
        //     })
        // },
    },{
        hooks :{
            afterValidate: async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 12);
                user.password = hashedPassword;
            }
        }
    });


    User.associate = (models)=>{

        // N:M
        User.belongsToMany(models.Team, {
            through: models.Member,
            foreignKey: 'userId'
        })

        // User.belongsTo(models.Team,{
        //     foreignKey:'owner'
        // })

        // N:M
        User.belongsToMany(models.Channel, {
            through: 'channel_member',
            foreignKey: 'userId'
        })
    }

    return User;

}