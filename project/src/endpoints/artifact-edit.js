/******************************************** 
 *  artifact-edit.js                       *
 *                                           *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO - Keywords


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function artifactEdit
 * 
 * Retrieves the information for a particular artifact from the Artifacts table in the database
 * Serves the html containing data for editing
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function artifactEdit(req, res) {

    const artifactID = parseInt(req.params.artifactID, 10);
    var artifactToEdit = database.prepare("SELECT * FROM Artifacts WHERE ArtifactID = ?").get(artifactID);
    
    var errorMessage = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: req.session.user.handle,
        role: req.session.user.role
    });

    var html = templates['layout-manage-single-artifact.html']({
        error: errorMessage,
        navi: navigationSide,
        artifact: artifactToEdit,
        id: artifactToEdit.ArtifactID, //id
        name: artifactToEdit.ArtifactName, //name
        describe: artifactToEdit.ArtifactDescription, //describe
        pathQR: artifactToEdit.PathToQRAsset, //pathQR
        pathPhoto: artifactToEdit.PathToPhotoAsset, //pathPhoto
        display: artifactToEdit.IsOnPhysicalDisplay //display
    });
      
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);

}// close artifactEdit


// EXPORT
module.exports = artifactEdit;