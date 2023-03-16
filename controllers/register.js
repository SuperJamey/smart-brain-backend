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
      })
    .then(trx.commit)
    .catch(trx.rollback)
    }

module.exports = {
  handleRegister: handleRegister
};