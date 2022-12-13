/******************************************** 
 *  database.js                             *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const Database = require('better-sqlite3');


/************************************************************************
 * Creates connection to the database for access throughout the project *
 ************************************************************************/


// EXPORT
module.exports = new Database('../db/capstoneDB.db');