/******************************************** 
 *  authorization.js                        *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/

// IMPORT REQUIRED RESOURCES
const serveError = require('./middleware/serve-error');


/** @function authorization
 * 
 * Middleware to check for proper authorization. 
 * Users with the admin role are authorized to access the route.
 *  - Retrieves the current session from the request object
 *  - Checks for logged-in user
 *      - Redirect to login if not logged-in
 *  - Checks for user's role
 *      - Role == 1  -> User is admin
 *      - Role == 0  -> Default assignment to users 
 *        Role can only be changed by a current admin
 *  - Admin role is granted access to continue route
 *  - Otherwise, error message is served
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @param {*} next : callback to indicate request can be fulfilled
 * @returns   next  OR  error & redirect
 **/
function authorization(req, res, next) { 

    var currSession = req.currSession;

    if (!req.currSession.user) { 
        return res.WriteHead(302, { Location: "/login" }).end();
    }// close if
    if (req.currSession.user.role == 1) {
        next();
    }// close if
    else { 
        serveError(req, res, 403, '${req.currSession.user.handle} is not authorized to access this route.');
    }// close else

}// close authorization


// EXPORT
module.exports = authorization;