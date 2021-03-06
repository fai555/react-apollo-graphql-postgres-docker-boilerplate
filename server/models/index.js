import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres','postgres','postgres',{
  // gimme postgres, please!
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  host: 'postgres' || 'localhost',
  define:{
    underscored:true
  }
});

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
  Member: sequelize.import('./member'),
}

Object.keys(models).forEach(function(modelName){
  if('associate' in models[modelName]){
    models[modelName].associate(models);
  }
})

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;