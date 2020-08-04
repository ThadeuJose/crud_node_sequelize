let db = require('../database/db.js');

function readAll(req, res) {
    db.readAllQuotes().then((data) => {
        res.json(data);
    });
};

function readOne(req, res) {
  let id = req.params.id;
  db.readQuote(id).then((data) => {
      console.log(data);
      res.json(data);
  });
};

function del(req, res) {
  let id = req.params.id;
  db.deleteQuote(id);
  res.json('Ok');
};

function insert(req, res) {
  let data = req.body;
  if(data){
    db.insertQuote(data);
    res.send('OK');
  }else{
    res.send('not OK');
  }
};

function update(req, res) {
  let id = req.body.id;
  let body = req.body;
  db.updateQuote(id,body);
  res.send('Ok');
};


module.exports = {
  readAll,
  readOne,
  del,
  insert,
  update,
};
