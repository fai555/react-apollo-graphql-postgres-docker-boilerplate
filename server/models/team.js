export default (sequelize, DataTypes) => {
  const Team = sequelize.define('team', {
    name: {
      type: DataTypes.STRING,
    },
    insight: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
    },
  });

  Team.associate = (models) => {
    Team.belongsToMany(models.User, {
      through: models.Member,
      foreignKey: {
        name: 'teamId',
        field: 'team_id',
      },
    });
    Team.belongsTo(models.User, {
      foreignKey: 'owner',
    });
  };

  return Team;
};