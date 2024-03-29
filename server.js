const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

let db = knex({
  client: 'pg',
  connection: {
    host: 'dpg-cg8a3hpmbg53mc4s9kjg-a',
    port: 5432,
    database : 'smartbraindb_ju12',
    user: 'jamey',
    password: 'r1RvN6NiG89sFc1sRATaDBTN6npDld1a'
    
  }
})

if (db.schema.hasTable('login')) {
  console.log('YEEEESSSSSSSS')
} else {
  console.log('noooooooooooooo')
}

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('testing authentication') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res,) => { image.handleImage(req, res, db) })

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
})
