/******************************************** 
 *  artifact-create.js                      *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
//TODO - Keywords


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const sanitize = require('sanitize-html');
const serveError = require('./serve-error');
const templates = require('../templates');


/** @function artifactCreate
 * 
 * Creates a new artifact object and adds it to the database in the Artifacts table
 *  - Sanitizes and assigns provided content
 *  - Error if artifact name field is left blank
 *  - If other fields are left blank general default statement (or value) is assigned 
 *  - Checks if the artifact name does not already occur in the Artifact table
 *  - Inserts new artifact data or serves error if insert does not occur
 *  - Writes a header for the new artifact
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @returns 
 **/
function artifactCreate(req, res) {

    var name = sanitize(req.body.name);
    var describe = sanitize(req.body.describe);
    var pathQR = sanitize(req.body.pathQR);
    var pathPhoto = sanitize(req.body.pathPhoto);
    var display = sanitize(req.body.display);

    if (!name) return serveError(req, res, 422, "Artifacts must be given a name.");
    if (!describe) describe = "No description provided.";
    if (!pathQR) pathQR = "No path to QR code provided.";
    if (!pathPhoto) pathPhoto = "No path to artifact photo provided.";
    if (!display) display = 0;
        
    var nameTaken = database.prepare("SELECT * FROM Artifacts WHERE ArtifactName = ?").get(name);
    if (nameTaken) return serveError(req, res, `Artifacts must be given a unique name. An artifact called "${name}" already exists.`);

    var artifactData = database.prepare("INSERT INTO Artifacts (ArtifactName, ArtifactDescription, PathToQRAsset, PathToPhotoAsset, IsOnPhysicalDisplay) VALUES (?, ?, ?, ?, ?)").run(name, describe, pathQR, pathPhoto, display);

    if (artifactData.changes !== 1) return serveError(req, res, 500, "Unable to update database");

    var newArtifact = database.prepare("SELECT * FROM Artifacts WHERE ArtifactName = ?").get(name);

    res.writeHead(302, { "Location": `/artifacts/${newArtifact.ArtifactName}` }).end(); //TODO - check ArtifactName vs id

}// close artifactCreate


// EXPORT
module.exports = artifactCreate;