/******************************************** 
 *  qr-edit.js                              *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/

//TODO - Unnecessary?

// IMPORT REQUIRED RESOURCES
const database = require('../database');
const QR = require('qrcode');
const sanitize = require('sanitize-html');
const serveError = require('./serve-error');
const templates = require('../templates');


function qrEdit(req, res) {

}// close qrEdit


// EXPORT 
module.exports = qrEdit;