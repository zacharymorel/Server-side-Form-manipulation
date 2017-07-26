const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst' )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (request, response) => {
  response.render('home')
})

app.post('/signup', (request, response) => {
  response.render('signup',request.body)
})

app.listen(3000, () => {
  console.log('may the force by with you');
})
