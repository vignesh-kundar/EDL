const csv = require('csv-parser')
const fs = require('fs')
const results = [];

function ValidateEmail(inputText) {
  var mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (inputText.match(mailformat)) {
    console.log("matched")
    return true;
  }
  else {
    console.log("not matched")
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
          console.log(results);

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
        console.log(results)
        console.log(results[1401]);
      })
    }


  })

