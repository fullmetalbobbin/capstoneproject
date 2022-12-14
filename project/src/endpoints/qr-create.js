/******************************************** 
 *  qr-create.js                            *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/

//TODO - should this be included in artifact-create.js and exhibit.js instead?


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const QR = require('qrcode');
const sanitize = require('sanitize-html');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


function qrCreate(req, res) { 

}// close qrCreate


// EXPORT 
module.exports = qrCreate;