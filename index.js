const csv = require('csv-parser')
const router = require('express').Router();


const fs = require('fs')
const results = [];
const valid=[];
const invalid=[];

router.get('/upload',(req,res)=>
{
	res.send("siccess")
})

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


// express

module.exports = router;