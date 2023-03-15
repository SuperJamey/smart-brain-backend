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
    db.transaction(trx => {
      db.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .transacting(trx)
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
      })
    .then(trx.commit)
    .catch(trx.rollback)
    })  
    .catch(error => res.status(400).json('unable to resister'))
}

module.exports = {
  handleRegister: handleRegister
};