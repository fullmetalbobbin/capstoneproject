/******************************************** 
 *  exhibit-edit.js                         *
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
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function exhibitEdit
 * 
 * Retrieves the information for a particular exhibit from the Exhibits table in the database
 * Serves the html containing data for editing
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function exhibitEdit(req, res) {

    const exhibitID = parseInt(req.params.ExhibitID, 10);
    var exhibitToEdit = database.prepare("SELECT * FROM Exhibits WHERE ExhibitID = ?").get(exhibitID);

    console.log("Shoould give parsed exhibitID from exhibit-edit.js"+exhibitID); //"NaN"

    var errorMessage = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: req.session.user.handle,
        role: req.session.user.role
    });

    var html = templates['layout-manage-single-exhibit.html']({
        error: errorMessage,
        navi: navigationSide,
        exhibit: exhibitToEdit,
        id: exhibitToEdit.ExhibitID,
        name: exhibitToEdit.ExhibitName,
        describe: exhibitToEdit.ExhibitDescription,
        pathQR: exhibitToEdit.PathToQRAsset,
        pathPhoto: exhibitToEdit.PathToPhotoAsset,
        current: exhibitToEdit.IsCurrentExhibit,
        travel: exhibitToEdit.IsTravelingExhibit,
        gallery: exhibitToEdit.IsDisplayedInGallery
    });

    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);

}// close exhibitEdit


// EXPORT
module.exports = exhibitEdit;