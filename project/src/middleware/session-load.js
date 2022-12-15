/******************************************** 
 *  session-load.js                         *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const sessions = require('../sessions');


/** @function sessionLoad
 *
 * Middleware to load a session:
 *   - Checks for a cookie from the header of the incoming request object
 *   - If there is no cookie there is no session to load
 *   - Else attach the current cookie to the current session
 *   - Attach current session to the tracked sessions in the request object
 *   - Export the sessionLoad response
 *
 * @param {*} req : request object
 * @param {*} res : response object
 **/
function sessionLoad(req, res, next) {

    var currentCookie = /SID=([^;\s]+)/.exec(req.headers.cookie);

    if (!currentCookie) {
        console.log("cookie not found");
        req.session = {};
        next();
        return;
    }//close if
    else {
        console.log("cookie found");
        var currentSession = sessions.retrieve(currentCookie[1]);
        req.session = currentSession;
        console.log(currentSession);
        next();
    }//close else

}//close sessionLoad


// EXPORT
module.exports = sessionLoad;