//change exhibit's new column for IsDisplayedInGallery - default 0 for false - 1 for true
// use radio or check box?

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


/** @function galleryEdit
 * 
 * Retrieves all exhibits from the Exhibits table in the database
 * Serves the html containing data for editing
 * To be used for admin selection of which exhibits to include in the gallery
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function galleryEdit(req, res) {

    const exhibitID = parseInt(req.params.ExhibitID, 10);
    var galleryDisplayExhibit = database.prepare("SELECT * FROM Exhibits").all();

    var errorMessage = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: req.session.user.handle,
        role: req.session.user.role
    });

    var html = templates['layout-manage-gallery.html']({
        error: errorMessage,
        navi: navigationSide,
        id: galleryDisplayExhibit.ExhibitID,
        name: galleryDisplayExhibit.ExhibitName,
        //describe: exhibitToEdit.ExhibitDescription,
        //pathQR: exhibitToEdit.PathToQRAsset,
        //pathPhoto: exhibitToEdit.PathToPhotoAsset,
        //current: exhibitToEdit.IsCurrentExhibit,
        //travel: exhibitToEdit.IsTravelingExhibit
        display: galleryDisplayExhibit.IsDisplayedInGallery
    });

    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);

}// close galleryEdit


// EXPORT
module.exports = galleryEdit;