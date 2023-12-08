const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();



router.get('/', (req, res) => {
  const dogs = [];
  for (let i = 0; i < 1000; i++) {
    dogs.push({
          id: i,
          name: faker.animal.dog(),
          color: faker.color.cmyk( {format: 'css'} ),
          image: faker.image.urlLoremFlickr({ category: 'dogs' })
      })
  }
  res.json(dogs)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      id: id,
      name: 'Betty'
  })
})

router.get('/colors/:color/dogs/:id', (req, res) => {
  const { id, color } = req.params;
  res.json({
      id: id,
      name: 'Betty',
      color: color
  })
})

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
      message: 'Dog created',
      data: body
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
      message: 'Dog updated',
      data: body,
      id: id
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
      message: 'Dog partial updated',
      data: body,
      id: id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      message: `Dog ${id} deleted`,
      id: id
  })
})
  module.exports = router;
