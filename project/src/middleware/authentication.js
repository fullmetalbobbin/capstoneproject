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
const serveError = require('./serve-error');


/** @function authentication
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
        var credentialsEncrypted = req.headers['authorization'].split(' ')[1];
        var credentialsDecrypted = new Buffer.from(credentialsEncrypted, "base64");
        var credentialsTranslated = buffer.toString("utf-8");
        var credentialsToAuthenticate = credentialsTranslated.split(':');
        var userHandle = credentialsToAuthenticate[0];
        var userPassword = credentialsToAuthenticate[1];
        var user = database.prepare("SELECT * FROM Users WHERE UserHandle = ?").get(UserHandle);

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