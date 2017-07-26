const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst' )

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())


app.get('/', (request, response) => {
  response.render('home')
})

// app.post('/signup', (request, response) => {
//   response.render('signup',request.body)
// })

app.post('/signup', (request, response) => {
  request.checkBody('getName', 'You must enter your name!').notEmpty().isLength(0, 100)
  request.checkBody('getEmail', 'Your must enter your email!').isEmail().isLength(0, 100)
  request.checkBody('yearOfBirth', 'Birth year is needed.').notEmpty().isLength(1900, 2017)
  request.checkBody('select', 'Select One Please.').notEmpty()
  request.checkBody('password', 'Password is needed.').notEmpty().isLength(8, 20)

   var errors = request.validationErrors()
   if (errors) {
      var html = errors
      response.render(html)
   } else {
    var name = request.body.getName
    var email = request.body.getEmail
    var yob = request.body.yearOfBirth
    var profession = request.body.select
    var pw = request.body.password
    var html = `<p>Your Name: ${name}</p>
    <p>Your Email: ${email}</p>
    <p>Your Birthyear: ${yob}</p>
    <p>Your Job: ${selected}</p>
    <p>Your Password: ${pw}</p>`
  }
})


app.listen(3000, () => {
  console.log('may the force by with you');
})
