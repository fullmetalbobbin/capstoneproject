/******************************************** 
 *  exhibit-create.js                       *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO - Keywords
// TODO - QR?


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const sanitize = require('sanitize-html');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function exhibitCreate
 * 
 * Creates a new exhibit object and adds it to the database in the Exhibits table
 *  - Sanitizes and assigns provided content
 *  - Error if exhibit name field is left blank
 *  - If other fields are left blank general default statement (or value) is assigned 
 *  - Checks if the exhibit name does not already occur in the Exhibit table
 *  - Inserts new exhibit data or serves error if insert does not occur
 *  - Writes a header for the new exhibit
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @returns 
 **/
function exhibitCreate(req, res) {

    var name = sanitize(req.body.name);
    var describe = sanitize(req.body.describe);
    var pathQR = sanitize(req.body.pathQR);
    var pathPhoto = sanitize(req.body.pathPhoto);
    var current = sanitize(req.body.current);
    var travel = sanitize(req.body.travel);

    if (!name) return serveError(req, res, 422, "Exhibits must be given a name.");
    if (!describe) describe = "No description provided.";
    if (!pathQR) pathQR = "No path to QR code provided.";
    if (!pathPhoto) pathPhoto = "No path to exhibit photo provided.";
    if (!current) current = 0;
    if (!travel) travel = 0;

    var nameTaken = database.prepare("SELECT * FROM Exhibits WHERE ExhibitName = ?").get(name);
    if (nameTaken) return serveError(req, res, `Exhibits must be given a unique name. An exhibit called "${name}" already exists.`);

    var exhibitData = database.prepare("INSERT INTO Exhibits (ExhibitName, ExhibitDescription, PathToQRAsset, PathToPhotoAsset, IsCurrentExhibit, IsTravelingExhibit) VALUES (?, ?, ?, ?, ?, ?)").run(name, describe, pathQR, pathPhoto, current, travel);

    if (ExhibitData.changes !== 1) return serveError(req, res, 500, "Unable to update database");

    var newExhibit = database.prepare("SELECT * FROM Exhibits WHERE ExhibitName = ?").get(name);

    res.writeHead(302, { "Location": `/exhibits/${newExhibit.ExhibitName}` }).end(); //TODO - check ExhibitName vs id

}// close exhibitCreate


// EXPORT
module.exports = exhibitCreate;