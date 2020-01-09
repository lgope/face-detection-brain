const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const db = require('./database');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const users = require('./controllers/users');
const loginTable = require('./controllers/loginTable');

// const db = knex({
//   client: 'pg',
//   connection: {
//     host: '',
//     user: '',
//     password: '',
//     database: ''
//   }
// });

// db.select('*')
//   .from('users')
//   .then(data => {
//     console.log(data);
//   });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json('Wellcome to face-detection-app back end server!🗽🙂');
});

app.get('/users', users.handleUserList(db));

app.get('/loginTable', loginTable.handleLoginTable(db));

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImage(db));
app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
