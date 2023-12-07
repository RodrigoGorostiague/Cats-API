const express = require('express');
const CatsService = require('../services/cat.service');


const router = express.Router();
const service = new CatsService();




router.get('/', (req, res) => {
  const cats = service.find();
  res.status(200).json(cats)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const cat = service.findOne(id);
  if (!cat) {
      res.status(404).json({
          error: 'Cat not found'
      })
  }else{
    res.status(200).json(cat)
  }
  
})

  router.post('/', (req, res) => {
    const body = req.body;
    const cat = service.create(body);
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

  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const cat = service.update(id, req.body);
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

  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const rta = service.update(id, body);
    res.json(rta)
  })

  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const rta = service.delete(id);
    res.json(rta);
  })
  module.exports = router;
