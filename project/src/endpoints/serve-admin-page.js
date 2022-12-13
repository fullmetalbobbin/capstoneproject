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