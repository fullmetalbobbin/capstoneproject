/******************************************** 
 *  server.js                               *
 *                                          *
 *  Capstone Project:  "Context Textiles"   *
 *  Author: Amanda Dreesen                  *
 *          Kansas State University         *
 *          College of Engineering          *
 *          Computer Science                *
 ********************************************/

// IMPORT REQUIRED RESOURCES
require('./src/database');
require('./src/templates');

const http = require('http');
const app = require('./src/app');

const port = 8082;

// Console log message for debugging purposes
app.listen(port, () => {
    console.log(`Starting port: ${port}`);
});


app.get('/status', (req, res) => {
    res.send({
        message: 'Is this thing on?'
    });
});

