/******************************************** 
 *  user-list.js                            *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/
//TODO: Double-check needed vars


// IMPORT REQUIRED RESOURCES
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');
const database = require('../database');
const serveError = require('../middleware/serve-error');
const templates = require('../templates');


/** @function userList
 * 
 * Retrieves list of all users from the database for export
 * Only to be used by authorized admin role
 * Establishes templates to be used then serves the HTML
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function userList(req, res) { 

    var allUsers = database.prepare("SELECT * FROM Users").all();

    /*
    var id = allUsers.UserID;
    var handle = allUsers.UserHandle;
    var email = allUsers.UserEmail;
    var firstName = allUsers.UserFirstName;
    var lastName = allUsers.UserLastName;
    var role = allUsers.UserRole;
    */

    //console.log("Should give role from user-list.js"+user.role);
    //console.log("Should give user.UserEmail from user-list.js"+user.UserEmail);
    //console.log("Should give req.session.UserHandle from user-list.js"+req.session.UserHandle);
    //console.log("Should give req.session.handle from user-list.js"+req.session.handle);
    //console.log("Should give req.session.user.UserHandle from user-list.js"+req.session.user.UserHandle);
    //console.log("Should give req.session.user.handle from user-list.js"+req.session.user.handle);

    var errorMessage = "";

    var navigationSide = templates['navigation-side.html']({
        user: req.session.user,
        handle: req.session.user.handle,
        role: req.session.user.role
    });

    //console.log("Should give handle assigned from req.session.handle in user-list.js"+handle);
    //console.log("Should give handle assigned from req.session.handle in user-list.js"+allUsers.UserLastName);


    var html = templates['layout-manage-all-users.html']({
        error: errorMessage,
        navi: navigationSide,
        users: allUsers,
        id: allUsers.UserID,
        handle: allUsers.UserHandle,
        email: allUsers.UserEmail,
        firstName: allUsers.UserFirstName,
        lastName: allUsers.UserLastName,
        role: allUsers.UserRole
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close userList


// EXPORT
module.exports = userList;