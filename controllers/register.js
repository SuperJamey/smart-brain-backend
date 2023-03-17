const handleRegister = (req, res, db, bcrypt) => {
  console.log('in handleRegister');
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
    console.log('hash: ', hash);
    console.log('email: ', email);
    console.log('name: ', name);
    try {
      db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
      
        .into('users')
      
        //.returning('email')
      
        // .then(loginEmail => {
        //   return trx('users')
        //     .returning('*')
        //     .insert({
        //       email: loginEmail[0].email,
        //       name: name,
        //       joined: new Date()
        //     })
        //     .then(user => {
        //       res.json(user[0]);s
        //     })
        //     .catch(console.log)
        // })
      .then(trx.commit)
      .catch(trx.rollback)
      })
    } catch(err) {
      console.log(err)
    }
  }

module.exports = {
  handleRegister: handleRegister
}
