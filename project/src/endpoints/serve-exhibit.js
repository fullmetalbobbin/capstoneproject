/******************************************** 
 *  serve-exhibit.js                        *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const templates = require('../templates');
const serveError = require('../middleware/serve-error');


/** @function serveExhibit
 * 
 * Serves the template layout for viewing an exhibit with the necessary information
 *  - Checks for registered user to supply handle or supplies a blank
 *  - Checks role for admin authorization for redundancy
 *  - Supplies the navigation sidebar with the user information (user, handle, and role)
 *  - Supplies the main layout with navigation component and error
 *  - Serves the html
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function serveExhibit(req, res) {

    var exhibitArtifacts = database.prepare("SELECT * FROM Users").all();
    //refactor for join using linking table and USE ARTIFACTS

    if(req.session.user) {
        var handle = req.session.user.handle; 
        var role = req.session.user.role;      
    }// close
    else {
        var handle = "Guest"
        var role = 0;
    }// close else

    var error = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: handle,
        role: role
    });

    var html = templates['layout-view-exhibit.html']({
        navi: navigationSide,
        error: error,
        exhibitArtifacts: exhibitArtifacts
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close serveExhibit


// EXPORT
module.exports = serveExhibit;