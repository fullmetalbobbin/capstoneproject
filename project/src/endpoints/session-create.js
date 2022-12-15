/******************************************** 
 *  session-create.js                       *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const encryption = require('bcrypt');
const sanitize = require('sanitize-html');
const sessions = require('../sessions');
const templates = require('../templates');
const serveError = require('../middleware/serve-error');


/** @function sessionCreate
 * 
 * Endpoint to create a session
 *  - Retreives user handle input and user password input from request object
 *  - Checks for missing input from request object: empty field(s)
 *  - Sanitizes user input
 *  - Checks cleaned handle against Users table in database
 *      - If the handle is not found in the table login is denied (calls helper function)
 *  - Checks cleaned password against encrypted password (for specified user) from Users table
 *      - If an error occurs the specified error is returned
 *      - If a successful match is made login is accepted (calls helper function)
 *      - Otherwise login is denied (calls helper function)
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function sessionCreate(req, res) {

    var handle = req.body.handle;
    var password = req.body.password;

    if (!handle || !password) { 
        return (res, req, "Please fill each field."); 
    }//close if

    var cleanHandle = sanitize(handle);
    var cleanPassword = sanitize(password);

    var user = database.prepare("SELECT * FROM Users WHERE UserHandle = ?").get(cleanHandle);

    if (!user) {
        return loginDenied(req, res, "Email/Password not found.");
    }// close if
    
    encryption.compare(cleanPassword, user.EncryptedPassword, (error, match) => {
        if (error) { 
            return serveError(req, res, 500, error);
        }// close if
        if (match) {
            loginAccepted(req, res, user);
        }// close if
        else { 
            return loginDenied(req, res, "Email/Password not found.");
        }// close else
    });

}//close sessionCreate


/** @function loginDenied
 * 
 * Helper function for a login denial 
 *  - Assigns an error message if one is specified
 *  - Supplies the appropriate html layout (redirects to login)
 *  - Serves html
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @param {*} error : error message to display
 **/
function loginDenied(req, res, error) {

    if (!error) { 
        error = "An error has occured while processing the request.";
    }

    var handle = "Guest";
    var role = 0;

    var error = "";

    var navigationSide = templates['navigation-side.html']({
        handle: handle,
        role: role
    });

    var html = templates['layout-sign-in.html']({
        navi: navigationSide,
        error: error
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}//close loginDenied


/** @function loginAccepted
 * 
 * Helper function for login acceptance (success!)
 *  - Creates a new session for the user with a nanoID (unique string identification generator)
 *  - Sets headers with session information
 * 
 * @param {*} req : request object
 * @param {*} res : request response
 * @param {*} user : specified user
 **/
function loginAccepted(req, res, user) {

    var sessionuuid = sessions.create(user);
/*
    if(req.session.user) {
        var handle = req.session.user.UserHandle; 
        var role = req.session.user.UserRole;      
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

    var html = templates['layout-view-gallery.html']({
        navi: navigationSide,
        error: error
    }); */
   
    res.setHeader("Set-Cookie", `SID=${sessionuuid}; Secure; HTTPOnly`);
    res.statusCode = 302;
    res.setHeader("Location", "/gallery");
    res.end();

}//close loginAccepted


// EXPORT
module.exports = sessionCreate;