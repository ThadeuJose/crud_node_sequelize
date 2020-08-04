let express = require('express');
let path = require('path');
let app = express();

let quoteRoute = require('./routes/quoteRoutes');

let bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 3000;

app.set('views','./views');

app.use(express.static(__dirname + '/public'));

let homeUrl = '/';

app.use('/quote',quoteRoute);

app.listen(PORT);
console.log('Homepage running at http://localhost:'+PORT+'/');
