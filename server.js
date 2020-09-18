const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const chalk = require('chalk');
const path = require('path');

const db = require('./database');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const users = require('./controllers/users');
const loginTable = require('./controllers/loginTable');
const leaderboard = require('./controllers/leaderboard');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.get('/api/users', users.handleUserList(db));

app.get('/api/loginTable', loginTable.handleLoginTable(db));

app.post('/api/signin', signin.handleSignin(db, bcrypt));

app.post('/api/register', register.handleRegister(db, bcrypt));

app.get('/api/profile/:id', profile.handleProfileGet(db));

app.get('/api/leaderboard', (req, res) =>
  leaderboard.getLeaderboard(req, res, db)
);

app.put('/api/image', image.handleImage(db));
app.post('/api/imageUrl', (req, res) => image.handleApiCall(req, res));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Sorry! Can't find ${req.originalUrl} on this server!`,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${chalk.greenBright(port)}...`);
});
