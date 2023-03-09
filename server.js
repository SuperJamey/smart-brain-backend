const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const postgres = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 3000,
    user : 'postgres',
    password : '',
    database : 'smart_brain'
  }
});

postgres.select('*').from('users').then(data => {
  console.log(data);
});


const app = express();

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'Teresa',
      email: 'teresa@jamey.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Traci',
      email: 'traci@jamey.com',
      password: 'cream',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id:'125',
      hash: '',
      email: 'teresa@jamey.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  bcrypt.compare("swallow", '$2a$10$LLm3zimw/5CZjwVigWJhHOVyCSWlxkbmqxYSRxO1kn7HqxF7yMCtG', function(err, res) {
    console.log('first guess', res);
  });
  bcrypt.compare("cream", '$2a$10$LLm3zimw/5CZjwVigWJhHOVyCSWlxkbmqxYSRxO1kn7HqxF7yMCtG', function(err, res) {
    console.log('second guess', res)
  });
  
  if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
      res.json(database.users[0]);
    } else {
      res.status(400).json('Not Found');
    }
  })

  app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
      console.log(hash);
    });
    database.users.push({
      id: '125',
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
  })

  app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
      if (user.id === id) {
        found = true;
        return res.json(user);
      }
    })
    if (!found) {
      res.status(400).json('not found');
    }
  })

  app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
      if (user.id === id) {
        found = true;
        user.entries++;
        return res.json(user.entries);
      }
    })
    if (!found) {
      res.status(400).json('stupid error');
    }
  })


app.listen(3000, () => {
  console.log('app is running on port 3000');
})