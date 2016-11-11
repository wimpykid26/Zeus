var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonfile = require('jsonfile')
var COMMENTS_FILE = path.join(__dirname, 'comments.json');
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

app.get('/comments.json', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/comments.json', function(req, res) {
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

port=3000
app.listen(port);
console.log('listening at port no'+port);