let express = require('express');
let router = express.Router();

let db = require('../database/db.js');

router.get('/',function (req, res) {
    db.readAllQuotes().then((data) => {
        res.json(data);
    });
})

router.get('/:id',function (req, res) {
  let id = req.params.id;
  db.readQuote(id).then((data) => {
      console.log(data);
      res.json(data);
  });
});

router.delete('/',function (req, res) {
  let id = req.params.id;
  db.deleteQuote(id);
  res.json('Ok');
})

router.post('/', function (req, res) {
  let data = req.body;
  if(data){
    db.insertQuote(data);
    res.send('OK');
  }else{
    res.send('not OK');
  }
});

router.put('/', function (req, res) {
  let id = req.body.id;
  let body = req.body;
  db.updateQuote(id,body);
  res.send('Ok');
});

module.exports = router;
