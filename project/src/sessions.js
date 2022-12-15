/******************************************** 
 *  sessions.js                             *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


//import nanoid from nanoid;
// IMPORT REQUIRED RESOURCES
const db = require('./database');
//const nanoid = require('nanoid');
//const nanoid = import('nanoid');
//const { nanoid } = require("nanoid");
//const { nanoid } = import("nanoid");
//const nanoid = nanoid();
//var { nanoid }= require("nanoid");
//import {nanoid} from 'nanoid';
//var { nanoid } = import ("nanoid");
const { v4 : uuidv4 } = require('uuid');


// Initialized constant variables for time calculations
const SESSION_INACTIVITY_LIMIT = 1000 * 60 * 15; // 15min converted into ms
const SESSION_CLEANING_INTERVAL = 1000 * 60 * 60;   // 1hr converted into ms


// Object to track the exisiting sessions
var sessionsTracking = {};


// Calls sessionExpire function at the session cleaning interval
setInterval(sessionExpire, SESSION_CLEANING_INTERVAL);


/** @function nanoidGenerate
 * 
 * Generates a unique identifier for a session
 *  - Creates a variable to hold the current identifier
 *  - Continues to generate a new nanoid if it already exits in the tracked sessions
 *  - Returns the unique nanoid identifier (that was not already in use)
 * 
 * @returns {string}: nanoid
 **/
function uuidGenerate() {

    //var currentNano;

    //while(sessionsTracking[currentNano]){
     //   currentNano = nanoid();
    //}

    do {
        var currentNano = uuidv4();
    } while (sessionsTracking[currentNano]);

    return currentNano;

}//close nanoidGenerate


/** @function sessionCreate
 * 
 * Creates a session (for a particular user)
 *  - Generates a unique identifier for the session
 *  - Attaches session to the tracked session
 *      - Includes current time for start of session record
 *      - Includes user information (id, handle, email, name, and role)
 *      - Includes data
 *  - Returns the generated session identifier
 * 
 * @param {*} user : user object
 * @returns {string} : session identifier
 **/
function sessionCreate(user) {

    var sessionuuid = uuidGenerate();

    sessionsTracking[sessionuuid] = {
        timestamp: Date.now(),
        user: {
            id: user.UserID,
            handle: user.UserHandle,
            email: user.Email,
            firstName: user.UserFirstName,
            lastName: user.UserLastName,
            role: user.UserRole
        },
        data: {}
    }

    return sessionuuid;

}//close sessionCreate


/** @function sessionRetrieve
 * 
 * Retreieves the session associated with the given uniquie identifier
 *  - Checks if the given session identifier exists in tracked session 
 *    and if given session has not expired
 *  - Calls sessionTimestampRefresh to restart the expiration timer since user remains active
 *  If above executes successfully, returns the particular session
 *  If above does not execute successfully, returns a null value 
 * 
 * @param {*} sessionuuid : unique identifier of particular session
 * @returns {oject || null} : particular session object or null
 **/
function sessionRetrieve(sessionuuid) {

    if (sessionsTracking[sessionuuid] && !sessionHasExpired[sessionuuid]) {
        sessionTimestampRefresh(sessionuuid);
        return JSON.parse(JSON.stringify(sessionsTracking[sessionuuid]));
    }//close if
    else {
        return false;
    }//close else

}//close session Retrieve


/** @function sessionUpdate
 * 
 * Update session with data
 *  - Checks if the given session identifier exists in tracked session 
 *    and if given session has not expired
 *  - Calls sessionTimestampRefresh to restart the expiration timer since user remains active
 *  - Attaches given data to the particular session
 *  If above executes sucessfully, returns true
 *  If above does not execute successfully, return false
 * 
 * @param {*} sessionuuid : unique identifier of particular session 
 * @param {*} data : data to attach to particlar session
 * @returns {boolean} [true] if update is successful   [false] if update is not successful
 **/
function sessionUpdate(sessionuuid, data) {

    if (sessionsTracking[sessionNanoid && !sessionHasExpired[sessionuuid]]) {
        sessionTimestampRefresh(sessionuuid);
        sessionsTracking[sessionuuid].data = data;
        return true;
    }//close if
    else {
        return false;
    }//close else

}//close sessionUpdate


/** @function sessionTimestampRefresh
 * 
 * Resets the timestamp associated with the particular session to the current time
 * This effectively resets the timer meant to capture user inactiveity
 * A reset timer allows the user to continue within the same session
 * SESSION_INACTIVITY_LIMIT is the threshold by which the timer is compared
 * Inactive sessions are cleaned from memory as specified by SESSION_CLEANING_INTERVAL
 * 
 * @param {*} sessionNanoid : unique identifier of particular session
 **/
function sessionTimestampRefresh(sessionuuid) {

    sessionsTracking[sessionuuid].timestamp = Date.now();

}//close sessionTimestampRefresh


/** @function sessionExpire
 * 
 * Iterates through tracked sessions to check for expired sessions
 *  - Calls the function sessionHasExpired on each tracked session
 *  - Used on an interval to clean memory
 * 
 **/
function sessionExpire() {

    for (const sessionuuid in sessionsTracking) {
        sessionHasExpired(sessionuuid);
    }//close foreach

}//close sessionExpire


/** @function sessionHasExpired
 * 
 * Determines if the particular session has expired
 *  - Checks if the session identifier exists in the tracked session:
 *       - If it does not exist in the tracked sessions object, the session is considered expired [true]
 *  - Calculates if session has expired due to inactivity:
 *       - Subtracts current time from the initial timestamp of the session
 *       - If greater than the allowed inactivity limit, the session is considered expired [true]
 *  - Else the session has not expired [false]
 * 
 * @param {*} sessionuuid : unique identifier of particular session
 * @returns {boolean} : [true] if session has expired    [false] if session has not expired
 */
function sessionHasExpired(sessionuuid) {

    if (!sessionsTracking[sessionuuid]) {
        return true;
    }//close if

    var timedOut = (Date.now() - sessionsTracking[sessionuuid].timestamp) > SESSION_INACTIVITY_LIMIT;

    if (timedOut) {
        sessionRemove(sessionuuid);
        return true;
    }//close if
    else {
        return false;
    }//close else  

}//close sessionHasExpired


/** @function sessionRemove
 * 
 * Removes the session
 *  - Given the particular session's unique identifier
 *  - Finds the session within the tracked sessions
 *  - Deletes particular session
 *  - (This will also free up the identifier[nanoid] for future use)
 * 
 * @param {*} sessionuuid : unique identifier for particular session
 **/
function sessionRemove(sessionuuid) {

    delete sessionsTracking[sessionuuid];

}//close sessionRemove


// EXPORT
module.exports = {
    create: sessionCreate,
    retrieve: sessionRetrieve,
    update: sessionUpdate,
    expire: sessionExpire,
    remove: sessionRemove
};