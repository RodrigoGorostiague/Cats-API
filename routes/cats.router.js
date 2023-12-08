const express = require('express');
const CatsService = require('../services/cat.service');

const validatorHandler = require('../middlewares/validator.handler');
const { createCatSchema, updateCatSchema, getCatsSchema } = require('../schemas/cat.schema');


const router = express.Router();
const service = new CatsService();




router.get('/', async (req, res) => {
  const cats = await service.find();
  res.status(200).json(cats)
})

router.get('/:id', 
validatorHandler(getCatsSchema, 'params'),
async (req, res) => {
  const { id } = req.params;
  const cat = await service.findOne(id);
  if (!cat) {
      res.status(404).json({
          error: 'Cat not found'
      })
  }else{
    res.status(200).json(cat)
  }
  
})

  router.post('/', 
  validatorHandler(createCatSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const cat = await service.create(body);
    if (!cat) {
        res.status(400).json({
            error: 'Cat not created'
        })
    }else{
      res.status(201).json({
          message: 'Cat created',
          data: body
      })
    }
  })

  router.put('/:id',
  validatorHandler(updateCatSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const cat = await service.update(id, req.body);
    if (!cat) {
        res.status(400).json({
            error: 'Cat not updated'
        })
      }else{
        res.status(200).json({
            message: 'Cat updated',
            data: cat,
            id: cat.id
        })
      }
  })

  router.patch('/:id', 
  validatorHandler(getCatsSchema, 'params'),
  validatorHandler(updateCatSchema, 'body'),
  async (req, res) => {
    try{
      const { id } = req.params;
      const body = req.body;
      const rta = await service.update(id, body);
      res.json(rta)
    }catch(error){
      res.status(400).json({
        error: error.message
      })
    }

  })

  router.delete('/:id',
  validatorHandler(getCatsSchema, 'params'),
   async (req, res) => {
    try{
      const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
    }catch(error){
      res.status(400).json({
        error: error.message
      })
    }
  })
  module.exports = router;
