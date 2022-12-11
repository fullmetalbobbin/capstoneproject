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


/** @function sessionCreate
 * 
 * Endpoint to create a session
 *  - Retreives user handle input and user password input from request object
 *  - Checks for missing input from request object: empty field(s)
 *  - Sanitizes user input
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function sessionCreate(req, res) {

    var handle = req.body.handle;
    var password = req.body.password;

    if (!handle || !password) { return (res, req, "Please fill each field.") }

    var cleanHandle = sanitize(handle);
    var cleanPassword = sanitize(password);

    //FIX ME FIX ME FIX ME FIX ME FIX ME
    // Compare input to database
    // Success creates session
    // Failure redirects back to login with message

    var user = database.prepare("SELECT * FROM users WHERE handle = ?").get(handle);

    if (!user) {
        return
    }

    encryption.compare();



}//close sessionCreate


function loginDenied(req, res) {


}//close loginDenied


function loginAccepted(req, res, user) {

    var sessionNanoid = sessions.create(user);
    res.setHeader("Set-Cookie", `SID=${sessionNanoid}; Secure; HTTPOnly`);
    res.setHeader("Location", "/");
    res.end();

}//close loginAccepted


// EXPORT
module.exports = sessionCreate;