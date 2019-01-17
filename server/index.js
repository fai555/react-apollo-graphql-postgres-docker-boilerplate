import jwt from 'jsonwebtoken';
import {refreshTokens} from './auth/auth';

const keys = require('./keys');
const { ApolloServer, gql } = require('apollo-server-express');

const models = require('./models');
const SECRET = "ASDFQWER1234qwedsazxc132";
const SECRET2 = "ASDFQWER1234qwedsazxc132opikiujjj";

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const path = require('path')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');


const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))


const app = express();
app.use(cors());


const addUser = async (req, res, next) => {

  const token = req.headers['x-token'];
  if (token) {
    try {
      const { user } = jwt.verify(token, SECRET);
      req.user = user;
    } catch (err) {
      const refreshToken = req.headers['x-refresh-token'];
      const newTokens = await refreshTokens(token, refreshToken, models, SECRET, SECRET2);
      if (newTokens.token && newTokens.refreshToken) {
        res.set('Access-Control-Expose-Headers', 'token, refreshToken');
        res.set('token', newTokens.token);
        res.set('refreshToken', newTokens.refreshToken);
      }
      req.user = newTokens.user;
    }
  }
  next();
};

app.use(addUser);
app.use(bodyParser.json());


const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  context: ({req,res}) =>{


    return {
      models,
      user: req.user,
      SECRET,
      SECRET2
    }
  } 
});


server.applyMiddleware({ app }); // app is from an existing express app

models.sequelize.sync({
  // force:true
}).then(function(){
  app.listen(5000, () =>
    console.log(`Server ready at http://localhost:5000${server.graphqlPath}`)
  )
})
