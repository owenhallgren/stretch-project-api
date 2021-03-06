const express = require('express')
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());


app.set('port', process.env.PORT || 3001);


//Mock data
app.locals.reviews = [
  {username:'JeffShepherd', summary: 'this is a summary', email:'nazosnowboarder@yahoo.com', language:'Python', date:'02/24/21', repo: 'https://github.com/JeffShepherd/Rancid-Tomatillos', status:'active', reviewer: 'Jackson', id:420 },
  {username:'jacksonmcguire', summary: 'this is a summary', email:'lumbersexual@gmail.com', language:'JavaScript', date:'02/24/21', repo: 'https://github.com/Jacksonmcguire/intention-timer', status:'', reviewer: '',id:69},
  {username:'josharagon', summary: 'this is a summary', email:'sucksquishbangblow@gmail.com', language:'C++', date:'02/24/21', repo:'https://github.com/josharagon/self-care-center', status:'complete', reviewer: 'Jackson', id:42069},
  {username:'owenhallgren', summary: 'this is a summary', email:'owenhallgren69@hotmail.com', language:'C#', date:'02/24/21', repo: 'https://github.com/owenhallgren/js-fun-at-the-library', status:'', reviewer: '', id:69420},
  {username:'rdtho2525', summary: 'this is a summary', email:'reggietheveggie@msn.com', language:'Ruby', date:'02/01/21', repo: 'https://github.com/JeffShepherd/Rancid-Tomatillos', status:'complete', reviewer: 'Jackson', id:6969},
  {username:'aemiers', summary: 'this is a summary', email:'ispeakgerman@gmail.com', language:'Java', date:'06/15/21', repo: 'https://github.com/Jacksonmcguire/intention-timer', status:'', reviewer: '',id:420420},
  {username:'ConnorAndersonLarson', summary: 'this is a summary', email:'igivehousetours@gmail.com', language:'PHP', date:'09/18/21', repo:'https://github.com/josharagon/self-care-center', status:'', reviewer: '', id:123},
  {username:'Shakikka', summary: 'this is a summary', email:'owenhallgren69@hotmail.com', language:'Other', date:'02/24/21', repo: 'https://github.com/owenhallgren/js-fun-at-the-library', status:'active', reviewer: 'Jackson', id:69420247},
];


//GET request: returns all data
app.get('/reviews', (request, response) => {
  const reviews = app.locals.reviews;

  if(!reviews) {
    return response.sendStatus(404);
  }

  response.status(200).json(reviews);
})


//PUT request:  CANCEL button
app.put('/reviews/cancel/:id', (request, response) => {
  const { id } = request.params;

  app.locals.reviews.forEach((review) => {
    if(parseInt(id) === review.id) {
      review.status = '';
      review.reviewer = '';
    }
  })

  response.status(200).json(app.locals.reviews)
})

//PUT request:  UNDO button
app.put('/reviews/undo/:id', (request, response) => {

  const { id } = request.params;

  app.locals.reviews.forEach((review) => {
    if(parseInt(id) === review.id) {
      review.status = 'active';
    }
  })

  response.status(200).json(app.locals.reviews)
})

//PUT request:  Complete button
app.put('/reviews/complete/:id', (request, response) => {

  const { id } = request.params;

  app.locals.reviews.forEach((review) => {
    if(parseInt(id) === review.id) {
      review.status = 'complete';
    }
  })

  response.status(200).json(app.locals.reviews)
})


//PUT request:  ACCEPT button
app.put('/reviews/accept/:id/:user', (request, response) => {

  const { id, user } = request.params;

  app.locals.reviews.forEach((review) => {
    if(parseInt(id) === review.id) {
      review.status = 'active';
      review.reviewer = `${user}`;
    }
  })

  response.status(200).json(app.locals.reviews)
})


app.listen(app.get('port'), () => {
  console.log(`Running on port ${app.get('port')}`)
})


