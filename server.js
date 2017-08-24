const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

MongoClient.connect('mongodb://knweber:Brewers2016@ds159033.mlab.com:59033/booksfordays', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, () => {
    console.log("listening on port 3000");
  })
});

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
  db.collection('books').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {books: result})
  });
})

app.post('/books', (req,res) => {
  db.collection('books').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('saved to database');
    res.redirect('/');
  })
  console.log(req.body);
})

app.put('/books', (req,res) => {
  db.collection('books')
  .findOneAndUpdate({title: 'Calvin and Hobbes'}, {
    $set: {
      title: req.body.title
    }
  }, {
    upsert: true
  }, (err,result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
