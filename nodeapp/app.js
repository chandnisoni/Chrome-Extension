var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/analyze', function(req,res){
  console.log(req.body);
  var url = req.body.url;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body.length) // Show the HTML for the Google homepage.
      var resObj = {
        blen: body.length
      };
      res.send(JSON.stringify(resObj));
    }
  });
});

app.listen(8000,function(){
  console.log("Listening over port 8000");
});

// Extra

app.get('/', function(req,res){
  res.sendfile(__dirname + '/views/index.html');
});

app.post('/create', function(req,res){
  console.log(req.body);
  var resObj = {
    myname: req.body.name,
    myage: req.body.age
  };
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resObj));;
});
