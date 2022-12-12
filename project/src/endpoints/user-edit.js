/******************************************** 
 *  user-edit.js                            *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function userEdit
 * 
 * Retrieves the information for a particular user from the Users table in the database
 * Serves the html containing data for editing
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function userEdit(req, res) { 

    const id = parseInt(req.params.UserID, 10);
    var userToEdit = database.prepare("SELECT * FROM Users WHERE UserID = ?").get(id);
    var errorMessage = ";"

    var navigationSide = templates['navigation-side.html']({
        userAdmin: req.session.UserID,
        roleAdmin: req.session.UserRole,
        handleAdmin: req.session.UserHandle
    });

    var html = templates['layout-manage-single-user.html']({
        error: errorMessage,
        navi: navigationSide,
        id: userToEdit.UserID,
        handle: userToEdit.UserHandle,
        email: userToEdit.UserEmail,
        firstName: userToEdit.UserFirstName,
        lastName: userToEdit.UserLastName,
        role: userToEdit.UserRole
    });

    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);

}// close userEdit


// EXPORT
modules.exports = userEdit;