/******************************************** 
 *  app.js                                  *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO - FINISH 

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
var galleryEdit = require('./endpoints/gallery-list');
var galleryList = require('./endpoints/gallery-list');
var galleryUpdate = require('./endpoints/gallery-update');
var qrCreate = require('./endpoints/qr-create');
var qrEdit = require('./endpoints/qr-edit');
var qrUpdate = require('./endpoints/qr-update');
var qrList = require('./endpoints/qr-list');
var serveAdminPage = require('./endpoints/serve-admin-page');
var serveArtifact = require('./endpoints/serve-artifact');
var serveExhibit = require('./endpoints/serve-exhibit');
var serveFavorites = require('./endpoints/serve-favorites');
var serveGallery = require('./endpoints/serve-gallery');
var serveHomepage = require('./endpoints/serve-homepage');
var serveNewArtifact = require('./endpoints/serve-new-artifact');
var serveNewExhibit = require('./endpoints/serve-new-exhibit');
var serveSearch = require('./endpoints/serve-search');
var serveSignIn = require('./endpoints/serve-sign-in');
var serveSignUp = require('./endpoints/serve-sign-up');
var sessionCreate = require('./endpoints/session-create');
var sessionDestroy = require('./endpoints/session-destroy');
var userCreate = require('./endpoints/user-create');
var userEdit = require('./endpoints/user-edit');
var userList = require('./endpoints/user-list');
var userUpdate = require('./endpoints/user-update');

// MIDDLEWARE
var authenticationInternal = require('./middleware/authentication');
var authorizationInternal = require('./middleware/authorization');
var parseData = require('./middleware/parse-data');
var serveError = require('./middleware/serve-error');
var seesionLoad = require('./middleware/session-load');

//const { create } = require('browser-sync');


// EXPRESS APPLICATION
var app = express();

app.set('view engine','ejs');

app.use(morgan('dev'));

app.use(seesionLoad);

//app.get(); 
//app.post();
//app.use(parseBody.json());

//get and post gallery things here?

//serve
app.get('/', serveHomepage);
app.get('/gallery', serveGallery);
app.get('/exhibits', serveExhibit);
app.get('/artifacts', serveArtifact);
app.get('/favorites', serveFavorites);
app.get('/search', serveSearch);

app.get('/login', serveSignIn);
app.get('/new-account', serveSignUp);

app.get('/manager', authorizationInternal, serveAdminPage);


// ADMIN ONLY - ARTIFACT CREATE/EDIT/UPDATE
app.get('/artifacts/list', authorizationInternal, artifactList);
app.get('/artifacts/new-artifact', authorizationInternal, serveNewArtifact);
app.post('/artifacts/new-artifact', authorizationInternal, parseData, artifactCreate);
app.get('/artifacts/:artifactID/edit', authorizationInternal, artifactEdit);
app.post('/artifacts/:artifactID/edit', authorizationInternal, parseData, artifactUpdate);

//  ADMIN ONLY - EXHIBIT CREATE/EDIT/UPDATE
app.get('/exhibits/list', authorizationInternal, exhibitList);
app.get('/exhibits/new-exhibit', authorizationInternal, serveNewExhibit);
app.post('/exhibits/new-exhibit', authorizationInternal, parseData, exhibitCreate);
app.get('/exhibits/:exhibitID/edit', authorizationInternal, exhibitEdit);
app.post('/exhibits/:exhibittID/edit', authorizationInternal, parseData, exhibitUpdate);

//  ADMIN ONLY - GALLERY EDIT/UPDATE
app.get('/gallery/list', authorizationInternal, galleryList);
app.get('/gallery/:exhibitID/edit', authorizationInternal, galleryEdit);
app.post('/gallery/:exhibitID/edit', authorizationInternal, parseData, galleryUpdate);

// ADMIN ONLY - QR CODE  TODO - FIX QR CODE STUFF
//app.get('/qr-codes', authorizationInternal, qrCodeList);
app.get('/qr-codes/new-qr-code', authorizationInternal, qrCreate);
//app.get('/qr-codes/:artifactID', authorizationInternal, artifactEdit);
//app.post('/qr-codes/:artifactID', authorizationInternal, parseBody, artifactUpdate);

// ADMIN ONLY - USER EDIT/UPDATE
app.get('/users/list', authorizationInternal, userList);
app.get('/users/:userID', authorizationInternal, userEdit);
app.post('/users/:userID', authorizationInternal, parseData, userUpdate);

// ADMIN ONLY - MANAGER/ADMIN PAGE



// ANY USER - USER CREATE & SESSION CREATE
app.post("/new-account", parseData, userCreate);
app.post("/login", parseData, sessionCreate);


// LOGOUT DESTROYS SESSION
app.get("/logout", sessionDestroy);

app.use(express.static('static'));


// EXPORT
module.exports = app;