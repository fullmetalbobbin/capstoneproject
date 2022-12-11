/******************************************** 
 *  serve-error.js                          *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


/** @function serveError
 * 
 * 
 * 
 * @param {*} req : request object
 * @param {*} res : response object
 * @param {*} stat : status code
 * @param {*} err : error
 **/
function serveError(req, res, stat, err) { 
    console.error(err);
    console.trace();
    console.error(`Error ${req.method} at ${req.url}`);
    res.writeHead(stat).end();
    return;

}// close serveError


// EXPORTS
module.exports = serveError;