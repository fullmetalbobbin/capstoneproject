/******************************************** 
 *  gallery-update.js                       *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO:Keywords


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const sanitize = require('sanitize-html');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function galleryUpdate
 * 
 * Updates database information in the Exhibits table
 * Updates which exhibits are to be shown in the main digital gallery
 *  - Sanitizes input
 *  - Updates changes to table entries or gives error
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function galleryUpdate(req, res) {

    const currentExhibitID = parseInt(req.params.ExhibitID, 10);

    var currentExhibit = database.prepare("SELECT * FROM Exhibits").all();

    var gallery = sanitize(req.body.gallery);

    if (gallery == 1) {
        gallery = 1;
    }// close if
    else {
        gallery = 0;
    }// close else

    
    var update = database.prepare("UPDATE Exhibits SET IsDisplayedInGallery = ?  WHERE ExhibitID = ?").run(gallery, currentExhibitID);

    if (update.changes !== 1) return serveError(req, res, 500, "Unable to update database");

    res.writeHead(302, { "Location": `gallery` }).end();

}// close galleryUpdate


// EXPORT
module.exports = galleryUpdate;