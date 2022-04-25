const router = require('express').Router();
var formidable = require('formidable');
var fs = require('fs');
const csv = require('csv-parser');

//arrays
const results = [];
let valid = [];
let invalid = [];



const time = new Date();

//fileupload route

router.post('/', (function(req, res) {

    valid = [];
    invalid = [];



    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = '\data.csv' //specify new address
        const mv = require('mv');
        mv(oldpath, newpath, function(err) {
            if (err) {
                console.log('> FileServer.jsx | route: "/files/upload" | err : ', err);
                throw err;

            } else {

                //res.write(`<b style="font-size:2rem;text-align:center;font-family:poppins;color: royalblue;margin: 40px;">File uploaded and moved!</b>`);
                // ValidateEmail('udithbkl100@gmail.com');

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
                                        if (ValidateEmail(results[i])) {
                                            valid.push(results[i])

                                        } else {
                                            invalid.push(results[i])
                                        }
                                    }

                                    res.render('output', { V: valid, I: invalid });

                                    //const info = sendmail(valid);


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

                                    res.render('output', { valid: valid, invalid: invalid });
                                    // const info = sendmail(valid);


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


// async function ress(r) {

//     for (i = 0; i < r.length; i++) {
//         if (ValidateEmail(r[i])) {
//             valid.push(r[i])

//         } else {
//             invalid.push(r[i])
//         }
//     }
//      sendmail(valid);

//     console.log("Assume mail sent : ) ");
//     console.log('====>Begin');
//     console.log("\nvalid : \n", valid)
//     console.log("\n invalid : \n", invalid)
//     console.log('\n====>End');
// }


//   end here



// NODE MAILER 
// mail part----------------------------------------------------------------------------------------------------------------------------------
function sendmail(valid) {

    const nodemailer = require('nodemailer');
    //const MailMessage = require('nodemailer/lib/mailer/mail-message');

    var transporter = nodemailer.createTransport({
        pool: true,
        maxMessages: 10000,
        maxConnections: 10,
        service: "gmail",
        auth: {
            // user: "doejohn66779@gmail.com",
            // pass: "Vignesh@125"
            // user: "cheemsuper3@gmail.com",
            // pass: "gulugulu#123"
            user: "vignesh0405kundar@gmail.com",
            pass: "Vignesh@125"
        }
    });
    var mailOptions = {
        from: 'Bot',
        to: valid,
        subject: 'Important Notice',
        text: `Testing one 2 three`,

        html: `<img src="https://media.giphy.com/media/OjI3iowbHLmoY7n98e/giphy.gif"></img>
        <h2 style="font-size:2rem;text-align:center;font-family:poppins;color: royalblue;margin: 40px;">Message sent at : ${time} </h2>`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        } else {


            console.log("\n\n=NODEMAILER=begin------->");
            console.log("\npending" + info.pending)
            console.log("\nrejected" + info.rejected)
            console.log("\naccepted" + info.accepted)
            console.log("Mail sent🫡 \n" + info.response);
            console.log("=NODEMAILER=end------->\n");

            return info;

        }
    });
}



module.exports = router;