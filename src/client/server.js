var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonfile = require('jsonfile')
var COMMENTS_FILE = path.join(__dirname, '/json/national.json');
var COMMENTS_FILE2 = path.join(__dirname, '/json/world.json');
var COMMENTS_FILE3 = path.join(__dirname, '/json/sports.json');
console.log(__dirname)
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/json/national.json', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
app.get('/json/sports.json', function(req, res) {
  fs.readFile(COMMENTS_FILE3, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
app.get('/json/world.json', function(req, res) {
  fs.readFile(COMMENTS_FILE2, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
app.post('/json/national.json', function(req, res) {
  console.log('insidepost');
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    var newComment = {
      heading:"Article4",
      text:"Sample",
      upvotes: req.body.upvotes,
      downvotes: req.body.downvotes,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

app.put('/edit', function(req, res) {
  var id = req.body.id;
  var newUpvotes = req.body.upvotes;
  var newDownvotes = req.body.downvotes;
  // read in the JSON file
  jsonfile.readFile(COMMENTS_FILE, function(err, obj) {
    // Using another variable to prevent confusion.
    var fileObj = obj;
    console.log(fileObj);
    // Modify the text at the appropriate id
    fileObj[id-1].upvotes = parseInt(newUpvotes);
    fileObj[id-1].downvotes = parseInt(newDownvotes);
    // Write the modified obj to the file
    jsonfile.writeFile(COMMENTS_FILE, fileObj, function(err) {
      if (err) throw err;
    });
  });
});

app.put('/retrieve', function(req, res) {
  JSON.stringify(req.body);
  var similarString = "";
  for (var p in req.body){
    for(var l = 0;l < p.length;l++){
      if (p.charAt(l) != null && p.charAt(l)!=',' && p.charAt(l) != ' '){
        if(p.charAt(l)=='\n')
        similarString+=" ";
        else
        similarString+=p.charAt(l);
      }
    }
  }
  var array = similarString.split(' ').map(Number);
  var contentArray = [];
  var image_urlArray = [];
  var j = 0;
  var k = 0;
  jsonfile.readFile(COMMENTS_FILE, function(err, obj) {
    var fileObj = obj;
    for (i = 1;i < array.length; i++){
      contentArray[j++] = fileObj[array[i-1]].path.toString();
    }
    res.json(contentArray);
  });
});
app.put('/image', function(req, res) {
  JSON.stringify(req.body);
  var similarString = "";
  for (var p in req.body){
    for(var l = 0;l < p.length;l++){
      if (p.charAt(l) != null && p.charAt(l)!=',' && p.charAt(l) != ' '){
        if(p.charAt(l)=='\n')
        similarString+=" ";
        else
        similarString+=p.charAt(l);
      }
    }
  }
  var array = similarString.split(' ').map(Number);
  console.log(array)
  var image_urlArray = [];
  var j = 0;
  jsonfile.readFile(COMMENTS_FILE, function(err, obj) {
    var fileObj = obj;
    for (i = 1;i < array.length; i++){
      image_urlArray[j++] = fileObj[array[i-1]].url.toString();
    }
    res.json(image_urlArray);
  });
});
port=3000
app.listen(port);
console.log('listening at port no'+port);
