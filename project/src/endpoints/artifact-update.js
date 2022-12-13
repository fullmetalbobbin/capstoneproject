/******************************************** 
 *  artifact-update.js                      *
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
const serveError = require('./serve-error');
const templates = require('../templates');


/** @function artifactUpdate
 * 
 * Updates database information in the Artifacts table
 *  - Parses and prepares artifact information
 *  - Sanitizes input
 *  - Updates changes to table entries or gives error
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function artifactUpdate(req, res) {

    const currentArtifactID = parseInt(req.params.ArtifactID, 10);

    var currentArtifact = database.prepare("SELECT * FROM Artifacts WHERE ArtifactID = ?").get(currentArtifactID);

    var name = sanitize(req.body.name);
    var describe = sanitize(req.body.describe);
    var pathQR = sanitize(req.body.pathQR);
    var pathPhoto = sanitize(req.body.pathPhoto);
    var display = sanitize(req.body.display);

    if (name == '') name = currentArtifact.name;
    if (describe == '') describe = currentArtifact.describe;
    if (pathQR == '') pathQR = currentArtifact.pathQR;
    if (pathPhoto == '') pathPhoto = currentArtifact.pathPhoto;
    if (display == 1) {
        display = 1;
    }// close if
    else {
        display = 0;
    }// close else

    var update = database.prepare("UPDATE Artifacts SET ArtifactName = ?, ArtifactDescription = ?, PathToQRAsset = ?, PathToPhotoAsset = ?, IsOnPhysicalDisplay = ? WHERE ArtifactID = ?").run(name, describe, pathQR, pathPhoto, display, currentArtifactID);

    if (update.changes !== 1) return serveError(req, res, 500, "Unable to update database");
        
    res.writeHead(302, { "Location": `artifacts` }).end();

}// close artifactUpdate


// EXPORT
module.exports = artifactUpdate;