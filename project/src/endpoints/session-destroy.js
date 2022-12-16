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
const templates = require('../templates');


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
        sessions.remove(currentCookie[1]);
    }//close if

    /*
    if(req.session.user) {
        var handle = req.session.user.UserHandle; 
        var role = req.session.user.UserRole;      
    }// close
    else {
        var handle = "Guest"
        var role = 0;
    }// close else

    var error = "";
  
    var navigationSide = templates['navigation-side.html']({
        handle: handle,
        role: role
    });

    var html = templates['layout-homepage.html']({
        navi: navigationSide,
        error: error
    });*/


    res.setHeader("Set-Cookie", `SID=deleted; Secure; HTTPOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    res.statusCode=302;
    res.setHeader("Location", "/");
    //res.setHeader("Content-Type", "text/html");
    ///res.setHeader("Content-Length", html.length);
    res.end();

}//close sessionDestroy


// EXPORT
module.exports = sessionDestroy;