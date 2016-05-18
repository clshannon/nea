var express = require('express'),
    api     = require('./api'),
    app     = express();

app
  // Statically serve all files in the public folder
  .use(express.static('./public'))

  // prefixes routes in api object with '/api'
  .use('/api', api)

  // Any unmatched route gets the response of main.html
  .get('*', function(req, res) {
    res.sendFile(__dirname + '/public/main.html');
  })

  // Have server listen on port 3000
  .listen(3000);
