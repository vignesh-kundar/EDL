const express = require('express')
const router = require('express').Router();
const app = express();


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
// public set

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index')
});


const upload = require('./routes/upload')
app.use('/fileupload', upload);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
});