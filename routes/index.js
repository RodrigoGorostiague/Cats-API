const express = require('express');
const catsRouter = require('./cats.router');
const dogsRouter = require('./dogs.router');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/cats', catsRouter);
  router.use('/dogs', dogsRouter);
}

module.exports = routerApi;


