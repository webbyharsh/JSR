const express = require('express')
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    console.log(process.env.NODE_ENV)
    server.get('/saying/:id', (req, res) => {
      const actualPage = '/saying';
      const queryParams = { title: req.params.id }
      //console.log(req.params.id)
      app.render(req, res, actualPage, queryParams);

    })
    server.get('/user/:uid', (req, res) => {
      const actualPagez = '/user';
      const queryParamsz = { uid: req.params.uid }
      app.render(req, res, actualPagez, queryParamsz)
    })

    server.get('*', (req, res) => {
      return handle(req, res);
    })

    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err;
      console.log('ready on port' + process.env.PORT)
    })
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1)
  })