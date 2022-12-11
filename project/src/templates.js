/******************************************** 
 *  templates.js                            *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/


// IMPORT REQUIRED RESOURCES
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

var templates = {};
var files = fs.readdirSync('templates');


// Compile each file and attach to the templates object : mapping functions to templates
files.forEach(file => {

    const templateString = fs.readFileSync(path.join('templates', file), { encoding: "utf8" });

    templates[path.basename(file, '.ejs')] = ejs.compile(templateString);
    
});


// EXPORT
module.exports = templates;