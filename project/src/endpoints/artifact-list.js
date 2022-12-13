/******************************************** 
 *  artifact-list.js                       *
 *                                           *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO: Double-check needed vars


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function artifactList
 * 
 * Retrieves list of all artifacts from the database for export
 * Only to be used by authorized admin role
 * Establishes templates to be used then serves the HTML
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function artifactList(req, res) {

    var allArtifacts = database.prepare("SELECT * FROM Artifacts").all();

    var id = allArtifacts.ArtifactID;
    var name = allArtifacts.ArtifactName;
    var describe = allArtifacts.ArtifactDescription;
    var pathQR = allArtifacts.PathToQRAsset;
    var pathPhoto = allArtifacts.PathToPhotoAsset;
    var display = allArtifacts.IsOnPhysicalDisplay;

    var errorMessage = "";

    var navigationSide = templates['navigation-side.html']({
        userAdmin: req.session.UserID,
        roleAdmin: req.session.UserRole,
        handleAdmin: req.session.UserHandle
    });

    var html = templates['layout-manage-all-artifacts.html']({
        error: errorMessage,
        navi: navigationSide,
        artifacts: allArtifacts
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close artifactList


// EXPORT
module.exports = artifactList;