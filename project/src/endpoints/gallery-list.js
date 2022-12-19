/******************************************** 
 *  gallery-list.js                         *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO: Double-check needed vars


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function galleryList
 * 
 * Retrieves list of all exhibits from the database for export
 * Only to be used by authorized admin role
 * Establishes templates to be used then serves the HTML
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function galleryList(req, res) {

    var allExhibits = database.prepare("SELECT * FROM Exhibits").all();

    //var id = exhibits.ExhibitID;
    var name = allExhibits.ExhibitName;
    var gallery = allExhibits.IsDisplayedInGallery;

    var errorMessage = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: req.session.user.handle,
        role: req.session.user.role
    });

    var html = templates['layout-manage-gallery.html']({
        error: errorMessage,
        navi: navigationSide,
        exhibits: allExhibits,
        name: name,
        gallery: gallery
    });

    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);

}// close exhibitList


// EXPORT
module.exports = galleryList;