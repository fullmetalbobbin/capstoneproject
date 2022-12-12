/******************************************** 
 *  user-list.js                            *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
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

    var id = allUsers.UserID;
    var handle = allUsers.UserHandle;
    var email = allUsers.UserEmail;
    var firstName = allUsers.UserFirstName;
    var lastName = allUsers.UserLastName;
    var role = allUsers.UserRole;

    var navigationSide = templates['navigation-side.html']({
        userAdmin: req.session.UserHandle,
        roleAdmin: req.session.UserRole,
        handleAdmin: req.session.UserHandle
    });

    var html = templates['layout-manage-users.html']({
        navi: navigationSide,
        users: allUsers
    });

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close userList


// EXPORT
module.exports = userList;