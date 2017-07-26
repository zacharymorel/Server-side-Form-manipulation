const express = require('express')
const mustacheExpress = require('mustache-express')

const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('viewengine', 'mst' )

app.get('/', () => {
  response.render('home')
})











app.listen(3000, () => {
  console.log('my the force by with you');
})
