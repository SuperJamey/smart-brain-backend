const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();

app.use(express.json());

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
      id:'987',
      hash: '',
      email: 'teresa@jamey.com'
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password) {
      res.json('success');
    } else {
      res.status(400).json('Not Found');
    }
  })

  app.post('/register', (req, res) => {
    const { email, name, password } = req.body
    var bcrypt = require('bcryptjs');

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
          console.log(hash);
      });
    });

    database.users.push({
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
  })

  app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
      if (user.id == id) {
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
      if (user.id == id) {
        found = true;
        user.entries++;
        return res.json(user.entries);
      }
    })
    if (!found) {
      res.status(400).json('not found');
    }
  })

  

  // Load hash from your password DB.
  bcrypt.compare("B4c0/\/", hash, function(err, res) {
      // res === true
  });
  bcrypt.compare("not_bacon", hash, function(err, res) {
      // res === false
  });


app.listen(3000, () => {
  console.log('app is running on port 3000');
})