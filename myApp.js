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

// Lesson 3: Defend from Clickjacking | avoid the site to be used in an iframe
app.use(helmet.frameguard({action: 'deny'}));

// Lesson 4: XSS Filter. 
// helmet.xssFilter disables browsers' buggy cross-site scripting filter 
app.use(helmet.xssFilter());

// Lesson 5: Avoid Inferring the Response MIME Type with helmet.noSniff()
// sets the X-Content-Type-Options header to nosniff
app.use(helmet.noSniff());

// Lesson 6: Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()
// sets the X-Download-Options header
app.use(helmet.ieNoOpen());

// Lesson 7: Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()
// sets the Strict-Transport-Security header
app.use(helmet.hsts({maxAge: (90*24*60*60), force: true}));





























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
