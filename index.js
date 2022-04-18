const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const valid=[];
const invalid=[];


// ----------------------------------------------------- validation of email :) ---------------------------------------------------------------------------
function ValidateEmail(inputText) {
  var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (inputText.match(mailformat)) {
    // console.log("matched")
    return true;
  }
  else {
    // console.log("not matched")
    return false;
  }
}

// ValidateEmail('udithbkl100@gmail.com')

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
        }
        ))
        .on('data', (data) => results.push(data.email))
        .on('end', () => {
          // console.log(results);
          res(results);
        });
    }
    else {
     
      fs.createReadStream('data.csv')
      .pipe(csv({

        mapHeaders: ({ header, A }) =>

          header.replace(header, "email")
      })
     )
      .on('data', (data) => results.push(data.email))
      .on('end', () => {
        results.push(headers[0])
        // console.log(results)
        res(results);
   
      })
    }



  })

  async function res(r)
{
    for(i=0;i<r.length;i++)
    {
    if(ValidateEmail(r[i]))
    {
      valid.push(r[i])
      
    }
    else
    {
      invalid.push(r[i])
    }
  }
  
  // console.log("valid :",valid)
  // console.log("\n invalid:",invalid)
}

// Validation ends here --------------------------------------------------------------------------------------------------------------------

// mail part----------------------------------------------------------------------------------------------------------------------------------
const nodemailer = require('nodemailer');
const MailMessage = require('nodemailer/lib/mailer/mail-message');

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "doejohn66779@gmail.com",
        pass: "Vignesh@125"
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
        console.log("\npending"+info.pending)
        console.log("\nrejected"+info.rejected)
        console.log("\naccepted"+info.accepted)
        console.log("Mail sent🫡 \n" + info.response);
        console.log("------->\n");
    }
});