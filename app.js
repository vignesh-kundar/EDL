const express = require('express')
const router = require('express').Router();
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
// public set

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index')
});

app.get('/aboutus', (req, res) => {
    res.render('aboutus');
})

app.get('/howtouse', (req, res) => {
    res.render('howtouse');
})

const upload = require('./routes/upload')
app.use('/fileupload', upload);



app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
});