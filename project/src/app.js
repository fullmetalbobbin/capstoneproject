/******************************************** 
 *  app.js                                  *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
//const cors = require('cors');
const ejs = require('ejs');
const express = require('express');
const morgan = require('morgan');
const parseBody = require('body-parser');

// ENDPOINTS
var galleryCreate = require('./endpoints/gallery-create');
var galleryEdit = require('./endpoints/gallery-edit');
var galleryList = require('./endpoints/gallery-list');
var galleryUpdate = require('./endpoints/gallery-update');
var qrCreate = require('./endpoints/qr-create');
var qrEdit = require('./endpoints/qr-edit');
var qrUpdate = require('./endpoints/qr-update');
var serveAdminPage = require('./endpoints/serve-admin-page');
var serveGallery = require('./endpoints/serve-gallery');
var serveHomepage = require('./endpoints/serve-homepage');
var serveSignIn = require('./endpoints/serve-sign-in');
var serveSignUp = require('./endpoints/serve-sign-up');
var sessionCreate = require('./endpoints/session-create');
var sessionDestroy = require('./endpoints/session-destroy');
var userCreate = require('./endpoints/user-create');
var userEdit = require(',/endpoints/user-edit');
var userList = require('./endpoints/user-list');
var userUpdate = require('./endpoints/user-udate');

// MIDDLEWARE
var authenticationInternal = require('./middleware/authentication');
var authorizationInternal = require('./middleware/authorization');
var parseData = require('./middleware/parse-data');
var seesionLoad = require('./middleware/session-load');
const { create } = require('browser-sync');


// EXPRESS APPLICATION
var app = express();

app.use(morgan('dev'));
app.use(parseBody.json());

//app.use(cors());

////var origin = { origin: "http://localhost:5000" };
//app.use(cors(origin));

//app.get('/', serveHomepage);



app.listen(process.env.PORT || 8082);


app.use(express.static('static'));


// EXPORT
module.exports = app;