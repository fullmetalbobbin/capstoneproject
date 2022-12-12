/******************************************** 
 *  user-create.js                          *
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
const serveError = require('./serve-error');
const sessionCreate = require('./session-create');
const templates = require('../templates');


/** @function userCreate
 * 
 * TODO - COMMENT
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @returns 
 **/
function userCreate(req, res) {

    var handle = sanitize(req.body.handle);
    var email = sanitize(req.body.email);
    var firstName = sanitize(req.body.firstName);
    var lastName = sanitize(req.body.lastName);
    var passwordInitial = sanitize(req.body.passwordInital);
    var passwordConfirm = sanitize(req.body.passwordConfirm);

    if (!handle || !email || !firstName || !lastName || !passwordInital || !passwordConfirm) return serveError(req, res, 422, "All fields must be filled.");

    var handleTaken = database.prepare("SELECT * FROM users WHERE UserHandle = ?").get(handle);
    var emailTaken = database.prepare("SELECT * FROM users WHERE UserEmail = ?").get(email);
    if (handleTaken) return fail(req, res, `Sorry! "${handle}" is already taken.`);
    if (emailTaken) return fail(req, res, `Whoops! "${email}" is already registered.`);

    if (passwordInitial !== passwordConfirm) return createFail(req, res, "Password entries must match.");

    encryption.hash(passwordConfirm, 10, (err, encrypt) => {
        var userData = database.prepare("INSERT INTO users (UserHandle, UserEmail, UserFirstName, UserLastName, EncryptedPassword) VALUES (?, ?, ?, ?, ?);").run(handle, email, firstName, lastName, encrypt);
        if (err) {
            return serveError(req, res, 500, err);
        }// close if
        if (userData.changes === 1) {
            var user = database.prepare("SELECT * FROM users WHERE handle = ?").get(handle);
            createSuccess(req, res, user);
        }// close if
        else {
            createFail(req, res, "Sorry, were unable to process your request. Please try again.");
        }// close else
    });

}// close userCreate



function createFail(req, res, err) {

    var errorMessage = err;
    if (!errorMessage) {
        errorMessage = "Uh-oh! An error occured processing your request. Please try again. "
    }// close if

    // TODO - ATTACH LAYOUTS

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);

}// close createFail



/** @function createSuccess
 * 
 * Helper function called when creating a user is successful
 * Creates a session for the user - login
 * 
 * @param {*} req : request object
 * @param {*} res : reponse object
 * @param {*} currentUserID : user for whom to create session 
 **/
function createSuccess(req, res, currentUserID) {

    sessionCreate(req, res);

}// close createSuccess



// EXPORT
module.exports = userCreate;