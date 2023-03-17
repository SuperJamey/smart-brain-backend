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
      db.transaction(function(trx) {
        db('users').transacting(trx).insert({
        //trx.insert({
          hash: hash,
          email: email
        })      
        //.into('users')      
        .returning('email')      
        .then(function(resp) {
          return loginEmail[0].email;
        })
        .then(trx.commit)
        .catch(trx.rollback);
      })
    .then(function(resp) {
      console.log('Transaction complete.');
    })
    .catch(function(err) {
      console.error(err);
    });
  }

module.exports = {
  handleRegister: handleRegister
}
