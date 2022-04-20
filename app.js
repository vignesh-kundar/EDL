const express = require('express');
const ejs = require('ejs');


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

console.clear();
console.log("\nLogs cleared\n")


//==>                  == validation of email ==
function ValidateEmail(inputText) {
    var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (inputText.match(mailformat)) {
        // console.log("matched")
        return true;
    } else {
        // console.log("not matched")
        return false;
    }
}
//  ValidateEmail('udithbkl100@gmail.com')

csv({
    mapHeaders: ({ header, A }) => header.toLowerCase()
})

fs.createReadStream('data.csv') //read from current dir
    .pipe(csv())
    .on('headers', (headers) => {
        console.log("\nPrinting header of csv file : ", headers[0])
            //console.log(!ValidateEmail(headers[0]))

        if (!ValidateEmail(headers[0])) {
            fs.createReadStream('data.csv')
                .pipe(csv({
                    mapHeaders: ({ header, A }) =>
                        header.replace(header, "email")
                }))
                .on('data', (data) => results.push(data.email))
                .on('end', () => {
                    //console.log(results);
                    res(results);
                });
        } else {
            fs.createReadStream('data.csv')
                .pipe(csv({
                    mapHeaders: ({ header, A }) =>
                        header.replace(header, "email")
                }))
                .on('data', (data) => results.push(data.email))
                .on('end', () => {
                    results.push(headers[0])
                        // console.log(results)
                    res(results);
                })
        }
    })

//validating email of csv file
async function res(r) {
    for (i = 0; i < r.length; i++) {
        if (ValidateEmail(r[i])) {
            valid.push(r[i])

        } else {
            invalid.push(r[i])
        }
    }
    console.log("\n====>\nEmail counts\n");
    console.log("Valid email :", valid.length)
    console.log("\nInvalid email :", invalid.length)
    console.log("\n====>\n");
}

//==>                      < == end of validation == >

//==>                       < == NODE MAILER == >
var transporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 10,
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});



var mailOptions = {
    from: 'john doe',
    to: valid,
    subject: 'Impo Notice 🫡',
    text: `Testing one 2 three`,
    html: `
    <h2>Just wanted to say that you are not homosapiens!!</h2>
    <img src="https://media.giphy.com/media/g7GKcSzwQfugw/giphy.gif"></img>
    <p>😶‍🌫️</p>
    `
};



transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
        console.log(err);
    } else {
        console.log(valid)
        console.log("\n------->");
        console.log("\npending emails : \n" + info.pending);
        console.log("\n------->");
        console.log("\nrejected : \n" + info.rejected);
        console.log("\n------->");
        console.log("\naccepted : \n" + info.accepted);
        console.log("\n------->");
        console.log("Mail sent🫡 \n" + info.response);
        console.log("------->\n");
    }
});


//==>               <== Node mailer ends ==>


//==>                   == routes ==
app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3000, err => {
    if (!err) {
        console.log("listening on port 3000...");
    }
})