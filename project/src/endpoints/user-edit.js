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

    const userID = parseInt(req.params.userID, 10);
    var userToEdit = database.prepare("SELECT * FROM Users WHERE UserID = ?").get(userID);

    var id = userToEdit.UserID;
    var handle = userToEdit.UserHandle;
    var email = userToEdit.UserEmail;
    var firstName = userToEdit.UserFirstName;
    var lastName = userToEdit.UserLastName;
    var role = userToEdit.UserRole;

    //console.log("Should give email from user-edit.js"+email);
    //console.log("Should give userToEdit.UserHandle from user-edit.js"+userToEdit.UserHandle);
    //console.log("Should give userToEdit.email from user-edit.js"+userToEdit.email);
    //console.log("Should give firstName from user-edit.js"+firstName);
    //console.log("Should give UserLastName from user-edit.js"+UserLastName);
    console.log("Should give req.session.user from user-edit.js"+req.session.user.handle);

    var errorMessage = ""

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: req.session.user.handle,
        role: req.session.user.role,
    });

    var html = templates['layout-manage-single-user.html']({
        error: errorMessage,
        navi: navigationSide,
        user: userToEdit,
        id: id,
        handle: handle,
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: role
    });

    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);

}// close userEdit


// EXPORT
module.exports = userEdit;