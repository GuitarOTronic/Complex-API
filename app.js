const express = require('express');
const app = express()
const morgan = require('morgan');
const bodyParse = require('body-parser')
const port = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(bodyParse.json())

const routes = require('./src/routes/routes')
//app.use('/')

app.use('/bank', routes)


app.use((err, req, res, next) => {
  //console.log(err);

  const status = err.status || 500
  res.status(status).json({
    error: err
  })
})
//req.method
app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: 'Not found'
    }
  })
})



const listener = console.log(`Listening on port ${port}`);
app.listen(port, listener)
