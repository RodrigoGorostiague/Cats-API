const express = require('express');
const { faker } = require('@faker-js/faker')
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/nuevo-endpoint', (req, res) => {
    res.send('New endpoint');
})

app.get('/cats', (req, res) => {
    const cats = [];
    for (let i = 0; i < 100; i++) {
        cats.push({
            id: i,
            name: faker.animal.cat(),
            color: faker.color.human(),
            Image: faker.image.urlPicsumPhotos()
        })
    }
    res.json(cats)
  })

  app.get('/cats/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id: id,
        name: 'Kuromaru'
    })
  })

  app.get('/colors/:color/cats/:id', (req, res) => {
    const { id, color } = req.params;
    res.json({
        id: id,
        name: 'Kuromaru',
        color: color
    })
  })

    app.get('/queryCats', (req, res) => {
    const { name, color } = req.query;
    if (!name || !color) {
        res.status(404).json({
            error: 'Error 404, Gatitos no found'
        })
    }else{
    res.json({
        name: name,
        color: color
        })
    }
    })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

