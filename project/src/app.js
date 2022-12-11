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
var artifactCreate = require('./endpoints/artifact-create');
var artifactEdit = require('./endpoints/artifact-edit');
var artifactList = require('./endpoints/artifact-list');
var artifactUpdate = require('./endpoints/artifact-update');
var exhibitCreate = require('./endpoints/exhibit-create');
var exhibitEdit = require('./endpoints/exhibit-edit');
var exhibitList = require('./endpoints/exhibit-list');
var exhibitUpdate = require('./endpoints/exhibit-update');
var qrCreate = require('./endpoints/qr-create');
var qrEdit = require('./endpoints/qr-edit');
var qrUpdate = require('./endpoints/qr-update');
var qrList = require('./endpoints/qr-list');
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

//const { create } = require('browser-sync');


// EXPRESS APPLICATION
var app = express();

app.use(morgan('dev'));

app.use(seesionLoad);

app.get('/', serveHomepage);


//app.get(); 
//app.post();
//app.use(parseBody.json());

//get and post gallery things here?


app.get('/login', serveSignIn);
app.get('/new-account', serveSignUp);

//serve

// ADMIN ONLY - ARTIFACT CREATE/EDIT/UPDATE
app.get('/artifacts', authorizationInternal, artifactList);
app.get('/artifacts/new-artifact', authorizationInternal, artifactCreate)
app.get('/artifacts/:artifactID', authorizationInternal, artifactEdit);
app.post('/artifacts/:artifactID', authorizationInternal, parseBody, artifactUpdate);

//  ADMIN ONLY - EXHIBIT CREATE/EDIT/UPDATE
app.get('/exhibits', authorizationInternal, exhibitList);
app.get('/exhibits/new-exhibit', authorizationInternal, exhibitCreate)
app.get('/exhibits/:exhibitID', authorizationInternal, exhibitEdit);
app.post('/exhibits/:exhibittID', authorizationInternal, parseBody, exhibitUpdate);

// ADMIN ONLY - QR CODE  TODO - FIX QR CODE STUFF
//app.get('/qr-codes', authorizationInternal, qrCodeList);
app.get('/qr-codes/new-qr-code', authorizationInternal, qrCodeCreate)
//app.get('/qr-codes/:artifactID', authorizationInternal, artifactEdit);
//app.post('/qr-codes/:artifactID', authorizationInternal, parseBody, artifactUpdate);

// ADMIN ONLY - USER EDIT/UPDATE
app.get('/users', authorizationInternal, userList);
app.get('/users/:userID', authorizationInternal, userEdit);
app.post('/users/:userID', authorizationInternal, parseBody, userUpdate);


// ANY USER - USER CREATE & SESSION CREATE
app.post('/new-user', parseBody, userCreate);
app.post('/login', parseBody, sessionCreate); //TODO parseBody vs parseData


// LOGOUT DESTROYS SESSION
app.get('/logout', sessionDestroy);

app.use(express.static('static'));


// EXPORT
module.exports = app;