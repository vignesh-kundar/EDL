const express = require('express');
const ejs = require('ejs');


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3000, err => {
    if (!err) {
        console.log("listening on port 3000...");
    }
})