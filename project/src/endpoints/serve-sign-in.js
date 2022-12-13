/******************************************** 
 *  serve-sign-in.js                        *
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


/** @function serveSignIn
 * 
 * Serves the template layout for the sign-in page with the necessary information
 *  - Supplies the navigation sidebar with the user information
 *  - Supplies the main layout with navigation component and error
 *  - Serves the html
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function serveSignIn(req, res) {

    var error = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user
    });

    var html = templates['layout-sign-in.html']({
        navi: navigationSide,
        error: error
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close serveSignIn


// EXPORT
module.exports = serveSignIn;