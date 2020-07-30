let express = require('express');
let path = require('path');
let app = express();

let db = require('./database/db.js');

let bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 3000;

app.set('views','./views'); // TODO: Ver se é mesmo necessário

app.use(express.static(__dirname + '/public'));

let homeUrl = '/';

app.get('/quote',function (req, res) {
  db.readAllQuotes().then((data) => {
      res.json(data);
  });
})

app.get('/quote/:id',function (req, res) {
  let id = req.params.id;
  db.readQuote(id).then((data) => {
      console.log(data);
      res.json(data);
  });
})

app.delete('/quote/:id',function (req, res) {
  let id = req.params.id;
  db.deleteQuote(id);
  res.json('Ok');
})

app.post('/quote', function (req, res) {
  let data = req.body;
  if(data){
    db.insertQuote(data);
    res.send('OK');
  }else{
    res.send('not OK');
  }
});

app.put('/quote', function (req, res) {
  let id = req.body.id;
  let body = req.body;
  db.updateQuote(id,body);
  res.send('Ok');
});

app.listen(PORT);
console.log('Homepage running at http://localhost:'+PORT+'/');
