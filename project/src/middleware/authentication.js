/******************************************** 
 *  authentication.js                       *
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
const serveError = require('./middleware/serve-error');


/** @function authentication
 * 
 * Middleware authenticator to protect sensitive data
 *  - Checks for correct header information to be processed
 *  - Seperates header information for processing
 *  - Decrypts the credentials
 *  - Translates the decrypted credentials into a string format
 *  - Assigns credential elements to correspending variables
 *  - Matches the user handle to the users table from the database
 *      - If the use handle does not exist - error and redirect
 *  - Compares the input against the recorded credentials
 *      - Serves error if occurs
 *      - Allows next in route if matched
 *      - Serves error and redirects if not matched
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @param {*} next : callback to indicate request can be fulfilled
 * @returns   next  OR  error & redirect
 **/
function authentication(req, res, next) { 

    if (!req.headers['authorization']) {
        res.writeHead(401, { 'WWW-Authenticate': 'Basic realm=Creating posts' }).end();
    }// close if
    else { 
        var credentialsInput = req.headers['authorization'].split(' ')[1];
        var credentialsEncrypted = new Buffer.from(credentialsInput, "base64");
        var credentialsTranslated = credentialsEncrypted.toString("utf-8");
        var credentialsToAuthenticate = credentialsTranslated.split(':');
        var userHandle = credentialsToAuthenticate[0];
        var userPassword = credentialsToAuthenticate[1];
        var user = database.prepare("SELECT * FROM Users WHERE UserHandle = ?").get(userHandle);

        if (!user) { 
            return res.WriteHead(403, { Location: "/new-user" }).end();
        }// close if

        encryption.compare(userPassword, user.encryptedPassword, function (error, result) {
            if (error) { 
                return serveError(req, res, 500, error);
            }// close if
            if (result) {
                next();
            }// close if
            else { 
                res.WriteHead(403, { Location: "/new-user" }).end();
            }// close else
        }); 

    }// close else

}// close authentication


// EXPORT
module.exports = authentication;