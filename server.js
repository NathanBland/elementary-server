var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  routes = require('./routes/'),
  app = express()
  
app.set('dbhost', '127.0.0.1')
app.set('dbname', 'elementary')

mongoose.connect('mongodb://' + app.get('dbhost') + '/' + app.get('dbname'))

app.set('port', process.env.PORT ||8081)
app.set('ip', process.env.IP || '0.0.0.0')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', routes)

app.listen(app.get('port'), app.get('ip'), function () {
  console.log('Elementary-server has started...')
})