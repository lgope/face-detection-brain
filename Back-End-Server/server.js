const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: 'host',
    user: 'databaseUserName',
    password: 'password',
    database: 'databaseName'
  }
});

// db.select('*')
//   .from('users')
//   .then(data => {
//     console.log(data);
//   });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(database.users);
});

app.post('/signin', (req, res) => {
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user'));
      } else {
        res.status(400).json('wrong credentials');
      }
    })
    .catch(err => res.status(400).json('wrong credentials'));
});

app.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// const express = require('express');
// const app = express();
// var bodyParser = require('body-parser');
// var cors = require('cors');

// const database = {
//   users: [
//     {
//       id: '123',
//       name: 'Lakshman',
//       email: 'gope@gmail.com',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   secrets: {
//     users_id: '123',
//     hash: 'wghhh'
//   }
// };

// app.use(cors());
// app.use(bodyParser.json());
// app.get('/', (req, res) => res.send('Hello World!'));

// app.post('/signin', (req, res) => {
//   var a = JSON.parse(req.body);
//   if (
//     a.username === database.users[0].email &&
//     a.password === database.secrets.hash
//   ) {
//     res.send('signed in');
//   } else {
//     res.json('access denied');
//   }
// });

// app.post('/findface', (req, res) => {
//   database.users.forEach(user => {
//     if (user.email === req.body.email) {
//       user.entries++;
//       res.json(user);
//     }
//   });
//   res.json('nope');
// });

// app.post('/register', (req, res) => {
//   database.users.push({
//     id: '124',
//     name: req.body.name,
//     email: req.body.email,
//     entries: 0,
//     joined: new Date()
//   });
//   res.json(database.users[database.users.length - 1]);
// });

// app.get('/profile/:userId', (req, res) => {
//   database.users.forEach(user => {
//     if (user.id === req.params.userId) {
//       return res.json(user);
//     }
//   });
//   // res.json('no user')
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Test App running on port ${port}...`);
// });
