const router = require('express').Router();
var formidable = require('formidable');
var fs = require('fs');
const csv = require('csv-parser');
const nodemailer = require('nodemailer');
const { response } = require('express');
//arrays
const results = [];
let valid = [];
let invalid = [];



//const time = new Date();

//fileupload route

router.post('/', (function(req, res) {

    valid = [];
    invalid = [];



    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        email = fields.email;
        pass = fields.password;
        sub = fields.subject;
        mes = fields.message;
        var oldpath = files.filetoupload.filepath;
        var newpath = '\data.csv' //specify new address
        const mv = require('mv');
        mv(oldpath, newpath, function(err) {
            if (err) {
                console.log('> FileServer.jsx | route: "/files/upload" | err : ', err);
                throw err;

            } else {


                csv({
                    mapHeaders: ({ header, A }) => header.toLowerCase()
                })

                fs.createReadStream('data.csv')
                    .pipe(csv())
                    .on('headers', (headers) => {
                        console.log(headers[0])
                        console.log(!ValidateEmail(headers[0]))

                        if (!ValidateEmail(headers[0])) {
                            fs.createReadStream('data.csv')
                                .pipe(csv({

                                    mapHeaders: ({ header, A }) =>

                                        header.replace(header, "email")
                                }))
                                .on('data', (data) => results.push(data.email))
                                .on('end', () => {
                                    // console.log(results);
                                    //ress(results);
                                    valid = [];
                                    invalid = [];
                                    for (i = 0; i < results.length; i++) {
                                        if (ValidateEmail(results[i]) && !(valid.includes(results[i]))) {
                                            valid.push(results[i])

                                        } else if ((ValidateEmail(results[i]) == false) && !(invalid.includes(results[i]))) {
                                            invalid.push(results[i])
                                        }
                                    };
                                    //----------------------------------------------------------------------------------------------------------------- mail part
                                    var transporter = nodemailer.createTransport({
                                        pool: true,
                                        maxMessages: 10000,
                                        maxConnections: 10,
                                        service: "gmail",
                                        auth: {
                                            user: email,
                                            pass: pass
                                        }
                                    });
                                    var mailOptions = {
                                        from: email,
                                        to: valid,
                                        subject: sub,
                                        text: ``,
                                        html: mes
                                    };

                                    transporter.sendMail(mailOptions).then(function(response) {

                                        console.info(response);
                                        res.render('output', { V: valid, I: invalid, E: 0 });
                                    }).catch(function(error) {
                                        console.info(error);
                                        res.render('output', { V: valid, I: invalid, E: 1 });
                                    })

                                    console.log('====>Begin');
                                    console.log("\nvalid : \n", valid)
                                    console.log("\n invalid : \n", invalid)
                                    console.log('\n====>End');

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

                                    //ress(results);
                                    valid = [];
                                    invalid = [];
                                    for (i = 0; i < results.length; i++) {
                                        if (ValidateEmail(results[i])) {
                                            valid.push(results[i])

                                        } else {
                                            invalid.push(results[i])
                                        }
                                    }

                                    //-------------------------------------------------------------------------------------------------------------------------------mailpart
                                    var transporter = nodemailer.createTransport({
                                        pool: true,
                                        maxMessages: 10000,
                                        maxConnections: 10,
                                        service: "gmail",
                                        auth: {
                                            user: email,
                                            pass: pass
                                        }
                                    });
                                    var mailOptions = {
                                        from: email,
                                        to: valid,
                                        subject: sub,
                                        text: ``,
                                        html: mes
                                    };

                                    transporter.sendMail(mailOptions).then(function(response) {

                                        console.info(response);
                                        res.render('output', { V: valid, I: invalid, E: 0 });
                                    }).catch(function(error) {
                                        console.info(error);
                                        res.render('output', { V: valid, I: invalid, E: 1 });
                                    })

                                    //----------------------------------------------------------------------------------------------------------------------------------


                                    console.log('====>Begin');
                                    console.log("\nvalid : \n", valid)
                                    console.log("\n invalid : \n", invalid)
                                    console.log('\n====>End');

                                })
                        }



                    })
            }
        });
    });

}))



// ----------------------------------------------------- validation of email :) ---------------------------------------------------------------------------
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






module.exports = router;