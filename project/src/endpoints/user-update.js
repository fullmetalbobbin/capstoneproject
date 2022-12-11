/******************************************** 
 *  user-update.js                          *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const database = require('../database');
const sanitize = require('sanitize-html');
const serveError = require('./serve-error');
const templates = require('../templates');


function userUpdate(req, res) {

    const currentUserID = parseInt(req.params.UserID, 10);

    var currentUser = database.prepare("SELECT * FROM users WHERE UserID = ?").get(currentUserID);

    var handle = sanitize(req.body.handle);
    var email = sanitize(req.body.email);
    var firstName = sanitize(req.body.firstName);
    var lastName = sanitize(req.body.lastName);
    var role = sanitize(req.body.role);

    if (handle == '') handle = currentUser.handle;
    if (email == '') email = currentUser.email;
    if (firstName == '') firstName = currentUser.firstName;
    if (lastName == '') lastName = currentUser.lastName;
    if (role == 'A' || role == 'a' || role == 'Y' || role == 'y') {
        role = 1;
    }// close if
    else {
        role = 0;
    }// close else


    var update = database.prepare("UPDATE users SET UserHandle = ?, UserEmail = ?, UserFirstName = ?, UserLastName = ?, Role = ? WHERE UserID = ? ").run(handle, email, firstName, lastName, role, currentUserID);

    if (update.changes !== 1) return serveError(req, res, 500, "Unable to update database");

    res.writeHead(302, { "Location": `/users` }).end();

}// close userUpdate


// EXPORT
module.exports = userUpdate;