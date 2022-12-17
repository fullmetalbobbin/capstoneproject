/******************************************** 
 *  serve-new-exhibit.js                    *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication.js');
const authorization = require('../middleware/authorization');
const database = require('../database');
const templates = require('../templates');
const serveError = require('../middleware/serve-error');


/** @function serveNewExhibit
 * 
 * Serves the template layout for create exhibit page with the necessary information
 *  - Supplies the navigation sidebar with the user information
 *  - Check for authorization
 *      - Admin role == 1 is redirected to create a new exhibit
 *      - Non-admin role == 0 is redirected to the homepage
 *  - Supplies the main layout with navigation component and error
 *  - Serves the html
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function serveNewExhibit(req, res) {

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
        handle: handle,
        role: role
    });
    console.log(handle);

    if(role == 1) {
        var html = templates['layout-create-exhibit.html']({
            navi: navigationSide,
            error: error
        });
    }// close if
    else {
        error = "Whoops! Staff only!";
        var html = templates['layout-homepage.html']({
            navi: navigationSide,
            error: error
        });
    }// close else


    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close serveNewExhibit


// EXPORT
module.exports = serveNewExhibit;