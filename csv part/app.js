const express = require('express')
const router = require('express').Router();
const app = express()
app.set('view engine', 'ejs')

// app.use(express.json());
app.use(express.urlencoded({extended: true}))
// public set
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/routes', express.static(__dirname + '/routes'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.get('/', function(request, response) {
    response.render('index')
});

const upload = require('./routes/upload')

app.use('/fileupload',upload)


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});