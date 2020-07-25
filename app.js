let express = require('express');
let path = require('path');
let app = express();

let db = require('./database/db.js');

let bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 3000;

app.set('views','./views');

app.use(express.static(__dirname + '/public'));

let homeUrl = '/';

app.get('/allQuote',function (req, res) {
  db.readAllQuotes().then((data) => {
      console.log(data);
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
  let quote = req.body.quote;
  if(quote){
    db.insertQuote(quote);
    res.send('OK');
  }else{
    res.send('not OK');
  }
  console.log('POST');
});

app.put('/quote', function (req, res) {
  let id = req.body.id;
  let quote = req.body.quote;
  db.updateQuote(id,quote);
  res.send('Ok');
});

app.listen(PORT);
console.log('Homepage running at http://localhost:'+PORT+'/');
