/******************************************** 
 *  serve-admin-page.js                     *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
// TODO: Double check

// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const templates = require('../templates');
const serveError = require('../middleware/serve-error');


/** @function serveAdminPage
 * 
 * Serves the template layout for the admin page (aka manager) with the necessary information
 *  - Checks for registered user to supply handle or supplies a blank
 *  - Checks role for admin authorization for redundancy
 *  - Supplies the navigation sidebar with the user information (user, handle, and role)
 *  - Checks role
 *      - Provides manager layout for admin role (1)
 *      - Redirects non-admin roles to the homepage
 *  - Supplies the main layout with navigation component and error
 *  - Serves the html
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function serveAdminPage(req, res) {

    if(req.session.user) {
        var handle = req.session.user.handle; 
        if(req.session.user.role == 1){
            var role = 1;       
        }// close if
        else {
            var role = 0;
        }// close else
    }// close if
    else {
        var handle = "Guest"
        var role = 0;
    }// close else

    var error = "";

    console.log("Should give req.session.user from serve-admin-page.js"+req.session.user);

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: handle,
        role: role
    });
    console.log("Should give handle from serve-admin.js"+handle);


    if (role == 1) {
        var html = templates['layout-manager.html']({
            navi: navigationSide,
            error: error
        });
    }// close if
    else {
        var html = templates['layout-homepage.html']({
            navi: navigationSide,
            error: error
        });
    }// close else

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close serveAdminPage


// EXPORT
module.exports = serveAdminPage;