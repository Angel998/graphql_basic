'use strict';

const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools');

const { readFileSync } = require('fs');
const { join } = require('path');
const app = express();

// Conectar a Mongo
const mongo_url = require('./keys/mongo').url;
mongoose
  .connect(mongo_url, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`Error MongoDB \n${err}`));

// Configurar los resolvers
const resolvers = require('./resolvers/resolver');

const app_port = process.env.port || 3000;

// Esquema inicial
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  '/api',
  express_graphql({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

app.listen(app_port, () => console.log(`Escuchando en: ${app_port}`));
