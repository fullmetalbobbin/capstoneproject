/******************************************** 
 *  session-destroy.js                      *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const sessions = require('../sessions');


/** @function sessionDestroy
 * 
 * Endpoint to destroy a session
 *  - Checks for a cookie from the header of the incoming request object
 *  - If cookie is found removes the corresponding current session from the tracked sessions
 *  - Reset request object header: Set-Cookie value effectively cleared
 *  - Reset request object header: Location value effectively cleared
 *  - End the request object: effectively log out user
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function sessionDestroy(req, res) {

    var currentCookie = /SID=([^;\s]+)/.exec(req.headers.cookie);

    if (currentCookie) {
        sessionsTracking.remove(currentCookie[1]);
    }//close if

    req.setHeader("Set-Cookie", `SID=deleted; Secure; HTTPOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    req.setHeader("Location", "/");
    req.end();

}//close sessionDestroy


// EXPORT
module.exports = sessionDestroy;