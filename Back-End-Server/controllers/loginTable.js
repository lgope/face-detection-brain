const handleLoginTable = db => (req, res) => {
  db.select('*')
    .from('login')
    .then(login => {
      if (login.length) {
        res.json(login);
      } else {
        res.status(400).json('Not found');
      }
    })
    .catch(err => res.status(400).json('error getting login'));
};

module.exports = { handleLoginTable };
