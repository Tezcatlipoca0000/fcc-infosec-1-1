const express = require('express');
const app = express();
// Lesson 1: require the framework
const helmet = require('helmet');

// No lesson, my idea from reading the official docs. neccesary though isn't it?
app.use(helmet());
// Lesson 2: hide default express behaviour: "X-Powered-By: Express" header
app.use(helmet.hidePoweredBy());
// There's also an express native way of doing the same 
// app.disable('x-powered-by');










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
