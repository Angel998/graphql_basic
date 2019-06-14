'use strict';

// Importaciones necesarias para la API
const express = require('express');
const express_graphql = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Importaciones auxiliares
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');
const { join } = require('path');

// Inicializacion del servidor
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const app_port = process.env.port || 3000;

// Conectar a Mongo
const mongo_url = require('./keys/mongo').url;
mongoose
  .connect(mongo_url, { useNewUrlParser: true })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => {
    console.log('Error conectando con MongoDB', err);
    process.exit();
  });

// Configuracion de GraphQL
const resolvers = require('./resolvers/resolver');
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Custom API Routes
const route_courses = require('./routes/course');

// Entorno de GraphQL
app.use(
  '/graph',
  express_graphql({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
  })
);

app.use('/api/course', route_courses);
app.listen(app_port, () => console.log(`Escuchando en: ${app_port}`));
