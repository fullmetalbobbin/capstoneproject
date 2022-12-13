/******************************************** 
 *  serve-artifact.js                       *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
//TODO Double check


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const templates = require('../templates');
const serveError = require('../middleware/serve-error');


/** @function serveArtifact
 * 
 * Serves the template layout for viewing an artifact with the necessary information
 *  - Checks for registered user to supply handle or supplies a blank
 *  - Checks role for admin authorization for redundancy
 *  - Supplies the navigation sidebar with the user information (user, handle, and role)
 *  - Supplies the main layout with navigation component and error
 *  - Serves the html
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function serveArtifact (req, res) {

    var handle = req.session.user;
    if (handle !== undefined) {
        handle = req.session.user.UserHandle;
    }// close if
    else {
        handle = "";
    }// close else

    var role = req.session.user;
    if (role == 1) {
        role = 1;
    }// close if
    else {
        role = 0;
    }// close else


    var error = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: handle,
        role: role
    });

    var html = templates['layout-view-artifact.html']({
        navi: navigationSide,
        error: error
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close serveArtifact


// EXPORT
module.exports = serveArtifact;