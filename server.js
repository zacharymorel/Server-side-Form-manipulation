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
  request.checkBody('yearOfBirth', 'Birth year is needed.').notEmpty()
  request.checkBody('select', 'Select One Please.').notEmpty()
  request.checkBody('password', 'Password is needed.').notEmpty().isLength(8, 20)

  console.log(request.body)
   const errors = request.validationErrors()
   console.log(errors);
   if (errors) {
      const errorsData = {
        errors: errors
      }
      response.render('signup', errorsData)
   } else {
     response.render('signup', {
      getName: request.body.getName,
      getEmail: request.body.getEmail,
      yearOfBirth: request.body.yearOfBirth,
      select: request.body.select,
      password: request.body.password
    })
  }

})


app.listen(3000, () => {
  console.log('may the force by with you');
})
