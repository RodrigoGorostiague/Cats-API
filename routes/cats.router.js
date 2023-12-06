const express = require('express');
const { faker } = require('@faker-js/faker')

const router = express.Router();



router.get('/', (req, res) => {
  const cats = [];
  for (let i = 0; i < 1000; i++) {
      cats.push({
          id: i,
          name: faker.animal.cat(),
          color: faker.color.human(),
          Image: faker.image.urlLoremFlickr({ category: 'cats' })
      })
  }
  res.json(cats)
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
      id: id,
      name: 'Kuromaru'
  })
})

router.get('/colors/:color/cats/:id', (req, res) => {
  const { id, color } = req.params;
  res.json({
      id: id,
      name: 'Kuromaru',
      color: color
  })
})

router.get('/queryCats', (req, res) => {
  const { name, color } = req.query;
  if (!name || !color) {
      res.status(404).json({
          error: 'Error 404, Gatitos not found'
      })
  }else{
  res.json({
      name: name,
      color: color
      })
  }
  })

  module.exports = router;
