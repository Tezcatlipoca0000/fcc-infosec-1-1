const express = require('express');
const app = express();

// Lesson 1: require the framework
const helmet = require('helmet');

// No lesson, my idea from reading the official docs. neccesary though isn't it?
// explained in lesson 11: is a shorthand for the other middleware
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

// Lesson 8: Disable DNS Prefetching with helmet.dnsPrefetchControl()
// sets the X-DNS-Prefetch-Control header to
app.use(helmet.dnsPrefetchControl({allow: false}));

// Lesson 9: Disable Client-Side Caching with helmet.noCache()
// **NOTICE** Since helmet v4.0.0 2020-08-02 helmet.noCache() has been removed --> 
// https://github.com/helmetjs/helmet/blob/main/CHANGELOG.md#400---2020-08-02
// It is adviced to use the nocache package on npm. -- > 
// https://github.com/helmetjs/nocache
// LEGACY -->
// app.use(helmet.noCache());
// NEW --> (Requires instalation: 'npm install nocache')
const nocache = require('nocache');
app.use(nocache());

// Lesson 10: Set a Content Security Policy with helmet.contentSecurityPolicy()
// sets the Content-Security-Policy header
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'trusted-cdn.com']
  }
}));













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
