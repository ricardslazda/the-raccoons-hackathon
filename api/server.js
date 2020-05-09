const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
connectionString = 'mongodb+srv://user:SpaceHack@314@cluster0-a8t47.mongodb.net/test?retryWrites=true&w=majority'

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000, function(){
	console.log('Listening on 3000')
})

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html")
})



MongoClient.connect(connectionString, {useUnifiedTopology: true}).then(client => {
    console.log('Connected to Database')
    const db = client.db('asteroids')
    const Astcollection = db.collection('asteroids')

    app.get('/asteroids', (req, res) => {
	  const cursor = db.collection('asteroids').find().toArray()
    .then(results => {
      console.log(results)
      console.log(results.sustain)
    })
    .catch(error => console.error(error))
	  })
  })
  .catch(error => console.error(error))

  