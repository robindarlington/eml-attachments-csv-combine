const fs = require('fs');
const {
  MailParser
} = require('mailparser');
const csv = require('fast-csv');
const moment = require('moment');

var attPromise = [];

var path = __dirname + '/messages/';
fs.readdir(path, function(err, items) {

  for (var i = 0; i < items.length; i++) {

    attPromise[i] = new Promise((resolve) => {

      var file = items[i];
      var src = fs.createReadStream(path + file);
      let parser = new MailParser(src);
      var res;
      src.pipe(parser);

      parser
        .on('data', (data) => {
          if (data.type === 'attachment') {

            var csvStream = csv({
              headers: true,
              discardUnmappedColumns: true,
            }).on("data", (data) => {
              resolve(data);
            });

            data.content.pipe(csvStream);

            data.content.on('end', () => {
              data.release();
            });

          }
        });
    });
  }

  Promise.all(attPromise)
    .then((results) => {
      //      console.log(JSON.stringify(results, undefined, 4));

      var now = moment().format();
      const writableStream = fs.createWriteStream(`combined-${now}.csv`);

      writableStream.on('finish', function() {
        console.log('DONE!');
      });

      const csvOptions = {
        headers: true
      };

      const csvStream = csv.format(csvOptions);

      csvStream.pipe(writableStream);

      Object.keys(results).forEach((item) => {
        csvStream.write(results[item]);
      });

      csvStream.end();
    })
    .catch((e) => {
      console.log(e);
    });



});