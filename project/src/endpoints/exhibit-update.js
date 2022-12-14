/******************************************** 
 *  exhibit-update.js                       *
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


/** @function exhibitUpdate
 * 
 * Updates database information in the Exhibits table
 *  - Sanitizes input
 *  - Updates changes to table entries or gives error
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function exhibitUpdate(req, res) {

    const currentExhibitID = parseInt(req.params.exhibitID, 10);  

    var currentExhibit = database.prepare("SELECT * FROM Exhibits WHERE ExhibitID = ?").get(currentExhibitID);

    var name = sanitize(req.body.name);
    var describe = sanitize(req.body.describe);
    var pathQR = sanitize(req.body.pathQR);
    var pathPhoto = sanitize(req.body.pathPhoto);
    var current = sanitize(req.body.current);
    var travel = sanitize(req.body.travel);
    var gallery = sanitize(req.body.gallery);

    if (name == '') name = currentExhibit.name;
    if (describe == '') describe = currentExhibit.describe;
    if (pathQR == '') pathQR = currentExhibit.pathQR;
    if (pathPhoto == '') pathPhoto = currentExhibit.pathPhoto;
    if (current == 1) {
        current = 1;
    }// close if
    else {
        current = 0;
    }// close else
    if (travel == 1) {
        travel = 1;
    }// close if
    else {
        travel = 0;
    }// close else
    if (gallery == 1) {
        gallery = 1;
    }// close if
    else {
        gallery = 0;
    }// close else

    //Will need to refactor to UPDATE gallery display column
    
    var update = database.prepare("UPDATE Exhibits SET ExhibitName = ?, ExhibitDescription = ?, PathToQRAsset = ?, PathToPhotoAsset = ?, IsCurrentExhibit = ?, IsTravelingExhibit = ?, IsDisplayedInGallery = ? WHERE ExhibitID = ?").run(name, describe, pathQR, pathPhoto, current, travel, gallery, currentExhibitID);

    if (update.changes !== 1) return serveError(req, res, 500, "Unable to update database");

    res.writeHead(302, { "Location": `/exhibit` }).end();

}// close exhibitUpdate


// EXPORT
module.exports = exhibitUpdate;