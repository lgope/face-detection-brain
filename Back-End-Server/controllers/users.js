const handleUserList = db => (req, res) => {
  // res.send(database.users);
  db.select('*')
    .from('users')
    .then(user => {
      if (user.length) {
        res.json(user);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'));
};

module.exports = {
  handleUserList
};
